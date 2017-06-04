var http = require('http');
var querystring = require('querystring');

var contentData = {
    content: '原谅小白的测试',
    mid: 8837
};
var postData = querystring.stringify(contentData);

var options = {
    hostname: 'www.imooc.com',
    port: 80,
    path: '/course/docomment',
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Length': postData.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'imooc_uuid=71a1daff-a2f3-4103-8948-41964ec40b17; imooc_isnew_ct=1492573584; PHPSESSID=so3bk9ib57ljmmt8bqk89glsg5; loginstate=1; apsid=RiYTlkODE3Mzc2NzViMmM2YzBkODFiZmNiYzJiMjkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzYzODAyNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3NDI3OTA5MDVAcXEuY29tAAAAAAAAAAAAAAAAAAAAADg3OGUyNzY1ZDhiYTFjMWFmOTEyZWI4ZGM5MjYyZmY3mG%2F4WJhv%2BFg%3DYz; last_login_username=742790905%40qq.com; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1492573585,1492676490; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1492676504; imooc_isnew=2; cvde=58f86f89f0789-10',
        'Host': 'www.imooc.com',
        'Origin': 'http://www.imooc.com',
        'Pragma': 'no-cache',
        'Referer': 'http://www.imooc.com/video/8837/0',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }
}

var req = http.request(options, function(res) {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers))
    res.on('data', function(chunk) {
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
    })
    res.on('end', function() {
        console.log('评论完成');
    })
})
req.on('error', function(e) {
    console.log('Error' + e.message);
})
req.write(postData);
req.end();
