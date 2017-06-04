var EventEmitter = require('events').EventEmitter;

var life = new EventEmitter;

life.setMaxListeners(11);
life.on('求安慰',function(who){
    console.log('给'+who+'倒水');
})
life.on('求安慰',function(who){
    console.log('给'+who+'洗衣');
})
life.on('求安慰',function(who){
    console.log('给'+who+'做饭');
})
life.on('求安慰',function(who){
    console.log('给'+who+'按摩');
})
life.emit('求安慰','汉子');

console.log(life.listenerCount('求安慰'));
console.log(life.listeners('求安慰'));