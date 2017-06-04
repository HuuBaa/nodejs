var fs = require('fs')

fs.readFile('huaji.jpg', function(error, origin_buffer) {
    console.log(Buffer.isBuffer(origin_buffer));
    fs.writeFile('huji_buffer.jpg', origin_buffer, function(err) {
        if (err) console.log(err)
    })
   
    var base64Image = origin_buffer.toString('base64');
    console.log(base64Image);
    var decodedImage = new Buffer(base64Image, 'base64');
    console.log(Buffer.compare(origin_buffer, decodedImage))
    fs.writeFile('huaji_decoded.jpg', decodedImage, (err) => {
        if (err) console.log(err)
    })
})
