var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');
var url = 'http://blog.csdn.net/qq_35037977';
var articlesData = [];

function articlesList(html) {
    var $ = cheerio.load(html);
    var str = '';
    var articles = $('.article_item');
    articles.each(function(index, ele) {
        var title = $(ele).find('.link_title').text().trim();
        var link = $(ele).find('.link_title').find('a').attr('href');
        var description = $(ele).find('.article_description').text();
        var postime = $(ele).find('.link_postdate').text();
        var viewtimes = $(ele).find('.link_view').text();
        var comment = $(ele).find('.link_comments').text();
        var article = {
            title: title,
            link: link,
            description: description,
            postime: postime,
            viewtimes: viewtimes,
            comment: comment
        }
        articlesData.push(article);
    })
    articlesData.forEach(function(item, index, array) {
        var info = '标题:  ' + item.title + '\n' +
            '   链接:' + 'http://blog.csdn.net/' + item.link + '\n' +
            '   发布时间' + item.postime + '\n' +
            '   浏览次数:' + item.viewtimes + '\n' +
            '   评论次数:' + item.comment + '\n' +
            '   描述:' + item.description + '\n' + '\n' + '\n';
        str += info;
    })


    fs.writeFile('data.txt', str, 'utf8', function() {
        console.log('complete!');
    })
}

http.get(url, function(respon) {
    var html = '';

    respon.on('data', function(data) {
        html += data;
    })
    respon.on('end', function() {
        articlesList(html);
    })
}).on('error', function() {
    console.log('error,sorry!')
})
