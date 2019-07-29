# scheduling_algoritm

## Input Object

### Atributes

* technicians:  Array of objects. Each element has the atributes id, name, modules (An array with the available modules of the technician).

* bosses: Array of objects. Each element has the atributes id, name, modules (An Array of the available modules of the boss), capacity (Max of modules that a boss can be assigned).

* restrictions: An object, it has the following atributes: technicians_modules => An array of objects, each element has an id (of a technician) and modules (an array with the new modules of the technician). bosses_modules => An array of objects, each element has the id od the boss and the new modules of the boss. technician_new_modules => An array of objects, with the id of the technician and the module that should be assigned. bosses_new_modules => An array of objects, each element has an id and the module of the boss should be assigned.

## Example of input

'''
inputObject = {technicians :[{id:5, name:"un nombre", modules:[4,3,5]},...],
               bosses : [{id:5, name:"un nombre", modules:[4,3,5], capacity = 2},...],
               restrictions : {technician_modules: [ [3,2], [2,4], ... ]
                bosses_modules: [ [1,2], ....],
                new_technician_modules: [ {id:2,modules:[1,2,3,4]},... ]
                new_bosses_modules: [{id:1,. modules:[1,2,3]}...],
                capacity: 12}}
'''

## Output

* technicians: Object. Each element has an id, an each value per id has , name, assignedTo (id of the module that is assigned, null if is not assigned and conmutableWith (arrays of id of technician that can conmute). Infeasible technicians are omited.
* bosses: Object. Each element has an id, an each value per id has the atributes: id, name, assignedModules (array with the id of the modules that is assigned), conmutableWith, an array of objects with the id of the boss and module that can conmute.
* modules: Object. Each element has an id, an each value per id has the atributes assignedTechnicians (Array of id of the assigned technicians id), boss and conmutableWith (array of objects that can be conmutes with the modules).

## Important

* Technicians that can not be assigned, are omited.
