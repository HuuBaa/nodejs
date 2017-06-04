var querystring = require('querystring');
var contentData = {
    content: 'testing',
    mid: 8837
};
var postData = querystring.stringify(contentData);
console.log(postData);
