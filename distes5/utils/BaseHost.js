'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var ADDR = void 0;
var MAURL = void 0;
window.EnvConfig = window.EnvConfig || null;
if (window.EnvConfig && window.EnvConfig.YYLIB_BASEHOST) {
    ADDR = window.EnvConfig.YYLIB_BASEHOST;
    MAURL = window.EnvConfig.MAURL;
} else {
    ADDR = 'https://dev.yonyouccs.com';
    MAURL = 'http://123.103.9.200:9080';
}
exports.default = {
    ADDR: ADDR,
    MAURL: MAURL
};