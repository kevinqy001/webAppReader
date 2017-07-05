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

router.get('/ejs_test', async (ctx) => {
  await ctx.render('test', {
    title: 'Hello EJS',
  })
});
router.get('/', async (ctx) => {
  await ctx.render('home', {
    title: '书城首页',
  })
});
router.get('/book', async (ctx) => {
  let params = ctx.request.query;
  let bookId = params.id;
  await ctx.render('book', {
    bookId: bookId,
  })
});
router.get('/male', async (ctx) => {
   await ctx.render('male');
});
router.get('/female', async (ctx) => {
   await ctx.render('female');
});
router.get('/category', async (ctx) => {
   await ctx.render('category');
});
router.get('/rank', async (ctx) => {
   await ctx.render('rank');
});
router.get('/detail', async (ctx) => {
   await ctx.render('detail',{nav: '书籍列表'});
});
router.get('/reader', async (ctx) => {
   await ctx.render('reader');
});
router.get('/ajax/home', (ctx) => {
  ctx.body = service.getHomeData();
});
router.get('/ajax/rank', (ctx) => {
  ctx.body = service.getRankData();
});
router.get('/ajax/category', (ctx) => {
  ctx.body = service.getCategoryData();
});
router.get('/ajax/bookshelf', (ctx) => {
  ctx.body = service.getBookshelfData();
});
router.get('/ajax/female', (ctx) => {
  ctx.body = service.getFemaleData();
});
router.get('/ajax/male', (ctx) => {
  ctx.body = service.getMaleData();
});
router.get('/ajax/book', (ctx) => {
  let params = ctx.request.query;
  let id = params.id;
  if (!id) {
    id = '';
  }
  ctx.body = service.getBookData(id);
});

router.get('/ajax/chapter', (ctx) => {
  ctx.body = service.getChapterData();
});
router.get('/ajax/chapterData', (ctx) => {
  let params = ctx.request.query;
  let id = params.id;
  if (!id) {
    id = null;
  }
  ctx.body = service.getChapterContentData(id);
});
router.get('/ajax/search', async (ctx) => {
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

app.listen(kevinqy001.github.io:3002);
console.log('Koa Server is running at localhost:3002!');

