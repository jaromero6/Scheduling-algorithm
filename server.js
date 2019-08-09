'use strict';
const main = require('./main');
let c = require('./testCases').case;

function wrapperFunction(object){
    let text = "";
    text += `Optimal Value : ${object.optimalValue}\nTechnicians\n`;
    object.technicians.forEach(technician => {
        text+= `Id: ${technician.id}, name: ${technician.name},
        assignedTo: ${technician.assignedTo}, conmutableWith: ${technician.conmutableWith}\n`;
    });
    text += 'Bosses \n';
    object.bosses.forEach(boss => {
        text += `Id: ${boss.id}, name: ${boss.name},
        assignedModules: ${boss.assignedModules}, conmutableWith: ${boss.conmutableWith}\n`;
    });
    text += 'Modules \n';
    object.modules.forEach(mod => {
        text += `moduleNumber: ${mod.number},
    assignedTechnicians: ${mod.assignedTechnicians}, conmutableWith: ${mod.conmutableWith}\n`;
    });
    return text;
}

const http = require('http');
let server = http.createServer((function(request, response){
    const resp = main.getSchedule(c.technicians, c.bosses, c.restrictions);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(wrapperFunction(resp));
}));
server.listen(8888);