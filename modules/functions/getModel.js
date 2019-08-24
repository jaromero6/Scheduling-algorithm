'use strict';
const handle = require('./handle')
const receiveData = handle.receiveData;
const createOrganizer = handle.createOrganizer;

async function getSchedule(technicians, bosses, restrictions){
    receiveData(technicians, bosses, restrictions);
    const min = restrictions.min_technicians_per_module;
    let organizer = createOrganizer(bosses, technicians, min);
    if(organizer.checkFeasibleAssignation()){
        organizer.optimize();
        return organizer.getResult();   
    }
    return {};
}

exports.getSchedule = getSchedule;