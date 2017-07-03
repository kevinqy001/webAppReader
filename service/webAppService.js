const fs = require('fs');
const http = require('http');
module.exports.getTestData = function () {
  return fs.readFileSync('./mock/test.json', 'UTF-8')
};
module.exports.getChapterData = function () {
  return fs.readFileSync('./mock/reader/chapter.json', 'UTF-8')
};
module.exports.getHomeData = function () {
  return fs.readFileSync('./mock/home.json', 'UTF-8')
};
module.exports.getRankData = function () {
  return fs.readFileSync('./mock/rank.json', 'UTF-8')
};
module.exports.getCategoryData = function () {
  return fs.readFileSync('./mock/category.json', 'UTF-8')
};
module.exports.getBookshelfData = function () {
  return fs.readFileSync('./mock/bookshelf.json', 'UTF-8')
};
module.exports.getFemaleData = function () {
  return fs.readFileSync('./mock/channel/female.json', 'UTF-8')
};
module.exports.getMaleData = function () {
  return fs.readFileSync('./mock/channel/male.json', 'UTF-8')
};
module.exports.getBookData = function (id) {
  if (!id) {
    id = '323725'
  }
  return fs.readFileSync('./mock/book/'+ id +'.json', 'UTF-8')
};
module.exports.getChapterContentData = function (id) {
  if (!id) {
    id = 1
  }
  return fs.readFileSync('./mock/reader/data/data'+ id +'.json', 'UTF-8')
};
module.exports.getSearchData = (content) => {
  return new Promise((resolve) => {
    let http_request = {
      hostname: 'dushu.xiaomi.com',
      port: 80,
      path: '/store/v0/lib/query/onebox?' + content
    };
    const req_obj = http.request(http_request, (res) => {
      let content = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        content += chunk;
      });
      res.on('end', () => {
        resolve(content)
      })
    });
    req_obj.on('error', () => {

    });
    req_obj.end();
   });

};
