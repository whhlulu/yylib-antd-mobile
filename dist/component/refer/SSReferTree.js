import React, {Component} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ajax from '../../utils/ajax';
import {Accordion, Popup, Toast, SearchBar, Checkbox, ActivityIndicator, WhiteSpace} from 'antd-mobile/lib/index';
import '../../../css/SSReferTree.css'
import RestUrl from "../../common/RestUrl";
import SSNavBar from "../navbar/SSNavBar";
import {hashHistory} from 'react-router';

let page;
let CheckboxItem = Checkbox.CheckboxItem;
class SSReferTree extends Component {
    state = {
        data: [],
        selectedId: null,
        selectedNode: {},
        selectedNodes: [],
        animating: false
    }

    componentWillMount() {
        page = this;
        window.addEventListener('hashchange', (hash) => {
            let oldUri = hash.oldURL.split('#/')[1].split('?')[0];
            if(oldUri.endsWith('/refer')){
                Popup.hide();
            }
        })
        let referCode = this.props.referCode;
        //根据参照编码获取参照信息
        ajax.getJSON(RestUrl.REF_SERVER_URL + RestUrl.GET_REFINFO_BYCODE, {refCode: referCode}, function (result) {
            if(result.success){
                let referUrl = result.data.dataurl;
                let referParams = {};
                page.setState({
                    referName: result.data.refName,
                    referUrl: referUrl
                })
                referParams.condition = page.props.condition;
                page.getTreeData(referUrl, referParams);
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

    onChange = () => {
        // debugger;
    };

    onSingleChange = (e, selectedNode) => {
        e.stopPropagation();
        e.preventDefault();
        if (selectedNode.id === this.state.selectedId) {
            this.setState({
                selectedId: null,
                selectedNode: {}
            });
        } else {
            this.setState({
                selectedId: selectedNode.id,
                selectedNode: selectedNode
            });
        }
    }

    onMultiChange = (e, selectedNode) => {
        e.stopPropagation();
        e.preventDefault();
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

    getTreeData = (referUrl, referParams) =>{
        this.setState({
            animating: true
        })
        ajax.getText(referUrl, referParams, function (result) {
            result = JSON.parse(result);
            page.setState({
                data: result,
                animating: false
            })
        }, function (err) {
            page.setState({
                animating: false
            })
            Toast.fail("服务器通讯异常!", 1);
        })
    }

    onSearchSubmit = (value) => {
        let referUrl = this.state.referUrl;
        let referParams = {};
        referParams.searchText = value;
        referParams.condition = this.props.condition;
        this.getTreeData(referUrl, referParams);
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

    loop = (treeData, selectedId) => {
        if(!this.props.multiMode){
            return treeData.map((item) => {
                if (item.children && item.children.length > 0) {
                    item.isLeaf = false;
                    return <Accordion onChange={this.onChange} className="refer-accordion" key={item.id}><Accordion.Panel className="refer-pad" key={item.id} header={<CheckboxItem checked={selectedId === item.id} onChange={(e) => this.onSingleChange(e, item)} key={item.id}>{item[this.props.displayField]}</CheckboxItem>}>{this.loop(item.children, selectedId)}</Accordion.Panel></Accordion>;
                }else{
                    item.isLeaf = true;
                    return <CheckboxItem checked={selectedId === item.id} className="refer-check-box" onChange={(e) => this.onSingleChange(e, item)} key={item.id}>{item[this.props.displayField]}</CheckboxItem>;
                }
            });
        }else{
            return treeData.map((item) => {
                if (item.children && item.children.length > 0) {
                    return <Accordion onChange={this.onChange} className="refer-accordion" key={item.id}><Accordion.Panel className="refer-pad" key={item.id} header={<CheckboxItem onChange={(e) => this.onMultiChange(e, item)} key={item.id}>{item[this.props.displayField]}</CheckboxItem>}>{this.loop(item.children, selectedId)}</Accordion.Panel></Accordion>;
                }else{
                    return <CheckboxItem className="refer-check-box" onChange={(e) => this.onMultiChange(e, item)} key={item.id}>{item[this.props.displayField]}</CheckboxItem>;
                }
            });
        }
    }

    render() {
        const {data, selectedId, referName, animating} = this.state;
        return (
            <div className="ss-refer-tree">
                <SSNavBar leftContent="返回"
                          title={this.props.referName || referName}
                          key="nav"
                          onLeftClick={this.onClose}
                          rightContent={[
                              <a key="nav" onClick={this.onOk}>确定</a>,
                          ]}
                />
                <ActivityIndicator
                    toast
                    text="加载中..."
                    animating={animating}
                />
                <WhiteSpace/>
                <SearchBar placeholder="搜索" onSubmit={this.onSearchSubmit}/>
                <div className="refer-tree-content">
                    {this.loop(data, selectedId)}
                </div>
            </div>
        );
    }
}

SSReferTree.propTypes = {
    referName: PropTypes.string,
    referCode: PropTypes.string,
    displayField: PropTypes.string,
    referParams: PropTypes.object,
    multiMode: PropTypes.bool,
};

SSReferTree.defaultProps = {
    referName: '',
    referCode: '',
    referParams: {},
    multiMode: false,
    displayField: 'name',
};

export default SSReferTree;
