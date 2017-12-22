'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SSForm = require('../../form/SSForm');

var _SSForm2 = _interopRequireDefault(_SSForm);

var _SSIcon = require('../../icon/SSIcon');

var _SSIcon2 = _interopRequireDefault(_SSIcon);

var _SSImagePicker = require('../SSImagePicker');

var _SSImagePicker2 = _interopRequireDefault(_SSImagePicker);

var _SSSwitch = require('../../switch/SSSwitch');

var _SSSwitch2 = _interopRequireDefault(_SSSwitch);

var _SSButton = require('../../button/SSButton');

var _SSButton2 = _interopRequireDefault(_SSButton);

var _SSPage2 = require('../../page/SSPage');

var _SSPage3 = _interopRequireDefault(_SSPage2);

var _SSInput = require('../../input/SSInput');

var _SSInput2 = _interopRequireDefault(_SSInput);

var _SSRefer = require('../../refer/SSRefer');

var _SSRefer2 = _interopRequireDefault(_SSRefer);

var _SSTextarea = require('../../textarea/SSTextarea');

var _SSTextarea2 = _interopRequireDefault(_SSTextarea);

var _SSTree = require('../../tree/SSTree');

var _SSTree2 = _interopRequireDefault(_SSTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NativeDemo = function (_SSPage) {
    _inherits(NativeDemo, _SSPage);

    function NativeDemo() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, NativeDemo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NativeDemo.__proto__ || Object.getPrototypeOf(NativeDemo)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            searchText: 'fuck'
        }, _this.onClick = function () {
            _this.setState({
                searchText: 'hehe'
            });
        }, _this.treeChange = function (selectedNode) {
            debugger;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(NativeDemo, [{
        key: 'change',
        value: function change(flag) {}
    }, {
        key: 'render',
        value: function render() {
            var source = {
                sourceId: '980474b965bfa7df43fff4208fa7e30',
                sourceType: 'aerialDrawing',
                billType: 'POV01' };
            var form = this.props.form;
            var searchText = this.state.searchText;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _SSForm2.default,
                    null,
                    _react2.default.createElement(
                        _SSButton2.default,
                        { onClick: this.onClick },
                        '\u5475\u5475'
                    ),
                    _react2.default.createElement(_SSImagePicker2.default, { label: '\u9644\u4EF63', source: source }),
                    _react2.default.createElement(_SSIcon2.default, { color: 'red', icon: 'icon-Add' }),
                    _react2.default.createElement(_SSRefer2.default, {
                        field: 'speakerUnitId',
                        icon: 'icon-xingzhuang1',
                        iconColor: '#FFBF00',
                        label: '\u4E3B\u8BB2\u5355\u4F4D',
                        referName: '\u4E3B\u8BB2\u5355\u4F4D\u53C2\u7167',
                        multiMode: true,

                        referCode: '00026',
                        form: form,
                        referStyle: 'list'
                    }),
                    _react2.default.createElement(_SSInput2.default, { showIcon: false, label: '\u6D4B\u8BD5\u56FE\u6807\u7C89\u4E1D\u53D1\u751F\u7684\u653E\u677E\u653E\u677E\u9632\u6C34', form: form }),
                    _react2.default.createElement(_SSTextarea2.default, { required: true, field: 'area', value: 'haha', form: form, label: '\u6587\u672C\u57DF' }),
                    _react2.default.createElement(_SSSwitch2.default, { showIcon: false, field: 'switch', value: true, form: form, label: '\u5F00\u5173', unCheckedText: '\u4E0D\u901A\u8FC7', checkedText: '\u901A\u8FC7', onChange: this.change }),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('input', { type: 'number' }),
                        _react2.default.createElement('input', { type: 'number' }),
                        _react2.default.createElement('input', { type: 'number' }),
                        _react2.default.createElement('input', { type: 'number' }),
                        _react2.default.createElement('input', { type: 'number' })
                    )
                )
            );
        }
    }]);

    return NativeDemo;
}(_SSPage3.default);

exports.default = _SSForm2.default.create()(NativeDemo);