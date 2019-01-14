const Download = require('../main');


let download = new Download();


download.setConfig({
    localDir: __dirname + '/uploads'
});

let list = [
    'https://www.baidu.com',
    'https://www.baidu.com',
    'https://www.google.com',
    'https://www.baidu.com',
    'https://www.baidu.com',
    'http://www.longjinwen.com/asd'

];
list.forEach(item => {
    download.push({
        url: item,
    });
});

try {
    let res = download.exec();

    res.then(res => {
        console.log(res);
    }).catch(err => {
        console.error(err);
    });

} catch (e) {

}








