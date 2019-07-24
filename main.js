'use-strict';
import {receiveData} from './modules/functions/handle.js';
import {createOrganizer} from './modules/functions/handle.js';


async function getSchedule(technicians, bosses, restrictions){
    receiveData(technicians, bosses, restrictions);
    let organizer = createOrganizer(technicians, bosses);
    organizer.optimize();
    return organizer.getResult();

}