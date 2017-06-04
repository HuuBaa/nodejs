const http = require('http');
const cheerio = require('cheerio');
const baseurl = 'http://www.imooc.com/learn/'
const ajaxurl = 'http://www.imooc.com/course/AjaxCourseMembers?ids='
    //需要爬取的课程id组成的数组
const coursesId = [75, 728, 637, 348, 259, 197, 134];

// 存放执行getPagesAsync()函数后返回的Promise对象 的数组
var cosrsesPromise = [];
coursesId.forEach((courseId) => {
    cosrsesPromise.push(getPagesAsync(courseId));
})

//all 参数是 Promise对象组成的数组
//pages是一个数组，各项由resolve() 括号中传输的数据组成
Promise
    .all(cosrsesPromise)
    .then((pages) => {
        let coursesData = [];

        pages.forEach((ajaxData) => {
            let courseData = filterChapters(ajaxData);
            coursesData.push(courseData);
        })

        coursesData.sort((a, b) => {
            return b.courseNum - a.courseNum
        })
        printCourseInfo(coursesData);

    })


//获取页面的的html,观看人数需要get请求获取
function getPagesAsync(courseId) {
    return new Promise((resolve, reject) => {
        let htmlUrl = baseurl + courseId;
        let ajaxUrl = ajaxurl + courseId;
        console.log('正在爬取' + htmlUrl)
        let courseAjax = {
            html: '',
            watchNum: 0
        }
        let numbers = new Promise((resolve, reject) => {
            http.get(ajaxUrl, (res) => {
                let JSONdata = '';
                res.on('data', (data) => {
                    JSONdata += data;
                })
                res.on('end', () => {
                    //JSON.parse()解析成js的对象
                    let watchNum = JSON.parse(JSONdata).data[0].numbers
                    courseAjax.watchNum = watchNum;
                    resolve(courseAjax);
                }).on('error', () => {
                    console.log('出错');
                })
            })
        })

        http.get(htmlUrl, (res) => {
            let html = '';

            res.on('data', (data) => {
                html += data;
            })
            res.on('end', () => {
                courseAjax.html = html;
                resolve(numbers);
            })
        }).on('error', (e) => {
            reject(e);
            console.log('出错');
        })
    })
}



function filterChapters(ajaxData) {
    let $ = cheerio.load(ajaxData.html);
    let chapters = $('.chapter');
    let courseTitle = $('.path span').text().trim();
    let courseNum = ajaxData.watchNum;

    //courseData的数据结构
    // {
    //     courseId: '',
    //     courseNum: '',
    //     chaptersData: [{
    //         chapterTitle: '',
    //         videos: [{
    //             title: '',
    //             id: '',
    //         }]
    //     }]
    // }

    let courseData = {
        courseTitle: courseTitle,
        courseNum: courseNum,
        chaptersData: []
    };

    chapters.each((index, ele) => {
        let chapter = $(ele);
        let chapterTitle = chapter.find('strong').contents().filter(function() {
            return this.nodeType === 3;
        }).text().trim()

        let videos = chapter.find('.video').children('li')
        let chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        }
        videos.each((index, ele) => {
            let video = $(ele).find('.J-media-item');
            let videoTitle = video.text().trim();
            let id = video.attr('href').split('video/')[1];

            chapterData.videos.push({
                title: videoTitle,
                id: id
            })
        })
        courseData.chaptersData.push(chapterData);
    })
    return courseData;
}

function printCourseInfo(coursesData) {
    coursesData.forEach((courseData) => {
        console.log(courseData.courseNum + '人学过' + courseData.courseTitle + '\n')
    })
    coursesData.forEach((courseData) => {
        console.log('###' + courseData.courseTitle + '\n');

        courseData.chaptersData.forEach((chapterData) => {
            let chapterTitle = chapterData.chapterTitle;
            console.log(chapterTitle.replace(/\s/g, '') + '\n');
            chapterData.videos.forEach((video) => {
                let str = '....【' + video.id + '】' + video.title;
                console.log(str.replace(/开始学习|\s/g, '') + '\n');
            })
        })

    })
}



