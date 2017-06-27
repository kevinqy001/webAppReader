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
router.get('/ajax/index', async (ctx) => {
  ctx.body = await service.getIndexData();
});
router.get('/ajax/search', async (ctx, next) => {
  const qs = require('querystring');
  let params = qs.parse(ctx.req._parsedUrl.query);
  let start = params.start;
  let end = params.end;
  let keyword = params.keyword;
  ctx.body = await service.getSearchData(start, end, keyword);
});







app.use(router.routes());

app.listen(3001);
console.log('Koa Server is running!');

