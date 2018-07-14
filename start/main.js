// 引入hello模块:
var { greet, g } = require('./hello');
var fs = require('fs');
var http = require('http');
var url = require('url');
var path=require('path');

cwd=path.join(path.resolve('.'),'index.html')
console.log(cwd)

// var server = http.createServer((req, res) => {
//   console.log(req.method + ':' + req.url)
//   res.writeHead(200, { 'Content-Type': 'text/html' })
//   res.end('<h1>Hello world!</h1>')
// }).listen('8080')


// console.log(new Buffer("我曹"))

// rs=fs.createReadStream('a.txt','utf-8')
// rs.on('data',(chunk)=>{
//   console.log('ondata')
//   console.log(chunk)
// })

// ws=fs.createWriteStream('out.txt','utf-8')
// ws.write('huu is cool')
// ws.write(new Buffer('我擦'))
// ws.end()

// ws1=fs.createWriteStream('out.txt','utf-8')
// rs1=fs.createReadStream('a.txt','utf-8')
// rs1.pipe(ws1)

// fs.readFile('a.txt','utf-8',(err,data)=>{
//   if(err){
//     console.log(err);
//   }else{
//     console.log(Buffer.from(data,'utf-8'));
//   }
// })

// fs.stat('a.txt',(err,stat)=>{
//   if(err){
//     console.log(err)
//   }else{
//     console.log(stat.isFile(),stat.isDirectory())
//     console.log(stat.size,stat.birthtime,stat.mtime)
//   }
// })



// if (typeof (window) === 'undefined') {
//   console.log('node.js');
// } else {
//   console.log('browser');
// }
// var s = 'Huu';
// console.log(greet)
// greet('huu');
// g('huu');

