
'use strict';

import {Schedule} from './time_modules.js';
import {BossOrganizer} from './boss.js';
import {TechnicianOrganizer} from './technician.js';

export class Organizer{
    constructor(){
        this.techniciansOrg = new TechnicianOrganizer();
        this.bossesOrg = new BossOrganizer();
        this.modulesOrg = new Schedule();
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
        for(let x in this.bossesOrg.bosses){
            if(this.bossesOrg.bosses.hasOwnProperty(x)){
                let bossModules = this.bossesOrg.bosses[x].modules;
                if(! this.techniciansOrg.hasCommonModules(bossModules)){
                    this.bossesOrg.unableBoss(x);
                }else{
                    this.filterBossesModules(x);
                }
            }
        }
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
        return this.modulesOrg.getModuleWithMostTechnicians(modules, currentPriority - 1);
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
        Object.values(this.bossesOrg.bosses).forEach(boss => {
            if(boss.canBeAssigned()){
                toAssign = boss.modules[0];
                boss.removeModule(toAssign.number);
                this.modulesOrg.addPotentialBoss(toAssign, boss);
            }
        });
        Object.values(this.modulesOrg.doneModules).forEach(mod => {
            if(!mod.assignBoss()){
                console.log("Hoa");
                bosses = mod.potentialBosses;
                toAssign = this.selectBoss(bosses);
                mod.potentialBosses = [toAssign];
                mod.assignBoss();
            }
        });
    }

    selectBoss(bosses){
        let modulesArray = Array();
        bosses.forEach(boss => {
            modulesArray.push(boss.modules);
        });
        indexResult = this.modulesOrg.compareModules(modulesArray);
        if(indexResult === undefined){
            indexResult = this.bossesOrg.compareByDisponibilty(bosses);
        }
        return bosses[indexResult];
    }

    assignAllBossesToModules(){
        this.prepareToAssing();
        while(this.bossesOrg.hasAvailableBosses() && 
        this.modulesOrg.hasModulesUnassignedBoss()){
            this.assignBosses();
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

