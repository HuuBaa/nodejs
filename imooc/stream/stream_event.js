var fs= require('fs');
var readStream = fs.createReadStream('CSS揭秘.pdf');
var n=0;
readStream
    .on('data',(chunk)=>{
        n++;
        console.log('data emits');
        console.log(Buffer.isBuffer(chunk));
        // console.log(chunk.toString());
        readStream.pause();
        console.log('readStream pause');
        setTimeout(()=>{
            console.log('readStream pause end');
            readStream.resume();
        },100)
    })
    .on('readable',()=>{
        console.log('data readable');
    })
    .on('end',()=>{
        console.log('data end');
        console.log(n)
    })
    .on('close',()=>{
        console.log('stream close')
    })
    .on('error',(e)=>{
        console.log(`error:${e}`)
    })