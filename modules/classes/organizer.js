
'use strict';

import {Schedule} from './time_modules.js';
import {BossOrganizer} from './boss.js';
import {TechnicianOrganizer} from './technician.js';

export class Organizer{
    constructor(technicians, bosses){
        this.technicians = new TechnicianOrganizer();
        this.bosses = new BossOrganizer;
        this.modules = new Schedule();
    }

    addBoss(idBoss, name, modules){
        this.bosses.addBoss(idBoss, name, modules);
        modules.forEach(this.modules.addModule);
    }

    addTechnician(idTechnician, name, modules){
        if(this.modules.hasCommonModules(modules)){
            this.technicians.addTechnician(idTechnician, name, modules);
        }
        
    }
}