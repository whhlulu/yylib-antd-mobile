'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('antd-mobile/lib/index');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SSIcon = function (_Component) {
    _inherits(SSIcon, _Component);

    function SSIcon() {
        _classCallCheck(this, SSIcon);

        return _possibleConstructorReturn(this, (SSIcon.__proto__ || Object.getPrototypeOf(SSIcon)).apply(this, arguments));
    }

    _createClass(SSIcon, [{
        key: 'render',
        value: function render() {
            var icon = this.props.icon;

            var svg = void 0;
            if (icon) {
                try {
                    svg = require('../../../svg/' + icon + '.svg');
                } catch (e) {
                    console.error(e);
                } finally {}
            }
            return _react2.default.createElement(_index.Icon, _extends({}, this.props, { type: svg }));
        }
    }]);

    return SSIcon;
}(_react.Component);

SSIcon.defaultProps = {
    icon: '',
    color: '#868686',
    size: 'xxs'
};

SSIcon.propTypes = {
    type: _propTypes2.default.string,
    color: _propTypes2.default.string,
    size: _propTypes2.default.string
};

exports.default = SSIcon;