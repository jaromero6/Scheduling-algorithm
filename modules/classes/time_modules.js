"use strict";

import {numberOfModules} from './parameters.js';
import {isEmpty} from '../functions/helpers.js';
class TimeModule{
    constructor(number){
        this.number = number;
        this.assignedTechnicians = Array();
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

    isFullModule(){
        return this.assignTechnicians.length >= this.capacity;
    }

    assignTechnicians(){
        let currentPriority = 1;
        while(!isEmpty(this.potentialTechnicians) && !this.isFullModule()){
            while(this.hasTechniciansWithPriority(currentPriority)){
                this.addTechnician(currentPriority);
                this.checkConmutability(currentPriority);
            }
            currentPriority++;
        }
    }
   
    addTechnician(currentPriority){
        let toAssign = this.potentialTechnicians[currentPriority].pop();
        this.assinedTechnicians.push(toAssign);

    }

    checkConmutability(currentPriority){
        if(this.isFullModule() && this.hasTechniciansWithPriority(currentPriority)){
            toAssign.addConmutationWith(this.potentialTechnicians[currentPriority]);
        }
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

    removePotentialTechnician(technician){
        let priority = technician.getPriority();
        for(let i = 0; i < this.potentialTechnicians[priority].length; i++){ 
            if ( this.potentialTechnicians[i].idTechnician === technician.idTechnician) {
              this.potentialTechnicians.splice(i, 1); 
            }
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
        this.doneModules = {};
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
            if(this.moduleNodes[moduleIndex].hasTechniciansWithPriority(priority) > maxValue){
                maxModule = moduleIndex;
                maxValue = this.moduleNodes[moduleIndex].hasTechniciansWithPriority(priority);
            }
        }
        return maxModule;
    }

    getModulesByPriority(priority){
        let modulesWithPriority = Array();
        for(let x in this.moduleNodes){
            if(this.moduleNodes.hasOwnProperty(x)){
                if(this.moduleNodes[x].hasTechniciansWithPriority(priority)){
                    modulesWithPriority.push(parseInt(x));
                }
            }
        }
        return modulesWithPriority;
    }

    removeTechniciansAsPotential(technician){
        for(let i = 0; i < technician.modules.length; i++){
            currentModule = technician.modules[i];
            this.moduleNode[currentModule].removePotentialTechnician(technician);

        }
    }

    removeModuleOfTechnicians(moduleNode){
        for(let x in moduleNode.potentialTechnicians){
            if(moduleNode.potentialTechnicians.hasOwnProperty(x)){
                currentTechnicians = moduleNode.potentialTechnicians[x];
                for(let i = 0; i < currentTechnicians; i++){
                    currentTechnicians[i].removeModule(moduleNode.number);
                }
            }
        }



    }

    assignToModule(numberOfModule){
        let currentModule = this.modulesNodes[numberOfModule];
        currentModule.assignTechnicians();
        for(let i = 0; i < currentModule.assignedTechnicians; i++){
            this.removeTechniciansAsPotential(currentModule.assignTechnicians[i]);
        }
        if(! isEmpty(currentModule.potentialTechnicians)){
            this.removeModuleOfTechnicians();
        }
        this.doneModules[numberOfModule] = currentModule;
        delete this.moduleNodes[numberOfModule];
    }
}
