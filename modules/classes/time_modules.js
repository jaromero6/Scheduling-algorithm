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
        for(let i = 0; i < numberModules.length; i++){
            if(this.modules.has(numberModules[i])){
                return true;
            }
        }
        return false;
    }

    addModule(numberModule){
        this.modules.add(numberModule)
    }

    removeModule(number){

    }

    getModule(number){

    }


}
