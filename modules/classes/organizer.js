
'use strict';

import {Schedule} from './time_modules.js';
import {BossOrganizer} from './boss.js';
import {TechnicianOrganizer} from './technician.js';

export class Organizer{
    constructor(technicians, bosses){
        this.techniciansOrg = new TechnicianOrganizer();
        this.bossesOrg = new BossOrganizer();
        this.modulesOrg = new Schedule();
    }

    addBoss(idBoss, name, modules){
        this.bossesOrg.addBoss(idBoss, name, modules);
        modules.forEach(this.modulesOrg.addModule);
    }

    addTechnician(idTechnician, name, modules){
        if(this.modulesOrg.hasCommonModules(modules)){
            this.techniciansOrg.addTechnician(idTechnician, name, modules);
        }
    }

    removeRedundantBosses(){
        for(let x = 0; x < this.techniciansOrg.bosses.length;x++){
            if(! this.techniciansOrg.hasCommonModules(this.bossesOrg.bosses[x])){
                this.bossesOrg.unableBoss(x);
            }
        }
    }

    }
}