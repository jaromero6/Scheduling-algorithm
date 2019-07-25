import {getMaximum} from '../functions/helpers.js';

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
        return this.assignedModules.length < this.maxModules && this.assignedModules.length > 0;
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

    compareByDisponibility(bosses){
        let comparing = Array();
        bosses.forEach(boss => {
            comparing.push(boss.capacity);
        });
        return bosses.indexOf(getMaximun(comparing));

    }
}