'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _YYReferlist = require('../YYReferlist');

var _YYReferlist2 = _interopRequireDefault(_YYReferlist);

var _index = require('antd-mobile/lib/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YYreferDemo = function (_React$Component) {
    _inherits(YYreferDemo, _React$Component);

    function YYreferDemo(props) {
        _classCallCheck(this, YYreferDemo);

        var _this = _possibleConstructorReturn(this, (YYreferDemo.__proto__ || Object.getPrototypeOf(YYreferDemo)).call(this, props));

        _this.openRefer = function () {
            _this.setState({
                open: true
            });
        };

        _this.onOk = function (value) {
            console.log(value);
            _this.setState({
                open: false
            });
        };

        _this.state = {
            init: '',
            open: false
        };
        return _this;
    }

    _createClass(YYreferDemo, [{
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _index.Button,
                    { onClick: this.openRefer },
                    '\u70B9\u51FB\u9009\u62E9\u53C2\u7167'
                ),
                _react2.default.createElement(_YYReferlist2.default, {
                    onOk: this.onOk,
                    multiMode: true,
                    open: this.state.open
                })
            );
        }
    }]);

    return YYreferDemo;
}(_react2.default.Component);

exports.default = YYreferDemo;