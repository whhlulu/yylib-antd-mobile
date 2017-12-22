'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SSIcon = require('../icon/SSIcon');

var _SSIcon2 = _interopRequireDefault(_SSIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SSExtraItem = function (_Component) {
    _inherits(SSExtraItem, _Component);

    function SSExtraItem() {
        _classCallCheck(this, SSExtraItem);

        return _possibleConstructorReturn(this, (SSExtraItem.__proto__ || Object.getPrototypeOf(SSExtraItem)).apply(this, arguments));
    }

    _createClass(SSExtraItem, [{
        key: 'renderBackgroundImg',
        value: function renderBackgroundImg() {
            var _props = this.props,
                extraIcon = _props.extraIcon,
                extraIconColor = _props.extraIconColor;

            {}

            return extraIcon ? _react2.default.createElement(_SSIcon2.default, { icon: extraIcon, size: 'md', color: extraIconColor }) : null;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                text = _props2.text,
                extraStyle = _props2.extraStyle,
                extraIcon = _props2.extraIcon;

            var cls = (0, _classnames2.default)({
                'listItem-extra': true,
                'listItem-extra-backgroundColor': extraIcon || extraStyle.backgroundColor ? false : true,
                'listItem-extra-backgroundImg': extraIcon ? true : false

            });

            return _react2.default.createElement(
                'div',
                null,
                this.renderBackgroundImg(),
                _react2.default.createElement(
                    'span',
                    { className: cls, style: extraStyle },
                    text
                )
            );
        }
    }]);

    return SSExtraItem;
}(_react.Component);

exports.default = SSExtraItem;