var http = require('http');
var fs = require('fs');
var request =require('request');

http
    .createServer((req, res) => {
        // fs.readFile('CSS揭秘.pdf', (err, data) => {
        //     if (err) {
        //         res.end(`error${err}`);
        //     } else {
        //         res.writeHeader(200, { 'Context-Type': 'text/html' })
        //         res.end(data);
        //     }
        // })

         fs.createReadStream('CSS揭秘.pdf').pipe(res);

        // request('https://static.segmentfault.com/v-59192c02/global/img/logo-b.svg').pipe(res)
    })
    .listen(8080)
