"use strict";

import { numberOfModules, capacity } from './parameters.js';
import { isEmpty } from '../functions/helpers.js';
class TimeModule {
    constructor(number) {
        this.number = number;
        this.assignedTechnicians = Array();
        this.boss = null;
        this.conmutableWith = Array();
        this.capacity = capacity;
        this.potentialTechnicians = {};
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

    assignBoss(boss) {
        this.boss = boss;
        boss.removeModule(this.number);
        boss.assignedModules.push(this.number);
    }
}

export class Schedule {
    constructor() {
        this.modules = new Set();
        this.moduleNodes = {};
        this.doneModules = {};
    }

    hasCommonModules(modules) {
        for (let i = 0; i < modules.length; i++) {
            if (this.modules.has(modules[i])) {
                return true;
            }
        }
        return false;
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
        for (let i = 0; i < modules.length; i++) {
            let moduleIndex = modules[i];
            if (this.moduleNodes[moduleIndex].hasTechniciansWithPriority(priority) > maxValue) {
                maxModule = moduleIndex;
                maxValue = this.moduleNodes[moduleIndex].hasTechniciansWithPriority(priority);
            }
        }
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
        for (let i = 0; i < technician.modules.length; i++) {
            let currentModule = technician.modules[i];
            if (currentModule != numberOfModule) {
                this.moduleNodes[currentModule].removePotentialTechnician(technician);
            }
        }
    }

    assignToModule(numberOfModule) {
        let currentModule = this.moduleNodes[numberOfModule];
        currentModule.assignTechnicians();
        for (let i = 0; i < currentModule.assignedTechnicians.length; i++) {
            this.removeTechniciansAsPotential(currentModule.assignedTechnicians[i], numberOfModule);
        }
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
        for (let i = 0; i < toRemove.length; i++) {
            delete this.moduleNodes[toRemove[i]];
        }
    }

    hasAvailableModules() {
        return !isEmpty(this.moduleNodes);
    }

    getModuleWithMostAssignedTechnicians() {
        let maxModule = 0;
        let maxValue = 0;
        for (let x in this.doneModules) {
            if (this.doneModules.hasOwnProperty(x)) {
                if (this.doneModules[x].assignedTechnicians.length > maxValue) {
                    if (!this.doneModules[x].hasBoss()) {
                        maxModule = this.doneModules[x];
                        maxValue = maxModule.assignedTechnicians.length;
                    }
                }
            }
        }
        return maxModule;
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

    checkConmutabilitywithBoss(boss) {

    }
}