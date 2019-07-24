'use strict';
import {receiveData} from './modules/functions/handle.js';
import {createOrganizer} from './modules/functions/handle.js';


export async function getSchedule(technicians, bosses, restrictions){
    receiveData(technicians, bosses, restrictions);
    let organizer = await createOrganizer(bosses, technicians);
    organizer.optimize();
    return organizer.getResult();
}