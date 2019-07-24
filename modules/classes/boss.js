class Boss{
    constructor(idBoss, name, modules, capacity){
        this.name = name;
        this.modules = modules;
        this.maxModules = capacity;
        this.assignedModules = Array();
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
}

export class BossOrganizer{
    constructor(){
        this.bosses = {};
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

    getBossToAssign(moduleSelected){
        let feasibleBosses = this.findBossesWithModule(moduleSelected.number);
        let minValue = null;
        let boss = null;
        for(let i = 0; i < feasibleBosses.length; i++){
            if(minValue === null){
                minValue = feasibleBosses[i].numberOfAssignations();
                boss = feasibleBosses[i];
            }else{
                if(feasibleBosses[i].numberOfAssignations() < minValue){
                    minValue = feasibleBosses[i].numberOfAssignations();
                    boss = feasibleBosses[i];
                }
            }
        if(!minValue){
            break;
        }
        }
        return boss;
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