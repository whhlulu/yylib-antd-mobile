import React from 'react';
import {
    Radio,
    Checkbox,
    Modal,
    List,
    WhiteSpace,
    WingBlank,
    Toast,
    ActivityIndicator,
    NavBar,
    SearchBar,
    Pagination,
    Accordion
} from 'antd-mobile';
import '../../../css/refer.less'
import '../../../css/YYReferTree.css'
import DeleteTap from '../delete-tap/deleteTap'
import ajax from '../../utils/ajax';
import RestUrl from "../../common/RestUrl";
import _ from 'lodash';

// import closest from '../../_util/closest';

let CheckboxItem = Checkbox.CheckboxItem;
let RadioItem = Radio.RadioItem;
let Item = List.Item;
let page;
let referUrl = [];
let treereferUrl = [];
let relyfield = [];
let referTreeListParams = {};
let referParams;
let data = [];
let pageCount = [];
let NUM = 1;       //切换页码时的最大页数
let onsearch = false;       //是否在搜索状态
let searchNUM = 1;      //搜索状态最大页数

export default class YYReferTreeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],        //分页初始数据
            value: '',       //选择的值
            selectedId: null,
            selectedNode: {},
            selectedNodes: [],
            animating: false,
            pageCount: '',
            searchText: '',
            showList: false, //tree-list的modal
            row: [],
        };
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.open !== this.props.open) {
            if (nextprops.open) {
                page = this;
                let name = this.props.referName;
                let open = this.props.open;
                page.setState({
                    [name]: open
                })
                let referCode = page.props.referCode;
                let referStyle = page.props.referStyle;
                //根据参照编码获取参照信息
                ajax.getJSON(RestUrl.REF_SERVER_URL + RestUrl.GET_REFINFO_BYCODE, {refCode: referCode}, function (result) {
                    if (result.success) {
                        // console.log(result.data);
                        if (result.data !== null) {
                            data[page.props.referName + 'selectlist'] = [];
                            referUrl[name] = result.data.dataurl;
                            treereferUrl[name] = result.data.treerelyurl;
                            relyfield[name] = result.data.relyfield;
                            referParams = {};

                            page.setState({
                                referName: result.data.refName,
                                referUrl: referUrl
                            })
                            referParams.condition = page.props.condition;
                            page.getTreeData(treereferUrl[name], referParams, name);

                        } else {
                            Toast.fail(result.msg, 2)
                        }


                    } else {
                        Toast.fail("请检查参照编码!", 3);
                    }

                }, function (err) {
                    Toast.fail("服务器通讯异常!", 3);
                })

            }
        }
    }

    getTreeData(referUrl, referParams, contentname) {
        let _self = this;
        _self.setState({
            animating: true
        })
        ajax.getText(referUrl, referParams, function (result) {
            result = JSON.parse(result);
            data[contentname] = result;
            _self.setState({
                // data: result,
                animating: false
            })
        }, function (err) {
            _self.setState({
                animating: false
            })
            Toast.fail("服务器通讯异常!", 1);
        })
    }

    getListData(referUrl, referParams, pageNumber, contentname) {
        let self = this;
        self.setState({
            animating: true
        })
        ajax.getJSON(referUrl, _.assign({}, referParams, {pageNumber: pageNumber}), function (result) {
            if (result.code === 'success') {
                if (result.data.content.length == 0) {
                    Toast.fail('获取数据信息为空', 2)
                }
                data[contentname + 'list'] = result.data.content;
                if (onsearch) {
                    data[contentname + 'searchlist' + pageNumber] = result.data.content
                } else {
                    data[contentname + 'list' + pageNumber] = result.data.content;
                    data[contentname + 'selectlist'] = [...data[contentname + 'selectlist'], ...result.data.content]
                    pageCount[contentname + 'list'] = result.data.pageCount;
                }


                pageCount[contentname] = result.data.pageCount;
                self.setState({
                    // [contentname+'name']: result.data.content,
                    pageNumber: pageNumber,
                    pageCount: result.data.pageCount,
                    animating: false
                })


            } else {
                self.setState({
                    animating: false
                })

                // toast.fail(result.msg, 10);
            }
        }, function (err) {
            self.setState({
                animating: false
            })
            Toast.fail("服务器通讯异常!", 1);
        })
    }

    onMultiChange = (e, selectedNode) => {
        //多选模式
        let selectedNodes = this.state.selectedNodes;
        if (!selectedNodes.some((item) => {
                return item.id === selectedNode.id
            })) {
            // console.log('1')
            selectedNodes.push(selectedNode);
            selectedNode.checked = true;
            this.setState({
                selectedNodes: selectedNodes,
                row: selectedNodes
            });
        } else {
            // console.log('2')
            let newNodes = [];
            // eslint-disable-next-line
            selectedNodes.map((item) => {
                if (item.id !== selectedNode.id) {
                    newNodes.push(item);
                }
            })
            selectedNode.checked = false;
            this.setState({
                selectedNodes: newNodes,
                row: newNodes
            });
        }
    }

    onSingleChange = (e, selectedNode) => {
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
        ;
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => (e) => {
        //初始化列表数据后再关闭
        // let referUrl = this.state.referUrl;
        let referParams = {};
        referParams.condition = this.props.condition;
        this.setState({
            showList: false
        })
        onsearch = false;
        // this.getListData(referUrl[this.props.referName], referParams, 1,this.props.referName);
        this.setState({
            searchText: '',
            // [key]: false,
        });
        this.props.onClose(key);
    }
    onOk = key => (e) => {
        let _self = this;
        this.setState({
            pageNumber: 1,
            searchText: '',
            showList: false,
        })
        onsearch = false;
        let referParams = {};
        referTreeListParams = {};
        referParams.condition = this.props.condition;

        // this.getListData(referUrl[this.props.referName], referParams, 1,this.props.referName);

        if (this.props.onOk && _.isFunction(this.props.onOk)) {
            if (!this.props.multiMode) {
                this.props.onOk(this.state.selectedNode, key);
                this.setState({
                    selectedId: null
                })
            } else {
                this.props.onOk(this.state.selectedNodes, key);
                //清空上次选择
                this.setState({
                    selectedNodes: [],
                })

            }
        }
    }
    onTreeChange = (e, selectedNode) => {
        e.stopPropagation();
        e.preventDefault();
        if (selectedNode.id === this.state.selectedTreeId) {
            // console.log('1')
            this.setState({
                selectedTreeId: null,
                showList: true
            });
        } else {
            // console.log('2')
            this.setState({
                selectedTreeId: selectedNode.id,
                showList: true
            });
        }

        referTreeListParams.relyCondition = (relyfield[this.props.referName] + '=' + selectedNode.id);
        referTreeListParams.condition = this.props.listCondition;
        referTreeListParams.pageSize = 10;
        console.log(referTreeListParams)
        this.getListData(referUrl[this.props.referName], referTreeListParams, 1, this.props.referName);
    }
    onSearchSubmit = (value) => {
        if (value == '') {
            onsearch = false;
            this.setState({
                searchText: value,
            })
            data[this.props.referName + 'list'] = data[this.props.referName + 'list' + 1];
            pageCount[this.props.referName] = pageCount[this.props.referName + 'list'];
            this.setState({
                pageNumber: 1,
                animating: false,
            })
        } else {
            onsearch = true;
            this.setState({
                searchText: value,
            })
            referTreeListParams.searchText = value;
            this.getListData(referUrl[this.props.referName], referTreeListParams, 1, this.props.referName);
        }
    }
    onTreeSearchSubmit = (value) => {

    }

    treeListContent = (treeData, selectedId) => {
        if (treeData) {
            return treeData.map((item) => {
                if (item.children && item.children.length > 0) {
                    return <Accordion onChange={this.onChange} className="refer-accordion"
                                      key={item.id}><Accordion.Panel className="refer-pad" key={item.id}
                                                                     header={<CheckboxItem
                                                                         onChange={(e) => this.onTreeChange(e, item)}
                                                                         checked={false}
                                                                         key={item.id}>{item[this.props.displayField]}</CheckboxItem>}>{this.treeListContent(item.children, selectedId)}</Accordion.Panel></Accordion>;
                } else {
                    return <CheckboxItem className="refer-check-box" checked={false}
                                         onChange={(e) => this.onTreeChange(e, item)}
                                         key={item.id}>{item[this.props.displayField]}</CheckboxItem>;
                }
            });
        }

    }
    listContent = (data, selectedId) => {
        if (this.props.multiMode) {
            if (data) {
                return data.map(item => (
                    <CheckboxItem key={item.id} onChange={(e) => this.onMultiChange(e, item)} checked={item.checked}>
                        {item[this.props.displayField]}
                    </CheckboxItem>
                ))
            }

        } else {
            if (data) {
                return data.map(item => (
                    <RadioItem key={item.id} checked={selectedId === item.id}
                               onChange={(e) => this.onSingleChange(e, item)}>
                        {item[this.props.displayField]}
                    </RadioItem>
                ))
            }
        }
    }
    onChangePageNumber = (value) => {
        if (onsearch) {
            console.log('onsearch')
            if (value > searchNUM) {
                searchNUM++;
                this.setState({
                    pageNumber: value
                })
                let referParams = {};
                referParams.condition = this.props.condition;
                referParams.pageSize = 10;
                if (this.state.searchText !== '') {
                    referParams.searchText = this.state.searchText;
                    referTreeListParams.searchText = this.state.searchText;
                }
                this.getListData(referUrl[this.props.referName], referTreeListParams, value, this.props.referName);
            } else {
                data[this.props.referName + 'list'] = data[this.props.referName + 'searchlist' + value];
                this.setState({
                    pageNumber: value,
                    animating: false,
                })
            }
        } else {
            console.log('notsearch')
            if (value > NUM) {
                NUM++;
                this.setState({
                    pageNumber: value
                })
                let referParams = {};
                referParams.condition = this.props.condition;
                referParams.pageSize = 10;
                if (this.state.searchText !== '') {
                    referParams.searchText = this.state.searchText;
                    referTreeListParams.searchText = this.state.searchText;
                }
                this.getListData(referUrl[this.props.referName], referTreeListParams, value, this.props.referName);
            } else {
                data[this.props.referName + 'list'] = data[this.props.referName + 'list' + value];
                console.log(data[this.props.referName + 'list']);
                this.setState({
                    pageNumber: value,
                    animating: false,
                })
            }
        }
    }
    handleClick = (item) => {
        let fulldata = data[this.props.referName + 'selectlist'];
        let selectdata = this.state.selectedNodes;
        for (let i = 0; i < selectdata.length; i++) {
            if (item === selectdata[i]) {
                if (i == 0) {
                    selectdata.splice(0, 1);
                } else {
                    selectdata.splice(i, 1);
                }
                this.setState({
                    selectNodes: selectdata,
                    row: selectdata
                })
            }
        }
        for (let i = 0; i < fulldata.length; i++) {
            if (item.id == fulldata[i].id) {
                fulldata[i].checked = false;
            }
        }
    }

    render() {
        const {value, selectedId, animating, pageNumber, showList} = this.state;
        const {referlabel, referCode, multiMode, displayField, disabled, referStyle, referName, open, modalHeight} = this.props;
        /*let listContent = (data,selectedId)=>{
            if(this.props.multiMode){
                if(data[this.props.referName]){
                    return data[this.props.referName].map(item => (
                        <CheckboxItem key={item.id} onChange={() => this.onMultiChange(item)}>
                            {item[this.props.displayField]}
                        </CheckboxItem>
                    ))
                }

            } else {
                if(data[this.props.referName]){
                    data[this.props.referName].map(item => (
                        <RadioItem key={item.id} checked={selectedId === item.id}
                                   onChange={() => this.onSingleChange(item)}>
                            {item[this.props.displayField]}
                        </RadioItem>
                    ))
                }

            }
        }*/


        return (
            <WingBlank>
                <WhiteSpace/>
                <Modal
                    popup
                    visible={disabled ? '' : open}
                    maskClosable={false}
                    animationType="slide-up">
                    <div style={modalHeight == 'part' ? {height: '93vh', width: '100vw'} : {
                        height: '100vh',
                        width: '100vw'
                    }}>
                        <NavBar leftContent="返回"
                                key="nav"
                                mode="light"
                                onLeftClick={this.onClose(referName)}
                        >{referlabel}</NavBar>
                        <ActivityIndicator
                            toast
                            text="加载中..."
                            animating={animating}
                        />
                        {/*<SearchBar placeholder="搜索" onSubmit={this.onSearchSubmit}/>*/}
                        <div className="refer-tree-content">
                            {this.treeListContent(data[referName], selectedId)}
                        </div>
                        <Modal
                            popup
                            visible={showList}
                            maskClosable={false}
                            animationType="slide-up"
                        >
                            <div style={modalHeight == 'part' ? {height: '93vh', width: '100vw'} : {
                                height: '100vh',
                                width: '100vw'
                            }}>
                                    <NavBar leftContent="返回"
                                            key="nav"
                                            mode="light"
                                            onLeftClick={() => {
                                                this.setState({selectedTreeId: null, showList: false});
                                                referTreeListParams = {}
                                            }}
                                            rightContent={[
                                                <a key="nav" onClick={this.onOk(referName)}>确定</a>,
                                            ]}
                                    >{referlabel}</NavBar>


                                <ActivityIndicator
                                    toast
                                    text="加载中..."
                                    animating={animating}
                                />
                                <SearchBar placeholder="搜索" onSubmit={this.onSearchSubmit}/>
                                <List className="list-content">
                                    {this.listContent(data[referName + 'list'], selectedId)}
                                </List>
                                <Pagination total={pageCount[referName]}
                                            onChange={this.onChangePageNumber}
                                            className="custom-pagination-with-icon"
                                            current={pageCount[referName] > 0 ? pageNumber : -1}
                                            locale={{
                                                prevText: (<span className="arrow-align">上一页</span>),
                                                nextText: (<span className="arrow-align">下一页</span>),
                                            }}
                                />
                                <div style={{
                                    position: 'fixed',
                                    top: '93vh',
                                    zIndex: '99',
                                    width: '100vw',
                                    height: '50px',
                                    backgroundColor: 'white'
                                }}>
                                    <div style={{width: 'auto'}}>
                                        <DeleteTap rows={this.state.row} displayField={displayField}
                                                   handleClick={this.handleClick}/>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </Modal>
            </WingBlank>
        );
    }
}
YYReferTreeList.defaultProps = {
    referlabel: '参照',
    referCode: '00026',
    modalHeight: 'all',
    displayField: 'name',
    referParams: {},
    multiMode: true,
    disabled: false,
    open: false,
    onOk: {},
    referName: 'key',
    referStyle: 'list',
    condition: {},
    listCondition: {},
};
