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
        return this.assignedModules.length < this.maxModules;
    }

    numberOfAssignations(){
        return this.assignedModules.length;
    }

    removeModule(numberModule){
        this.modules = this.modules.filter(value => value != numberModule);
    }
    addConmutableBoss(boss){
        this.canConmutateWith.push(boss.idBoss);

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
    // Añadir conmutabilidad con los jefes
    getBossToAssign(moduleSelected){
        let feasibleBosses = this.findBossesWithModule(moduleSelected.number);
        let minValue = null;
        let boss = Array();
        for(let i = 0; i < feasibleBosses.length; i++){
            if(minValue === null){
                minValue = feasibleBosses[i].numberOfAssignations();
                boss = [feasibleBosses[i]];
            }else{
                if(feasibleBosses[i].numberOfAssignations() < minValue){
                    minValue = feasibleBosses[i].numberOfAssignations();
                    boss = [feasibleBosses[i]];
                }else if(feasibleBosses[i].numberOfAssignations() == minValue){
                    boss.push(feasibleBosses[i]);
                }
            }
        }
        if(!boss.length){
            return null;
        }
        for(let i = 0; i < boss.length; i++){
            for(let j = 0; j < boss.length; j++){
                if( i != j){
                    boss[i].addConmutableBoss(boss[j]);
                }
            }
        }
        return boss[0];
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
}