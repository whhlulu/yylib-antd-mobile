import React, {Component} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ajax from '../utils/ajax';
import {Accordion, Popup, Toast, SearchBar, ActivityIndicator, Checkbox, WhiteSpace, Pagination, List, Radio} from 'antd-mobile';
import '../../css/SSReferTreeList.css'
import RestUrl from "./RestUrl";
import SSNavBar from "./component/navbar/SSNavBar";
import SSPopup from "./component/popup/SSPopup";
import {hashHistory} from 'react-router';

let page;
let CheckboxItem = Checkbox.CheckboxItem;
let RadioItem = Radio.RadioItem;
class SSReferTreeList extends Component {

    state = {
        treeData: [],
        listData: [],
        selectedTreeId: null,
        selectedListId: null,
        selectedNode: {},
        selectedNodes: [],
        treerelyurl: '',
        dataurl: '',
        relyfield: ''
    }

    componentWillMount() {
        page = this;
        window.addEventListener('hashchange', (hash) => {
            let oldUri = hash.oldURL.split('#/')[1].split('?')[0];
            let newUri = hash.newURL.split('#/')[1].split('?')[0];
            if(oldUri.endsWith('/tree') && !newUri.endsWith('/tree/list')){
                Popup.hide();
            }else if(oldUri.endsWith('/tree/list')){
                page.setState({
                    showList: false
                })
            }
        })
        let referCode = this.props.referCode;
        //根据参照编码获取参照信息
        ajax.getJSON(RestUrl.REF_SERVER_URL + RestUrl.GET_REFINFO_BYCODE, {refCode: referCode}, function (result) {
            if(result.success){
                let dataurl = result.data.dataurl;
                let treerelyurl = result.data.treerelyurl;
                let relyfield = result.data.relyfield;
                let referParams = {};
                referParams.condition = page.props.treeCondition;
                page.setState({
                    referName: result.data.refName,
                    treerelyurl: treerelyurl,
                    dataurl: dataurl,
                    relyfield: relyfield
                })
                page.getTreeData(treerelyurl, referParams);
            }else{
                Toast.fail("请检查参照编码!", 1);
            }

        }, function (err) {
            Toast.fail("服务器通讯异常!", 1);
        })
    }

    onClose = () => {
        Popup.hide();
        hashHistory.goBack();
    };

    onCancel = () => {
        hashHistory.goBack();
        this.setState({
            showList: false
        })
    };

    onChange = () => {
        // debugger;
    };

    getListData = (referUrl, referParams, pageNumber, pageSize) => {
        this.setState({
            animating: true
        })
        ajax.getJSON(referUrl, _.assign({}, referParams, {pageNumber: pageNumber, pageSize: pageSize}), function (result) {
            if (result.code === 'success') {
                page.setState({
                    listData: result.data.content,
                    pageCount: result.data.pageCount,
                    animating: false,
                    pageNumber: result.data.pageNumber - 1
                })
            } else {
                page.setState({
                    animating: false
                })
                Toast.fail(result.backMsg, 1);
            }
        }, function (err) {
            page.setState({
                animating: false
            })
            Toast.fail("服务器通讯异常!", 1);
        })
    }

    onChangePageNumber = (value) => {
        this.setState({
            pageNumber: value
        })
        let dataurl = this.state.dataurl;
        let referParams = {};
        referParams.relyCondition = (this.state.relyfield  + '=' +  this.state.selectedTreeId);
        referParams.condition = this.props.listCondition;
        this.getListData(dataurl, referParams, value + 1, 10);
    }

    onTreeChange = (e, selectedNode) => {
        e.stopPropagation();
        e.preventDefault();
        let curUri = hashHistory.getCurrentLocation().pathname;
        if(curUri.endsWith('/')){
            hashHistory.push(curUri + 'list');
        }else{
            hashHistory.push(curUri + '/list');
        }
        if (selectedNode.id === this.state.selectedTreeId) {
            this.setState({
                selectedTreeId: null,
                showList: true
            });
        } else {
            this.setState({
                selectedTreeId: selectedNode.id,
                showList: true
            });
        }
        let dataurl = this.state.dataurl;
        let referParams = {};
        referParams.relyCondition = (this.state.relyfield  + '=' +  selectedNode.id);
        referParams.condition = this.props.listCondition;
        this.getListData(dataurl, referParams, 1, 10);
    }

    getTreeData = (referUrl, referParams) =>{
        this.setState({
            animating: true
        })
        ajax.getText(referUrl, referParams, function (result) {
            result = JSON.parse(result);
            page.setState({
                treeData: result,
                animating: false
            })
        }, function (err) {
            page.setState({
                animating: false
            })
            Toast.fail("服务器通讯异常!", 1);
        })
    }

    onTreeSearchSubmit = (value) => {
        let treerelyurl = this.state.treerelyurl;
        let referParams = {};
        referParams.searchText = value;
        referParams.condition = this.props.treeCondition;
        this.getTreeData(treerelyurl, referParams);
    }

    onListSearchSubmit = (value) => {
        let dataurl = this.state.dataurl;
        let referParams = {};
        referParams.searchText = value;
        referParams.relyCondition = (this.state.relyfield  + ' = ' +  this.state.selectedTreeId);
        referParams.condition = this.props.listCondition;
        this.getListData(dataurl, referParams, 1, 10);
    }

    onOk = () => {
        if (this.props.onOk && _.isFunction(this.props.onOk)) {
            if (!this.props.multiMode) {
                this.props.onOk(this.state.selectedNode);
            } else {
                this.props.onOk(this.state.selectedNodes);
            }
        }
    }

    loop = (treeData, selectedTreeId) => {
        if(!Array.isArray(treeData)) return (<center>-------- 暂无数据 --------</center>);
        return treeData.map((item) => {
            if (item.children && item.children.length > 0) {
                return <Accordion onChange={this.onChange} className="refer-accordion" key={item.id}><Accordion.Panel className="refer-pad" key={item.id} header={<CheckboxItem checked={selectedTreeId === item.id} onChange={(e) => this.onTreeChange(e, item)} key={item.id}>{item[this.props.displayField]}</CheckboxItem>}>{this.loop(item.children, selectedTreeId)}</Accordion.Panel></Accordion>;
            }else{
                return <CheckboxItem checked={selectedTreeId === item.id} className="refer-check-box" onChange={(e) => this.onTreeChange(e, item)} key={item.id}>{item[this.props.displayField]}</CheckboxItem>;
            }
        });
    }

    onMultiChange = (selectedNode) => {
        //多选模式
        let selectedNodes = this.state.selectedNodes;
        if (!selectedNodes.some((item) => {
                return item.id === selectedNode.id
            })) {
            selectedNodes.push(selectedNode);
            this.setState({
                selectedNodes: selectedNodes
            });
        } else {
            let newNodes = [];
            // eslint-disable-next-line
            selectedNodes.map((item) => {
                if (item.id !== selectedNode.id) {
                    newNodes.push(item);
                }
            })
            this.setState({
                selectedNodes: newNodes
            });
        }
    }

    onSingleChange = (selectedNode) => {
        //单选模式
        if (selectedNode.id === this.state.selectedListId) {
            this.setState({
                selectedListId: null,
                selectedNode: {}
            });
        } else {
            this.setState({
                selectedListId: selectedNode.id,
                selectedNode: selectedNode
            });
        }
    }

    render() {
        const {selectedTreeId, selectedListId, treeData, showList, pageNumber, pageCount, referName, listData, animating} = this.state;
        const {displayField} = this.props;

        return (
            <div className="ss-refer-tree">
                <SSNavBar leftContent="返回"
                          title={this.props.referName || referName}
                          key="nav"
                          onLeftClick={this.onClose}
                          rightContent={[]}
                />
                <ActivityIndicator
                    toast
                    text="加载中..."
                    animating={animating}
                />
                <WhiteSpace/>
                <SearchBar placeholder="搜索" onSubmit={this.onTreeSearchSubmit}/>
                <WhiteSpace/>
                <div className="refer-tree-content">
                    {this.loop(treeData, selectedTreeId)}
                </div>
                <SSPopup show={showList}>
                    <ActivityIndicator
                        toast
                        text="加载中..."
                        animating={animating}
                    />
                    <SSNavBar leftContent="返回"
                              title={this.props.referName || referName}
                              key="nav"
                              onLeftClick={this.onCancel}
                              rightContent={[
                                  <a key="nav" onClick={this.onOk}>确定</a>,
                              ]}
                    />
                    <WhiteSpace/>
                    <SearchBar placeholder="搜索" onSubmit={this.onListSearchSubmit}/>
                    <WhiteSpace/>
                    <List className="list-content">
                        {this.props.multiMode ? listData.map(item => (
                            <CheckboxItem key={item.id} onChange={() => this.onMultiChange(item)}>
                                {item[displayField]}
                            </CheckboxItem>
                        )) : listData.map(item => (
                            <RadioItem key={item.id} checked={selectedListId === item.id}
                                       onChange={() => this.onSingleChange(item)}>
                                {item[displayField]}
                            </RadioItem>
                        ))}
                    </List>
                    <WhiteSpace/>
                    <Pagination total={pageCount}
                                onChange={this.onChangePageNumber}
                                className="custom-pagination-with-icon"
                                current={pageCount > 0 ? pageNumber : -1}
                                locale={{
                                    prevText: (<span className="arrow-align">上一页</span>),
                                    nextText: (<span className="arrow-align">下一页</span>),
                                }}
                    />
                </SSPopup>
            </div>
        );
    }
}

SSReferTreeList.propTypes = {
    referName: PropTypes.string,
    referCode: PropTypes.string,
    displayField: PropTypes.string,
    referParams: PropTypes.object,
    multiMode: PropTypes.bool,
};

SSReferTreeList.defaultProps = {
    referName: '',
    referCode: '',
    referParams: {},
    multiMode: false,
    displayField: 'name',
};

export default SSReferTreeList;
