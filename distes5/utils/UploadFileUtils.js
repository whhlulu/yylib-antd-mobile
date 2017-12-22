'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ajax = require('./ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _BaseHost = require('./BaseHost');

var _BaseHost2 = _interopRequireDefault(_BaseHost);

var _AuthToken = require('./AuthToken');

var _AuthToken2 = _interopRequireDefault(_AuthToken);

var _index = require('antd-mobile/lib/index');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ADDR = _BaseHost2.default.ADDR;
var downloadUrl = '/icop-file/file/download?id=';

var listUrl = '/icop-file/file/list';

var uploadUrl = '/icop-file/file/muploadx';

var uploadBase64Url = '/icop-file/file/uploadBase64';

var delUrl = '/icop-file/file/del';

var maxSize = 200 * 1024;
var getFileListByFileIdsUrl = '/icop-file/file/getFileListByFileIds';

function multiFilesUpLoad(obj, billType, source, callback) {
    var loginContext = _AuthToken2.default.getContext();
    var files = [];
    var imgPics = [];
    var fileList = [];
    var source = source || {
        sourceId: '',
        sourceType: ''
    };
    if (obj.file) {
        _index.Toast.loading('正在上传...', 1);
        var reader = new FileReader();
        reader.readAsDataURL(obj.file);
        reader.onload = function (e) {
            var imgInfo = {},
                result = this.result;
            imgInfo.src = result;
            imgPics.push(imgInfo);

            var img = new Image();
            img.src = result;
            var fileContent = result;

            img.onload = function () {
                var singleFile = {};
                singleFile.fileName = obj.file.name;
                if (fileContent.length > maxSize) fileContent = compress(this);

                singleFile.fileSize = fileContent.length;
                singleFile.fileContent = fileContent.substring(fileContent.indexOf(',') + 1);

                files.push(singleFile);

                var params = {
                    billType: billType,
                    sourceId: source.sourceId,
                    sourceType: source.sourceType,
                    userId: loginContext.userId,
                    userName: loginContext._A_P_userName,
                    files: files
                };
                _ajax2.default.postJSON(ADDR + uploadUrl, params, function (data) {
                    if (data.success) {
                        var backData = data.backData;
                        if (backData.length) {
                            for (var i = 0; i < backData.length; i++) {
                                var item = backData[i];
                                var thumbUrl = ADDR + '/' + zoomImgPath(item.filePath, '_100x100');
                                var originalUrl = ADDR + '/' + zoomImgPath(item.filePath);
                                var fileUrl = ADDR + '/' + item.filePath;
                                var file = {
                                    gid: item.gid,
                                    name: item.fileName,
                                    url: thumbUrl,
                                    originalUrl: originalUrl,
                                    fileUrl: fileUrl,
                                    status: 'done',
                                    backData: item
                                };
                                fileList.push(file);
                            }
                        }
                        _index.Toast.success(data.backMsg ? data.backMsg : '上传成功!', 1);
                        if (callback && _lodash2.default.isFunction(callback)) {
                            callback(fileList);
                        }
                    } else {
                        _index.Toast.fail(data.backMsg ? data.backMsg : '上传失败!', 1);
                    }
                });
            };
        };
    } else if (obj.files) {
        _index.Toast.loading('正在上传...', 1);
        var params = {};
        params.files = obj.files;
        params.billType = billType;
        params.sourceId = source.sourceId;
        params.sourceType = source.sourceType;
        _ajax2.default.postJSON(ADDR + uploadUrl, params, function (data) {
            if (data.success) {
                var backData = data.backData;
                if (backData.length) {
                    for (var i = 0; i < backData.length; i++) {
                        var item = backData[i];
                        var thumbUrl = ADDR + '/' + zoomImgPath(item.filePath, '_100x100');
                        var originalUrl = ADDR + '/' + zoomImgPath(item.filePath);
                        var fileUrl = ADDR + '/' + item.filePath;
                        var file = {
                            gid: item.gid,
                            name: item.fileName,
                            url: thumbUrl,
                            originalUrl: originalUrl,
                            fileUrl: fileUrl,
                            status: 'done',
                            backData: item
                        };
                        fileList.push(file);
                    }
                }
                _index.Toast.success(data.backMsg ? data.backMsg : '上传成功!', 1);
                if (callback && _lodash2.default.isFunction(callback)) {
                    callback(fileList);
                }
            } else {
                _index.Toast.fail(data.backMsg ? data.backMsg : '上传失败!', 1);
            }
        });
    }
}

function compress(img) {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/jpeg', 0.2);
    return data;
}

function delAttach(params, onSuccess, onFail) {
    _ajax2.default.getJSON(ADDR + delUrl, params, function (data) {
        if (data.success) {
            _index.Toast.success(data.backMsg ? data.backMsg : '删除成功!', 1);
            if (onSuccess && _lodash2.default.isFunction(onSuccess)) {
                onSuccess();
            }
        } else {
            _index.Toast.fail(data.backMsg ? data.backMsg : '删除失败!', 1);
            if (onFail && _lodash2.default.isFunction(onFail)) {
                onFail();
            }
        }
    }, function (error) {
        _index.Toast.fail('服务器请求失败!', 1);
    });
}

function zoomImgPath(filePath, dimension) {
    if (!filePath) return filePath;

    var idx = filePath.lastIndexOf('.');
    if (idx > -1) {
        var ext = filePath.substr(idx);
        return filePath.substr(0, idx) + (dimension || '') + ext;
    } else {
        return filePath;
    }
}

function loadAttachList(params, callback) {
    var fileList = [];
    _ajax2.default.getJSON(ADDR + listUrl, params, function (data) {
        if (data.success) {
            var backData = data.backData;
            if (backData != null) {
                for (var i = 0; i < backData.length; i++) {
                    var item = backData[i];
                    var thumbUrl = ADDR + '/' + zoomImgPath(item.filePath, '_100x100');
                    var originalUrl = ADDR + '/' + zoomImgPath(item.filePath);
                    var fileUrl = ADDR + '/' + item.filePath;
                    var file = {
                        gid: item.gid,
                        name: item.fileName,
                        url: thumbUrl,
                        originalUrl: originalUrl,
                        fileUrl: fileUrl,
                        status: 'done',
                        backData: item
                    };
                    fileList.push(file);
                }
            }
            if (callback && _lodash2.default.isFunction(callback)) {
                callback(fileList);
            }
        } else {
            _index.Toast.fail(data.backMsg ? data.backMsg : '加载附件失败!', 1);
        }
    });
}

function uploadBase64Img(imgData, params, callback) {
    var data = _lodash2.default.assign({}, params, { content: imgData.replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,', '') });
    _ajax2.default.postJSON(ADDR + uploadBase64Url, data, function (result) {
        if (result.success) {
            _index.Toast.fail(result.backMsg ? result.backMsg : '上传成功!', 1);
            if (callback && _lodash2.default.isFunction(callback)) {
                callback();
            }
        } else {
            _index.Toast.fail(result.backMsg ? result.backMsg : '上传失败!', 1);
        }
    }, function (error) {});
}

function zipImg(imgBase64, options, callback) {
    console.log('原始大小:' + imgBase64.length);
    var img = new Image();
    img.src = imgBase64;
    img.onload = function () {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var width = img.width;
        var height = img.height;

        var rate = 0.3;
        if (width > 800 && height > 480) rate = 0.8;
        if (width > 900 && height > 600) rate = 0.75;
        if (width > 960 && height > 720) rate = 0.7;
        if (width > 1024 && height > 768) rate = 0.65;
        if (width > 1280 && height > 768) rate = 0.6;
        if (options && options.rate) rate = options.rate;
        canvas.width = width * rate;
        canvas.height = height * rate;
        ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);
        var dataURL = canvas.toDataURL('image/png', 0.1);

        console.log('压缩后大小:' + dataURL.length);
        if (typeof callback == 'function') callback(dataURL);
        canvas = null;
    };
}

exports.default = {
    multiFilesUpLoad: multiFilesUpLoad,
    delAttach: delAttach,
    loadAttachList: loadAttachList,
    uploadBase64Img: uploadBase64Img,
    zipImg: zipImg
};