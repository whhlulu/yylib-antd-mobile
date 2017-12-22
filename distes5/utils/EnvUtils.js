'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AuthToken3 = require('./AuthToken');

var _AuthToken4 = _interopRequireDefault2(_AuthToken3);

var _formatUtils3 = require('./formatUtils');

var _formatUtils4 = _interopRequireDefault2(_formatUtils3);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _AuthToken2 = _interopRequireDefault(_AuthToken4.default);

;

var _formatUtils2 = _interopRequireDefault(_formatUtils4.default);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var Keys = {
    STAFF: "staff",
    STAFF_ID: "staffId",
    STAFF_NAME: "staffName",

    USER_ID: "userId",
    USER_NAME: "userName",

    CURRENT_ROLE_ID: "currentRoleId",

    ORGA_ID: "orgaId",

    CURRENT_DATE: "currentDate",
    CURRENT_TIME: "currentTime" };

function getKeyValue(key) {
    switch (key) {
        case Keys.STAFF:
            {
                return _AuthToken2.default.getStaff();
            }
        case Keys.STAFF_ID:
            {
                return _AuthToken2.default.getStaffId();
            }
        case Keys.USER_ID:
            {
                return _AuthToken2.default.getUserId();
            }
        case Keys.USER_NAME:
            {
                return _AuthToken2.default.getUserName();
            }
        case Keys.CURRENT_ROLE_ID:
            {
                return _AuthToken2.default.getCurrentRoleId();
            }
        case Keys.ORGA_ID:
            {
                return _AuthToken2.default.getOrgaId();
            }
        case Keys.CURRENT_DATE:
            {
                return _formatUtils2.default.formatDate(new Date(), "yyyy-MM-dd");
            }
        case Keys.CURRENT_TIME:
            {
                return _formatUtils2.default.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
            }
    }
    return null;
}
function setKeyValue(key, value) {
    console.log('暂不提供支持');
}

exports.default = {
    getKeyValue: getKeyValue,
    setKeyValue: setKeyValue,
    Keys: Keys
};