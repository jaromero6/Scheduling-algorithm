class Boss{
    constructor(idBoss, name, modules, capacity){
        this.idBoss = idBoss;
        this.name = name;
        this.modules = modules;
        this.maxModules = capacity;
        this.assigned_modules = Array();
        this.available = true
    }
}

export class BossOrganizer{
    constructor(){
        this.bosses = Array();
    }

    addBoss(idBoss, name, modules, capacity){
        let boss = new Boss(idBoss, name, modules, capacity);
        this.bosses.push(boss);
    }

    unableBoss(numberOfBoss){
        this.bosses[numberOfBoss].available = false;
    }
}