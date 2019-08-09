'use strict';
const handle = require('./modules/functions/handle')
const receiveData = handle.receiveData;
const createOrganizer = handle.createOrganizer;

function getSchedule(technicians, bosses, restrictions){
    receiveData(technicians, bosses, restrictions);
    let organizer = createOrganizer(bosses, technicians);
    if(organizer.checkFeasibleAssignation()){
        organizer.optimize();
        return organizer.getResult();   
    }
    console.log('Technicians and bosses doesn`t have common modules');
    return null;
}

exports.getSchedule = getSchedule;