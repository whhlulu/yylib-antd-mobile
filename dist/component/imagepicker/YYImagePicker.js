import React, {Component} from 'react';
import {ImagePicker, Modal,List} from 'antd-mobile';
import PropTypes from 'prop-types';
import _ from 'lodash';
import UploadFileUtils from '../../utils/UploadFileUtils';
import AuthToken from '../../utils/AuthToken';
const alert = Modal.alert

class YYImagePicker extends Component {
    state = {
        files: this.props.files,
    };
    static propTypes = {
        selectable: PropTypes.bool,
        label: PropTypes.string,
        maxSize: PropTypes.number,
        disabled: PropTypes.bool,
        source: PropTypes.object,
        files: PropTypes.array
    };
    static defaultProps = {
        selectable: true,
        label: '上传图片',
        maxSize: 5,
        disabled: false,
        source: {
            sourceId: '',
            billType: '',
            sourceType: '',
        },
        files: []
    };

    componentDidMount() {
        if (this.props.source) {
            this.loadAttachList(this.props.source);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.source && this.props.source.sourceId != nextProps.source.sourceId) {
            this.loadAttachList(this.props.source);
        }
        if (JSON.stringify(nextProps.files) !== JSON.stringify(this.props.files)) {
            this.setState({
                files: nextProps.files
            })
        }
    }

    loadAttachList(source) {
        let params = {
            id: source.sourceId,
            billType: source.billType,
            type: source.sourceType
        };
        let that = this;
        if (source.sourceId && source.sourceType && source.billType) {
            UploadFileUtils.loadAttachList(params, function (data) {
                if (data.length > 0) {
                    that.setState({
                        files: data
                    })
                }
            })
        }
    }

    onChange = (files, type, index) => {
        if (type == 'add') {

        } else if (type == 'remove') {
            this.deleteFile(index);
        } else {
            console.log('上传错误！')
        }
        if (_.isFunction(this.props.onChange)) {
            this.props.onChange(this.state.files);
        }
    }
//删除文件
    deleteFile = (index) => {
        let that = this;
        const alertInstance = alert('删除', '删除后不可恢复!', [
            {
                text: '取消', onPress: () => {
                alertInstance.close();
            }, style: 'default'
            },
            {
                text: '确定', onPress: () => {
                if (this.props.source.sourceType) {
                    let params = {
                        id: this.props.source.sourceId,
                        billType: this.props.source.billType,
                        sourceType: this.props.source.sourceType,
                        attachIds: this.state.files[index].gid
                    };
                    UploadFileUtils.delAttach(params, () => {
                        that.setState({
                            files: that.state.files.filter((e, i) => i != index)
                        })
                    });
                } else {
                    this.setState({
                        files: that.state.files.filter((e, i) => i != 0)
                    })
                }
            }
            },
        ]);
    }
    onAddImageClick = (e) => {
        let that=this;
        e.preventDefault();//阻止触发onChange事件！
        let params = {
            billType: this.props.source.billType,
            sourceType: this.props.source.sourceType,
            sourceId: this.props.source.sourceId,
            userId: AuthToken.getUserId(),
            userName: AuthToken.getUserName()
        };
        var file = {};
        window.YYPlugin.call("CommonPlugin", "postFile", params, function success(result) {
            file.gid = result.gid;
            file.name = result.fileName;
            file.url = result.filePath;
            that.setState({
                files: this.state.files.concat(file),
            });
        });
    };

    render() {
        const {disabled, maxSize, iconColor, label, required} = this.props;
        const {files} = this.state;
        return (
            <div>
                <List.Item><div>{label}</div></List.Item>
                <ImagePicker
                    files={files}
                    onChange={disabled ? null : this.onChange}
                    onImageClick={this.onImageClick}
                    selectable={!disabled && files.length < maxSize}
                    onAddImageClick={this.onAddImageClick}
                />
            </div>
        );
    }
}

export default YYImagePicker;