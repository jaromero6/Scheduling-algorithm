
'use strict';


const Schedule = require('./time_modules').Schedule;
const BossOrganizer = require('./boss').BossOrganizer;
const TechnicianOrganizer = require('./technician').TechnicianOrganizer;

class Organizer{
    constructor(minValue){
        this.techniciansOrg = new TechnicianOrganizer();
        this.bossesOrg = new BossOrganizer();
        this.modulesOrg = new Schedule(minValue);
    }

    addBoss(idBoss, name, modules, capacity){
        this.bossesOrg.addBoss(idBoss, name, modules, capacity);
        modules.forEach(element => {
            this.modulesOrg.addModule(element);});
    }

    addTechnician(idTechnician, name, modules){
        if(this.modulesOrg.hasCommonModules(modules)){
            this.techniciansOrg.addTechnician(idTechnician, name, modules);
            this.filterTechniciansModules(idTechnician);
            this.addAsPotentialTechnician(idTechnician);
        }
    }
    
    removeRedundantBosses(){
        Object.values(this.bossesOrg.bosses).forEach(boss => {
            if(! this.techniciansOrg.hasCommonModules(boss.modules)){
                this.bossesOrg.unableBoss(boss.idBoss);
            }else{
                this.filterBossesModules(boss.idBoss);
            }
        });
    }

    updateModules(){
        this.modulesOrg.filterFeasibleModules();
    }

    checkFeasibleAssignation(){
        return this.techniciansOrg.hasTechnicians();
    }

    filterBossesModules(bossId){
        let filterModules = this.techniciansOrg.filterModules(
                        this.bossesOrg.bosses[bossId].modules);
        this.bossesOrg.bosses[bossId].modules = filterModules;
    
    }

    filterTechniciansModules(technicianId){
        let filterModules = this.modulesOrg.filterModules(
            this.techniciansOrg.technicians[technicianId].modules);
        this.techniciansOrg.technicians[technicianId].modules = filterModules;
    }


    addAsPotentialTechnician(idTechnician){
        let technician = this.techniciansOrg.technicians[idTechnician];
        let priority = technician.getPriority();
        technician.modules.forEach(element => {
            this.modulesOrg.addPotentialTechnician(technician, element, priority);
        });
    }
    getRestrictiveModule(){
        let currentPriority = 1
        let modules = Array();
        while(!modules.length){
            modules = this.modulesOrg.getModulesByPriority(currentPriority);
            currentPriority += 1;
        }
        return this.modulesOrg.getModuleWithMostPotentialTechnicinas();
    }

    assignToModule(numberModule){
        this.modulesOrg.assignToModule(numberModule);
        this.techniciansOrg.removeModule(numberModule);
    }

    assignAllTechnicians(){
        while(this.modulesOrg.hasAvailableModules() && this.techniciansOrg.hasAvailableTechnicians()){
                let moduleRestrictive = this.getRestrictiveModule();
                this.assignToModule(moduleRestrictive);
        }
    }

    prepareToAssing(){
        Object.values(this.bossesOrg.bosses).forEach(boss => {
            boss.modules = this.modulesOrg.getSortedModules(boss.modules);
        });
    }

    assignBosses(){
        let mod = this.modulesOrg.getModuleWithMostTechnicians();
        if(mod == null){
            return true;
        }
        Object.values(this.bossesOrg.bosses).forEach(boss => {
            if(boss.canBeAssigned() && boss.hasModule(mod.number)){
                mod.potentialBosses.push(boss);
            }
        });
        if(mod.potentialBosses.length){
            if(!mod.assignBoss()){
                let bosses = mod.potentialBosses;
                let toAssign = this.bossesOrg.compareBosses(bosses, mod.number);
                mod.potentialBosses = [toAssign];
                mod.assignBoss();                
                }
            this.bossesOrg.removeModule(mod.number);
            }
        mod.visited = true;
        return false;
    }

    assignAllBossesToModules(){
        this.prepareToAssing();
        let res;
        while(this.bossesOrg.hasAvailableBosses() && 
        this.modulesOrg.hasModulesUnassignedBoss()){
            res = this.assignBosses();
            if(res){
                break;
            }
            }
        }

    optimize(){
        this.assignAllTechnicians();
        this.assignAllBossesToModules();
    }

    getResult(){
        let result = {};
        result['technicians'] = this.techniciansOrg.getThechniciansInformation();
        result['modules'] = this.modulesOrg.getModulesInformation();
        result['bosses'] = this.bossesOrg.getBossesInformation();
        result['optimalValue'] = this.modulesOrg.totalWorkingTechnicians();
        return result;
    }
}

exports.Organizer = Organizer;