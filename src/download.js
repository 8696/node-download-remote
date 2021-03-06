const request = require('request');
const mimeTypes = require('mime-types');
const makeDir = require('make-dir');
const path = require('path');
const fs = require('fs');
const commApi = require('./comm.api');
const cache = new Map();

Download.makeDir = makeDir;
Download.request = request;
Download.mimeTypes = mimeTypes;


function Download() {
  this.list = [];
  this.downloadDefaultConfig = {meanwhile: 1, dir: ''};
  this.optionConfig = {};
  this.defaultOptionConfig = {
    dir: this.downloadDefaultConfig.dir,
    fileName: null,
    autoSuffix: false
  };
}

Download.makeKey = function () {
  return commApi.makeRandom() + '_' + commApi.getDateTime().replace(/( |:|-)/g, '') + '_' + new Date().getTime();
};

Download.download = function (options, hooks = {}) {
  return new Promise(async (resolve, reject) => {
    !cache.has('dir') && (cache.set('dir', []));
    let dirs = cache.get('dir');
    if (!dirs.includes(options.dir)) {
      let newDir = await makeDir(options.dir);
      dirs.push(newDir);
      cache.set('dir', dirs);
    }

    hooks.start && hooks.start();

    try {
      request(options.url)
        ['on']('error', (response) => {
        reject({
          status: 0,
          msg: 'Request error: ' + response.code,
          resource: options.url,
        });
        hooks.complete && hooks.complete();
      })
        ['on']('response', (response) => {

        let suffix;
        if (response.headers['content-disposition'] && 'application/octet-stream' === response.headers['content-type']) {
          suffix = response.headers['content-disposition'].split(';')[1].split('.').pop();
        } else if ('application/octet-stream' === response.headers['content-type']) {
          let url = options.url;
          url = url.includes('?') ? url.split('?')[0] : url;
          suffix = url.split('.').pop();
        } else {
          suffix = mimeTypes['extension'](response.headers['content-type']);
        }

        let fileName = options.fileName || (Download.makeKey() + '.' + suffix);
        fileName = (options.autoSuffix === true && options.fileName) ? (fileName + '.' + suffix) : fileName;
        let filePath = path.resolve(options.dir, fileName);

        if (response.statusCode === 200) {
          response.pipe(fs.createWriteStream(filePath))
            .on('close', () => {

              resolve({
                status: 200,
                msg: 'success',
                resource: options.url,
                data: {
                  filePath: filePath,
                  contentType: response.headers['content-type'],
                }
              });
              hooks.complete && hooks.complete();
            });

        } else {
          reject({
            status: response.statusCode,
            msg: 'Response error: The status code is not 200',
            resource: options.url
          });
          hooks.complete && hooks.complete();
        }

      });
    } catch (e) {
      reject({
        status: 0,
        msg: 'Request error: ' + e.message,
        resource: options.url
      });
      hooks.complete && hooks.complete();
    }

  });
};


Download.prototype.exec = function () {
  return new Promise((resolve) => {
    if (this.list.length === 0) {
      resolve([]);
      return;
    }
    let data = [],
      j = 0,
      i = 0,
      l = this.list.length,
      end = () => {
        if (j === l) {
          resolve(data);
        }
      },
      next = () => {
        i++;
        let option = this.list.splice(0, 1)[0];
        // console.error(option);
        return Download.download(
          {
            url: option.url,
            dir: option.dir || this.optionConfig.dir,
            fileName: option.fileName,
            autoSuffix: option.autoSuffix,
          },
          {
            complete: () => {
              j++;
              if (this.list.length > 0) {
                i--;
                exec();
              }
            },
            start: () => {
              if (i <= this.optionConfig.meanwhile - 1 && this.list.length > 0) {
                exec();
              }
            }
          }
        );
      },
      exec = () => {
        next()
          .then(res => {
            data.push(res);
            end();
          })
          .catch(err => {
            data.push(err);
            end();
          });
      };

    exec();
  });

};
Download.prototype.push = function (options) {
  switch (Object.prototype.toString.call(options)) {
    case '[object Array]': {
      this.list = this.list.concat(options);
      break;
    }
    case '[object String]': {
      this.list.push(options);
      break;
    }
    case '[object Object]': {
      this.list.push(options);
      break;
    }
  }
  this.list.forEach((item, index) => {
    // 独立配置


    switch (Object.prototype.toString.call(item)) {
      case '[object String]': {
        this.list[index] = Object.assign(JSON.parse(JSON.stringify(this.defaultOptionConfig)), {url: item});

        break;
      }
      case '[object Object]': {
        this.list[index] = Object.assign(JSON.parse(JSON.stringify(this.defaultOptionConfig)), item);
        break;

      }

    }


  });

  return this;
};
Download.prototype.setConfig = function (config) {
  this.optionConfig = Object.assign(JSON.parse(JSON.stringify(this.downloadDefaultConfig)), config);
  return this;
};
module.exports = Download;

