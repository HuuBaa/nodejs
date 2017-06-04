var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/637';

function filterChapters(html) {
    var $ = cheerio.load(html);
    var chapters = $('.chapter');

    //courseData
    
    // [{
    //     chapterTitle: '',
    //     videos: [{
    //         title: '',
    //         id: ''
    //     },{}..]
    // },{}..]



    var courseData = [];
    chapters.each(function(item) {
        var chapter = $(this);
        var chapterTitle = chapter.find('strong').contents().filter(function() {
            return this.nodeType === 3;
        }).text().trim()

        var videos = chapter.find('.video').children('li')
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        }
        videos.each(function(item) {
            var video = $(this).find('.J-media-item');
            var videoTitle = video.text().trim();
            var id = video.attr('href').split('video/')[1];

            chapterData.videos.push({
                title: videoTitle,
                id: id
            })
        })
        courseData.push(chapterData);
    })
    return courseData;
}

function printCourseInfo(courseData) {
    courseData.forEach(function(item) {
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle.replace(/\s/g, '') + '\n')
        item.videos.forEach(function(video) {
            var str = '....[' + video.id + ']' + video.title;
            console.log(str.replace(/开始学习|\s/g, '')+'\n');
        })
    })
}


http.get(url, function(res) {
    var html = '';
    res.on('data', function(data) {
        html += data;
    })
    res.on('end', function() {
        var courseData = filterChapters(html);
        printCourseInfo(courseData);

    })
}).on('error', function() {
    console.log('出错');
})
