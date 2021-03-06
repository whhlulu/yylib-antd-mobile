import React from 'react';
import { Radio, Checkbox, Modal, List, WhiteSpace, WingBlank,  Toast, ActivityIndicator, NavBar, SearchBar, Pagination} from 'antd-mobile';
import '../../../css/refer.less'
import '../../../css/YYReferTree.css'
import DeleteTap from '../delete-tap/deleteTap'
import ajax from '../../utils/ajax';
import RestUrl from "../../common/RestUrl";
import _ from 'lodash';

// import closest from '../../_util/closest';

let CheckboxItem = Checkbox.CheckboxItem;
let RadioItem = Radio.RadioItem;
let page;
let referUrl=[];
let treereferUrl=[];
let relyfield=[];
let referTreeListParams={};
let referParams;
let data=[];
let pageCount=[];
let referstyle='';
let listcontent='';
let NUM = 1;       //切换页码时的最大页数
let onsearch = false;       //是否在搜索状态
let searchNUM = 1;      //搜索状态最大页数

export default class YYReferList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],        //分页初始数据
            value:'',       //选择的值
            selectedId: null,
            pageNumber: 1,
            selectedNode: {},
            selectedNodes: [],
            animating: false,
            pageCount:'',
            searchText:'',
            showList:false, //tree-list的modal
            visible:false,       //气泡显示
            row:[],
        };
    }

    componentWillMount() {

    }
    componentWillReceiveProps(nextprops){
        if(nextprops.open!==this.props.open){
            if(nextprops.open){
                page = this;
                let name = this.props.referName;
                let open = this.props.open;
                page.setState({
                    [name]:open
                })
                let referCode = page.props.referCode;
                let referStyle = page.props.referStyle;
                //根据参照编码获取参照信息
                ajax.getJSON(RestUrl.REF_SERVER_URL + RestUrl.GET_REFINFO_BYCODE, {refCode: referCode}, function (result) {
                    if (result.success) {
                        // console.log(result.data);
                        if(result.data !== null){
                            //全部参照内容
                            data[page.props.referName+'selectlist']=[];
                            referUrl[name] = result.data.dataurl;
                            treereferUrl[name] = result.data.treerelyurl;
                            relyfield[name] = result.data.relyfield;
                            referParams = {};
                            page.setState({
                                referName: result.data.refName,
                                referUrl: referUrl,
                                row:[],
                                selectedNodes:[],       //清空上次已选择
                            })
                            referParams.condition = page.props.condition;
                            referParams.pageSize = 10;

                            page.getListData(referUrl[name], referParams, 1,name);

                        } else {
                            Toast.fail(result.msg,2)
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

    getListData = (referUrl, referParams, pageNumber,contentname) =>{
        let self = this;
        self.setState({
            animating: true
        })
        ajax.getJSON(referUrl, _.assign({}, referParams, {pageNumber: pageNumber}), function (result) {
            if (result.code === 'success') {
                data[contentname+'list']=result.data.content;
                if(onsearch){
                    data[contentname+'searchlist'+pageNumber]=result.data.content
                } else {
                    data[contentname+'list'+pageNumber]=result.data.content;
                    data[contentname+'selectlist']=[...data[contentname+'selectlist'],...result.data.content]
                    pageCount[contentname+'list']=result.data.pageCount;
                }
                pageCount[contentname]=result.data.pageCount;
                self.setState({
                    // [contentname+'name']: result.data.content,
                    pageNumber:pageNumber,
                    pageCount: result.data.pageCount,
                    animating: false,
                })

            } else {
                console.log(result.data.content);
                if(result.data.content.length==0){
                    Toast.fail('服务器信息为空',1)
                }
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


    onMultiChange = (e,selectedNode) => {
        //多选模式
        let selectedNodes = this.state.selectedNodes;
        if (!selectedNodes.some((item) => {
                return item.id === selectedNode.id
            })) {
            // console.log('1')
            selectedNodes.push(selectedNode);
            selectedNode.checked=true;
            this.setState({
                selectedNodes: selectedNodes,
                row:selectedNodes
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
            selectedNode.checked=false;
            this.setState({
                selectedNodes: newNodes,
                row:newNodes,
            });
        }
    }

    onSingleChange = (e,selectedNode) => {
        //单选模式
        if (selectedNode.id === this.state.selectedId) {
            this.setState({
                selectedId: null,
                selectedNode: {}
            });
        } else {
            this.setState({
                selectedId: selectedNode.id,
                selectedNode: selectedNode,
            });
        };
    }


    onChangePageNumber = (value) => {
        /*console.log(this.state.searchText)
        console.log(this.props.referName)*/
        //记录最大页数
        console.log(onsearch)
        if(onsearch){
            if(value>searchNUM){
                searchNUM++;
                this.setState({
                    pageNumber: value
                })

                let referParams = {};
                referParams.condition = this.props.condition;
                referParams.pageSize = 10;
                if(this.state.searchText!==''){
                    referParams.searchText = this.state.searchText;
                    referTreeListParams.searchText = this.state.searchText;
                }
                this.getListData(referUrl[this.props.referName], referParams, value ,this.props.referName);
            } else {
                data[this.props.referName+'list']=data[this.props.referName+'searchlist'+value];
                this.setState({
                    pageNumber:value,
                    animating:false,
                })
            }
        } else {
            if(value>NUM){
                NUM++;
                this.setState({
                    pageNumber: value
                })

                let referParams = {};
                referParams.condition = this.props.condition;
                referParams.pageSize = 10;
                if(this.state.searchText!==''){
                    referParams.searchText = this.state.searchText;
                    referTreeListParams.searchText = this.state.searchText;
                }
                this.getListData(referUrl[this.props.referName], referParams, value ,this.props.referName);
            } else {
                    data[this.props.referName+'list']=data[this.props.referName+'list'+value];
                    this.setState({
                        pageNumber:value,
                        animating:false,
                    })
            }
        }
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
            showList:false
        })
        onsearch = false;
        NUM =1 ;
        searchNUM = 1;
        this.setState({
            pageNumber:1,
            searchText:'',
        });
        this.props.onClose(key);
    }
    onOk = key =>(e)=> {
        let _self = this;
        this.setState({
            pageNumber:1,
            searchText:'',
            showList:false,
        })
        onsearch = false;
        NUM =1 ;
        searchNUM = 1;
        let referParams = {};
        referParams.condition = this.props.condition;

        // this.getListData(referUrl[this.props.referName], referParams, 1,this.props.referName);

        if (this.props.onOk && _.isFunction(this.props.onOk)) {
            if (!this.props.multiMode) {
                this.props.onOk(this.state.selectedNode,key);
                this.setState({
                    selectedId:null
                })
            } else {
                this.props.onOk(this.state.selectedNodes,key);
                //清空上次选择
                this.setState({
                    selectedNodes:[],
                })

            }
        }
    }
    onSearchSubmit = (value) => {
        if(value==''){
            onsearch = false;
            this.setState({
                searchText:value,
            })
            data[this.props.referName+'list']=data[this.props.referName+'list'+1];
            pageCount[this.props.referName]=pageCount[this.props.referName+'list'];
            this.setState({
                pageNumber:1,
                animating:false,
            })
        } else {
            onsearch = true;
            this.setState({
                searchText:value,
            })
            let referParams = {};
            referParams.searchText = value;
            referParams.pageSize = 10;
            referParams.condition = this.props.condition;
            this.getListData(referUrl[this.props.referName], referParams, 1,this.props.referName);
        }


    }
    listContent = (data,selectedId)=>{
        if(this.props.multiMode){
            if(data){
                return data.map(item => (
                    <CheckboxItem key={item.id} onChange={(e) => this.onMultiChange(e,item)} checked={item.checked}>
                        {item[this.props.displayField]}
                    </CheckboxItem>
                ))
            }

        } else {
            if(data){
                return data.map(item => (
                    <RadioItem key={item.id} checked={selectedId === item.id}
                               onChange={(e) => this.onSingleChange(e,item)}>
                        {item[this.props.displayField]}
                    </RadioItem>
                ))
            }
        }
    }
    handleClick = (item)=>{
        let fulldata = data[this.props.referName+'selectlist'];
        let selectdata = this.state.selectedNodes;
        for(let i = 0;i < selectdata.length; i++){
            if(item === selectdata[i]){
                if(i==0){
                    selectdata.splice(0,1);
                } else {
                    selectdata.splice(i,1);
                }
                this.setState({
                    selectNodes:selectdata,
                    row:selectdata
                })
            }
        }
        for(let i = 0; i < fulldata.length;i++){
            if(item.id == fulldata[i].id){
                fulldata[i].checked = false;
            }
        }
    }

    render() {
        let self = this;
        const {value,selectedId,animating,pageNumber,showList} = this.state;
        const {referlabel,referCode,multiMode,displayField,disabled,referStyle,referName,open,modalHeight} = this.props;

        return (
            <WingBlank>
                <WhiteSpace />
                <Modal
                    popup
                    visible={disabled?'':open}
                    maskClosable={false}
                    animationType="slide-up"
                >
                    <div style={modalHeight=='part'?{height:'93vh',width:'100vw'}:{height:'100vh',width:'100vw',display:'flex',flexDirection:'column'}}>

                        <div className='Nav'>
                            <NavBar leftContent="返回"
                                    key="nav"
                                    mode="light"
                                    onLeftClick={this.onClose(referName)}
                                    rightContent={[
                                        <a key="nav" onClick={this.onOk(referName)}>确定</a>,
                                    ]}
                            >{referlabel}</NavBar>
                        </div>
                        <div className='yyreferlist-content'>
                            <ActivityIndicator
                                toast
                                text="加载中..."
                                animating={animating}
                            />
                            <SearchBar placeholder="搜索" onSubmit={this.onSearchSubmit}/>
                            <List className="list-content">
                                {self.listContent(data[referName+'list'],selectedId)}
                            </List>
                            <div className='YYRefer-list'>
                                <Pagination total={pageCount[referName]}
                                            onChange={this.onChangePageNumber}
                                            className="custom-pagination-with-icon"
                                            current={pageCount[referName] > 0 ? pageNumber : -1}
                                            locale={{
                                                prevText: (<span className="arrow-align">上一页</span>),
                                                nextText: (<span className="arrow-align">下一页</span>),
                                            }}
                                />
                            </div>
                        </div>

                            {multiMode?<div className='yyrefer-tap'>
                                <div style={{width:'auto'}}>
                                    <DeleteTap rows={this.state.row} displayField={displayField} handleClick={this.handleClick}/>
                                </div>
                            </div>:''}

                    </div>
                </Modal>
            </WingBlank>
        );
    }
}
YYReferList.defaultProps = {
    referlabel: '参照',
    referCode: '00026',
    modalHeight:'all',
    displayField: 'name',
    referParams: {},
    multiMode: true,
    disabled:false,
    open:false,
    onOk:{},
    referName:'key',
    referStyle:'list',
    condition:{},
    listCondition:{},
};
