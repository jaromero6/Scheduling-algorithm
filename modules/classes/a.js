"use strict";

import {numberOfModules} from './parameters';

class Module{
    constructor(number){
    this.number = number;
    this.technicians = new Set();
    this.boss = null;
    }

    get numberOfTechnicians(){
        return length(this.technicians);
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
        this.modules = Array()
        for(let i = 0;i < numberOfModules; i++){
            this.modules.push(new Module(i));
        }
        alert("Listo");
    }

    removeModule(number){

    }

    getModule(number){

    }
}
