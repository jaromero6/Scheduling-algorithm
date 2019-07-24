'use strict';
import {Organizer} from '../classes/organizer.js';


export async function createOrganizer(bosses, technicians){
    let organizer = new Organizer();
    for(let i = 0; i < bosses.length; i++){
        let idBoss = bosses[i].id;
        let name = bosses[i].name;
        let modules = bosses[i].modules;
        let capacity = bosses[i].capacity;
        organizer.addBoss(idBoss, name, modules, capacity);
    }
    for(let i = 0; i < technicians.length;i++){
        let idTehnician =technicians[i]['id'];
        let name = technicians[i]['name'];
        let modules = technicians[i]['modules'];
        organizer.addTechnician(idTehnician, name, modules);
    }
    organizer.removeRedundantBosses();
    organizer.updateModules();
    return organizer;
}

export function receiveData(technicians, bosses, restrictions){
    changeModules(technicians, restrictions["technician_new_modules"]);
    changeModules(bosses, restrictions["bosses_new_modules"]);
    addDefaultModules(technicians, restrictions["technicians_modules"]);
    addDefaultModules(bosses, restrictions["bosses_modules"]);
}

function addDefaultModules(entities, restrictions){
    for(let i = 0; i < restrictions.length; i++){
        idEntity = restrictions[i]["id"];
        let defaultModule = Array(restrictions[i]["module"]);
        for(let j = 0; j < entities.length; j++){
            if(entities[j]["id"] === idEntity){
                entities[j]["modules"] = defaultModule;
            }
        }
    }
}

function changeModules(entities, restrictions){
    for(let i = 0; i < restrictions.length; i++){
        idEntity = restrictions[i]["id"];
        modules = restrictions[i]["modules"];
        for(let j = 0; j < entities.length; j++){
            if(entities[j]["id"] === idEntity){
                entities[j]["modules"] = modules;
            }
        }
    }
}