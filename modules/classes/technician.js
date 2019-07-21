class Technician{
    constructor(idTechnician, name, modules){
        this.idTechnician = idTechnician;
        this.name = name;
        this.modules = modules;     
    }
}

export class TechnicianOrganizer{
    constructor(){
        this.technicians = {};
    }

    addTechnician(idTechnician, name, modules){
        let technician = new Technician(idTechnician, name, modules);
        this.technicians[idTechnician] = technician;
    }

}

