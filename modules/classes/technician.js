import { isEmpty } from "../functions/helpers.js";

class Technician{
    constructor(idTechnician, name, modules){
        this.idTechnician = idTechnician;
        this.name = name;
        this.modules = modules;
        this.isAssigned = false;
        this.canConmutateWith = Array();
        this.isAssignedTo = null; 
    }

    isAvailable(){
        if(!this.isAssigned){
            if(this.modules.length){
                return true;
            }
        }
        return false;
    }

    getPriority(){
        return this.modules.length;
    }
    
    removeModule(numberOfModule){
        this.modules = this.modules.filter(value => value != numberOfModule);
    }

    addConmutationWith(technicians){
        for(let i = 0; i < technicians.length; i++){
            this.canConmutateWith.push(technicians[i].idTechnician);
        }


    }    
}

export class TechnicianOrganizer{
    constructor(){
        this.technicians = {};
        this.techniciansModules = new Set();
    }

    hasTechnicians(){
        return !isEmpty(this.technicians);
    }

    getThechniciansInformation(){
        let response = {};
        Object.values(this.technicians).forEach(technician => {
            let id = technician.idTechnician;
            let name = technician.name;
            let assignedTo = technician.isAssignedTo;
            let conmutableWith = technician.canConmutateWith;
            response[id] = {};
            response[id]['name'] = name;
            response[id]['assignedTo'] = assignedTo;
            response[id]['conmutableWith'] = conmutableWith;
        });
        return response;
    }

    addTechnician(idTechnician, name, modules){
        let technician = new Technician(idTechnician, name, modules);
        this.technicians[idTechnician] = technician;
        modules.forEach(element => {this.techniciansModules.add(element);
                                    });
    }

    hasCommonModules(modules){
        let res = false;
        modules.forEach(element => {
            if(this.techniciansModules.has(element)) res = true; return null;
        });
        return res;
    }

    filterModules(modules){
        return modules.filter(mod => this.techniciansModules.has(mod));
    }

    removeModule(numberOfModule){
        Object.values(this.technicians).forEach(technician => {
            technician.removeModule(numberOfModule);
        });
    }

    updateAvailableTechnicians(){
        let toRemove = Array();
        Object.values(this.technicians).forEach(technician => {
            if(technician.isAssigned){ toRemove.push(technician.idTechnician); }
        });
        toRemove.forEach(element => {
            delete this.technicians[element];
        });
    }

    hasAvailableTechnicians(){
        let result = false
        Object.values(this.technicians).forEach(technician => {
            if(technician.isAvailable){ result = true; return undefined; }
        });
    return result;
    }
}

