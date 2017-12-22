'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flex = require('antd-mobile/lib/flex');

var _flex2 = _interopRequireDefault(_flex);

var _wingBlank = require('antd-mobile/lib/wing-blank');

var _wingBlank2 = _interopRequireDefault(_wingBlank);

var _button = require('antd-mobile/lib/button');

var _button2 = _interopRequireDefault(_button);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd-mobile/lib/flex/style/css');

require('antd-mobile/lib/wing-blank/style/css');

require('antd-mobile/lib/button/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SSIcon = require('../icon/SSIcon');

var _SSIcon2 = _interopRequireDefault(_SSIcon);

require('../../../css/SSButton.css');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YYButton = function (_React$Component) {
  _inherits(YYButton, _React$Component);

  function YYButton(props) {
    _classCallCheck(this, YYButton);

    var _this = _possibleConstructorReturn(this, (YYButton.__proto__ || Object.getPrototypeOf(YYButton)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(YYButton, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      var children = void 0;
      var _props = this.props,
          type = _props.type,
          text = _props.text,
          onClick = _props.onClick,
          rClick = _props.rClick,
          lClick = _props.lClick,
          rText = _props.rText,
          lText = _props.lText,
          cText = _props.cText,
          disabled = _props.disabled,
          fix = _props.fix,
          ldisabled = _props.ldisabled,
          cdisabled = _props.cdisabled,
          rdisabled = _props.rdisabled,
          cClick = _props.cClick;


      switch (type) {
        case 'fill':
          children = _react2.default.createElement(
            _button2.default,
            {
              className: (0, _classnames2.default)({ 'pjtGreenBtn': 1, 'no_radius': 1, 'fix_btn': fix, 'disabledStyle': disabled }),
              activeStyle: false,
              type: 'primary',
              style: this.props.style,
              onClick: disabled ? '' : onClick },
            text
          );
          break;
        case 'center':
          children = _react2.default.createElement(
            _wingBlank2.default,
            { size: 'sm' },
            _react2.default.createElement(
              _button2.default,
              {
                className: (0, _classnames2.default)({ 'pjtGreenBtn': 1, 'disabledStyle': disabled }),
                activeStyle: false,
                type: 'primary',
                onClick: disabled ? '' : onClick },
              text
            )
          );
          break;
        case 'dashed':
          children = _react2.default.createElement(
            _wingBlank2.default,
            { size: 'lg' },
            _react2.default.createElement(
              _button2.default,
              {
                className: 'dottedBtn',
                style: this.props.style,
                activeStyle: false,
                type: 'ghost',
                onClick: onClick },
              text
            )
          );
          break;
        case 'add':
          children = _react2.default.createElement(
            'div',
            { className: 'fix_center_btn', onClick: onClick },
            _react2.default.createElement(_SSIcon2.default, { icon: 'icon-Add', color: '#ffffff' })
          );
          break;
        case 'left-right':
          children = _react2.default.createElement(
            _wingBlank2.default,
            { size: 'lg' },
            _react2.default.createElement(
              _flex2.default,
              null,
              _react2.default.createElement(
                _flex2.default.Item,
                null,
                _react2.default.createElement(
                  _button2.default,
                  {
                    className: (0, _classnames2.default)({ 'pjtPompadourBtn': 1, 'disabledStyle': ldisabled }),
                    activeStyle: false,
                    type: 'primary',
                    style: this.props.lStyle,
                    onClick: ldisabled ? '' : lClick },
                  lText
                )
              ),
              _react2.default.createElement(
                _flex2.default.Item,
                null,
                _react2.default.createElement(
                  _button2.default,
                  {
                    style: this.props.rStyle,
                    className: (0, _classnames2.default)({ 'pjtGreenBtn': 1, 'disabledStyle': rdisabled }),
                    activeStyle: false,
                    type: 'primary',
                    onClick: rdisabled ? '' : rClick },
                  rText
                )
              )
            )
          );
          break;
        case 'footer':
          children = _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)({ 'footer_btn': 1, 'fix_btn': 1 }) },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'span',
                { onClick: ldisabled ? '' : lClick,
                  className: (0, _classnames2.default)({ 'disabledStyle2': ldisabled }) },
                _react2.default.createElement(_SSIcon2.default, {
                  icon: 'icon-bohui',
                  color: ldisabled ? '#808080' : '#19AF19' }),
                _react2.default.createElement(
                  'span',
                  { style: { marginLeft: '5px' } },
                  lText
                )
              ),
              _react2.default.createElement(
                'span',
                { onClick: cdisabled ? '' : cClick,
                  className: (0, _classnames2.default)({ 'disabledStyle2': cdisabled }) },
                _react2.default.createElement(_SSIcon2.default, {
                  icon: 'icon-shanchu1',
                  color: cdisabled ? '#808080' : '#FA503C' }),
                _react2.default.createElement(
                  'span',
                  { style: { marginLeft: '5px' } },
                  cText
                )
              )
            ),
            _react2.default.createElement(
              'span',
              { className: (0, _classnames2.default)({ 'right_btn': 1, 'disabledStyle': rdisabled }), onClick: rdisabled ? '' : rClick },
              rText
            )
          );
          break;
        default:
          break;
      }
      return _react2.default.createElement(
        'div',
        null,
        children
      );
    }
  }]);

  return YYButton;
}(_react2.default.Component);

YYButton.defaultProps = {
  type: 'fill',
  text: '保存',
  onClick: function onClick() {
    return false;
  },
  rClick: function rClick() {
    return false;
  },
  cClick: function cClick() {
    return false;
  },
  lClick: function lClick() {
    _reactRouter.hashHistory.goBack();
  },
  rText: '保存',
  lText: '取消',
  cText: '删除',
  fix: 0,
  disabled: 0,
  ldisabled: 0,
  cdisabled: 0,
  rdisabled: 0
};
exports.default = YYButton;