
import React, {Component} from 'react';
import {List, WhiteSpace, Modal,Toast} from 'antd-mobile';
import {Gallery, GalleryDelete} from 'react-weui';
import PropTypes from 'prop-types';
import './css/SSImagePicker.css';
import SSIcon from '../common/SSIcon'
import _ from 'lodash';
import UploadFileUtils from '../utils/UploadFileUtils';
import "../common/css/common.css";
import SSButton from "../common/SSButton";
import AuthToken from '../utils/AuthToken';

const Item = List.Item;
const alert = Modal.alert;

class SSFilePicker extends Component {
    state = {
        files: this.props.files,
        noFile:null
    };
    static propTypes = {
        selectable: PropTypes.bool,
        icon: PropTypes.string,
        iconColor: PropTypes.string,
        label: PropTypes.string,
        maxSize: PropTypes.number,
        disabled: PropTypes.bool,
        source: PropTypes.object,
        files: PropTypes.array
    };

    static defaultProps = {
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

    //删除文件
    deleteFile = (index,e) => {
        console.log("e",e,index);
         e.preventDefault();
         e.stopPropagation();
        let that = this;
        const alertInstance = alert('删除', '删除后不可恢复!!!', [
            { text: '取消', onPress: () => {
                alertInstance.close();
            }, style: 'default' },
            { text: '确定', onPress: () => {
            console.log("attach",that.state.files)
                if (this.props.source.sourceId) {
                    let params = {
                        id: this.props.source.sourceId,
                        billType: this.props.source.billType,
                        sourceType: this.props.source.sourceType,
                        attachIds: this.state.files[index].gid
                    };
                    UploadFileUtils.delAttach(params, ()=> {
                         that.setState({
                             files: that.state.files.filter(( e, i ) => i != index)
                         })
                    });
                }else{
                    this.setState({
                        files: that.state.files.filter(( e, i ) => i != 0)
                    })
                    if (_.isFunction(this.props.onChange)) {
                        this.props.onChange(that.state.files.filter(( e, i ) => i != index));
                    }
                }
            } },
        ]);
    }

    //pdf文件
    onFileClick(item){
        // page.refs.iFile.src=`${item.fileUrl}`
        window.YYPlugin.call("CommonPlugin","openAttach", {
            url:item.fileUrl,
            filename:item.name,
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props.source && this.props.source.sourceId != nextProps.source.sourceId){
            this.loadAttachList(this.props.source);
        }
        if (JSON.stringify(nextProps.files) !== JSON.stringify(this.props.files)) {
            this.setState({
                files: nextProps.files
            })
        }
    }

    loadAttachList(source){
        let params = {
            id: source.sourceId,
            billType: source.billType,
            type: source.sourceType
        };
        let that = this;
        if(source.sourceId && source.sourceType && source.billType){
            UploadFileUtils.loadAttachList(params, function (data) {
                if (data.length > 0) {
                    that.setState({
                        files: data
                    })
                } else {
                    that.setState({
                        noFile:'暂无附件'
                    })
                }
            })
        }
    }

    componentDidMount() {
        if(this.props.source){
            this.loadAttachList(this.props.source);
        }
    }

    onChange = (files, type, index) => {
        let that = this;
        if (type == 'add') {
            let temp = files[files.length - 1];
            UploadFileUtils.multiFilesUpLoadModified(files[files.length - 1], this.props.source.billType, {
                sourceId: this.props.source.sourceId,
                sourceType: this.props.source.sourceType
            }, (fileList) => {
                that.setState({
                    files: that.state.files.concat(fileList)
                })
                if (_.isFunction(this.props.onChange)) {
                    this.props.onChange(that.state.files);
                }
            });
        }
    }

    onUpload=()=>{
        let that=this;
        let params = {
            sourceId: this.props.source.sourceId,
            billType: this.props.source.billType,
            sourceType: this.props.source.sourceType,
            userId : AuthToken.getUserId(),
            userName : AuthToken.getUserName()
        };
        var file = {};
        window.YYPlugin.call("CommonPlugin","postFile", params,function success(result){
            console.log("resultFile",result);
                file.fileName = result.fileName;
                file.filePath = result.filePath;
                file.gid = result.gid;
                that.onChange(that.state.files.concat({files: [file]}), 'add');
        });

        /*file.fileName = "Screenshot_2017-10-25-22-35-01.png";
        file.filePath = "http://test.cscec3b.com.cn/group1/M00/00/7D/Cgv7DlnxlQCAGLX1AAUlG0JCtYw772.png";
        that.onChange(that.state.files.concat({files: [file]}), 'add');*/
    };

    render() {
        const {icon, disabled, maxSize, iconColor, label, required} = this.props;
        var arr = [];
        let cls = {
            textAlign: 'center',
            color: '#3cc3ff',
            display:"inline-block",
            textIndent:"0.3rem",
            maxWidth: '6rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }
        return (
            <div className={'SealMgrFile'}>
                <WhiteSpace size='lg'/>
                <List>
                    {
                        this.state.files.length>0?this.state.files.map((v, i) => {
                                return <Item
                                    align='middle'
                                    onClick={this.onFileClick.bind(this,v)}
                                    key={i}>
                                    <div style={cls}>
                                        {v.backData.fileName}
                                    </div>
                                    <a onClick={this.deleteFile.bind(this,i)} style={{display: disabled ? 'none' : ''}}><SSIcon icon="icon-Idelete" color="#ff4b50" size="s"/></a>
                                </Item>
                            }):this.state.noFile
                    }
                </List>
                <SSButton text='点击上传' type='dashed' onClick={this.onUpload} style={{display: disabled ? 'none' : ''}}/>
            </div>
        );
    }
}

export default SSFilePicker;