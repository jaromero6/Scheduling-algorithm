class Boss{
    constructor(name, modules, capacity){
        this.name = name;
        this.modules = modules;
        this.maxModules = capacity;
        this.assigned_modules = Array();
    }
}

export class BossOrganizer{
    constructor(){
        this.bosses = {};
    }

    addBoss(idBoss, name, modules, capacity){
        let boss = new Boss(name, modules, capacity);
        this.bosses[idBoss] = boss;
    }

    unableBoss(numberOfBoss){
        delete this.bosses[numberOfBoss];
    }
}