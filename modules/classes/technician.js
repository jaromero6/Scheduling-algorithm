class Technician{
    constructor(idTechnician, name, modules){
        this.idTechnician = idTechnician;
        this.name = name;
        this.modules = modules;     
    }

    getPriority(){
        return this.modules.length;
    }
    
    removeModule(numberOfModule){
        this.modules = this.modules.filter(value => value != numberOfModule);
    }

    addConmutationWith(technicians){

    }    
}

export class TechnicianOrganizer{
    constructor(){
        this.technicians = {};
        this.techniciansModules = new Set();
    }

    addTechnician(idTechnician, name, modules){
        let technician = new Technician(idTechnician, name, modules);
        this.technicians[idTechnician] = technician;
        for(let i = 0; i < modules.length; i++){
            this.techniciansModules.add(modules[i]);
        }
    }

    hasCommonModules(modules){
        for(let i = 0; i < modules.length; i++){
            if(this.techniciansModules.has(modules[i])){
                return true;
            }
        }
        return false;
    }

    filterModules(modules){
        return modules.filter(mod => this.techniciansModules.has(mod));
    }

    removeModule(numberOfModule){
        for(let x in this.technicians){
            if(this.technicians.hasOwnProperty(x)){
                this.technicians[x].removeModule(numberOfModule);
            }
        }
    }
}

