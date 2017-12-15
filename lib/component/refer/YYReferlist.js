import React from 'react';
import { Radio, Checkbox, Modal, List, Button, WhiteSpace, WingBlank,  Toast, ActivityIndicator, NavBar, Icon, SearchBar, Pagination} from 'antd-mobile/lib/index';
import './refer.less'
import ajax from '../../utils/ajax';
import RestUrl from "../../common/RestUrl";
import _ from 'lodash';

// import closest from '../../_util/closest';

let CheckboxItem = Checkbox.CheckboxItem;
let RadioItem = Radio.RadioItem;
let page;
let referUrl;
let referParams;

export default class YYReferlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
            modal2: false,
            data:[],        //分页初始数据
            row:[],         //分页加载数据
            value:'',       //选择的值
            selectedId: null,
            pageNumber: 1,
            selectedNode: {},
            selectedNodes: [],
            animating: false,
            pageCount:'',
            searchText:'',
        };
    }

    componentWillMount() {
        page = this;
        // window.addEventListener('hashchange', (hash) => {
            // let oldUri = hash.oldURL.split('#/')[1].split('?')[0];
            // if(oldUri.endsWith('/refer')){
            //     Popup.hide();
            // }
        // })
        let referCode = this.props.referCode;
        //根据参照编码获取参照信息
        ajax.getJSON(RestUrl.REF_SERVER_URL + RestUrl.GET_REFINFO_BYCODE, {refCode: referCode}, function (result) {
            if (result.success) {
                 referUrl = result.data.dataurl;
                 referParams = {};
                page.setState({
                    referName: result.data.refName,
                    referUrl: referUrl
                })
                referParams.condition = page.props.condition;
                referParams.pageSize = 10;
                page.getListData(referUrl, referParams, 1);
            } else {
                Toast.fail("请检查参照编码!", 3);
            }

        }, function (err) {
            Toast.fail("服务器通讯异常!", 3);
        })
    }
    componentWillReceiveProps(nextprops){
        if(nextprops.open){
           page.setState({
               modal2:true,
           })
        } else{
            page.setState({
                modal2:false,
            })
        }
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

    onChangePageNumber = (value) => {
        this.setState({
            pageNumber: value
        })
        let referUrl = this.state.referUrl;
        let referParams = {};
        referParams.condition = this.props.condition;
        if(this.state.searchText!==''){
            referParams.searchText = page.state.searchText
        }
        this.getListData(referUrl, referParams, value);

    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        //初始化列表数据后再关闭
        let referUrl = this.state.referUrl;
        let referParams = {};
        referParams.condition = this.props.condition;
        this.getListData(referUrl, referParams, 1);
        this.setState({
            pageNumber:1,
            searchText:'',
            [key]: false,
        });
    }
    onOk = () => {
        this.setState({
            pageNumber:1,
            searchText:'',
            ['modal2']:false,
        })
        //初始化列表数据
        let referUrl = this.state.referUrl;
        let referParams = {};
        referParams.condition = this.props.condition;
        this.getListData(referUrl, referParams, 1);
        if (this.props.onOk && _.isFunction(this.props.onOk)) {
            if (!this.props.multiMode) {
                this.props.onOk(this.state.selectedNode);
            } else {
                this.props.onOk(this.state.selectedNodes);
                //清空上次选择
                page.setState({
                    selectedNodes:[],
                })

            }
        }
    }
    onSearchSubmit = (value) => {
        page.setState({
            searchText:value,
        })
        let referUrl = this.state.referUrl;
        let referParams = {};
        referParams.searchText = value;
        referParams.condition = this.props.condition;
        this.getListData(referUrl, referParams, 1);
    }
    render() {
        const {value,selectedId,animating,referName,pageCount,pageNumber,data} = this.state;
        const {referlabel,referCode,multiMode,displayField} = this.props;
        /*const row = (rowData, sectionID, rowID) => {
            return (

                <div key={rowID}>
                    <List className="popup-list">
                        {!multiMode? <CheckboxItem key={rowData.id} checked={selectedId === rowData.id} onChange={() => this.onSingleChange(rowData)}>
                            {rowData[displayField]}
                        </CheckboxItem>:
                            <RadioItem key={rowData.id} checked={selectedId === rowData.id}
                                       onChange={()=>this.onSingleChange(rowData)}>
                                {rowData[displayField]}
                            </RadioItem>
                        }
                    </List>
                </div>
            );
        };*/
        return (
            <WingBlank>
                {/*<Button onClick={this.showModal('modal2')}>点击选择参照</Button>*/}
                <WhiteSpace />
                <Modal
                    popup
                    visible={this.state.modal2}
                    maskClosable={false}
                    animationType="slide-up"
                >
                    <div style={{height:'100vh',width:'100vw'}}>


                    <NavBar leftContent="返回"
                              key="nav"
                            mode="light"
                              onLeftClick={this.onClose('modal2')}
                              rightContent={[
                                  <a key="nav" onClick={this.onOk}>确定</a>,
                              ]}
                    >{referlabel}</NavBar>
                    <ActivityIndicator
                        toast
                        text="加载中..."
                        animating={animating}
                    />
                    <WhiteSpace/>
                    <SearchBar placeholder="搜索" onSubmit={this.onSearchSubmit}/>
                    {/*<YYListview init={this.state.data} row={this.state.row} children={row} isreached={true} reached={this.onreached} height="450px"/>*/}
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
                    <Pagination total={pageCount}
                                onChange={this.onChangePageNumber}
                                className="custom-pagination-with-icon"
                                current={pageCount > 0 ? pageNumber : -1}
                                locale={{
                                    prevText: (<span className="arrow-align">上一页</span>),
                                    nextText: (<span className="arrow-align">下一页</span>),
                                }}
                    />
                    {/*<List renderHeader={() => <div></div>}>
                        <List.Item>
                            <Button type="primary" onClick={this.onClose('modal2')}>确定</Button>
                        </List.Item>
                    </List>*/}
                    </div>
                </Modal>
            </WingBlank>
        );
    }
}
YYReferlist.defaultProps = {
    referlabel: '参照',
    referCode: '00026',
    displayField: 'name',
    referParams: {},
    multiMode: false,
    disabled:false,
    open:false,
    onOk:{},

    condition:{},

};
