import React from 'react';
import { Radio, Checkbox, Modal, List, WhiteSpace, WingBlank,  Toast, ActivityIndicator, NavBar, SearchBar, Pagination} from '../../common/antd-m/index';
import '../../../css/refer.less'
import '../../../css/antd-m.css'
import ajax from '../../utils/ajax';
import RestUrl from "../../common/RestUrl";
import _ from 'lodash';

// import closest from '../../_util/closest';

let CheckboxItem = Checkbox.CheckboxItem;
let RadioItem = Radio.RadioItem;
let page;
let referUrl=[];
let referParams;
let data=[];
let pageCount=[];
let listcontent='';

export default class YYReferlist extends React.Component {
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
        };
    }

    componentWillMount() {
        page = this;
        let name = this.props.referName;
        let open = this.props.open;
        page.setState({
            [name]:open
        })
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
                 referUrl[name] = result.data.dataurl;
                 referParams = {};
                page.setState({
                    referName: result.data.refName,
                    referUrl: referUrl
                })
                referParams.condition = page.props.condition;
                referParams.pageSize = 10;
                page.getListData(referUrl[name], referParams, 1,name);

            } else {
                Toast.fail("请检查参照编码!", 3);
            }

        }, function (err) {
            Toast.fail("服务器通讯异常!", 3);
        })
    }
    componentWillReceiveProps(nextprops){
        /*console.log(nextprops.name)
        console.log(this.state[nextprops.name]);*/
        if(nextprops.open!==this.state[nextprops.name]){
            let nextopen = nextprops.open
            this.setState({
                [nextprops.name]:nextopen
            })
        }
    }

    getListData(referUrl, referParams, pageNumber,contentname) {
        let self = this;
        self.setState({
            animating: true
        })
        ajax.getJSON(referUrl, _.assign({}, referParams, {pageNumber: pageNumber}), function (result) {
            if (result.code === 'success') {
                data[contentname]=result.data.content;
                pageCount[contentname]=result.data.pageCount;

                self.setState({
                    // [contentname+'name']: result.data.content,
                    pageCount: result.data.pageCount,
                    animating: false
                })

            } else {
                self.setState({
                    animating: false
                })

                // Toast.fail(result.msg, 10);
            }
        }, function (err) {
            self.setState({
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
        let referParams = {};
        referParams.condition = this.props.condition;
        console.log(this.state.searchText)
        if(this.state.searchText!==''){
            referParams.searchText = this.state.searchText
        }
        this.getListData(referUrl[this.props.referName], referParams, value ,this.props.referName);

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
        this.getListData(referUrl[this.props.referName], referParams, 1,this.props.referName);
        this.setState({
            pageNumber:1,
            searchText:'',
            // [key]: false,
        });
        this.props.onClose(key);
    }
    onOk = key =>(e)=> {
        this.setState({
            pageNumber:1,
            searchText:'',
        })
        //初始化列表数据
        // let referUrl = this.state.referUrl;
        let referParams = {};
        referParams.condition = this.props.condition;
        this.getListData(referUrl[this.props.referName], referParams, 1,this.props.referName);
        if (this.props.onOk && _.isFunction(this.props.onOk)) {
            if (!this.props.multiMode) {
                this.props.onOk(this.state.selectedNode,key);
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
        this.setState({
            searchText:value,
        })
        /*let referUrl = this.state.referUrl;
        console.log(referUrl)*/
        let referParams = {};
        referParams.searchText = value;
        referParams.condition = this.props.condition;
        this.getListData(referUrl[this.props.referName], referParams, 1,this.props.referName);
    }
     listContent = (da,selectedId)=>{
        if(this.props.multiMode){
            if(data[this.props.referName]){
                return data[this.props.referName].map(item => (
                    <CheckboxItem key={item.id} onChange={() => this.onMultiChange(item)}>
                        {item[this.props.displayField]}
                    </CheckboxItem>
                ))
            }

        } else {
            if(data){
                data.map(item => (
                    <RadioItem key={item.id} checked={selectedId === item.id}
                               onChange={() => this.onSingleChange(item)}>
                        {item[this.props.displayField]}
                    </RadioItem>
                ))
            }
        }
    }


    render() {
        let self = this;
        const {value,selectedId,animating,pageNumber} = this.state;
        const {referlabel,referCode,multiMode,displayField,disabled,referStyle,referName,open} = this.props;
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
        let modalStyle;
        if(referStyle==='list'){
            modalStyle = <Modal
                popup
                visible={disabled?'':open}
                maskClosable={false}
                animationType="slide-up"
            >
                <div style={{height:'100vh',width:'100vw'}}>


                    <NavBar leftContent="返回"
                            key="nav"
                            mode="light"
                            onLeftClick={this.onClose(referName)}
                            rightContent={[
                                <a key="nav" onClick={this.onOk(referName)}>确定</a>,
                            ]}
                    >{referlabel}</NavBar>
                    <ActivityIndicator
                        toast
                        text="加载中..."
                        animating={animating}
                    />
                    <WhiteSpace/>
                    <SearchBar placeholder="搜索" onSubmit={this.onSearchSubmit}/>
                    <List className="list-content">
                        {self.listContent(this.state[referName+'name'],selectedId)}
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
                </div>
            </Modal>
        } else{
            Toast.fail('未传入正确的referCode',1000)
        }
        return (
            <WingBlank>
                <WhiteSpace />
                {modalStyle}
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
    referName:'key',
    referStyle:'list',
    condition:{},
};
