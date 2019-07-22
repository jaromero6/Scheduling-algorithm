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

    numberOfTechnicianWithPriority(priority){
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
}
