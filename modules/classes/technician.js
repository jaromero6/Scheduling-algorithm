class Technician{
    constructor(name, modules){
        this.name = name;
        this.modules = modules;     
    }
}

export class TechnicianOrganizer{
    constructor(){
        this.technicians = {};
        this.techniciansModules = new Set();
    }

    addTechnician(idTechnician, name, modules){
        let technician = new Technician(name, modules);
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
}

