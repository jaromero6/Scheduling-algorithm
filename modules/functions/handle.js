'use strict';
import {Organizer} from '../classes/organizer.js';


export async function createOrganizer(bosses, technicians){
    let organizer = new Organizer();
    bosses.forEach(boss => {
        let idBoss = boss.id;
        let name = boss.name;
        let modules = boss.modules;
        let capacity = boss.capacity;
        organizer.addBoss(idBoss, name, modules, capacity);
    });
    technicians.forEach(technician => {
        let idTehnician = technician.id;
        let name = technician.name;
        let modules = technician.modules;
        organizer.addTechnician(idTehnician, name, modules);
    });
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
    restrictions.forEach(i => {
        entities.forEach(j => {
            if(i.id === j.id){j.modules = [i.module];};
        });
    });
}

function changeModules(entities, restrictions){
    restrictions.forEach(i => {
        entities.forEach(j => {
            if(i.id === j.id){j.modules = i.modules;};
        });
    });
}