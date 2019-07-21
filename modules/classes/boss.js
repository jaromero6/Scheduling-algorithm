class Boss{
    constructor(idBoss, name, modules, capacity){
        this.idBoss = idBoss;
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

    addBoss(idBoss, name, modules){
        let boss = new Boss(idBoss, name, modules);
        this.bosses[idBoss] = boss;
    }
}