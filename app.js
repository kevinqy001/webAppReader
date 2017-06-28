'use strict';

const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const service = require('./service/webAppService');
const koa_static = require('koa-static-server');
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
const views = require('koa-views');
const path = require('path');
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}));

app.use(koa_static({
  rootDir: './static/',
  rootPath: '/static/',
  maxage: 0
}));

router.get('/router_test', async (ctx) => {
  ctx.body = "Try to reach Koa-router";
});
router.get('/ejs_test', async (ctx) => {
  await ctx.render('test', {
    title: 'Hello EJS',
  })
});
router.get('/data_test', async (ctx) => {
  ctx.body = await service.getTestData();
});
router.get('/ajax/index', async (ctx) => {
  ctx.body = await service.getIndexData();
});
router.get('/ajax/search', async (ctx) => {
  const qs = require('querystring');
  let params = ctx.request.query;
  let start = params.start;
  let end = params.end;
  let keyword = params.keyword;
  let data = {
    start,
    end,
    s: keyword
  };
  let content = qs.stringify(data);
  ctx.body = await service.getSearchData(content);

});


app.use(router.routes());

app.listen(3002);
console.log('Koa Server is running at localhost:3002!');

