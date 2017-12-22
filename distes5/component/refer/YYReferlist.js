'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../../common/antd-m/index');

require('../../../css/refer.less');

var _ajax = require('../../utils/ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _RestUrl = require('../../common/RestUrl');

var _RestUrl2 = _interopRequireDefault(_RestUrl);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxItem = _index.Checkbox.CheckboxItem;
var RadioItem = _index.Radio.RadioItem;
var page = void 0;
var referUrl = void 0;
var referParams = void 0;

var YYReferlist = function (_React$Component) {
    _inherits(YYReferlist, _React$Component);

    function YYReferlist(props) {
        _classCallCheck(this, YYReferlist);

        var _this = _possibleConstructorReturn(this, (YYReferlist.__proto__ || Object.getPrototypeOf(YYReferlist)).call(this, props));

        _this.onMultiChange = function (selectedNode) {
            var selectedNodes = _this.state.selectedNodes;
            if (!selectedNodes.some(function (item) {
                return item.id === selectedNode.id;
            })) {
                selectedNodes.push(selectedNode);
                _this.setState({
                    selectedNodes: selectedNodes
                });
            } else {
                var newNodes = [];

                selectedNodes.map(function (item) {
                    if (item.id !== selectedNode.id) {
                        newNodes.push(item);
                    }
                });
                _this.setState({
                    selectedNodes: newNodes
                });
            }
        };

        _this.onSingleChange = function (selectedNode) {

            if (selectedNode.id === _this.state.selectedId) {
                _this.setState({
                    selectedId: null,
                    selectedNode: {}
                });
            } else {
                _this.setState({
                    selectedId: selectedNode.id,
                    selectedNode: selectedNode
                });
            }
        };

        _this.onChangePageNumber = function (value) {
            _this.setState({
                pageNumber: value
            });
            var referUrl = _this.state.referUrl;
            var referParams = {};
            referParams.condition = _this.props.condition;
            if (_this.state.searchText !== '') {
                referParams.searchText = page.state.searchText;
            }
            _this.getListData(referUrl, referParams, value);
        };

        _this.showModal = function (key) {
            return function (e) {
                e.preventDefault();
                _this.setState(_defineProperty({}, key, true));
            };
        };

        _this.onClose = function (key) {
            return function () {
                var referUrl = _this.state.referUrl;
                var referParams = {};
                referParams.condition = _this.props.condition;
                _this.getListData(referUrl, referParams, 1);
                _this.setState(_defineProperty({
                    pageNumber: 1,
                    searchText: ''
                }, key, false));
            };
        };

        _this.onOk = function () {
            _this.setState(_defineProperty({
                pageNumber: 1,
                searchText: ''
            }, 'modal2', false));

            var referUrl = _this.state.referUrl;
            var referParams = {};
            referParams.condition = _this.props.condition;
            _this.getListData(referUrl, referParams, 1);
            if (_this.props.onOk && _lodash2.default.isFunction(_this.props.onOk)) {
                if (!_this.props.multiMode) {
                    _this.props.onOk(_this.state.selectedNode);
                } else {
                    _this.props.onOk(_this.state.selectedNodes);

                    page.setState({
                        selectedNodes: []
                    });
                }
            }
        };

        _this.onSearchSubmit = function (value) {
            page.setState({
                searchText: value
            });
            var referUrl = _this.state.referUrl;
            var referParams = {};
            referParams.searchText = value;
            referParams.condition = _this.props.condition;
            _this.getListData(referUrl, referParams, 1);
        };

        _this.state = {
            modal1: false,
            modal2: false,
            data: [],
            row: [],
            value: '',
            selectedId: null,
            pageNumber: 1,
            selectedNode: {},
            selectedNodes: [],
            animating: false,
            pageCount: '',
            searchText: ''
        };
        return _this;
    }

    _createClass(YYReferlist, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            page = this;

            var referCode = this.props.referCode;

            _ajax2.default.getJSON(_RestUrl2.default.REF_SERVER_URL + _RestUrl2.default.GET_REFINFO_BYCODE, { refCode: referCode }, function (result) {
                if (result.success) {
                    referUrl = result.data.dataurl;
                    referParams = {};
                    page.setState({
                        referName: result.data.refName,
                        referUrl: referUrl
                    });
                    referParams.condition = page.props.condition;
                    referParams.pageSize = 10;
                    page.getListData(referUrl, referParams, 1);
                } else {
                    _index.Toast.fail("请检查参照编码!", 3);
                }
            }, function (err) {
                _index.Toast.fail("服务器通讯异常!", 3);
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextprops) {
            if (nextprops.open) {
                page.setState({
                    modal2: true
                });
            } else {
                page.setState({
                    modal2: false
                });
            }
        }
    }, {
        key: 'getListData',
        value: function getListData(referUrl, referParams, pageNumber) {
            this.setState({
                animating: true
            });
            _ajax2.default.getJSON(referUrl, _lodash2.default.assign({}, referParams, { pageNumber: pageNumber }), function (result) {
                if (result.code === 'success') {
                    page.setState({
                        data: result.data.content,
                        pageCount: result.data.pageCount,
                        animating: false
                    });
                } else {
                    page.setState({
                        animating: false
                    });
                    _index.Toast.fail(result.backMsg, 1);
                }
            }, function (err) {
                page.setState({
                    animating: false
                });
                _index.Toast.fail("服务器通讯异常!", 1);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                value = _state.value,
                selectedId = _state.selectedId,
                animating = _state.animating,
                referName = _state.referName,
                pageCount = _state.pageCount,
                pageNumber = _state.pageNumber,
                data = _state.data;
            var _props = this.props,
                referlabel = _props.referlabel,
                referCode = _props.referCode,
                multiMode = _props.multiMode,
                displayField = _props.displayField,
                disabled = _props.disabled;

            return _react2.default.createElement(
                _index.WingBlank,
                null,
                _react2.default.createElement(_index.WhiteSpace, null),
                _react2.default.createElement(
                    _index.Modal,
                    {
                        popup: true,
                        visible: disabled ? '' : this.state.modal2,
                        maskClosable: false,
                        animationType: 'slide-up'
                    },
                    _react2.default.createElement(
                        'div',
                        { style: { height: '100vh', width: '100vw' } },
                        _react2.default.createElement(
                            _index.NavBar,
                            { leftContent: '\u8FD4\u56DE',
                                key: 'nav',
                                mode: 'light',
                                onLeftClick: this.onClose('modal2'),
                                rightContent: [_react2.default.createElement(
                                    'a',
                                    { key: 'nav', onClick: this.onOk },
                                    '\u786E\u5B9A'
                                )]
                            },
                            referlabel
                        ),
                        _react2.default.createElement(_index.ActivityIndicator, {
                            toast: true,
                            text: '\u52A0\u8F7D\u4E2D...',
                            animating: animating
                        }),
                        _react2.default.createElement(_index.WhiteSpace, null),
                        _react2.default.createElement(_index.SearchBar, { placeholder: '\u641C\u7D22', onSubmit: this.onSearchSubmit }),
                        _react2.default.createElement(
                            _index.List,
                            { className: 'list-content' },
                            this.props.multiMode ? data.map(function (item) {
                                return _react2.default.createElement(
                                    CheckboxItem,
                                    { key: item.id, onChange: function onChange() {
                                            return _this2.onMultiChange(item);
                                        } },
                                    item[displayField]
                                );
                            }) : data.map(function (item) {
                                return _react2.default.createElement(
                                    RadioItem,
                                    { key: item.id, checked: selectedId === item.id,
                                        onChange: function onChange() {
                                            return _this2.onSingleChange(item);
                                        } },
                                    item[displayField]
                                );
                            })
                        ),
                        _react2.default.createElement(_index.Pagination, { total: pageCount,
                            onChange: this.onChangePageNumber,
                            className: 'custom-pagination-with-icon',
                            current: pageCount > 0 ? pageNumber : -1,
                            locale: {
                                prevText: _react2.default.createElement(
                                    'span',
                                    { className: 'arrow-align' },
                                    '\u4E0A\u4E00\u9875'
                                ),
                                nextText: _react2.default.createElement(
                                    'span',
                                    { className: 'arrow-align' },
                                    '\u4E0B\u4E00\u9875'
                                )
                            }
                        })
                    )
                )
            );
        }
    }]);

    return YYReferlist;
}(_react2.default.Component);

exports.default = YYReferlist;

YYReferlist.defaultProps = {
    referlabel: '参照',
    referCode: '00026',
    displayField: 'name',
    referParams: {},
    multiMode: false,
    disabled: false,
    open: false,
    onOk: {},

    condition: {}

};