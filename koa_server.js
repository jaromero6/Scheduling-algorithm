'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-json-body')({ limit: '10kb' });
const optimizer = require('./modules/functions/getModel');
let app = new Koa();
let router = new Router();


router.post('/getModel', body, (ctx, next) => {
    let model = ctx.request.body;
    ctx.body = optimizer.getSchedule(model.technicians,
                                model.bosses, 
                                model.restrictions);

  });
app.use(router.routes());
app.listen(3000);