# scheduling_algoritm

## Recepción de objetos

La función getSchedule recibe tres parámetros, técnicos, jefes y restricciones:

* Técnicos: Un array de objetos, donde cada elemento debe tener los atributos name (un string), modules (un array de ints que van desde el 0 al 29) que indica que modulos tiene disponible y id, que es un identificador único

* Jefes: Un array de objetos, donde cada elemento debe tener los atributos name (un string), modules (un array de ints que van desde el 0 al 29) que indica que modulos tiene dispoble y capacity que indica cuantos módulos máximo a la semana tiene disponible y un id que es un identificador único.

* Restricciones: Un objeto que tiene los atributos: technicians_modules (un array donde viene id del técnico, número del módulo al que se debe unir de manera obligatoria), bosses_modules (un array con id de jefe y el módulo al que se debe unir de manera obligatoria), technician_new_modules, un array de objetos donde cada elemento tiene los atributos id (del técnico) y modules, unb array con los nuevos módulos de cada técnico, bosses_new_modules funciona de la misma manera pero con el id de los técnicos. Finalemnte el objeto puede tener o no el atributo capacity, un int que modifica la cantidad de los módulos, por default este número es 10.

## Ejemplo

Deberían verse de la siguiente forma:
'''
tecnicos = [{id:5, name:"un nombre", modules:[4,3,5]},...]
jefes = [{id:5, name:"un nombre", modules:[4,3,5], capacity = 2},...]
restriccions = {technician_modules: [ [3,2], [2,4], ... ]
                bosses_modules: [ [1,2], ....], 
                new_technician_modules: [ {id:2,modules:[1,2,3,4]},... ]
                new_bosses_modules: [{id:1,. modules:[1,2,3]}...],
                capacity: 12}
'''
