class Boss{
    constructor(idBoss, name, modules, capacity){
        this.name = name;
        this.modules = modules;
        this.maxModules = capacity;
        this.assigned_modules = Array();
    }

    hasModule(numberMOdule){
        return this.modules.includes(numberMOdule);
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
        return bossesWithModule;
    }

    getBossToAssign(moduleSelected){
        let feasibleBosses = this.findBossesWithModule(moduleSelected.number);
        console.log(feasibleBosses);


    }
}