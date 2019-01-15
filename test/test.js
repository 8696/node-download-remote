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
    dir: path.resolve(__dirname + '/uploads/uploads10'),
    meanwhile: 2,
});

let list = [
    'https://www.baidu.com',
    'https://www.google.com',
    'https://www.baidu.com',
    'https://www.baidu.com',
    'https://www.baidu.com',
    'https://www.google.com',
    'https://www.baidu.com',
    'https://www.baidu.com',
    'https://www.baidu.com',
    {
        url: 'https://www.baidu.com',
        // dir: path.resolve(__dirname + '/uploads4'),
        fileName: 'uploads.html',
        autoSuffix: false
    },
    'http://a.hiphotos.baidu.com/image/pic/item/728da9773912b31b38b68ca38b18367adbb4e166.jpg',
];


download.push(list);

let aaa = download.exec();

aaa.then(res => {
    console.log(res.length);
    console.log(res);
}).catch(err=>{
    console.error(err)
});







// console.log(Download.makeDir(path.resolve(__dirname,'./uploads/a/b/c/d')))















