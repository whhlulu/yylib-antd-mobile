'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('antd-mobile/lib/index');

var _reactWeui = require('react-weui');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('../../../css/SSImagePicker.css');

var _SSIcon = require('../icon/SSIcon');

var _SSIcon2 = _interopRequireDefault(_SSIcon);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _UploadFileUtils = require('../../utils/UploadFileUtils');

var _UploadFileUtils2 = _interopRequireDefault(_UploadFileUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = _index.List.Item;
var alert = _index.Modal.alert;

var SSImagePicker = function (_Component) {
    _inherits(SSImagePicker, _Component);

    function SSImagePicker() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SSImagePicker);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SSImagePicker.__proto__ || Object.getPrototypeOf(SSImagePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            files: _this.props.files,
            showGallery: false
        }, _this.onChange = function (files, type, index) {
            var that = _this;
            if (type == 'add') {
                _UploadFileUtils2.default.multiFilesUpLoad(files[files.length - 1], _this.props.source.billType, {
                    sourceId: _this.props.source.sourceId,
                    sourceType: _this.props.source.sourceType
                }, function (fileList) {
                    that.setState({
                        files: that.state.files.concat(fileList)
                    });
                    if (_lodash2.default.isFunction(_this.props.onChange)) {
                        _this.props.onChange(that.state.files);
                    }
                });
            } else if (type == 'remove') {
                var alertInstance = alert('删除', '删除后不可恢复!!!', [{ text: '取消', onPress: function onPress() {
                        alertInstance.close();
                    }, style: 'default' }, { text: '确定', onPress: function onPress() {
                        if (_this.props.source.sourceId) {
                            var params = {
                                id: _this.props.source.sourceId,
                                billType: _this.props.source.billType,
                                sourceType: _this.props.source.sourceType,
                                attachIds: _this.state.files[index].gid
                            };
                            _UploadFileUtils2.default.delAttach(params, function () {
                                that.setState({
                                    files: files
                                });
                                if (_lodash2.default.isFunction(_this.props.onChange)) {
                                    _this.props.onChange(files);
                                }
                            });
                        } else {
                            _this.setState({
                                files: files
                            });
                            if (_lodash2.default.isFunction(_this.props.onChange)) {
                                _this.props.onChange(files);
                            }
                        }
                    } }]);
            }
        }, _this.onImageClick = function (index) {
            _this.setState({
                showGallery: true,
                gallery: {
                    index: index
                }
            });
        }, _this.galleryClick = function (e) {
            e.preventDefault();
            e.stopPropagation();

            var that = _this;
            setTimeout(function () {
                that.setState({
                    gallery: that.state.files.length <= 1 ? true : false,
                    showGallery: false
                });
            }, 300);
        }, _this.galleryDeleteClick = function (e, index) {
            e.preventDefault();
            e.stopPropagation();
            var that = _this;
            var alertInstance = alert('删除', '删除后不可恢复!!!', [{ text: '取消', onPress: function onPress() {
                    alertInstance.close();
                }, style: 'default' }, { text: '确定', onPress: function onPress() {
                    if (_this.props.source.sourceId) {
                        var params = {
                            id: _this.props.source.sourceId,
                            billType: _this.props.source.billType,
                            sourceType: _this.props.source.sourceType,
                            attachIds: _this.state.files[index].gid
                        };
                        _UploadFileUtils2.default.delAttach(params, function () {
                            that.setState({
                                files: that.state.files.filter(function (e, i) {
                                    return i != index;
                                }),
                                gallery: that.state.files.length <= 1 ? true : false,
                                showGallery: false
                            });
                        });
                    } else {
                        _this.setState({
                            files: that.state.files.filter(function (e, i) {
                                return i != index;
                            }),
                            gallery: that.state.files.length <= 1 ? true : false,
                            showGallery: false
                        });
                        if (_lodash2.default.isFunction(_this.props.onChange)) {
                            _this.props.onChange(that.state.files.filter(function (e, i) {
                                return i != index;
                            }));
                        }
                    }
                } }]);
        }, _this.onAddImageClick = function () {
            var that = _this;
            if (navigator.userAgent.match(/(Android)/i)) {
                navigator.camera.getPicture(function (imageURI) {
                    if (imageURI) {
                        imageURI = "data:image/jpeg;base64," + imageURI;
                        var file = {};
                        file.fileName = _this.props.source && _this.props.source.sourceType ? _this.props.source.sourceType + '_' + new Date().getTime() + '.jpg' : 'attach_' + new Date().getTime() + '.jpg';
                        file.fileContent = imageURI.replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,', '');
                        that.onChange(that.state.files.concat({ files: [file] }), 'add');
                    }
                }, function (message) {});
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SSImagePicker, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.source && this.props.source.sourceId != nextProps.source.sourceId) {
                this.loadAttachList(nextProps.source);
            }
            if (JSON.stringify(nextProps.files) !== JSON.stringify(this.props.files)) {
                this.setState({
                    files: nextProps.files
                });
            }
        }
    }, {
        key: 'loadAttachList',
        value: function loadAttachList(source) {
            var params = {
                id: source.sourceId,
                billType: source.billType,
                type: source.sourceType
            };
            var that = this;
            if (source.sourceId && source.sourceType && source.billType) {
                _UploadFileUtils2.default.loadAttachList(params, function (fileList) {
                    that.setState({
                        files: fileList
                    });
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.source) {
                this.loadAttachList(this.props.source);
            }
        }
    }, {
        key: 'renderGallery',
        value: function renderGallery() {
            if (!this.state.gallery) return false;
            var srcs = this.state.files.map(function (file) {
                return file.originalUrl;
            });

            return _react2.default.createElement(
                _reactWeui.Gallery,
                {
                    src: srcs,
                    show: this.state.showGallery,
                    defaultIndex: this.state.gallery.index,
                    onClick: this.galleryClick
                },
                _react2.default.createElement(_reactWeui.GalleryDelete, { onClick: this.galleryDeleteClick })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var files = this.state.files;
            var _props = this.props,
                icon = _props.icon,
                disabled = _props.disabled,
                maxSize = _props.maxSize,
                iconColor = _props.iconColor,
                label = _props.label,
                required = _props.required;

            return _react2.default.createElement(
                'div',
                { className: disabled ? 'none' : '' },
                _react2.default.createElement(_index.WhiteSpace, { size: 'lg' }),
                this.renderGallery(),
                _react2.default.createElement(
                    Item,
                    null,
                    _react2.default.createElement(_SSIcon2.default, { icon: icon, color: iconColor }),
                    _react2.default.createElement(
                        'span',
                        { style: { marginLeft: '0.3rem' } },
                        label
                    ),
                    _react2.default.createElement(
                        'span',
                        { style: { display: required ? '' : 'none' } },
                        _react2.default.createElement(_SSIcon2.default, { icon: 'icon-bixutian', color: 'red' })
                    ),
                    _react2.default.createElement(_index.ImagePicker, {
                        files: files,
                        onChange: disabled ? null : this.onChange,
                        onImageClick: this.onImageClick,
                        selectable: !disabled && files.length < maxSize,
                        onAddImageClick: this.onAddImageClick
                    })
                )
            );
        }
    }]);

    return SSImagePicker;
}(_react.Component);

SSImagePicker.propTypes = {
    selectable: _propTypes2.default.bool,
    icon: _propTypes2.default.string,
    iconColor: _propTypes2.default.string,
    label: _propTypes2.default.string,
    maxSize: _propTypes2.default.number,
    disabled: _propTypes2.default.bool,
    source: _propTypes2.default.object,
    files: _propTypes2.default.array
};
SSImagePicker.defaultProps = {
    selectable: true,
    icon: 'icon-xingzhuang8',
    iconColor: '',
    label: '附件',
    maxSize: 5,
    disabled: false,
    files: [],
    source: {
        billType: '',
        sourceType: '',
        sourceId: ''
    }
};
exports.default = SSImagePicker;