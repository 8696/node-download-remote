const Download = require('../main');
const path = require('path');

/*

let res = Download.download({
    url: 'https://www.baidu.com',
    dir: path.resolve(__dirname + '/uploads11'),
    fileName: 'asdsad.html',
    autoSuffix: true
});
res.then(res => {
    console.log(res);
});
*/


let download = new Download();

download.setConfig({
    dir: path.resolve(__dirname + '/uploads'),
    meanwhile: 1,
});

let list = [
    // 'http://v.51vimeo.com/data/attachment/video/1809/27/5bac3f15a4397.mp4',
    // 'https://www.baidu.com',
    // 'http://v.51vimeo.com/data/attachment/video/1809/27/5bac3f15a4397.mp4',
    // 'http://v.51vimeo.com/data/attachment/video/1809/27/5bac3f15a4397.mp4',
    // 'https://www.google.com',
    // 'https://www.baidu.com',
    {
        url: 'https://www.baidu.com',
        // dir: path.resolve(__dirname + '/uploads4'),
        fileName: 'uploads.html',
        autoSuffix: false
    },
    'http://a.hiphotos.baidu.com/image/pic/item/728da9773912b31b38b68ca38b18367adbb4e166.jpg',
];


download.push({
    url: 'https://www.baidu.com',
    dir: path.resolve(__dirname + '/uploads4'),
    fileName: 'uploads.html',
    autoSuffix: true
});

let aaa = download.exec();

aaa.then(res => {
    console.log(res.length);
    console.log(res);
});


