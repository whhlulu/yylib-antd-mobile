'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _badge = require('antd-mobile/lib/badge');

var _badge2 = _interopRequireDefault(_badge);

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd-mobile/lib/badge/style/css');

require('antd-mobile/lib/list/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _YYButton = require('../YYButton');

var _YYButton2 = _interopRequireDefault(_YYButton);

var _YYList = require('../../list/YYList');

var _YYList2 = _interopRequireDefault(_YYList);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = _list2.default.Item;
var Brief = Item.Brief;

var SS = function (_React$Component) {
    _inherits(SS, _React$Component);

    function SS(props) {
        _classCallCheck(this, SS);

        var _this = _possibleConstructorReturn(this, (SS.__proto__ || Object.getPrototypeOf(SS)).call(this, props));

        _this.onreached = function (fun) {
            var rows = [{ headurl: '', name: '张十六', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张十七', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张十八', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张十九', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张二十', dept: '管理部', company: '用友建筑' }];
            var row = [].concat(_toConsumableArray(_this.state.row), rows);
            _this.setState({
                row: row
            });
            fun();
        };

        _this.state = {
            init: [{ headurl: '', name: '张一', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张二', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张三', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张四', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张五', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张六', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张七', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张八', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张九', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张十', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张十一', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张十二', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张十三', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张十四', dept: '管理部', company: '用友建筑' }, { headurl: '', name: '张十五', dept: '管理部', company: '用友建筑' }],
            row: []
        };
        return _this;
    }

    _createClass(SS, [{
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log('1');
        }
    }, {
        key: 'render',
        value: function render() {
            var head = function head(url, name, index) {
                if (url == '' || url == undefined) {
                    var headColor = 'headColor' + index % 4;

                    var nameLast = name.substr(name.length - 1, 1);
                    return _react2.default.createElement(
                        'div',
                        { classname: "headLast" + " " + 'headColor0' },
                        _react2.default.createElement(
                            'span',
                            { style: { color: 'white' } },
                            nameLast
                        )
                    );
                } else {
                    return url;
                }
            };
            var row = function row(rowData, sectionID, rowID) {
                return _react2.default.createElement(
                    'div',
                    { key: rowID },
                    _react2.default.createElement(
                        _list2.default,
                        { classname: 'my-list' },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: "/personInfo/" + rowID, key: rowID },
                            _react2.default.createElement(
                                Item,
                                { thumb: head(rowData.headUrl, rowData.name, rowID), onClick: function onClick() {
                                        {}
                                    }, multipleLine: true, extra: rowData.dept },
                                rowData.name,
                                rowData.isUser == '1' ? '' : _react2.default.createElement(_badge2.default, { text: '\u672A\u6FC0\u6D3B', style: { marginLeft: 12, padding: '0 3px', backgroundColor: '#A8A8A8', borderRadius: 2 } }),
                                _react2.default.createElement(
                                    Brief,
                                    null,
                                    rowData.company
                                )
                            )
                        )
                    )
                );
            };
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_YYButton2.default, null),
                _react2.default.createElement(_YYList2.default, { init: this.state.init, row: this.state.row, reached: this.onreached, isreached: true, chilren: row })
            );
        }
    }]);

    return SS;
}(_react2.default.Component);

exports.default = SS;