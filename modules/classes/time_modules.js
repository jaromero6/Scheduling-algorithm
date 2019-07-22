"use strict";

import {numberOfModules} from './parameters.js';

class TimeModule{
    constructor(number){
    this.number = number;
    this.technicians = new Set();
    this.boss = null;
    }

    get numberOfTechnicians(){
        return this.technicians.length;
    }
   
    addTechnician(technician){

    }

    removeTechnician(technician){

    }

    addBoss(boss){

    }

    removeBoss(boss){

    }

    
}

export class Schedule{
    constructor(){
        this.modules = new Set();
    }

    hasCommonModules(modules){
        for(let i = 0; i < modules.length; i++){
            if(this.modules.has(modules[i])){
                return true;
            }
        }
        return false;
    }

    addModule(numberModule){
        this.modules.add(numberModule)
    }

    filterModules(modules){
        return modules.filter(mod => this.modules.has(mod))
    }

    removeModule(number){

    }

    getModule(number){

    }


}
