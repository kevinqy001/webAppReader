const fs = require('fs');
module.exports.getTestData = function () {
  return fs.readFileSync('./mock/test.json', 'UTF-8')
};
module.exports.getIndexData = function () {
  return fs.readFileSync('./mock/index.json', 'UTF-8')
};
module.exports.getSearchData = (start, end, keyword) => {
  return (callback) => {
    const http = require('http');
    const qs = require('querystring');
    let data = {
      start,
      end,
      s: keyword,
    };
    console.log(data);
    let content = qs.stringify(data);
    let http_request = {
      hostname: 'dushu.xiaomi.com',
      port: 80,
      path: '/store/v0/lib/query/onebox?' + content
    };
    const req_obj = http.request(http_request, (_res) => {
      let content = '';
      _res.setEncoding('utf8');
      _res.on('data', (chunk) => {
          content += chunk;
      });
      _res.on('end', () => {
        callback(null, content)
      })
    });
    req_obj.on('error', () => {

    });
    req_obj.end();
  }
};
