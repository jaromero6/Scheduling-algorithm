"use strict";

import {numberOfModules} from './parameters.js';

class TimeModule{
    constructor(number){
        this.number = number;
        this.technicians = new Set();
        this.boss = null;
        this.capacity = numberOfModules;
        this.potentialTechnicians = {};

    }

    techniciansWithPriority(priority){
        if(this.potentialTechnicians.hasOwnProperty(priority)){
            return this.potentialTechnicians[priority].length;
        }else{
            return 0;
        }
    }
   
    addTechnician(technician){

    }

    removeTechnician(technician){

    }

    addPotentialTechnician(idTechnician, priority){
        if(this.potentialTechnicians.hasOwnProperty(priority)){
            this.potentialTechnicians[priority].push(idTechnician);
        }else{
            this.potentialTechnicians[priority] = Array();
            this.potentialTechnicians[priority].push(idTechnician);
        }
    }


    getModuleWithMostTechnicians(modules, priority){
        let maxModule = 0;
        let maxValue = 0;
        for(let i = 0; i < modules.length; i++){
            moduleIndex = modules[i];
            if(this.moduleNodes[moduleIndex].techniciansWithPriority(priority) > maxValue){
                maxModule = moduleIndex;
                maxValue = this.moduleNodes[moduleIndex].techniciansWithPriority(priority);
            }
        }
        return maxModule;
    }

    addBoss(boss){

    }

    removeBoss(boss){

    }

    
}

export class Schedule{
    constructor(){
        this.modules = new Set();
        this.moduleNodes = {};
    }
    
    removeModule(number){

    }

    getModule(number){
    }

    hasCommonModules(modules){
        for(let i = 0; i < modules.length; i++){
            if(this.modules.has(modules[i])){
                return true;
            }
        }
        return false;
    }

    addModule(numberModule){
        this.modules.add(numberModule);
        this.moduleNodes[numberModule] = new TimeModule(numberModule);
    }

    filterModules(modules){
        return modules.filter(mod => this.modules.has(mod));
    }

    addPotentialTechnician(idTechnician, moduleTime, priority){
        this.moduleNodes[moduleTime].addPotentialTechnician(idTechnician, priority);
    }

    getModulesByPriority(priority){
        let restrictiveModules = Array();
        for(let x in this.moduleNodes){
            if(this.moduleNodes.hasOwnProperty(x)){
                let currentModule = this.moduleNodes[x];
                if(currentModule.techniciansWithPriority(priority)){
                    restrictiveModules.push(parseInt(x));
                }
            }
        }
        return restrictiveModules;
    }

    getModuleWithMostTechnicians(modules, priority){
        let maxModule = 0;
        let maxValue = 0;
        for(let i = 0; i < modules.length; i++){
            let moduleIndex = modules[i];
            if(this.moduleNodes[moduleIndex].techniciansWithPriority(priority) > maxValue){
                maxModule = moduleIndex;
                maxValue = this.moduleNodes[moduleIndex].techniciansWithPriority(priority);
            }
        }
        return maxModule;
    }
}
