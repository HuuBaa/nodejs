const crypto=require('crypto');

const hash=crypto.createHash('md5');
hash.update('h')
hash.update('uu')
console.log(hash.digest('hex'))

