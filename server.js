'use strict';
const main = require('./main');
let c = require('./testCases').case;

function wrapperFunction(object, response){
    response.end(`Optimal Value : ${object.optimalValue}\n`)
    response.end('Technicians\n');
    object.technicians.forEach(technician => {
        response.end(`Id: ${technician.id}, name: ${technician.name},
        assignedTo: ${technician.assignedTo}, conmutableWith: ${technician.conmutableWith}\n`
        );
    });
    response.end('Bosses \n')
    object.bosses.forEach(boss => {
        response.end(`Id: ${boss.id}, name: ${boss.name},
        assignedTo: ${technician.assignedModules}, conmutableWith: ${boss.conmutableWith}\n`
        );
    });
    response.end('Modules \n')
    object.modules.forEach(mod => {
        response.end(`moduleNumber: ${mod.number},
    assignedTechnicians: ${mod.assignedTechnicians}, conmutableWith: ${mod.conmutableWith}\n`
    );
    });
}

const http = require('http');
let server = http.createServer((function(request, response){
    const resp = main.getSchedule(c.technicians, c.bosses, c.restrictions);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    wrapperFunction(resp, response);
}));
server.listen(8888);