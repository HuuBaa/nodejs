var fs = require('fs')
var source = fs.readFileSync('../buffer/huaji.jpg');

fs.writeFileSync('huaji_stream.jpg',source);

//不是流？