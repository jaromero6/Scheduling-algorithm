
'use strict';
export class Organizer{
    constructor(technicians, bosses, modules){
        this.technicians = technicians;
        this.bosses = bosses;
        this.modules = modules;
    }

    getBossesModules(){
        let modulesSet = new Set();
        for(let i = 0; i < this.bosses.length; i++){
            let currentModules = this.bosses[i].modules;
            for(let j = 0; j < currentModules.length; j++){
                modulesSet.add(currentModules[j])
            }
        }
        return modulesSet;
    }
}