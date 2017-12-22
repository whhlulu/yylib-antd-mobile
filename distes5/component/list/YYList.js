'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../../common/antd-m/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = _index.List.Item;
var Brief = Item.Brief;

function MyBody(props) {
    return _react2.default.createElement(
        'div',
        { className: 'am-list-body my-body' },
        props.children
    );
}

var YYListview = function (_React$Component) {
    _inherits(YYListview, _React$Component);

    function YYListview(props) {
        _classCallCheck(this, YYListview);

        var _this = _possibleConstructorReturn(this, (YYListview.__proto__ || Object.getPrototypeOf(YYListview)).call(this, props));

        _this.onRefresh = function () {
            _this.setState({ refreshing: true, isLoading: true });
            setTimeout(function () {
                _this.rData = _this.props.init;
                _this.setState({
                    dataSource: _this.state.dataSource.cloneWithRows(_this.rData),
                    refreshing: false,
                    isLoading: false
                });
                console.log('----> refresh');
            }, 600);
        };

        _this.onEndReached = function (event) {

            var _self = _this;
            if (!_self.props.isreached) {
                return false;
            }
            _this.props.reached(function () {
                if (_self.state.isLoading && !_self.state.hasMore) {
                    return;
                }
                console.log('reach end', event);
                _self.setState({ isLoading: true });
                setTimeout(function () {
                    _self.rData = [].concat(_toConsumableArray(_self.state.initdata), _toConsumableArray(_self.props.row));
                    console.log('rData render already');
                    _self.setState({
                        dataSource: _self.state.dataSource.cloneWithRows(_self.rData),
                        isLoading: false
                    });
                }, 1000);
            });
        };

        var dataSource = new _index.ListView.DataSource({
            rowHasChanged: function rowHasChanged(row1, row2) {
                return row1 !== row2;
            }
        });

        _this.state = {
            dataSource: dataSource,
            isLoading: true,
            refreshing: false,
            initdata: '',
            footer: '' };
        return _this;
    }

    _createClass(YYListview, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            setTimeout(function () {
                var data = _this2.props.init;
                if (_this2.props.isreached) {
                    _this2.setState({
                        footer: '加载完成'
                    });
                } else {
                    _this2.setState({
                        footer: ''
                    });
                }
                _this2.setState({
                    initdata: data,
                    dataSource: _this2.state.dataSource.cloneWithRows(data),
                    isLoading: false
                });
            }, 0);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var refreshing = this.state.refreshing;
            var _props = this.props,
                children = _props.children,
                onEndReachedhold = _props.onEndReachedhold,
                height = _props.height;

            var head = function head(url, name, index) {
                if (url == '' || url == undefined) {
                    var headColor = 'headColor' + index % 4;

                    var nameLast = name.substr(name.length - 1, 1);
                    return _react2.default.createElement(
                        'div',
                        { className: "headLast" + " " + 'headColor0' },
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

            return _react2.default.createElement(_index.ListView, {
                ref: function ref(el) {
                    return _this3.lv = el;
                },
                dataSource: this.state.dataSource,
                renderFooter: function renderFooter() {
                    return _react2.default.createElement(
                        'div',
                        { style: { padding: 30, textAlign: 'center' } },
                        _this3.state.isLoading ? '正在加载...' : _this3.state.footer
                    );
                },
                renderRow: children,
                className: 'am-list',
                pageSize: 5,
                renderBodyComponent: function renderBodyComponent() {
                    return _react2.default.createElement(MyBody, null);
                },
                style: { height: height, overflow: 'auto' },
                onScroll: function onScroll() {
                    console.log('scroll');
                },
                scrollRenderAheadDistance: 400,
                onEndReached: this.onEndReached,
                onEndReachedThreshold: onEndReachedhold
            });
        }
    }]);

    return YYListview;
}(_react2.default.Component);

exports.default = YYListview;

YYListview.defaultProps = {
    onEndReachedhold: 600,
    height: '600px'
};