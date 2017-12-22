"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

Number.prototype.toFixed = function (d) {
    var s = this + "";
    if (!d) d = 0;
    if (typeof d === 'string') d = Number(d);
    if (s.indexOf(".") === -1) s += ".";
    s += new Array(d + 1).join("0");
    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
        var t = "0" + RegExp.$2,
            pm = RegExp.$1,
            a = RegExp.$3.length,
            b = true;
        if (a === d + 2) {
            a = t.match(/\d/g);

            if (parseInt(a[a.length - 1]) > 4) {
                for (var i = a.length - 2; i >= 0; i--) {
                    a[i] = parseInt(a[i]) + 1;
                    if (a[i] === 10) {
                        a[i] = 0;
                        b = i !== 1;
                    } else break;
                }
            }
            t = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");
        }
        if (b) t = t.substr(1);
        return (pm + t).replace(/\.$/, "");
    }
    return this + "";
};
var formatUtils = {
    formatNumber: function formatNumber(num, digits, sp, defaultValue) {
        if (isNaN(num) || num === '' || num === undefined || num === null) {
            if (arguments.length === 4) return arguments[3];
            return '';
        }
        if (sp === null) {
            sp = 3;
        }
        digits = digits >= 0 && digits <= 20 ? digits : 2;
        num = parseFloat((num + "").replace(/[^\d.-]/g, ""));
        var flag = false;
        if (num < 0) {
            flag = true;
            num = Math.abs(num);
        }
        num = num.toFixed(digits) + "";
        var tem = num.split(".");
        var l = tem[0].split("").reverse();
        var r = tem[1] && tem[1].length >= 1 ? tem[1] : "";
        var t = "";
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % sp === 0 && i + 1 !== l.length ? "," : "");
        }
        if (digits === 0) {
            return (flag ? "-" : "") + t.split("").reverse().join("");
        } else {
            return (flag ? "-" : "") + t.split("").reverse().join("") + "." + r;
        }
    },
    formatMoney: function formatMoney(money) {
        return this.formatNumber(money, 2, 3);
    },
    formatDate: function formatDate(date, format) {
        if (date === null || !(date instanceof Date)) {
            return date;
        }
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "(H|h)+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    },
    parseAntDate: function parseAntDate(value) {
        if (value) {
            value = new Date(value.replace(/-/g, '/'));
        }
        return value;
    },

    formatAntDate: function formatAntDate(date) {
        if (date && date instanceof Date) {
            var mm = date.getMonth() + 1;
            var dd = date.getDate();
            mm = mm < 10 ? '0' + mm : mm;
            dd = dd < 10 ? '0' + dd : dd;
            date = date.getFullYear() + '-' + mm + '-' + dd;
        }
        return date;
    },

    formatUnitTA: function formatUnitTA(value) {
        return formatUtils.formatText(value, '台');
    },

    formatMoneyCN: function formatMoneyCN(value) {
        return formatUtils.formatText(value, '元');
    },

    formatMoneyPeopleCN: function formatMoneyPeopleCN(value) {
        return formatUtils.formatText(value, '元/人');
    },

    formatMoneyDayCN: function formatMoneyDayCN(value) {
        return formatUtils.formatText(value, '元/天');
    },

    formatMoneyEN: function formatMoneyEN(value) {
        return formatUtils.formatText(value, '￥', 'left');
    },

    formatRatio: function formatRatio(value) {
        return formatUtils.formatText(value, '%');
    },

    formatText: function formatText(value, unit, pos) {
        if (value !== '') {
            return pos === 'left' ? unit + value : value + unit;
        }
        return '';
    },

    formatBooleanToString: function formatBooleanToString(obj, formatPropertiesArray) {
        if (!(obj instanceof Object) || !(formatPropertiesArray instanceof Array)) {
            return {};
        }
        formatPropertiesArray.forEach(function (property) {
            obj[property] = obj[property] === true ? "Y" : "N";
        });
        return obj;
    }
};

exports.default = formatUtils;