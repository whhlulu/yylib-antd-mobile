import React from 'react';
import { Radio, Checkbox, Modal, List, WhiteSpace, WingBlank,  Toast, ActivityIndicator, NavBar, SearchBar, Pagination, Accordion,Icon} from 'antd-mobile';
import '../../../css/refer.less'
import '../../../css/YYReferTree.css'
import SwipeNavBar from '../swipeNavBar/SwipeNavBar'
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
let referParams;
let data=[];

export default class YYReferTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],        //分页初始数据
            value:'',       //选择的值
            selectedId: null,
            selectedNode: {},
            selectedNodes: [],
            animating: false,
            pageCount:'',
            searchText:'',
            showList:false, //tree-list的modal
            swiperow:[],             //标题导航栏
            changeOrNext:true,         //点击选择或者onclick事件
            row:[],                 //已选择列表
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
                //储存选择列表有关的数据
                data[page.props.referName+'fulldata']=[];
                //根据参照编码获取参照信息
                ajax.getJSON(RestUrl.REF_SERVER_URL + RestUrl.GET_REFINFO_BYCODE, {refCode: referCode}, function (result) {
                    if (result.success) {
                        // console.log(result.data);
                        if(result.data !== null){
                            referUrl[name] = result.data.dataurl;
                            treereferUrl[name] = result.data.treerelyurl;
                            relyfield[name] = result.data.relyfield;
                            referParams = {};
                            let rows = [{id:'001',name:'首页',url:referUrl[name],referParams:referParams}]
                            page.setState({
                                referName: result.data.refName,
                                referUrl: referUrl,
                                swiperow:rows,
                                row:[]
                            })
                            referParams.condition = page.props.condition;
                            page.getTreeData(referUrl[name], referParams,name);

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
    getTreeData (referUrl, referParams, contentname){
        let _self = this;
        _self.setState({
            animating: true
        })
        ajax.getText(referUrl, referParams, function (result) {
            result = JSON.parse(result);
            //首页和非首页的数据分别处理,如果存在点击过的情况就用缓存数据
            if(referParams.pid){
                let fulldata = data[contentname+'fulldata'];
                // console.log(fulldata)
                for(let i = 0;i<fulldata.length;i++){
                    if(data[contentname+referParams.pid]==fulldata[i]){
                        data[contentname]=data[contentname+referParams.pid];
                        _self.setState({
                            animating: false
                        })
                        return;
                    }
                }
                data[contentname+referParams.pid]=result;
                data[contentname]=data[contentname+referParams.pid];
                data[contentname+'fulldata'].push( data[contentname+referParams.pid])
                console.log(data[contentname+'fulldata']);
            } else {
                data[contentname]=result;
                if(!data[contentname+'000001']){
                    data[contentname+'000001']=result;
                    data[contentname+'fulldata'].push(data[contentname+'000001']);
                    // console.log(data[contentname+'fulldata']);
                }

            }

            _self.setState({
                animating: false
            })
        }, function (err) {
            _self.setState({
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
            // console.log('onchange');
            selectedNodes.push(selectedNode);
            selectedNode.checked=true;
            this.setState({
                changeOrNext:false,
                selectedNodes: selectedNodes,
                row:selectedNodes
            });
            setTimeout(()=>{
                this.setState({
                    changeOrNext:true,
                })
            },10)
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
                changeOrNext:false,
                selectedNodes: newNodes,
                row:newNodes
            });
            setTimeout(()=>{
                this.setState({
                    changeOrNext:true,
                })
            },10)
        }
    }

    onSingleChange = (e,selectedNode) => {
        //单选模式
        if (selectedNode.id === this.state.selectedId) {
            this.setState({
                selectedId: null,
                selectedNode: {},
                changeOrNext:false,
            });
            setTimeout(()=>{
                this.setState({
                    changeOrNext:true,
                })
            },10)
        } else {
            this.setState({
                selectedId: selectedNode.id,
                selectedNode: selectedNode,
                changeOrNext:false
            });
            setTimeout(()=>{
                this.setState({
                    changeOrNext:true,
                })
            },10)
        };
    }

    onClose = key => (e) => {
        //初始化列表数据后再关闭
        // let referUrl = this.state.referUrl;
        let referParams = {};
        referParams.condition = this.props.condition;
        this.setState({
            showList:false
        })

        // this.getListData(referUrl[this.props.referName], referParams, 1,this.props.referName);

        this.setState({
            searchText:'',
            // [key]: false,
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
        if(value == ''){
            if(referParams.pid){
                this.getTreeData(referUrl[this.props.referName], {pid:referParams.pid},this.props.referName);
            } else {
                this.getTreeData(referUrl[this.props.referName],{},this.props.referName);
            }

        } else {
            console.log(value);
            let currentData = data[this.props.referName];
            let searchData = [];                     //搜索结果显示
            let searchKey = this.props.displayField;         //需要搜索的key
            let search = (searchText,data)=>{
                for(let i = 0 ; i < data.length; i++){
                    if(data[i][searchKey].includes(searchText)){
                        searchData.push(data[i])
                    }
                    if(data[i].children !== null){
                        search(searchText,data[i].children)
                    }
                }
            }
            search(value,currentData);
            data[this.props.referName] = searchData;
            this.setState({
                animating:false,
            })
        }


    }
    treeContent = (treeData, selectedId) => {
        if(!this.props.multiMode){
            if(treeData){
                return treeData.map((item) => {
                    if (item.children && item.children.length > 0) {
                        return <Accordion onChange={this.onChange} className="refer-accordion" key={item.id}><Accordion.Panel className="refer-pad" key={item.id} header={<CheckboxItem  checked={selectedId === item.id} onChange={(e) => this.onSingleChange(e, item)} key={item.id}>{item[this.props.displayField]}</CheckboxItem>}>{this.treeContent(item.children, selectedId)}</Accordion.Panel></Accordion>;
                    }else{
                        return <CheckboxItem checked={selectedId === item.id} className="refer-check-box" onChange={(e) => this.onSingleChange(e,item)} onClick={this.nextRefer.bind(this,item)} key={item.id}>{item[this.props.displayField]}</CheckboxItem>;
                    }
                });
            }
        }else{
            if(treeData){
                return treeData.map((item) => {
                    if (item.children && item.children.length > 0) {
                        return <Accordion onChange={this.onChange} className="refer-accordion"  key={item.id}><Accordion.Panel className="refer-pad" key={item.id} header={<CheckboxItem onChange={(e) => this.onMultiChange(e, item)} key={item.id} checked={item.checked}>{item[this.props.displayField]}</CheckboxItem>}>{this.treeContent(item.children, selectedId)}</Accordion.Panel></Accordion>;
                    }else{
                        if(item.isLeaf){
                            return <CheckboxItem className="refer-check-box" onChange={(e) => this.onMultiChange(e, item)} onClick={this.nextRefer.bind(this,item)} key={item.id} checked={item.checked} >{item[this.props.displayField]}</CheckboxItem>;
                        } else {
                            return <CheckboxItem className="refer-check-box" onChange={(e) => this.onMultiChange(e, item)} onClick={this.nextRefer.bind(this,item)} key={item.id} checked={item.checked} >{item[this.props.displayField]}<div style={{float:'right',color:'RGB(189,189,194)'}} ><Icon type='right'/></div></CheckboxItem>;
                        }

                    }
                });
            }
        }
    }
    onChange = ()=>{
        console.log('change')
    }
    nextRefer = (value)=>{
            setTimeout(()=>{
                if(this.state.changeOrNext){
                    console.log('next')
                    referParams.pid = value.id;
                    if(!value.isLeaf){
                        this.setState({
                            swiperow:[...this.state.swiperow,value]
                        })
                        this.getTreeData(referUrl[this.props.referName], referParams,this.props.referName);
                    }
                }

            },10)

    }
    handleClick = (value) =>{
        //点击导航栏所做的处理
        if(value.name == '首页'){
            this.setState({
                swiperow:[value]
            })
            data[this.props.referName]=data[this.props.referName+'000001'];
        } else {
            this.state.swiperow.some((item,index)=>{
                if(item.id == value.id){
                    let name = this.props.referName;
                    let oldRow = this.state.swiperow;
                    let newRow = [];
                    referParams.pid=value.id;
                    newRow = oldRow.splice(0,index+1);
                   this.setState({
                       swiperow:newRow
                   })
                    this.getTreeData(referUrl[name], {pid:value.id},this.props.referName);
                }
            })
        }
    }

    tapHandleClick = (item)=>{
        let fulldata = data[this.props.referName+'fulldata'];
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

        let checkedfalse = (fulldata)=>{
            for(let j = 0;j<fulldata.length;j++){
                if(item.id == fulldata[j].id){
                    fulldata[j].checked = false;
                    return;
                } else {
                    if(_.isArray(fulldata[j].children)){
                        checkedfalse(fulldata[j].children)
                    } else {
                        checkedfalse(fulldata[j])
                    }
                }
            }
        }
        checkedfalse(fulldata);
       // checkedfalse(fulldata);


        /*for(let i = 0; i < fulldata.length;i++){
            if(item.id == fulldata[i].id){
                fulldata[i].checked = false;
            } else{

            }
        }*/
    }

    render() {
        const {value,selectedId,animating,pageNumber,showList} = this.state;
        const {referlabel,referCode,multiMode,displayField,disabled,referStyle,referName,open,modalHeight} = this.props;
        return (
            <WingBlank>
                <WhiteSpace />
                <Modal
                    popup
                    visible={disabled?'':open}
                    maskClosable={false}
                    animationType="slide-up">
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

                        <ActivityIndicator
                            toast
                            text="加载中..."
                            animating={animating}
                        />



                        <div className="refer-lazytree-content">
                            <SearchBar placeholder="搜索" onSubmit={this.onSearchSubmit}/>
                            <div className='refer-swipe'>
                                <SwipeNavBar rows={this.state.swiperow} handleClick={this.handleClick}/>
                            </div>
                            {this.treeContent(data[referName], selectedId)}
                        </div>
                        {multiMode? <div className='yyrefer-tap'>
                            <div style={{width:'auto'}}>
                                <DeleteTap rows={this.state.row} displayField={displayField} handleClick={this.tapHandleClick}/>
                            </div>
                        </div>:''}
                    </div>
                </Modal>
            </WingBlank>
        );
    }
}
YYReferTree.defaultProps = {
    referlabel: '参照',
    referCode: '',
    modalHeight:'all',
    displayField: 'name',
    referParams: {},
    multiMode: true,
    disabled:false,
    open:false,
    onOk:{},
    referName:'key',
    referStyle:'lazy-tree',
    condition:{},
    listCondition:{},
};
