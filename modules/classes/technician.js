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
    
    numberOfAssignedTechnicians(){
        let counter = 0;
        for(let x in this.technicians){
            if(this.technicians.hasOwnProperty(x)){
                if(this.technicians[x].isAssigned) counter++;
            }
        }
        return counter;
    }

    getThechniciansInformation(){
        let response = {};
        for(let x in this.technicians){
            if(this.technicians.hasOwnProperty(x)){
                let technician = this.technicians[x];
                let id = technician.idTechnician;
                let name = technician.name;
                let assignedTo = technician.isAssignedTo;
                let conmutableWith = technician.canConmutateWith;
                response[id] = {};
                response[id]['name'] = name;
                response[id]['assignedTo'] = assignedTo;
                response[id]['conmutableWith'] = conmutableWith;
            }
        }
        return response;
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

    updateAvailableTechnicians(){
        let toRemove = Array();
        for(let x in this.technicians){
            if(this.technicians[x].isAssigned){
                toRemove.push(x);
            }
        }
        for(let i = 0; i < toRemove.length; i){
            delete this.technicians[toRemove[i]];
        }
    }

    hasAvailableTechnicians(){
        for(let x in this.technicians){
            if(this.technicians.hasOwnProperty(x)){
                if(this.technicians[x].isAvailable()){
                    return true;
                }
            }
        }
    return false;
    }
}

