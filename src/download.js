const request = require('request');
const mimeTypes = require('mime-types');
const makeDir = require('make-dir');
const path = require('path');
const fs = require('fs');


Download.makeKey = function () {
    let s = [],
        hexDigits = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    return s.join('');
};


Download.download = function (options) {
    return new Promise((resolve, reject) => {
        options.start && options.start();
        setTimeout(function () {
            console.error('2');

            request(options.url, function () {

            })
                .on('error', (response) => {
                    reject({
                        code: '',
                        msg: response.code
                    });
                    options.complete && options.complete();

                })
                .on('response', (response) => {

                    let name = mimeTypes['extension'](response.headers['content-type']),
                        filePath = path.resolve(options.dir, Download.makeKey()) + '.' + name;
                    if (response.statusCode === 200) {
                        response.pipe(fs.createWriteStream(filePath))
                            .on('close', () => {
                                resolve(filePath);

                                options.complete && options.complete();
                            });

                    } else {
                        reject({
                            code: response.statusCode,
                            msg: ''
                        });
                        options.complete && options.complete();

                    }

                });

        }, 1000);
    });
};


function Download() {

}


Download.prototype.list = [];
Download.prototype.config = {};

Download.prototype.exec = function () {
    return new Promise(async (resolve, reject) => {
        let data = [],
            j = 0,
            i = 0,
            l = this.list.length,
            dir = await makeDir(path.resolve(this.config.localDir)),
            next = () => {
                i++;
                return Download.download({
                    url: this.list.splice(0, 1)[0].url,
                    dir,
                    complete: async () => {
                        j++;
                        console.log('j' + j);

                        if (this.list.length > 0) {
                            i--;
                            next()
                                .then(res => {
                                    data.push(res);
                                })
                                .catch(err => {
                                    data.push(err);

                                });
                        }
                        if (j === l) {
                            resolve(data);
                        }
                    },
                    start: async () => {
                        console.error('1');
                        if (i <= 2 && this.list.length > 0) {
                            next()
                                .then(res => {
                                    data.push(res);
                                })
                                .catch(err => {
                                    data.push(err);
                                });
                        }
                        if (j === l) {
                            resolve(data);
                        }
                    }

                });
            };
        next()
            .then(res => {
                data.push(res);
            })
            .catch(err => {
                data.push(err);
            });

    });

};
Download.prototype.push = function (options) {
    this.list.push(options);
    return this;
};
Download.prototype.setConfig = function (config) {
    this.config = Object.assign(config, this.config);
    return this;
};
module.exports = Download;

