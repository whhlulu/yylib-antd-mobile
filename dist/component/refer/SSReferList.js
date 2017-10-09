import React, {Component} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ajax from '../utils/ajax';
import {List, Checkbox, SearchBar, WhiteSpace, Pagination, Toast, Popup, Radio, ActivityIndicator} from 'antd-mobile';
import '../../css/SSReferList.css'
import RestUrl from "./RestUrl";
import SSNavBar from "./component/navbar/SSNavBar";
import {hashHistory} from 'react-router';

let CheckboxItem = Checkbox.CheckboxItem;
let RadioItem = Radio.RadioItem;
let page;

class SSReferList extends Component {
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
            if (result.success) {
                let referUrl = result.data.dataurl;
                let referParams = {};
                page.setState({
                    referName: result.data.refName,
                    referUrl: referUrl
                })
                referParams.condition = page.props.condition;
                page.getListData(referUrl, referParams, 1);
            } else {
                Toast.fail("请检查参照编码!", 3);
            }

        }, function (err) {
            Toast.fail("服务器通讯异常!", 3);
        })
    }

    componentDidMount() {
    }

    state = {
        data: [],
        selectedId: null,
        pageNumber: 0,
        selectedNode: {},
        selectedNodes: [],
        animating: false
    }

    getListData(referUrl, referParams, pageNumber) {
        this.setState({
            animating: true
        })
        ajax.getJSON(referUrl, _.assign({}, referParams, {pageNumber: pageNumber}), function (result) {
            if (result.code === 'success') {
                page.setState({
                    data: result.data.content,
                    pageCount: result.data.pageCount,
                    animating: false
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

    onOk = () => {
        if (this.props.onOk && _.isFunction(this.props.onOk)) {
            if (!this.props.multiMode) {
                this.props.onOk(this.state.selectedNode);
            } else {
                this.props.onOk(this.state.selectedNodes);
            }
        }
    }

    onClose = () => {
        Popup.hide();
        hashHistory.goBack();
    };

    onSearchSubmit = (value) => {
        let referUrl = this.state.referUrl;
        let referParams = {};
        referParams.searchText = value;
        referParams.condition = this.props.condition;
        this.getListData(referUrl, referParams, 1);
    }

    onChangePageNumber = (value) => {
        this.setState({
            pageNumber: value
        })
        let referUrl = this.state.referUrl;
        let referParams = {};
        referParams.condition = this.props.condition;
        this.getListData(referUrl, referParams, value + 1);
    }

    render() {
        const {selectedId, data, pageNumber, pageCount, referName, animating} = this.state;
        const {displayField} = this.props;
        return (
            <div className="ss-refer-list">
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
                <List className="list-content">
                    {this.props.multiMode ? data.map(item => (
                        <CheckboxItem key={item.id} onChange={() => this.onMultiChange(item)}>
                            {item[displayField]}
                        </CheckboxItem>
                    )) : data.map(item => (
                        <RadioItem key={item.id} checked={selectedId === item.id}
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
            </div>
        );
    }
}

SSReferList.propTypes = {
    referName: PropTypes.string,
    referUrl: PropTypes.string,
    displayField: PropTypes.string,
    referParams: PropTypes.object,
    multiMode: PropTypes.bool,
};

SSReferList.defaultProps = {
    referName: '',
    referCode: '',
    displayField: 'name',
    referParams: {},
    multiMode: false,
};

export default SSReferList;