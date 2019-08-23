'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-json-body')({ limit: '10kb' });
const main = require('./main');
let app = new Koa();
let router = new Router();


router.post('/getModel', body, (ctx, next) => {
    let model = ctx.request.body;
    ctx.body = main.getSchedule(model.technicians,
                                model.bosses, 
                                model.restrictions);

  });
app.use(router.routes());
app.listen(3000);