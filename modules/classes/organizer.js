
'use strict';

import {Schedule} from './time_modules.js';
import {BossOrganizer} from './boss.js';
import {TechnicianOrganizer} from './technician.js';

export class Organizer{
    constructor(){
        this.techniciansOrg = new TechnicianOrganizer();
        this.bossesOrg = new BossOrganizer();
        this.modulesOrg = new Schedule();
    }

    addBoss(idBoss, name, modules, capacity){
        this.bossesOrg.addBoss(idBoss, name, modules, capacity);
        for(let i = 0; i < modules.length; i++){
            this.modulesOrg.addModule(modules[i]);
        }
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
