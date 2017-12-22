"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _uuid2 = require("uuid");

var _uuid3 = _interopRequireDefault(_uuid2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MathUtils = {
    uuid: function uuid() {
        var uuidArr = _uuid3.default.v4().split("-");
        return uuidArr.join("");
    }
};

exports.default = MathUtils;