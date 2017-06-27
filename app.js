'use strict';

const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const service = require('./service/webAppService');
const koa_static = require('koa-static-server');
const views = require('co-views');
const render = views('./view', {
  map: {html: 'ejs'}
});

app.use(koa_static({
  rootDir: './static/',
  rootPath: '/static/',
  maxage: 0
}));

router.get('/router_test', async (ctx) => {
  ctx.body = "Try to reach Koa-router";
});
router.get('/ejs_test', async (ctx) => {
  ctx.body = await render('test', {title: 'Hello_ejs'});
});
router.get('/data_test', async (ctx) => {
  ctx.body = await service.getTestData();
});
app.use(router.routes());

app.listen(3001);
console.log('Koa Server is running!');

