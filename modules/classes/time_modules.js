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

    hasTechniciansWithPriority(priority){
        if(this.potentialTechnicians.hasOwnProperty(priority)){
            return this.potentialTechnicians[priority].length > 0;
        }else{
            return false;
        }
    }
   
    addTechnician(technician){

    }

    removeTechnician(technician){

    }

    addPotentialTechnician(technician, priority){
        if(this.potentialTechnicians.hasOwnProperty(priority)){
            this.potentialTechnicians[priority].push(technician);
        }else{
            this.potentialTechnicians[priority] = Array();
            this.potentialTechnicians[priority].push(technician);
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

    addPotentialTechnician(technician, moduleTime, priority){
        this.moduleNodes[moduleTime].addPotentialTechnician(technician, priority);
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

    getModulesByPriority(priority){
        let modulesWithPriority = Array();
        for(let x in this.moduleNodes){
            if(this.moduleNodes.hasOwnProperty(x)){
                if(this.moduleNodes[x].hasTechniciansWithPriority(priority)){
                    console.log(x,this.moduleNodes[x].hasTechniciansWithPriority(priority));
                    modulesWithPriority.push(parseInt(x));
                }
            }
        }
        return modulesWithPriority;
    }
}
