
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
            this.filterTechniciansModules(idTechnician);
        }
    }
    
    removeRedundantBosses(){
        for(let x in this.bossesOrg.bosses){
            if(this.bossesOrg.bosses.hasOwnProperty(x)){
                let bossModules = this.bossesOrg.bosses[x].modules;
                if(! this.techniciansOrg.hasCommonModules(bossModules)){
                    this.bossesOrg.unableBoss(x);
                }else{
                    this.filterBossesModules(x);

                }
            }
        }
    }

    filterBossesModules(bossId){
        let filterModules = this.techniciansOrg.filterModules(
                        this.bossesOrg.bosses[bossId].modules);
        this.bossesOrg.bosses[bossId].modules = new Set(filterModules);
    
    }

    filterTechniciansModules(technician){
            let filterModules = this.modulesOrg.filterModules(
                this.techniciansOrg.technicians[technician].modules);
            this.techniciansOrg.technicians[technician].modules = new Set(filterModules);
    }
}

