'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SSForm = require('../../form/SSForm');

var _SSForm2 = _interopRequireDefault(_SSForm);

var _SSPage2 = require('../../page/SSPage');

var _SSPage3 = _interopRequireDefault(_SSPage2);

var _SSList = require('../../list/SSList');

var _SSList2 = _interopRequireDefault(_SSList);

var _SSListItem = require('../../list/SSListItem');

var _SSListItem2 = _interopRequireDefault(_SSListItem);

var _SSNavBar = require('../../navbar/SSNavBar');

var _SSNavBar2 = _interopRequireDefault(_SSNavBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var url = 'https://dev.yonyouccs.com/icop-technology-web/tAStieManWorkInstru/queryList';

var ListDemo = function (_SSPage) {
    _inherits(ListDemo, _SSPage);

    function ListDemo(props) {
        _classCallCheck(this, ListDemo);

        var _this = _possibleConstructorReturn(this, (ListDemo.__proto__ || Object.getPrototypeOf(ListDemo)).call(this, props));

        _this.initData = function (result) {
            _this.setState({
                ListData: result
            });
        };

        _this.onLoadMore = function (result) {
            _this.setState({
                ListData: result
            });
        };

        _this.onClick = function (e) {
            console.log('onClick', e);
        };

        _this.state = {
            ListData: []
        };
        return _this;
    }

    _createClass(ListDemo, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                _SSForm2.default,
                null,
                _react2.default.createElement(_SSNavBar2.default, {
                    title: '\u4F8B\u5B50'
                }),
                _react2.default.createElement(
                    _SSList2.default,
                    { multiLine: true, url: url, initData: this.initData, onLoadMore: this.onLoadMore },
                    _react2.default.createElement(_SSListItem2.default, {
                        type: '2',
                        l1: '\u677F\u7B4B\u5B89\u88C5',
                        r1: '2017-03-21\u5B8C\u6210',
                        l2: '\u94A2\u7B4B\u5DE5\u957F\uFF1A\u5F20\u4E09',

                        l3: '\u8BA1\u5212\u5B8C\u6210\u65F6\u95F4:2017-03-21',
                        onClick: function onClick(e) {
                            return _this2.onClick(e);
                        }
                    }),
                    _react2.default.createElement(_SSListItem2.default, {
                        type: '2',
                        l1: '\u677F\u7B4B\u5B89\u88C5',
                        r1: '\u672A\u786E\u8BA4',
                        l2: '\u94A2\u7B4B\u5DE5\u957F\uFF1A\u5F20\u4E09',
                        l3: '\u8BA1\u5212\u5B8C\u6210\u65F6\u95F4:2017-03-21',
                        onClick: function onClick(e) {
                            return _this2.onClick(e);
                        }
                    }),
                    _react2.default.createElement(_SSListItem2.default, {
                        type: '3',
                        l1: '\u9A8C\u653620160403',
                        r1: '\u5DF2\u540C\u6B65',
                        l2: '\u7269\u8D44\u540D\u79F0\uFF1A\u94A2\u7B4B',
                        l3: '\u578B\u53F7:HRB40032',
                        l4: '\u53D6\u6837\u901A\u77E5\u5355\u7F16\u53F7\uFF1AAAAAAAAAAAAAAAA',
                        onClick: function onClick(e) {
                            return _this2.onClick(e);
                        }
                    }),
                    _react2.default.createElement(_SSListItem2.default, {
                        type: '3',
                        l1: '\u9A8C\u653620160403',
                        r1: '\u89C1\u8BC1\u53D6\u68370\u6B21',
                        l2: '\u7269\u8D44\u540D\u79F0\uFF1A\u94A2\u7B4B',
                        l3: '\u578B\u53F7:HRB40032',
                        l4: '\u5355\u636E\u7C7B\u578B\uFF1A\u94A2\u7B4B\u539F\u6750\u53D6\u6837\u901A\u77E5\u5355',
                        onClick: function onClick(e) {
                            return _this2.onClick(e);
                        }
                    }),
                    _react2.default.createElement(_SSListItem2.default, {
                        type: '4',
                        l1: '\u56FE\u7EB8\u7F16\u53F7\uFF1A\u4F1A\u62400526',
                        r1: '\u7ED3\u6784\u65BD\u5DE5\u56FE',
                        l2: '\u671F\u95F4\uFF1A2017\u5E743\u6708\u7B2C2\u5468',
                        onClick: function onClick(e) {
                            return _this2.onClick(e);
                        }
                    }),
                    _react2.default.createElement(_SSListItem2.default, {
                        type: '5',
                        l1: 'TSK0986001',
                        r1: '\u81EA\u7531\u6001',
                        l2: '\u65BD\u5DE5\u90E8\u4F4D',
                        r2: '\u4EA4\u5E95\u65E5\u671F 2017-03-06',
                        onClick: function onClick(e) {
                            return _this2.onClick(e);
                        }
                    }),
                    _react2.default.createElement(_SSListItem2.default, {
                        type: '6',
                        l1: 'TSK0986001',
                        r1: '\u94A2\u7B4B\u539F\u6750\u6599',
                        l2: '\u94A2\u7B4B\u539F\u6750\u6599',
                        l3: '\u89C4\u683C\u578B\u53F7\uFF1ATKB400E',
                        r3: '\u590D\u6838\u6574\u6539\u5355\u6570\u91CF3',
                        onClick: function onClick(e) {
                            return _this2.onClick(e);
                        }
                    }),
                    _react2.default.createElement(_SSListItem2.default, {
                        type: '7',
                        l1: 'TSK0986001',
                        r1: '\u672A\u4EA4\u5E95',
                        l2: '\u68C0\u67E5\u4EBA\uFF1A\u9648\u6D77',
                        r2: '\u590D\u6838\u6574\u6539\u5355\u6570\u91CF3',
                        onClick: function onClick(e) {
                            return _this2.onClick(e);
                        }
                    }),
                    _react2.default.createElement(_SSListItem2.default, {
                        type: '8',
                        l1: 'TSK0986001',
                        r1: '\u5DF2\u63D0\u4EA4',
                        l2: '\u65BD\u5DE5\u7EC4\u7EC7\u8BBE\u8BA1\u540D\u79F0\uFF1A\u9648\u6D77',
                        l3: '\u590D\u6838\u65E5\u671F 2017-03-06',
                        r3: '\u5DF2\u540C\u6B65',
                        onClick: function onClick(e) {
                            return _this2.onClick(e);
                        }
                    }),
                    _react2.default.createElement(_SSListItem2.default, {
                        type: '9',
                        l1: 'TSK0986001',
                        r1: '\u5DF2\u540C\u6B65',
                        l2: '\u6574\u6539\u8D23\u4EFB\u4EBA\uFF1A\u9648\u6D77',
                        r2: '\u590D\u6838\u65E5\u671F 2017-03-06',
                        l3: '\u540A\u7BEE\u4F5C\u4E1A\u672A\u91C7\u53D6\u9632\u6446\u52A8\u63AA\u65BD\u6216\u540A\u5170\u94A2\u4E1D\u7EF3\u5782\u6389\u4E0B\u62C9\uFF0C\u9700\u8981\u6CE8\u610F\u6216\u540A\u5170\u94A2\u4E1D\u7EF3\u5782\u6389\u4E0B\u62C9\uFF0C\u9700\u8981\u6CE8\u610F',
                        onClick: function onClick(e) {
                            return _this2.onClick(e);
                        }
                    }),
                    _react2.default.createElement(_SSListItem2.default, {
                        type: '10',
                        l1: 'TSK0986001',
                        r1: '\u5DF2\u540C\u6B65',
                        l2: '\u540D\u79F0\uFF1A123',
                        r2: '\u590D\u6838\u65E5\u671F 2017-03-06',
                        onClick: function onClick(e) {
                            return _this2.onClick(e);
                        }
                    }),
                    _react2.default.createElement(_SSListItem2.default, {
                        type: '11',
                        l1: 'TSK0986001',
                        r1: '\u81EA\u7531\u6001',
                        l2: '\u4E3B\u8BB2\u4EBA\uFF1A\u4E07\u8FBE\u7ECF\u7406',
                        r2: '\u4EA4\u5E95\u65E5\u671F 2017-03-06',
                        onClick: function onClick(e) {
                            return _this2.onClick(e);
                        }
                    }),
                    _react2.default.createElement(_SSListItem2.default, {
                        type: '11',
                        l1: 'TSK0986001TSK0986001TSK0986001TSK0986001TSK0986001TSK0986001TSK0986001TSK0986001',
                        l2: '\u4E3B\u8BB2\u4EBA\uFF1A\u4E07\u8FBE\u7ECF\u7406',
                        r2: '\u4EA4\u5E95\u65E5\u671F 2017-03-06',
                        onClick: function onClick(e) {
                            return _this2.onClick(e);
                        }
                    }),
                    _react2.default.createElement(_SSListItem2.default, {
                        type: '12',
                        l1: _react2.default.createElement(
                            'span',
                            null,
                            '\u780C\u4F53\u5DE5\u7A0B\u5B9E\u6D4B\u5B9E\u91CF\uFF1A',
                            _react2.default.createElement(
                                'em',
                                { style: { fontStyle: 'normal', color: 'red' } },
                                '94.81%'
                            )
                        ),
                        l2: 'E\u533A-\u5546\u4E1A\u8857-\u5E97\u9762E\u533A-\u5546\u4E1A\u8857-\u5E97\u9762E\u533A-\u5546\u4E1A\u8857-\u5E97\u9762E\u533A-\u5546\u4E1A\u8857-\u5E97\u9762E\u533A-\u5546\u4E1A\u8857-\u5E97\u9762E\u533A-\u5546\u4E1A\u8857-\u5E97\u9762E\u533A-\u5546\u4E1A\u8857-\u5E97\u9762',
                        onClick: function onClick(e) {
                            return _this2.onClick(e);
                        }
                    })
                )
            );
        }
    }]);

    return ListDemo;
}(_SSPage3.default);

exports.default = _SSForm2.default.create()(ListDemo);