"use strict";

import { capacity } from './parameters.js';
import { isEmpty } from '../functions/helpers.js';
class TimeModule {
    constructor(number) {
        this.number = number;
        this.assignedTechnicians = Array();
        this.boss = null;
        this.conmutableWith = Array();
        this.capacity = capacity;
        this.potentialTechnicians = {};
        this.potentialBosses = Array();
    }

    hasBoss() {
        if (!this.boss) return false;
        return true;
    }

    hasPotentialTehnicians() {
        return !isEmpty(this.potentialTechnicians);
    }

    hasTechniciansWithPriority(priority) {
        if (this.potentialTechnicians.hasOwnProperty(priority)) {
            return this.potentialTechnicians[priority].length > 0;
        }
        return false;
    }

    isFullModule() {
        return this.assignedTechnicians.length >= this.capacity;
    }

    assignTechnicians() {
        let currentPriority = 1;
        while (this.hasPotentialTehnicians() && !this.isFullModule()) {
            while (this.hasTechniciansWithPriority(currentPriority)) {
                let result = this.addTechnician(currentPriority);
                if (!result) break;
            }
            currentPriority++;
        }
    }

    addTechnician(currentPriority) {
        if (!this.isFullModule()) {
            let toAssign = this.potentialTechnicians[currentPriority].pop();
            this.assignedTechnicians.push(toAssign);
            this.checkConmutability(currentPriority, toAssign);
            if (!this.hasTechniciansWithPriority(currentPriority)) {
                delete this.potentialTechnicians[currentPriority];
            }
            toAssign.isAssigned = true;
            toAssign.isAssignedTo = this.number;
            return true;
        }
        return false;
    }


    checkConmutability(currentPriority, assigned) {
        if (this.isFullModule() && this.hasTechniciansWithPriority(currentPriority)) {
            assigned.addConmutationWith(this.potentialTechnicians[currentPriority]);
        }
    }

    addDefaultTechnician(technician) {
        if (!this.isFullModule()) {
            priority = technician.getPriority();
            this.potentialTechnicians[priority] = this.potentialTechnicians[priority].filter(
                techn => techn.idTechnician != technician.idTechnician);
            technician.isAssigned = true;
            this.assignedTechnicians.push(technician);
        }
    }

    addPotentialTechnician(technician, priority) {
        if (this.potentialTechnicians.hasOwnProperty(priority)) {
            this.potentialTechnicians[priority].push(technician);
        } else {
            this.potentialTechnicians[priority] = Array();
            this.potentialTechnicians[priority].push(technician);
        }
    }

    removePotentialTechnician(technician) {
        let priority = technician.getPriority();
        this.potentialTechnicians[priority] = this.potentialTechnicians[priority].filter(techn => techn.idTechnician !== technician.idTechnician);
        if (!this.potentialTechnicians[priority].length) {
            delete this.potentialTechnicians[priority];
        }
    }

    assignPotentialBoss(boss){
        this.potentialBosses.push(boss);
    }

    assignBoss() {
        if(this.potentialBosses.length === 1){
            this.boss = this.potentialBosses[0];
            this.boss.assignedModules.push(this.number);
            this.potentialBosses = Array();
            return true;
        }
        return false;
    }
}

export class Schedule {
    constructor() {
        this.modules = new Set();
        this.moduleNodes = {};
        this.doneModules = {};
    }
    
    hasCommonModules(modules) {
        let res = false
        modules.forEach(element => {
            if(this.modules.has(element)){ 
                res =  true; return null;};

            });
        return res;
    }

    addModule(numberModule) {
        this.modules.add(numberModule);
        this.moduleNodes[numberModule] = new TimeModule(numberModule);
    }

    filterModules(modules) {
        return modules.filter(mod => this.modules.has(mod));
    }

    addPotentialTechnician(technician, moduleTime, priority) {
        this.moduleNodes[moduleTime].addPotentialTechnician(technician, priority);
    }

    getModuleWithMostTechnicians(modules, priority) {
        let maxModule = 0;
        let maxValue = 0;
        modules.forEach(element => {
            if(this.moduleNodes[element].hasTechniciansWithPriority(priority) > maxValue){
                maxModule = element;
                maxValue = this.moduleNodes[element].hasTechniciansWithPriority(priority);
            }
        });
        return maxModule;
    }

    getModulesByPriority(priority) {
        let modulesWithPriority = Array();
        for (let x in this.moduleNodes) {
            if (this.moduleNodes.hasOwnProperty(x)) {
                if (this.moduleNodes[x].hasTechniciansWithPriority(priority)) {
                    modulesWithPriority.push(parseInt(x));
                }
            }
        }
        return modulesWithPriority;
    }

    removeTechniciansAsPotential(technician, numberOfModule) {
        technician.modules.forEach(element => {
            if(element != numberOfModule){
                this.moduleNodes[element].removePotentialTechnician(technician);
            };
        });
    }

    assignToModule(numberOfModule) {
        let currentModule = this.moduleNodes[numberOfModule];
        currentModule.assignTechnicians();
        currentModule.assignedTechnicians.forEach(element => {
            this.removeTechniciansAsPotential(element, numberOfModule);
        });
        this.doneModules[numberOfModule] = currentModule;
        delete this.moduleNodes[numberOfModule];
    }

    filterFeasibleModules() {
        let toRemove = Array();
        for (let x in this.moduleNodes) {
            if (this.moduleNodes.hasOwnProperty(x)) {
                if (isEmpty(this.moduleNodes[x].potentialTechnicians)) {
                    toRemove.push(x);
                }
            }
        }
        toRemove.forEach(element => {delete this.moduleNodes[element];});
    }

    hasAvailableModules() {
        return !isEmpty(this.moduleNodes);
    }


    assignPotentialBoss(moduleNumber, boss){
        this.doneModules[moduleNumber].assignPotentialBoss(boss);
    }

    assignBoss(moduleSelected, boss) {
        moduleSelected.assignBoss(boss);
    }

    hasModulesUnassignedBoss() {
        for (let x in this.doneModules) {
            if (this.doneModules.hasOwnProperty(x)) {
                if (!this.doneModules[x].hasBoss()) {
                    return true;
                }
            }
        }
        return false;
    }

    addDefaultTechnician(technician, moduleNumber) {
        this.moduleNodes[moduleNumber].addDefaultTechnician(technician);
        if (this.moduleNodes[moduleNumber].isFullModule()) {
            this.doneModules[x] = this.moduleNodes[moduleNumber];
            delete this.moduleNodes[moduleNumber];
        }
    }

    getModulesInformation(){
        let response = {};
        for(let x in this.doneModules){
            if(this.doneModules.hasOwnProperty(x)){
                let currentModule = this.doneModules[x];
                let id = currentModule.number;
                let assignedTechnicians = currentModule.assignedTechnicians;
                let boss = currentModule.boss;
                response[id] = {};
                response[id]['assignedTechnicians'] = assignedTechnicians;
                response[id]['boss'] = boss;
            }
        }
        return response;
    }

    getSortedModules(modulesArray){
        let result = Array();
        modulesArray.forEach(mod => {
            result.push(this.doneModules[mod]);
        });
        result.sort((a,b) => (a.assignedTechnicians.length > b.assignedTechnicians.length) ? 1 : 
            ((b.assignedTechnicians.length > a.assignedTechnicians.length) ? -1 : 0)); 
        return result;
    }

    totalWorkingTechnicians(){
        let counter = 0;
        for(let x in this.doneModules){
            if(this.doneModules.hasOwnProperty(x)){
                if(this.doneModules[x].boss){
                    counter += this.doneModules[x].assignedTechnicians.length;
                }
            }
        }
        return counter;
    }

    getTotalTechnicians(bossModules){
        let total = 0;
        bossModules.forEach(element => {
            total += this.doneModules[element].assignedTechnicians.length;
        });
        return total;
    }
}