'use strict';

const Koa = require('koa');
const Router = require('koa-router');

let app = new Koa();
let router = new Router();



router.get('/hello', (ctx, next) => {
    ctx.body = 'Hello world';
});

app.use(router.routes());
app.listen(3000);