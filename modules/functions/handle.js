'use strict';
import {Organizer} from '../classes/organizer.js';


export async function createOrganizer(bosses, technicians){
    let organizer = new Organizer();
    for(let i = 0; i < bosses.length; i++){
        let idBoss = bosses[i]['idBoss'];
        let name = bosses[i]['name'];
        let modules = bosses[i]['modules'];
        let capacity = bosses[i]['capacity'];
        organizer.addBoss(idBoss, name, modules, capacity);
    }
    for(let i = 0; i < technicians.length;i++){
        let idTehnician =technicians[i]['idTechnician'];
        let name = technicians[i]['name'];
        let modules = technicians[i]['modules'];
        organizer.addTechnician(idTehnician, name, modules);
    }
    organizer.removeRedundantBosses();
    organizer.updateModules();
    return organizer;
}

export async function assignTehnicians(organizer){
    
}