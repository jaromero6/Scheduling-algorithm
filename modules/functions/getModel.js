'use strict';
const handle = require('./handle')
const receiveData = handle.receiveData;
const createOrganizer = handle.createOrganizer;

function getSchedule(technicians, bosses, restrictions){
    receiveData(technicians, bosses, restrictions);
    let organizer = createOrganizer(bosses, technicians);
    if(organizer.checkFeasibleAssignation()){
        organizer.optimize();
        return organizer.getResult();   
    }
    return {};
}

exports.getSchedule = getSchedule;