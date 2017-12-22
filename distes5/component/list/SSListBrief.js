'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SSIcon = require('../icon/SSIcon');

var _SSIcon2 = _interopRequireDefault(_SSIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SSListBrief = function (_Component) {
    _inherits(SSListBrief, _Component);

    function SSListBrief() {
        _classCallCheck(this, SSListBrief);

        return _possibleConstructorReturn(this, (SSListBrief.__proto__ || Object.getPrototypeOf(SSListBrief)).apply(this, arguments));
    }

    _createClass(SSListBrief, [{
        key: 'renderThumbIcon',
        value: function renderThumbIcon() {
            var icon = this.props.icon;

            var fontSize = icon == 'icon-weizhi' ? '0.44rem' : '0.5rem';
            if (icon == 'icon-shuji') {
                fontSize = '0.34rem';
            }
            var iconStyle = {
                verticalAlign: 'middle',
                width: fontSize,
                height: fontSize

            };
            return icon ? _react2.default.createElement(_SSIcon2.default, { icon: icon, size: 'md', style: iconStyle }) : null;
        }
    }, {
        key: 'renderExtraThumbIcon',
        value: function renderExtraThumbIcon() {
            var extraIcon = this.props.extraIcon;

            var fontSize = extraIcon == 'icon-weizhi' ? '0.44rem' : '0.5rem';
            if (extraIcon == 'icon-shuji') {
                fontSize = '0.34rem';
            }
            var iconStyle = {
                verticalAlign: 'middle',
                width: fontSize,
                height: fontSize

            };
            return extraIcon ? _react2.default.createElement(_SSIcon2.default, { icon: extraIcon, size: 'md', style: iconStyle }) : null;
        }
    }, {
        key: 'renderExtra',
        value: function renderExtra() {
            var _props = this.props,
                extra = _props.extra,
                extraThumb = _props.extraThumb,
                briefStyle = _props.briefStyle,
                type = _props.type;

            var cls = (0, _classnames2.default)({
                'brief-myExtra': true,
                'extra-italic': type == '6' || type == '7' ? true : false
            });
            var items = null;
            if (extra && (type == '6' || type == '7')) {
                var reg = /[0-9]*$/;
                var num = extra.match(reg)[0];
                var text = extra.replace(reg, '');
                items = _react2.default.createElement(
                    'em',
                    null,
                    text,
                    _react2.default.createElement(
                        'i',
                        { className: 'italic-text' },
                        num
                    )
                );
            } else {
                items = _react2.default.createElement(
                    'i',
                    { style: { verticalAlign: 'middle', fontStyle: 'normal' } },
                    extra
                );
            }

            return extra ? _react2.default.createElement(
                'span',
                { className: cls },
                this.renderExtraThumbIcon(),
                items
            ) : null;
        }
    }, {
        key: 'renderDesc',
        value: function renderDesc() {
            var _props2 = this.props,
                descColor = _props2.descColor,
                desc = _props2.desc;

            var style = {
                color: descColor || '#999'
            };
            return desc ? _react2.default.createElement(
                'span',
                { style: style },
                desc
            ) : null;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                text = _props3.text,
                thumb = _props3.thumb,
                extra = _props3.extra,
                extraThumb = _props3.extraThumb,
                desc = _props3.desc,
                descStyle = _props3.descStyle,
                briefStyle = _props3.briefStyle,
                icon = _props3.icon,
                singLine = _props3.singLine;

            var clientWith = document.documentElement.clientWidth;
            var brieWith = icon ? clientWith * 0.82 : clientWith * 0.88;

            var cls = (0, _classnames2.default)({
                'am-list-brief': true,
                'listBrief': true,
                'brief-location': desc || extra ? true : false

            });
            var singleCls = (0, _classnames2.default)({
                'single-line': singLine
            });

            return _react2.default.createElement(
                'div',
                { className: cls, style: briefStyle },
                this.renderThumbIcon(),
                _react2.default.createElement(
                    'span',
                    { className: singleCls, style: { verticalAlign: 'middle', width: brieWith + 'px' } },
                    text
                ),
                this.renderExtra()
            );
        }
    }]);

    return SSListBrief;
}(_react.Component);

exports.default = SSListBrief;