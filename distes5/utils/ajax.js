'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _index = require('antd-mobile/lib/index');

var _AuthToken = require('./AuthToken');

var _AuthToken2 = _interopRequireDefault(_AuthToken);

var _UrlUtils = require('./UrlUtils');

var _UrlUtils2 = _interopRequireDefault(_UrlUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajax = {
    getJSON: function getJSON(url, data, success, error, complete, cookies) {
        if (_lodash2.default.isFunction(data)) {
            this.request({ url: url, success: arguments[1], error: arguments[2], complete: arguments[3], cookies: arguments[4] });
        } else {
            this.request({ url: url, query: data, success: success, error: error, complete: complete, cookies: cookies });
        }
    },

    getJSONWithCookies: function getJSONWithCookies(url, data, success, error, complete) {
        if (_lodash2.default.isFunction(data)) {
            this.getJSON(url, arguments[1], arguments[2], arguments[3], true);
        } else {
            this.getJSON(url, data, success, error, complete, true);
        }
    },

    postJSON: function postJSON(url, data, success, error, complete, cookies) {
        if (_lodash2.default.isFunction(data)) {
            this.request({ url: url, success: arguments[1], error: arguments[2], complete: arguments[3], cookies: arguments[4], method: 'POST' });
        } else {
            this.request({ url: url, send: data, success: success, error: error, complete: complete, cookies: cookies, method: 'POST' });
        }
    },

    postJSONWithCookies: function postJSONWithCookies(url, data, success, error, complete) {
        if (_lodash2.default.isFunction(data)) {
            this.postJSON(url, arguments[1], arguments[2], arguments[3], true);
        } else {
            this.postJSON(url, data, success, error, complete, true);
        }
    },

    delJSON: function delJSON(url, data, success, error, complete, cookies) {
        if (_lodash2.default.isFunction(data)) {
            this.request({ url: url, success: arguments[1], error: arguments[2], complete: arguments[3], cookies: arguments[4], method: 'DELETE' });
        } else {
            this.request({ url: url, send: data, success: success, error: success, complete: complete, cookies: cookies, method: 'DELETE' });
        }
    },

    delJSONWithCookies: function delJSONWithCookies(url, data, success, error, complete) {
        if (_lodash2.default.isFunction(data)) {
            this.delJSON(url, arguments[1], arguments[2], arguments[3], true);
        } else {
            this.delJSON(url, data, success, error, complete, true);
        }
    },

    getText: function getText(url, data, success, error, complete, cookies) {
        if (_lodash2.default.isFunction(data)) {
            this.request({ url: url, success: arguments[1], error: arguments[2], complete: arguments[3], cookies: arguments[4], accept: 'text' });
        } else {
            this.request({ url: url, query: data, success: success, error: error, complete: complete, cookies: cookies, accept: 'text' });
        }
    },

    getTextWithCookies: function getTextWithCookies(url, data, success, error, complete) {
        if (_lodash2.default.isFunction(data)) {
            this.getText(url, arguments[1], arguments[2], arguments[3], true);
        } else {
            this.getText(url, data, success, error, complete, true);
        }
    },

    postForm: function postForm(url, data, success, error, complete, cookies) {
        if (_lodash2.default.isFunction(data)) {
            this.request({ url: url, success: arguments[1], error: arguments[2], complete: arguments[3], cookies: arguments[4], method: 'POST', type: 'form' });
        } else {
            this.request({ url: url, send: data, success: success, error: error, complete: complete, cookies: cookies, method: 'POST', type: 'form' });
        }
    },

    postText: function postText(url, data, success, error, complete, cookies) {
        if (_lodash2.default.isFunction(data)) {
            this.request({ url: url, success: arguments[1], error: arguments[2], complete: arguments[3], cookies: arguments[4], method: 'POST', accept: 'text' });
        } else {
            this.request({ url: url, send: data, success: success, error: error, complete: complete, cookies: cookies, method: 'POST', accept: 'text' });
        }
    },

    postTextWithCookies: function postTextWithCookies(url, data, success, error, complete) {
        if (_lodash2.default.isFunction(data)) {
            this.postText(url, arguments[1], arguments[2], arguments[3], true);
        } else {
            this.postText(url, data, success, error, complete, true);
        }
    },

    _defaultHeader: {},
    setDefaultHeader: function setDefaultHeader(key, value) {
        if (key) {
            if (value) {
                this._defaultHeader[key] = value;
            } else {
                delete this._defaultHeader[key];
            }
        }
    },
    request: function request(options) {
        var _defaults = {
            method: 'GET',
            type: 'json',
            url: '',
            header: null,
            cookies: false,
            noToken: false,
            send: '',
            query: '',
            success: null,
            error: null,
            complete: null };
        _lodash2.default.assign(_defaults, options);

        if (options.query && options.query.noToken !== undefined) {
            _defaults.noToken = options.query.noToken;
        }

        var contentType = 'application/json;charset=UTF-8';
        if (_defaults.type === 'form') {
            contentType = 'application/x-www-form-urlencoded;charset=UTF-8';
        }
        var req = (0, _superagent2.default)(_defaults.method, _defaults.url).set('Content-Type', contentType);

        for (var header in this._defaultHeader) {
            if (this._defaultHeader[header] !== undefined) {
                req.set(header, this._defaultHeader[header]);
            }
        }

        if (_defaults.header && _lodash2.default.isPlainObject(_defaults.header)) {
            for (var headerKey in _defaults.header) {
                if (_defaults.header[headerKey] !== undefined) {
                    req.set(headerKey, _defaults.header[headerKey]);
                }
            }
        }

        var token = _AuthToken2.default.getToken();
        var authenticationStr = _AuthToken2.default.getAuthenticationStr();
        if (_defaults.noToken !== true) {
            if (token) {
                req.set('icop-token', token);
            }
            if (authenticationStr) {
                req.set('authority', authenticationStr);
            }
        }

        if (_defaults.cookies === true) {
            req.withCredentials();
        }
        req.query(_defaults.query).send(_defaults.send).end(function (err, res) {
            if (err || res && res.badRequest) {
                if (typeof _defaults.error === 'function') {
                    _defaults.error(res);
                } else {
                    _index.Toast.fail(err.message, 3);
                }
            }
            if (res && res.ok) {
                if (res.headers && res.headers['icop-content-type']) {
                    if (typeof _defaults.error === 'function') {
                        _defaults.error(res);
                    } else {
                        _index.Toast.fail(res.text && res.text.length > 0 ? res.text : res.body, 3);
                    }
                    return;
                } else {
                    if (typeof _defaults.success === 'function') {
                        if (_defaults.accept === 'text') {
                            _defaults.success(res.text);
                        } else {
                            _defaults.success(res.body);
                        }
                    }
                }
            }
            if (_defaults.complete) {
                _defaults.complete(res);
            }
        });
    },
    fillUrlParams: function fillUrlParams(url, params) {
        return _UrlUtils2.default.fillUrlParams(url, params);
    },
    getParams: function getParams(param) {
        return _UrlUtils2.default.getParams(param);
    },
    appendToUrl: function appendToUrl(url, params) {
        return _UrlUtils2.default.appendToUrl(url, params);
    }
};

exports.default = ajax;