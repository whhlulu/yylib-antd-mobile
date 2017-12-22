'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _modal = require('antd-mobile/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd-mobile/lib/modal/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _YYImagePicker = require('../YYImagePicker');

var _YYImagePicker2 = _interopRequireDefault(_YYImagePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var alert = _modal2.default.alert;

var YYImagepickerDemo = function (_React$Component) {
    _inherits(YYImagepickerDemo, _React$Component);

    function YYImagepickerDemo(props) {
        _classCallCheck(this, YYImagepickerDemo);

        var _this = _possibleConstructorReturn(this, (YYImagepickerDemo.__proto__ || Object.getPrototypeOf(YYImagepickerDemo)).call(this, props));

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

    _createClass(YYImagepickerDemo, [{
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            var source = {
                sourceId: '980474b965bfa7df43fff4208fa7e30',
                sourceType: 'aerialDrawing',
                billType: 'POV01' };
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_YYImagePicker2.default, { label: '\u6DFB\u52A0\u9644\u4EF6', source: source })
            );
        }
    }]);

    return YYImagepickerDemo;
}(_react2.default.Component);

exports.default = YYImagepickerDemo;