import {getMaximum} from '../functions/helpers.js';

class Boss{
    constructor(idBoss, name, modules, capacity){
        this.idBoss = idBoss;
        this.name = name;
        this.modules = modules;
        this.maxModules = capacity;
        this.assignedModules = Array();
        this.canConmutateWith = Array();
        this.totalPotentialTechnicians = 0;
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
        this.modules = this.modules.filter(value => value != numberModule);
    }
    addConmutableBoss(boss){
        this.canConmutateWith.push(boss[idBoss]);
    }
    
    getCurrentDisponibility(){
        return this.maxModules - this.assignedModules.length;
    }

    getCostOfAssign(){
        return this.totalPotentialTechnicians / this.getCurrentDisponibility() ;
    }

    addConmutableBoss(bossId, moduleNumber){
        let conmutable = {'id': bossId, 'moduleNumber': moduleNumber};
        this.canConmutateWith.push(conmutable);

    }

    
}

export class BossOrganizer{
    constructor(){
        this.bosses = {};
    }
    getBossesInformation(){
        let response = {};
        for(let x in this.bosses){
            if(this.bosses.hasOwnProperty(x)){
                let boss = this.bosses[x];
                let id = boss.idBoss;
                let name = boss.name;
                let assignedModules = boss.assignedModules;
                let conmutableWith = boss.canConmutateWith;
                response[id] = {};
                response[id]['name'] = name;
                response[id]['assignedModules'] = assignedModules;
                response[id]['conmutableWith'] = conmutableWith;
            }
        }
    return response;
    }
    
    addBoss(idBoss, name, modules, capacity){
        let boss = new Boss(idBoss, name, modules, capacity);
        this.bosses[idBoss] = boss;
    }

    unableBoss(numberOfBoss){
        delete this.bosses[numberOfBoss];
    }

    findBossesWithModule(numberModule){
        let bossesWithModule = Array();
        for(let x in this.bosses){
            if(this.bosses.hasOwnProperty(x)){
                if(this.bosses[x].hasModule(numberModule)){
                    bossesWithModule.push(this.bosses[x]);
                }
            }
        }
        return this.filterAvailableBosses(bossesWithModule);
    }

    filterAvailableBosses(bossesArray){
        return bossesArray.filter(boss => boss.canBeAssigned());

    }


    hasAvailableBosses(){
        for(let x in this.bosses){
            if(this.bosses.hasOwnProperty(x)){
                if(this.bosses[x].canBeAssigned()){
                    return true;
                }
            }
        }
        return false;
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
}