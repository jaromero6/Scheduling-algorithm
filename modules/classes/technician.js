class Technician{
    constructor(idTechnician, name, modules){
        this.idTechnician = idTechnician;
        this.name = name;
        this.modules = modules;     
    }
}

export class TechnicianOrganizer{
    constructor(){
        this.technicians = Array();
        this.techniciansModules = new Set();
    }

    addTechnician(idTechnician, name, modules){
        let technician = new Technician(idTechnician, name, modules);
        this.technicians.push(technician);
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

