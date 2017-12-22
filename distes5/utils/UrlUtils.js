"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var UrlUtils = {
    fillUrlParams: function fillUrlParams(url, params) {
        if (_lodash2.default.isString(url) && _lodash2.default.isObject(params)) {
            var _ret = function () {
                var retUrl = url;
                _lodash2.default.forIn(params, function (value, key) {
                    retUrl = retUrl.replace(new RegExp('{' + escape(key) + '}', 'gm'), escape(value));
                });
                return {
                    v: retUrl
                };
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
        return url;
    },
    appendToUrl: function appendToUrl(url, params) {
        var _url = url;
        var isFirstParam = true;
        if (_url.indexOf("?") === -1) {
            _url += "?";
        } else {
            isFirstParam = false;
        }
        var _params = this.getParams(params);
        if (_lodash2.default.isPlainObject(_params) && !_lodash2.default.isEmpty(_params)) {
            _lodash2.default.forIn(_params, function (val, key) {
                var _val = val === undefined ? '' : val;
                if (isFirstParam) {
                    isFirstParam = false;
                    _url += key + "=" + _val;
                } else {
                    var _matchReg = new RegExp("[?|&]" + key + "=[^&]*");
                    var _replaceReg = new RegExp(key + "=[^&]*");
                    if (_url.match(_matchReg)) {
                        _url = _url.replace(_replaceReg, key + "=" + _val);
                    } else {
                        _url += "&" + key + "=" + _val;
                    }
                }
            });
        }
        return _url;
    },
    getParams: function getParams(param) {
        var _otherParam = {};
        if (_lodash2.default.isFunction(param)) {
            return param.call();
        } else if (_lodash2.default.isPlainObject(param)) {
            _lodash2.default.forIn(param, function (propValue, propName) {
                if (_lodash2.default.isFunction(propValue)) {
                    _otherParam[propName] = propValue.call();
                } else {
                    _otherParam[propName] = propValue;
                }
            });
            return _otherParam;
        }
        return {};
    }
};

exports.default = UrlUtils;