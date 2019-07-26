
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
                let toAssign = boss.modules[0];
                console.log('----', boss.modules);
                boss.removeModule(toAssign.number);
                console.log('----', boss.modules);
                this.modulesOrg.assignPotentialBoss(toAssign.number, boss);
            }
        });
        Object.values(this.modulesOrg.doneModules).forEach(mod => {
            if(mod.potentialBosses.length){
                if(!mod.assignBoss()){
                    let bosses = mod.potentialBosses;
                    let toAssign = this.bossesOrg.compareBosses(bosses, mod.number);
                    mod.potentialBosses = [toAssign];
                    mod.assignBoss();
                }
            this.bossesOrg.removeModule(mod.number);
            }
        });
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

