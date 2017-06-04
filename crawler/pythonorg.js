var https = require('https')
var cheerio = require('cheerio')
var url = 'https://www.python.org/events/python-events/'
var EventsList = []

function Htmlparser(html) {
    var $ = cheerio.load(html);
    var Events = $('.list-recent-events li');
    Events.each(function(index, ele) {
        name = $(ele).find('.event-title a').text()
        time = $(ele).find('time').text()
        location = $(ele).find('.event-location').text()
        var Event = {
            name: name,
            time:time,
            location:location
        }
        EventsList.push(Event)
    })
   printData(EventsList)
}
function printData(EventsList){
    EventsList.forEach(function(item,index,array){
        console.log('会议名称：'+item.name)
        console.log('会议时间：'+item.time)
        console.log('会议地点：'+item.location+'\n')
    })
}   

https.get(url, (respon) => {
    var html = '';
    respon.on('data', (data) => {
        html += data;
    })
    respon.on('end', () => {
        Htmlparser(html)
    })
}).on('error', (err) => {
    console.log(err)
})
