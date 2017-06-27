const fs = require('fs');
module.exports.getTestData = function () {
    let content = fs.readFileSync('./mock/test.json', 'UTF-8');
    return content
};
