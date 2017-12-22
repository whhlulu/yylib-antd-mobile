'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('antd-mobile/lib/index');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SSIcon = require('../icon/SSIcon');

var _SSIcon2 = _interopRequireDefault(_SSIcon);

var _SSExtraItem = require('./SSExtraItem');

var _SSExtraItem2 = _interopRequireDefault(_SSExtraItem);

var _SSListBrief = require('./SSListBrief');

var _SSListBrief2 = _interopRequireDefault(_SSListBrief);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = _index.List.Item;

var SSListItem = function (_Component) {
    _inherits(SSListItem, _Component);

    function SSListItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SSListItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SSListItem.__proto__ || Object.getPrototypeOf(SSListItem)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (e) {
            if (_lodash2.default.isFunction(_this.props.onClick)) _this.props.onClick(e);
        }, _this.handleLongPress = function (e) {
            if (_lodash2.default.isFunction(_this.props.onLongPress)) _this.props.onLongPress(e);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SSListItem, [{
        key: 'renderIcon',
        value: function renderIcon() {
            var _props = this.props,
                thumb = _props.thumb,
                thumbColor = _props.thumbColor;

            return thumb ? _react2.default.createElement(_SSIcon2.default, { icon: thumb, color: thumbColor }) : null;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var extraStyle = {
                color: '#000',
                fontSize: '0.28rem',
                width: '3.2rem'
            };
            var briefStyle = {
                color: '#868686'
            };

            var otherBriefStyle = {
                color: '#868686',
                height: '0.5rem',
                lineHeight: '0.5rem'
            };

            var extraIconColor = '#1482FF';
            var childR1Icon = '';
            var child2Icon = '';
            var child3Icon = '';
            var child4Icon = '';
            var extraIcon = '';
            var multipleLine = true;
            var arrow = '';
            var extraAlign = 'top';
            var itemHeight = '2rem';
            var _props2 = this.props,
                l1 = _props2.l1,
                r1 = _props2.r1,
                l2 = _props2.l2,
                l2Icon = _props2.l2Icon,
                r2 = _props2.r2,
                r2Icon = _props2.r2Icon,
                l3 = _props2.l3,
                l3Icon = _props2.l3Icon,
                r3 = _props2.r3,
                r3Icon = _props2.r3Icon,
                l4 = _props2.l4,
                l4Icon = _props2.l4Icon,
                r4 = _props2.r4,
                r4Icon = _props2.r4Icon,
                type = _props2.type,
                error = _props2.error,
                wrap = _props2.wrap,
                activeStyle = _props2.activeStyle,
                platform = _props2.platform;

            switch (type) {
                case '0':
                    multipleLine = false;
                    extraStyle.fontSize = '0.34rem';
                    extraStyle.color = '#ACB0BA';
                    extraStyle.lineHeight = '0.5rem';
                    break;
                case '1':
                    multipleLine = false;
                    arrow = 'horizontal';
                    extraAlign = 'middle';
                    extraStyle.fontSize = '0.34rem';
                    extraStyle.color = '#ACB0BA';
                    extraStyle.lineHeight = '0.5rem';
                    break;
                case '2':
                    r2 = '';
                    r3 = '';
                    l4 = '';
                    r4 = '';
                    child2Icon = l2Icon || 'icon-Person';
                    child3Icon = l3Icon || 'icon-Time';
                    extraStyle.width = '2.5rem';
                    itemHeight = '2.3rem';
                    if (r1 == '未确认' || r1 == '未同步') {
                        extraStyle.backgroundColor = '#FFF5E9';
                        extraStyle.color = '#FF9825';
                    } else if (r1 == '未提交') {
                        extraStyle.backgroundColor = '#EFF7FF';
                        extraStyle.color = '#4DA7FF';
                    } else if (r1 == '已确认' || r1 == '已同步') {
                        extraStyle.backgroundColor = '#DCF7DC';
                        extraStyle.color = '#2EB62E';
                    } else if (r1 == '已作废') {
                        extraStyle.backgroundColor = '#FFE6E6';
                        extraStyle.color = '#F94A35';
                    } else if (r1 == '已撤销') {
                        extraStyle.backgroundColor = '#EFF7FF';
                        extraStyle.color = '#148CFF';
                    } else {
                        extraStyle.width = '3.2rem';
                    }
                    break;
                case '3':
                    child2Icon = l2Icon || 'icon-Name';
                    child3Icon = l3Icon || 'icon-Model';
                    child4Icon = l4Icon || 'icon-Number';
                    briefStyle.overflow = 'hidden';
                    extraStyle.width = '2.8rem';
                    itemHeight = '2.95rem';
                    r2 = '';
                    r3 = '';
                    r4 = '';
                    if (r1 == '未同步') {
                        extraStyle.backgroundColor = '#FFF5E9';
                        extraStyle.color = '#FF9825';
                        extraStyle.width = '2.5rem';
                    } else if (r1 == '已同步') {
                        extraStyle.backgroundColor = '#DCF7DC';
                        extraStyle.color = '#2EB62E';
                        extraStyle.width = '2.5rem';
                    } else if (/见证取样/.test(r1) || /委托试验/.test(r1)) {
                        extraStyle.backgroundColor = '#EFF7FF';
                        extraStyle.color = '#3099FF';
                        child4Icon = 'icon-Type';
                    }
                    break;
                case '4':
                    extraStyle.backgroundColor = '#EFF7FF';
                    extraStyle.color = '#3099FF';
                    child4Icon = l4Icon || 'icon-Type';
                    child2Icon = l2Icon || 'icon-Time';
                    briefStyle.height = '0.85rem';
                    briefStyle.lineHeight = '1.2rem';
                    extraStyle.width = '2.6rem';
                    itemHeight = '2rem';
                    r2 = '';
                    l3 = '';
                    r3 = '';
                    l4 = '';
                    r4 = '';
                    break;

                case '5':
                    child2Icon = l2Icon || 'icon-weizhi';
                    extraIcon = r2Icon || 'icon-Time';
                    childR1Icon = 'icon-biaoqian';
                    extraStyle.color = '#fff';
                    extraStyle.fontStyle = 'italic';
                    briefStyle.height = '0.85rem';
                    briefStyle.lineHeight = '1.2rem';
                    briefStyle.width = '87%';
                    extraStyle.width = '1.8rem';
                    itemHeight = '2rem';
                    l3 = '';
                    r3 = '';
                    l4 = '';
                    r4 = '';

                    if (r1 == '0') {
                        extraIconColor = '#17C06E';
                        r1 = '自由态';
                    } else if (r1 == '1') {
                        r1 = '已提交';
                        extraIconColor = '#FF8B35';
                    } else if (r1 == '3') {
                        r1 = '审批通过';
                        extraIconColor = '#3099FF';
                    } else if (r1 == '2') {
                        r1 = '审批中';
                    }
                    break;
                case '6':
                    extraStyle.backgroundColor = '#EFF7FF';
                    extraStyle.color = '#3099FF';
                    extraStyle.width = '2.5rem';
                    itemHeight = '2.35rem';
                    child2Icon = l2Icon || '';
                    child3Icon = l3Icon || '';
                    extraIcon = r3Icon || '';
                    r2 = '';
                    l4 = '';
                    r4 = '';
                    break;
                case '7':
                    if (r1 == '已交底') {
                        extraStyle.backgroundColor = '#EFF7FF';
                        extraStyle.color = '#3099FF';
                    } else if (r1 == '未交底') {
                        extraStyle.backgroundColor = '#FFF3E4';
                        extraStyle.color = '#FF9322';
                    }
                    child2Icon = l2Icon || 'icon-Person';
                    extraIcon = r2Icon || '';
                    briefStyle.height = '0.7rem';
                    briefStyle.lineHeight = '1rem';
                    extraStyle.width = '2.5rem';
                    itemHeight = '2.5rem';
                    r3 = '';
                    l4 = '';
                    r4 = '';
                    break;
                case '8':
                    child2Icon = l2Icon || 'icon-Person';
                    child3Icon = l3Icon || 'icon-Time';
                    extraIcon = r3Icon || '';
                    childR1Icon = 'icon-biaoqian';
                    extraStyle.width = '2.3rem';
                    extraStyle.color = '#fff';
                    extraStyle.fontStyle = 'italic';
                    extraStyle.width = '1.8rem';
                    itemHeight = '2.35rem';
                    r2 = '';
                    r4 = '';
                    if (r1 == '已提交') {
                        extraIconColor = '#17C06E';
                    } else if (r1 == '未提交') {
                        extraIconColor = '#FF8B35';
                    }
                    break;
                case '9':
                    child2Icon = l2Icon || 'icon-Person';
                    child3Icon = l3Icon || '';
                    extraIcon = r2Icon || 'icon-Time';
                    itemHeight = '2.35rem';
                    briefStyle.width = '89%';
                    if (r1 == '已同步') {
                        extraStyle.color = '#75BC97';
                        extraStyle.fontStyle = 'italic';
                    } else if (r1 == '未同步') {
                        extraStyle.color = '#FF8B35';
                    }
                    r4 = '';
                    break;
                case '10':
                    child2Icon = l2Icon || 'icon-shuji';
                    extraIcon = r2Icon || 'icon-Time';
                    itemHeight = '1.7rem';
                    briefStyle.width = '87.5%';
                    r3 = '';
                    l3 = '';
                    l4 = '';
                    r4 = '';
                    break;
                case '11':
                    child2Icon = l2Icon || 'icon-Person';
                    extraIcon = r2Icon || 'icon-Time';
                    childR1Icon = 'icon-biaoqian';
                    extraStyle.color = '#fff';
                    extraStyle.fontStyle = 'italic';
                    briefStyle.height = '0.8rem';
                    briefStyle.lineHeight = '1rem';
                    briefStyle.width = '89%';
                    extraStyle.width = '1.8rem';
                    itemHeight = '2rem';
                    l3 = '';
                    r3 = '';
                    l4 = '';
                    r4 = '';
                    if (r1 == '0') {
                        extraIconColor = '#17C06E';
                        r1 = '自由态';
                    } else if (r1 == '3') {
                        r1 = '审批完成';
                        extraIconColor = '#3099FF';
                    }
                    break;
                case '12':
                    child2Icon = l2Icon || '';
                    extraStyle.color = '#fff';
                    extraStyle.fontStyle = 'italic';
                    briefStyle.height = '0.7rem';
                    briefStyle.lineHeight = '0.8rem';
                    briefStyle.width = '89%';
                    extraStyle.width = '1.8rem';
                    itemHeight = '2rem';
                    r1 = '';
                    r2 = '';
                    l3 = '';
                    r3 = '';
                    l4 = '';
                    r4 = '';
                default:
                    break;

            }
            var childR1 = r1 ? _react2.default.createElement(_SSExtraItem2.default, { text: r1, extraStyle: extraStyle, extraIcon: childR1Icon,
                extraIconColor: extraIconColor }) : null;
            var child2 = l2 ? _react2.default.createElement(_SSListBrief2.default, { text: l2, extra: r2 ? r2 : null, briefStyle: briefStyle,
                icon: child2Icon,
                singLine: r2 ? false : true,
                extraIcon: extraIcon, type: type }) : null;
            var child3 = l3 ? _react2.default.createElement(_SSListBrief2.default, { text: l3, extra: r3 ? r3 : null,
                briefStyle: type === '7' ? otherBriefStyle : briefStyle,
                icon: child3Icon,
                singLine: r3 ? false : true,
                type: type, extraIcon: extraIcon }) : null;
            var child4 = l4 ? _react2.default.createElement(_SSListBrief2.default, { text: l4, extra: r4 ? r4 : null, briefStyle: briefStyle,
                singLine: r4 ? false : true,
                icon: child4Icon }) : null;

            var cls = (0, _classnames2.default)({
                'over-brim': childR1Icon == 'icon-biaoqian' ? true : false

            });
            var l1Cls = (0, _classnames2.default)({
                'single-line': r1 || r1 == '0' ? false : true

            });
            return _react2.default.createElement(
                Item,
                {
                    style: { overflow: childR1Icon == 'icon-biaoqian' ? 'visible' : 'hidden', minHeight: itemHeight },
                    thumb: this.renderIcon(),
                    extra: childR1,
                    arrow: arrow,
                    align: extraAlign,
                    error: error,
                    multipleLine: multipleLine,
                    wrap: wrap,
                    activeStyle: activeStyle,
                    platform: platform,
                    onClick: function onClick(e) {
                        return _this2.onClick(e);
                    },
                    onLongPress: function onLongPress(e) {
                        return _this2.handleLongPress(e);
                    } },
                _react2.default.createElement(
                    'div',
                    { style: { height: '0.5rem', marginBottom: '0.15rem' } },
                    _react2.default.createElement(
                        'span',
                        {
                            className: l1Cls, style: { width: document.documentElement.clientWidth * 0.88 + 'px' } },
                        l1
                    )
                ),
                child2,
                child3,
                child4
            );
        }
    }]);

    return SSListItem;
}(_react.Component);

SSListItem.defaultProps = {
    type: '0',

    wrap: false
};

SSListItem.propTypes = {
    type: _propTypes2.default.string,
    l1: _propTypes2.default.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
    r1: _propTypes2.default.string,
    l2: _propTypes2.default.string,
    r2: _propTypes2.default.string,
    l3: _propTypes2.default.string,
    r3: _propTypes2.default.string,
    l4: _propTypes2.default.string,
    r4: _propTypes2.default.string,
    l2Icon: _propTypes2.default.string,
    r2Icon: _propTypes2.default.string,
    l3Icon: _propTypes2.default.string,
    r3Icon: _propTypes2.default.string,
    r4Icon: _propTypes2.default.string,
    l4Icon: _propTypes2.default.string

};

exports.default = SSListItem;