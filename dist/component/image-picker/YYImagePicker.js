import React, {Component} from 'react';
import {ImagePicker, Modal,List} from 'antd-mobile';
const alert = Modal.alert;
import PropTypes from 'prop-types';
import _ from 'lodash';
import UploadFileUtils from '../../utils/UploadFileUtils';
import classnames from 'classnames';
import AuthToken from '../../utils/AuthToken';
import '../../../css/YYImagePicker.css';

class YYImagePicker extends Component {
    state = {
        files: this.props.files,
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
                        },()=>{
                            if (_.isFunction(that.props.onChange)) {
                                that.props.onChange(this.state.files);
                            }
                        });
                    });
                } else {
                    this.setState({
                        files: that.state.files.filter((e, i) => i != index)
                    },()=>{
                        if (_.isFunction(that.props.onChange)) {
                            that.props.onChange(this.state.files);
                        }
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
        if(this.props.orderQuality){
            params.orderQuality=this.props.orderQuality;
        }
        if(this.props.orderWidth){
            params.orderWidth=this.props.orderWidth;
        }
        var file = {};
        if(window.YYPlugin){
            window.YYPlugin.call("CommonPlugin", "postFile", params, function success(result) {
                file.gid = result.gid;
                file.name = result.fileName;
                file.url = result.filePath;
                file.backData = result;
                that.setState({
                    files: that.state.files.concat(file),
                },()=>{
                    if (_.isFunction(that.props.onChange)) {
                        that.props.onChange(that.state.files);
                    }
                });
            });
        }else{
            Toast.info('请在手机上进行调试或检查yyplus的引入！')
        }
    };

    render() {
        const {disabled, maxSize, label, className, ...restProps} = this.props;
        let wrapClz = classnames('yy-image-picker', className);
        const {files} = this.state;
        return (
            <div {...restProps}
                 className={wrapClz}>
                {label && <div className="label">{label}</div>}
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
YYImagePicker.defaultProps = {
    selectable: true,
    label: '上传图片',
    maxSize: 5,
    disabled: false,
    source: {
        sourceId: '',
        billType: '',
        sourceType: '',
    },
    files: [],
    orderQuality:null,
    orderWidth:null,
};
export default YYImagePicker;