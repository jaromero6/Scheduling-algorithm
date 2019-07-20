export class Boss{
    constructor(name, modules, capacity){
        this.name = name;
        this.modules = modules;
        this.maxModules = capacity;
        this.assigned_modules = Array();
    }
}