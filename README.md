# node-download-remote

#### 项目介绍

- 基于request模块实现远程文件下载

#### 安装

- (c)npm install node-download-remote -D


#### 使用
##### 
```javascript
const Download = require('node-download-remote');

// *** 001

let res = Download.download({
    url: 'https://www.baidu.com',
    dir: path.resolve(__dirname + '/uploads'),
});
res.then(res => {
    console.log(res);
    /*
    {
        status: 200,
        msg: 'success',
        resource: 'https://www.baidu.com',
        data:
        {
            filePath: 'D:\\1a\\github\\node-download-remote\\test\\uploads\\1beccd6c357c4487907d2e6bf1e06556.html',
            contentType: 'text/html'
        }
    }
    * */
});





// *** 002

let res2 = Download.download({
    url: 'https://www.baidu.com',
    dir: path.resolve(__dirname + '/uploads'),
    // 可选 default:'' || 保存文件名称，空则生成随机字符串
    fileName: 'baidu',
    // 可选 default:false || 自动设置文件名后缀。根据http响应content-type来保存文件后缀。手动设置fileName生效
    autoSuffix: true
});
res2.then(res => {
    console.log(res);
    /*
    {
        status: 200,
        msg: 'success',
        resource: 'https://www.baidu.com',
        data:
        {
            filePath: 'D:\\1a\\github\\node-download-remote\\test\\uploads\\baidu.html',
            contentType: 'text/html'
        }
    }
    * */
});





// *** 003

let download = new Download();
// 必须 || 实例配置，为一个实例设置一个配置
download.setConfig({
    dir: path.resolve(__dirname + '/uploads/uploads10'),
    // 可选 default:1 || 并行下载数
    meanwhile: 3,
});


download.push('https://www.baidu.com/img/bd_logo1.png');
download.push('https://www.sogo.com/web/index/images/logo_440x140.v.4.png');
download.push({
    url: 'https://www.baidu.com/img/bd_logo1.png',
    // 可选 default:实例配置 || 如未有提供此参数，默认使用配置实例配置
    dir: path.resolve(__dirname + '/uploads/images'),
    // 可选 || 同002
    fileName: 'baidu_logo_2',
    // 可选 || 同002
    autoSuffix: true
});

download.push([
    'https://www.sogo.com/',
    'https://www.baidu.com',
    {
        url: 'https://www.sogo.com/web/index/images/logo_440x140.v.4.png',
        // 可选 default:实例配置 || 如未有提供此参数，默认使用配置实例配置
        dir: path.resolve(__dirname + '/uploads/images'),
        // 可选 || 同002
        fileName: 'sogou_logo',
        // 可选 || 同002
        autoSuffix: true
    }
]);

// 查看远程下载列表
// console.log(download.list)
// 启用下载
let res3 = download.exec();

res3.then(res => {
    console.log(res);

    // console.log(download.list);// []

});
    /*
    [
        { status: 200,
        msg: 'success',
        resource: 'https://www.baidu.com/img/bd_logo1.png',
        data:
        { filePath: 'D:\\1a\\github\\node-download-remote\\test\\uploads\\uploads10\\29d2f53a6946424782f25f33cf88968c.png',
        contentType: 'image/png' } },

        { status: 200,
        msg: 'success',
        resource: 'https://www.sogo.com/web/index/images/logo_440x140.v.4.png',
        data:
        { filePath: 'D:\\1a\\github\\node-download-remote\\test\\uploads\\uploads10\\3278542b0f22433ab3ba4f6e7e6871bc.png',
        contentType: 'image/png' } },

        { status: 200,
        msg: 'success',
        resource: 'https://www.baidu.com/img/bd_logo1.png',
        data:
        { filePath: 'D:\\1a\\github\\node-download-remote\\test\\uploads\\images\\baidu_logo_2.png',
        contentType: 'image/png' } },

        { status: 200,
        msg: 'success',
        resource: 'https://www.sogo.com/',
        data:
        { filePath: 'D:\\1a\\github\\node-download-remote\\test\\uploads\\uploads10\\7185f36634ed4cfabe2e57b10b43b94a.html',
        contentType: 'text/html; charset=UTF-8' } },

        { status: 200,
        msg: 'success',
        resource: 'https://www.baidu.com',
        data:
        { filePath: 'D:\\1a\\github\\node-download-remote\\test\\uploads\\uploads10\\a4e84f80ee344626a5e9ad712be041b0.html',
        contentType: 'text/html' } },

        { status: 200,
        msg: 'success',
        resource: 'https://www.sogo.com/web/index/images/logo_440x140.v.4.png',
        data:
        { filePath: 'D:\\1a\\github\\node-download-remote\\test\\uploads\\images\\sogou_logo.png',
        contentType: 'image/png' } }
    ]
    */




```
