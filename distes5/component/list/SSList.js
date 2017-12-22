'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('antd-mobile/lib/index');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('../../../css/SSList.css');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactWeui = require('react-weui');

var _ajax = require('../../utils/ajax');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var index = 1;
var page = void 0;
var pageIndex = 0;
var defaultParams = {};
defaultParams.pageNumber = 0;
defaultParams.pageSize = 10;

var SSList = function (_Component) {
    _inherits(SSList, _Component);

    function SSList(props) {
        _classCallCheck(this, SSList);

        var _this = _possibleConstructorReturn(this, (SSList.__proto__ || Object.getPrototypeOf(SSList)).call(this, props));

        _this.finishRequest = function (backData) {
            if (page.props.initData) page.props.initData(backData);
            setTimeout(function () {
                page.setState({
                    dataSource: page.state.dataSource.cloneWithRows([page.props.children]),
                    backData: backData,
                    refreshing: false,
                    finish: false
                });
                index = 1;
            }, 10);
        };

        _this.noData = function () {
            _index.Toast.fail('暂无数据！', 1);
            page.finishRequest([]);
        };

        _this.initData = function (url, params) {
            _ajax2.default.postJSON(url, params, function (result) {
                if (result && result.code === 'success') {
                    page.setState({
                        data: result.data.content,
                        count: result.data.count
                    });
                    page.finishRequest(result.data.content);
                } else if (result && result.success) {
                    if (result.backData) {
                        var content = result.backData.content;
                        if (_lodash2.default.isArray(content) && content.length > 0) {
                            page.setState({
                                data: content,
                                count: result.backData.totalElements
                            });
                            page.finishRequest(content);
                        } else {
                            page.noData();
                        }
                    } else {
                        page.noData();
                    }
                } else {

                    _index.Toast.fail(result.backMsg, 1);
                    page.setState({
                        refreshing: false
                    });
                }
            }, function (err) {
                _index.Toast.fail("服务器通讯异常!", 1);
                page.setState({
                    refreshing: false
                });
            });
        };

        _this.getListData = function (referUrl, pageNumber) {
            var newParams = Object.assign({}, defaultParams, _this.props.params);
            newParams.pageNumber = pageNumber;
            page.setState({
                banLoad: true
            });
            _ajax2.default.postJSON(referUrl, newParams, function (result) {
                page.setState({
                    banLoad: false
                });
                if (result && result.code === 'success') {
                    page.setState({
                        data: page.state.data.concat(result.data.content)

                    });
                    if (page.props.onLoadMore) page.props.onLoadMore(page.state.data);
                } else if (result && result.success) {
                    if (result.backData) {
                        page.setState({
                            data: page.state.data.concat(result.backData.content),
                            dataSource: page.state.dataSource.cloneWithRows([page.props.children])

                        });

                        if (page.props.onLoadMore) page.props.onLoadMore(page.state.data);
                    }
                } else {
                    _index.Toast.fail(result.backMsg, 3);
                }
            }, function (err) {
                page.setState({
                    banLoad: false
                });
                _index.Toast.fail("服务器通讯异常!", 3);
            });
        };

        _this.finish = function () {
            _this.setState({
                finish: true,
                loading: false
            });
        };

        _this.resolveLoading = function () {
            _this.setState({
                finish: false
            });
        };

        _this.onLoadMore = function (resolve, finish) {
            if (_this.state.data.length === _this.state.count) {
                finish();
            } else {
                _this.getListData(_this.props.url, index);
                resolve();
                index++;
            }
        };

        _this.onScroll = function (e) {
            var clientHeight = _this.state.height;
            var contentHeight = e.scroller.__contentHeight;

            _this.st = e.scroller.getValues().top;
            _this.domScroller = e;
            if (_this.state.banLoad || _this.state.finish || _this.st <= 0 || contentHeight < clientHeight) return;
            var scrollPercent = Math.floor((_this.st + clientHeight) / contentHeight * 100);
            if (scrollPercent >= _this.props.triggerPercent) {
                _this.setState({
                    loading: true
                });
                _this.onLoadMore(_this.resolveLoading, _this.finish);
            }
        };

        _this.onRefresh = function () {
            if (!_this.manuallyRefresh) {
                _this.setState({ refreshing: true });
                var newParams = Object.assign({}, defaultParams, _this.props.params);
                _this.initData(_this.props.url, newParams);
            } else {
                _this.manuallyRefresh = false;
            }
        };

        var dataSource = new _index.ListView.DataSource({
            rowHasChanged: function rowHasChanged(row1, row2) {
                return true;
            }
        });

        _this.state = {
            dataSource: dataSource.cloneWithRows([]),
            refreshing: false,
            height: document.documentElement.clientHeight,
            loading: false,
            finish: false,
            data: [],
            scrollTimer: null,
            items: _this.props.children

        };
        return _this;
    }

    _createClass(SSList, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.params !== this.props.params || nextProps.url !== this.props.url) {
                this.setState({
                    refreshing: true,
                    finish: false,
                    loading: false
                });
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            page = this;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.manuallyRefresh = true;
            setTimeout(function () {
                return _this2.setState({ refreshing: true });
            }, 10);

            setTimeout(function () {
                return _this2.setState({
                    height: _this2.state.height - _reactDom2.default.findDOMNode(_this2.refs.lv).offsetTop
                });
            }, 0);

            this.refs.lv.getInnerViewNode().addEventListener('touchstart', this.ts = function (e) {
                _this2.tsPageY = e.touches[0].pageY;
            });
            this.refs.lv.getInnerViewNode().addEventListener('touchmove', this.tm = function (e) {
                _this2.tmPageY = e.touches[0].pageY;
                if (_this2.tmPageY > _this2.tsPageY && _this2.st <= 0 && document.body.scrollTop > 0) {
                    _this2.domScroller.options.preventDefaultOnTouchMove = false;
                } else {
                    _this2.domScroller.options.preventDefaultOnTouchMove = undefined;
                }
            });

            var newParams = Object.assign({}, defaultParams, this.props.params);
            this.initData(this.props.url, newParams);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.refs.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
            this.refs.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                renderHeader = _props.renderHeader,
                multiLine = _props.multiLine,
                loaderLoadingIcon = _props.loaderLoadingIcon,
                loaderDefaultIcon = _props.loaderDefaultIcon;
            var _state = this.state,
                refreshing = _state.refreshing,
                finish = _state.finish,
                loading = _state.loading;

            var cls = (0, _classnames2.default)({
                'my-list': true,
                'list-special': multiLine ? true : false

            });

            var row = function row(rowData, sectionID, rowID) {
                return _react2.default.createElement(
                    'div',
                    { key: rowID
                    },
                    !refreshing ? children : []
                );
            };

            return _react2.default.createElement(_index.ListView, {
                className: cls,
                ref: 'lv',
                dataSource: this.state.dataSource,
                renderRow: row,
                initialListSize: 5,
                pageSize: 5,
                scrollRenderAheadDistance: 200,
                scrollEventThrottle: 20,
                renderFooter: function renderFooter() {
                    return _react2.default.createElement(
                        'div',
                        { style: { padding: 5, textAlign: 'center' } },
                        refreshing ? '' : finish ? loaderDefaultIcon : loading ? loaderLoadingIcon : false
                    );
                },
                style: {
                    height: this.state.height,
                    margin: '0',
                    background: '#f8f8f8'
                },
                scrollerOptions: { scrollbars: true },
                refreshControl: _react2.default.createElement(_index.RefreshControl, {
                    refreshing: this.state.refreshing,
                    onRefresh: this.onRefresh
                }),
                onScroll: this.onScroll
            });
        }
    }]);

    return SSList;
}(_react.Component);

SSList.propTypes = {
    params: _propTypes2.default.object,
    url: _propTypes2.default.string,
    initData: _propTypes2.default.func,
    onLoadMore: _propTypes2.default.func

};

SSList.defaultProps = {
    loaderLoadingIcon: _react2.default.createElement(
        _reactWeui.LoadMore,
        { loading: true },
        ' \u52A0\u8F7D\u4E2D... '
    ),
    loaderDefaultIcon: _react2.default.createElement(
        _reactWeui.LoadMore,
        { showLine: true },
        ' \u65E0\u66F4\u591A\u6570\u636E '
    ),
    triggerPercent: 100,
    url: '',
    params: {}

};

exports.default = SSList;