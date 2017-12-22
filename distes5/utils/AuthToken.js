'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _superagentJsonp = require('superagent-jsonp');

var _superagentJsonp2 = _interopRequireDefault(_superagentJsonp);

var _index = require('antd-mobile/lib/index');

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _BaseHost = require('./BaseHost');

var _BaseHost2 = _interopRequireDefault(_BaseHost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginContextUrl = _BaseHost2.default.MAURL + "/maservlet/ssoLogin/checkToken";
var esnContextUrl = _BaseHost2.default.MAURL + '/maservlet/upesn/checkUpesnToken';

function evil(fn) {
    var Fn = Function;
    return new Fn('return ' + fn)();
}

function GetRequest() {
    var url = window.location.href;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.split('?')[1];
        str = str.split('#')[0];
        if (url.split('?').length > 2) {
            var str2 = url.split('?')[2];
            str = str + '&' + str2;
        }
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            var eqIndex = strs[i].indexOf("=");
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].substr(eqIndex + 1));
        }
    }
    return theRequest;
}

function loginContextPost(url, checkParams, _success) {
    _superagent2.default.post(url).send(checkParams).end(function (err, res) {
        if (res && res.text) {
            var data = JSON.parse(res.text);
            if (data.flag == '0') {
                var resultJson = data.data;
                if (resultJson.success == true) {
                    resultJson = JSON.parse(resultJson.ext);
                    var psnInfo = resultJson.data;

                    if (psnInfo.supplier == null) {
                        if (psnInfo.staff == null || psnInfo.staff.id == null || psnInfo.staff.id == '') {
                            _index.Toast.fail("人员信息为空，请检查人员信息");
                            return;
                        }
                        if (psnInfo.company == null || psnInfo.company.id == null || psnInfo.company.id == '') {
                            _index.Toast.fail("人员公司信息为空，请检查人员公司信息");
                            return;
                        }
                        if (psnInfo.dept == null || psnInfo.dept.id == null || psnInfo.dept.id == '') {
                            _index.Toast.fail("人员部门信息为空，请检查人员部门信息");
                            return;
                        }
                    }

                    var context = {
                        u_logints: psnInfo.authority.u_logints,
                        token: psnInfo.authority.token,
                        u_usercode: psnInfo.authority.u_usercode,
                        tenantid: psnInfo.authority.tenantid,
                        userId: psnInfo.authority.userId,
                        userType: psnInfo.authority.userType,
                        typeAlias: psnInfo.authority.typeAlias,
                        companyCode: psnInfo.company.companyCode,
                        companyName: psnInfo.company.companyName,
                        companyId: psnInfo.company.id,
                        staffId: psnInfo.staff.id,
                        staffCode: psnInfo.staff.credentialCode,
                        staffName: psnInfo.staff.name,
                        staffSex: psnInfo.staff.sex,
                        staffMobile: psnInfo.staff.mobile,
                        deptId: psnInfo.dept.id,
                        deptName: psnInfo.dept.deptName,
                        deptCode: psnInfo.dept.innercode,
                        _A_P_userName: psnInfo.user.userName,
                        _A_P_userCode: psnInfo.user.userCode,
                        _A_P_userId: psnInfo.user.userId,
                        _A_P_userLoginName: psnInfo.user.userName
                    };
                    sessionStorage.setItem("icop_context", JSON.stringify(context));

                    if (typeof _success === 'function') {
                        _success();
                    }
                } else {
                    _index.Toast.fail("身份校验失败");
                }
            } else {
                _index.Toast.fail(data.data.desc);
            }
        }
    });
}

var AuthToken = {
    CONTEXT_KEY: 'icop_context',
    SERVER_URL: _BaseHost2.default + '/icop-workbench/getWorkbenchCookie',
    _cacheContext: null,
    init: function init(options) {
        var _url = options && options.url ? options.url : this.SERVER_URL;
        var _success = options && options.success ? options.success : null;
        var _error = options && options.error ? options.error : null;
        var _clear = options && options.clear !== undefined ? options.clear : true;
        var that = this;

        var urlParam = GetRequest();
        var url = null;

        if (urlParam.fromType && urlParam.fromType == 'upEsnApp') {
            url = esnContextUrl;
        } else {
            url = loginContextUrl;
        }
        if (urlParam.token) {
            var param = {};
            param.token = urlParam.token;

            param.appid = urlParam.appid;
            loginContextPost(url, param, _success);
        } else if (urlParam.code) {
            var param = {};
            param.code = urlParam.code;

            param.appid = urlParam.appId;
            loginContextPost(url, param, _success);
        } else {
            if (_clear) {
                delete this._cacheContext;
                _jsCookie2.default.remove(this.CONTEXT_KEY);
            }
            var firstResp = false;
            _superagent2.default.get(_url).use(_superagentJsonp2.default).end(function (err, res) {
                if (res !== null && res.body !== null && res.body !== undefined) {
                    _jsCookie2.default.set(that.CONTEXT_KEY, res.body);
                    if (typeof _success === 'function') {
                        _success();
                    }
                } else {
                    if (_clear) {
                        delete this._cacheContext;
                        _jsCookie2.default.remove(this.CONTEXT_KEY);
                    }
                    if (firstResp === false) {
                        firstResp = true;
                    } else {
                        if (typeof _error === 'function') {
                            _error(err);
                        }
                    }
                }
            });
        }
    },
    getContext: function getContext() {
        if (sessionStorage.getItem(this.CONTEXT_KEY)) {
            return JSON.parse(sessionStorage.getItem(this.CONTEXT_KEY));
        } else if (!this._cacheContext) {
            var context = _jsCookie2.default.get(this.CONTEXT_KEY);
            if (isJsonStr(context)) {
                var jsTxt = '(' + decodeURIComponent(context.replace(/'/, "'")) + ')';
                var jsonObj = evil(jsTxt);
                this._cacheContext = jsonObj;
            }
        }
        return this._cacheContext;
    }, getToken: function getToken() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["token"];
    }, getStaff: function getStaff() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return {
            id: context["staffId"],
            code: context["staffCode"],
            name: context["staffName"]
        };
    }, getStaffId: function getStaffId() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["staffId"];
    }, getStaffCode: function getStaffCode() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["staffCode"];
    }, getStaffName: function getStaffName() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["staffName"];
    }, getDept: function getDept() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return {
            id: context["deptId"],
            code: context["deptCode"],
            name: context["deptName"]
        };
    }, getDeptId: function getDeptId() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["deptId"];
    }, getDeptCode: function getDeptCode() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["deptCode"];
    }, getDeptName: function getDeptName() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["deptName"];
    }, getUser: function getUser() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return {
            id: context["_A_P_userId"],
            code: context["_A_P_userLoginName"],
            name: context["_A_P_userName"]
        };
    }, getUserId: function getUserId() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["_A_P_userId"];
    }, getUserCode: function getUserCode() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["_A_P_userLoginName"];
    }, getUserName: function getUserName() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["_A_P_userName"];
    }, getCurrentRoleId: function getCurrentRoleId() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["_A_P_currentRoleId"];
    }, getOrga: function getOrga() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return {
            id: context["companyId"],
            code: context["companyCode"],
            name: context["companyName"]
        };
    },
    getOrgaId: function getOrgaId() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["companyId"];
    }, getOrgaCode: function getOrgaCode() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["companyCode"];
    }, getOrgaName: function getOrgaName() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["companyName"];
    }, getLogints: function getLogints() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["u_logints"];
    }, getTenantId: function getTenantId() {
        var context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["tenantid"];
    }, getAuthenticationStr: function getAuthenticationStr() {
        var includeFields = ["u_logints", "u_usercode", "token", "tenantid", "userId", "userType", "typeAlias", "_A_P_userLoginName", "_A_P_userName", "userType", "companyId", "companyName", "companyCode"];
        var set = new Set();
        includeFields.forEach(function (value) {
            set.add(value);
        });

        var authentication = '';
        var context = this.getContext();
        if (context) {
            for (var prop in context) {
                if (set.has(prop) && context[prop]) {
                    authentication += prop + '=' + encodeURI(context[prop]) + ';';
                }
            }
        }
        if (authentication.length > 0 && authentication[authentication.length - 1] === ';') authentication = authentication.substring(0, authentication.length - 1);
        return authentication;
    }
};

function isJsonStr(val) {
    return typeof val === "string" && /^\{.*\}$/.test(val);
}

exports.default = AuthToken;