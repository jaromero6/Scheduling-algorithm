'use strict';

class Boss{
    constructor(idBoss, name, modules, capacity){
        this.idBoss = idBoss;
        this.name = name;
        this.modules = modules;
        this.maxModules = capacity;
        this.assignedModules = Array();
        this.canConmutateWith = Array();
    }

    hasModule(numberMOdule){
        return this.modules.includes(numberMOdule);
    }

    canBeAssigned(){
        return this.getCurrentDisponibility() && this.modules.length > 0;
    }

    numberOfAssignations(){
        return this.assignedModules.length;
    }

    removeModule(numberModule){
        this.modules = this.modules.filter(mod => mod.number != numberModule);
    }
    addConmutableBoss(boss){
        this.canConmutateWith.push(boss[idBoss]);
    }
    
    getCurrentDisponibility(){
        return this.maxModules - this.assignedModules.length;
    }

    getCostOfAssign(){
        let total = 0;
        this.modules.forEach(mod => {total += mod.assignedTechnicians.length});
        return total / this.getCurrentDisponibility() ;
    }

    addConmutableBoss(bossId, moduleNumber){
        let conmutable = {'idBoss': bossId, 'moduleNumber': moduleNumber};
        this.canConmutateWith.push(conmutable);

    }

    checkConmutability(numberOfTechnicians, assignedModule){
        if(!this.canBeAssigned()){
            this.modules.forEach(mod => {
                if(mod.assignedTechnicians.length == numberOfTechnicians){
                    mod.addConmutationWith(assignedModule.number, this.idBoss);
                    assignedModule.addConmutationWith(mod.number, this.idBoss);
                }
            });
        }

    }

    
}

export class BossOrganizer{
    constructor(){
        this.bosses = {};
    }
    getBossesInformation(){
        let response = {};
        Object.values(this.bosses).forEach(boss => {
            let id = boss.idBoss;
            let name = boss.name;
            let assignedModules = boss.assignedModules;
            let conmutableWith = boss.canConmutateWith;
            response[id] = {};
            response[id]['name'] = name;
            response[id]['assignedModules'] = assignedModules;
            response[id]['conmutableWith'] = conmutableWith;
        });
    return response;
    }
    
    addBoss(idBoss, name, modules, capacity){
        let boss = new Boss(idBoss, name, modules, capacity);
        this.bosses[idBoss] = boss;
    }

    unableBoss(numberOfBoss){
        delete this.bosses[numberOfBoss];
    }



    hasAvailableBosses(){
        let result = false;
        Object.values(this.bosses).forEach(boss => {
            if(boss.canBeAssigned()){ result = true; return undefined; }
        });
        return result;
    }

    compareBosses(bosses, moduleNumber){
        let result = this.compareByCostOfAssign(bosses);
        if(result.length > 1){
            this.addConmutability(result, moduleNumber);
        }
        return result[0];
    }

    compareByCostOfAssign(bosses){
        let minBoss = Array();
        let minValue = bosses[0].getCostOfAssign();
        bosses.forEach(element => {
            if(element.getCostOfAssign() < minValue){
                minBoss = [element];
                minValue = element.getCostOfAssign();
            }else if(element.getCostOfAssign() == minValue){
                minBoss.push(element);
            }
        });
        return minBoss;
    }

    removeModule(moduleNumber){
        Object.values(this.bosses).forEach(boss => {
            boss.removeModule(moduleNumber);
        });
    }

    addConmutability(bosses, moduleNumber){
        bosses.forEach(i => {
            bosses.forEach(j => {
                if( i.idBoss != j.idBoss){
                    i.addConmutableBoss(j.idBoss , moduleNumber);
                }
            });
        });
    }

    checkConmutability(){
        Object.values(this.bosses).forEach(boss => {
            boss.checkConmutabilityWithUnasignedModules();
        });
    }
}