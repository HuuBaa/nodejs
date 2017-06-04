var Readable = require('stream').Readable;
var Writeable = require('stream').Writable;

var readStream = new Readable();
var writeStream = new Writeable();

readStream.push('1');
readStream.push('2'); 
readStream.push('3\n');
readStream.push(null);

writeStream._write = (chunk,encode,cb)=>{
    console.log(chunk.toString()+"1");
    cb();
}

readStream.pipe(writeStream);


//结果
// 11
// 21
// 3
// 1