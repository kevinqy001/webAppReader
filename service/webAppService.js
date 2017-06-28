const fs = require('fs');
module.exports.getTestData = function () {
  return fs.readFileSync('./mock/test.json', 'UTF-8')
};
module.exports.getIndexData = function () {
  return fs.readFileSync('./mock/index.json', 'UTF-8')
};
module.exports.getSearchData = (content) => {
  return new Promise((resolve) => {
    const http = require('http');
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
