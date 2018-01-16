/**
 * Created by liulei on 2017/8/24.
 */
import React, {Component} from 'react';
import {List, WhiteSpace, Modal} from 'antd-mobile';
import {Toast} from 'antd-mobile';
import ImagePicker from '../common/image-picker/index.web.js'
import {Gallery, GalleryDelete} from 'react-weui';
import PropTypes from 'prop-types';
import './css/SSImagePicker.css';
import SSIcon from '../common/SSIcon'
import _ from 'lodash';
import UploadFileUtils from '../utils/UploadFileUtils';

const Item = List.Item;
const alert = Modal.alert;
var filesGolbal = [];
var startUriGlobal = null;

class SSImagePicker extends Component {
    state = {
        files: this.props.files,
        showGallery: false
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
        maxSize: 100,
        disabled: false,
        files: [],
        source: {
            billType: '',
            sourceType: '',
            sourceId: ''
        }
    };

    onChange = (files, type, index) => {
        let that = this;
        if (type == 'add') {
            UploadFileUtils.multiFilesUpLoad(files[files.length - 1], this.props.source.billType, {
                sourceId: this.props.source.sourceId,
                sourceType: this.props.source.sourceType
            }, (fileList) => {
                that.setState({
                    files: that.state.files.concat(fileList)
                });
                filesGolbal = that.state.files;
                if (_.isFunction(this.props.onChange)) {
                    this.props.onChange(that.state.files);
                }
            });
        } else if (type == 'remove') {
            const alertInstance = alert('删除', '删除后不可恢复!!!', [
                { text: '取消', onPress: () => {
                    alertInstance.close();
                }, style: 'default' },
                { text: '确定', onPress: () => {
                    if (this.props.source.sourceId) {
                        let params = {
                            id: this.props.source.sourceId,
                            billType: this.props.source.billType,
                            sourceType: this.props.source.sourceType,
                            attachIds: this.state.files[index].gid
                        };
                        UploadFileUtils.delAttach(params, () => {
                            //删除成功的回调
                            that.setState({
                                files: files
                            });
                            if (_.isFunction(this.props.onChange)) {
                                this.props.onChange(files);
                            }
                        });
                    }else{
                        this.setState({
                            files: files
                        });
                        filesGolbal = this.state.files;
                        if (_.isFunction(this.props.onChange)) {
                            this.props.onChange(files);
                        }
                    }
                } }
            ]);
        }
    };
    onImageClick = (index) => {
        this.setState({
            showGallery: true,
            gallery: {
                index: index
            }
        })
    };

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
        //当单据id存在时，即老单据时
        if (source.sourceId) {
            let params = {
                id: source.sourceId,
                billType: source.billType,
                type: source.sourceType
            };
            let that = this;
            if(source.sourceId && source.sourceType && source.billType){
                UploadFileUtils.loadAttachList(params, (fileList) => {
                    that.setState({
                        files: fileList
                    });
                    filesGolbal = fileList;
                })
            }
        } else {
            //当单据id不存在，即新单据时
             this.setState({
                 files: filesGolbal
             });
        }
    }

    componentWillMount() {
        window.addEventListener('hashchange', (hash) => {
            let oldUri = hash.oldURL.split('#/')[1];
            if(!oldUri.startsWith(startUriGlobal) || startUriGlobal == ""){
                startUriGlobal = oldUri.split('/')[0];
                filesGolbal = [];
                this.state.files = [];
            }
        })
    }
    componentDidMount() {
        if(this.props.source){
            //如果是新跳转的页面，清除filesGolbal
            if(!!this.props.source.newAdd){
                filesGolbal = [];
            }
            this.loadAttachList(this.props.source);
        }
    }

    galleryClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        //防止Gallery在未unmount时调用setState导致内存泄漏的警告
        let that = this;
        setTimeout(() => {
            that.setState({
                gallery: that.state.files.length <= 1 ? true : false,
                showGallery: false
            })
        }, 300);
    }

    galleryDeleteClick = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        let that = this;
        const alertInstance = alert('删除', '删除后不可恢复!!!', [
            { text: '取消', onPress: () => {
                alertInstance.close();
            }, style: 'default' },
            { text: '确定', onPress: () => {
                if (this.props.source.sourceId) {
                    let params = {
                        id: this.props.source.sourceId,
                        billType: this.props.source.billType,
                        sourceType: this.props.source.sourceType,
                        attachIds: this.state.files[index].gid
                    };
                    UploadFileUtils.delAttach(params, ()=> {
                        that.setState({
                            files: that.state.files.filter(( e, i ) => i != index),
                            gallery: that.state.files.length <= 1 ? true : false,
                            showGallery: false
                        })
                    });
                }else{
                    this.setState({
                        files: that.state.files.filter(( e, i ) => i != index),
                        gallery: that.state.files.length <= 1 ? true : false,
                        showGallery: false
                    })
                    if (_.isFunction(this.props.onChange)) {
                        this.props.onChange(that.state.files.filter(( e, i ) => i != index));
                    }
                }
            } },
        ]);
    }

    onAddImageClick = () => {
        let that = this;
        if(navigator.userAgent.match(/(Android)/i)){
            navigator.camera.getPicture((imageURI) => {
                if(imageURI){
                    imageURI = "data:image/jpeg;base64," + imageURI;//添加信息头，成为完整图片base64
                    let file = {};
                    file.fileName = this.props.source && this.props.source.sourceType ? this.props.source.sourceType + '_' + new Date().getTime() + '.jpg' : 'attach_' + new Date().getTime() + '.jpg';
                    file.fileContent = imageURI.replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,', '');
                    that.onChange(that.state.files.concat({files: [file]}), 'add');
                }
            }, (message) => {
            })
        }
    }

    renderGallery(){
        if(!this.state.gallery) return false;
        let srcs = this.state.files.map(file => file.originalUrl);

        return (
            <Gallery
                src={srcs}
                show={this.state.showGallery}
                defaultIndex={this.state.gallery.index}
                onClick={this.galleryClick}
            >
                <GalleryDelete onClick={this.galleryDeleteClick} />
            </Gallery>
        )
    }

    render() {
        const {files} = this.state;
        const {icon, disabled, maxSize, iconColor, label, required} = this.props;
        return (
            <div className={disabled?'none':''}>
                <WhiteSpace size="lg"/>
                { this.renderGallery() }
                <Item>
                    <SSIcon icon={icon} color={iconColor}/>
                    <span style={{marginLeft: '0.3rem'}}>
                        {label}
                    </span>
                    <span style={{display: required ? '' : 'none'}}><SSIcon icon="icon-bixutian" color="red"/></span>
                    <ImagePicker
                        files={files}
                        onChange={disabled ? null : this.onChange}
                        onImageClick={this.onImageClick}
                        selectable={!disabled && files.length < maxSize}
                        onAddImageClick={this.onAddImageClick}
                    />
                </Item>
            </div>
        );
    }
}

export default SSImagePicker;