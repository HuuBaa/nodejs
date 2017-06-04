var fs =require('fs');
var readStream = fs.createReadStream('CSS揭秘.pdf');
var writeSteam = fs.createWriteStream('CSS揭秘_copy.pdf');


// readStream
//     .on('data',(chunk)=>{
//         if( writeSteam.write(chunk)===false){
//         console.log('still cached')
//         readStream.pause(); 
//         }                 
//     })

//     .on('end',()=>{
//         writeSteam.end();
//     })


// writeSteam.on('drain',()=>{
//     console.log('data drain')
//     readStream.resume();
// })

readStream.pipe(writeSteam);