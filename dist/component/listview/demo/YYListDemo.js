import React from 'react'
import YYListview from '../../listview/YYListview'
import {List, Badge} from 'antd-mobile';
import {Link} from 'react-router'
const Item = List.Item;
const Brief = Item.Brief;

let page;
let num=1;
class YYListDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            init:[{headurl:'',name:'张一',dept:'管理部',company:'用友建筑'},
                {headurl:'',name:'张二',dept:'管理部',company:'用友建筑'},
                {headurl:'',name:'张三',dept:'管理部',company:'用友建筑'},
                {headurl:'',name:'张四',dept:'管理部',company:'用友建筑'},
                {headurl:'',name:'张五',dept:'管理部',company:'用友建筑'},
                {headurl:'',name:'张六',dept:'管理部',company:'用友建筑'},
                {headurl:'',name:'张七',dept:'管理部',company:'用友建筑'},
                {headurl:'',name:'张八',dept:'管理部',company:'用友建筑'},
                {headurl:'',name:'张九',dept:'管理部',company:'用友建筑'},
                {headurl:'',name:'张十',dept:'管理部',company:'用友建筑'},
                {headurl:'',name:'张十一',dept:'管理部',company:'用友建筑'},
                {headurl:'',name:'张十二',dept:'管理部',company:'用友建筑'},
                {headurl:'',name:'张十三',dept:'管理部',company:'用友建筑'},
                {headurl:'',name:'张十四',dept:'管理部',company:'用友建筑'},
                {headurl:'',name:'张十五',dept:'管理部',company:'用友建筑'},],
            row:[],
        }
    }
    componentWillMount () {
         page = this;
    }

    componentDidMount () {

    }

    //上拉加载的数据请求
     onreached=()=>{
        let rows = [
            {headurl:'',name:'张十六',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张十七',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张十八',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张十九',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张二十',dept:'管理部',company:'用友建筑'},
        ];

        if(num<3){
            let row = [...this.state.row,...rows];
            this.setState({
                row:row
            });
            num++;
        }

    }
    //下拉刷新数据请求
    onrefresh=function(){
        //此处init与初始值不同是为了方便对比重新刷新后的数据
        let init = [
            {headurl:'',name:'张二一',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张二二',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张二三',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张二四',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张二五',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张二一',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张二二',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张二三',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张二四',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张二五',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张二一',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张二二',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张二三',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张二四',dept:'管理部',company:'用友建筑'},
            {headurl:'',name:'张二五',dept:'管理部',company:'用友建筑'},
        ];
        page.setState({
            init:init
        });
        console.log(page.state.init);
    }
    deleteinit = () =>{
        this.setState({
            init:[]
        })
    }

    render(){
        const head = (url,name,index)=>{if(url==''||url==undefined){
            //颜色处理headColor+求余数
            let headColor = 'headColor'+(index%4);
            //名字最后一位
            let nameLast = name.substr(name.length-1,1);
            return <div className={"headLast" + " " + 'headColor0'}><span style={{color:'white'}}>{nameLast}</span></div>;
        }else{
            return url;
        }}
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}>
                    <List className="my-list" >
                        <Link to={"/personInfo/"+rowID} key={rowID}><Item thumb={head(rowData.headUrl,rowData.name,rowID)} onClick={()=>{{/*将详情信息存在全局*/}}} multipleLine extra={rowData.dept}>
                            {rowData.name}
                            {rowData.isUser == '1'?'':<Badge text="未激活" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#A8A8A8', borderRadius: 2 }} />}
                            <Brief>{rowData.company}</Brief>
                        </Item></Link></List>
                </div>
            );
        };
        return(
            <div>
                <div style={{textAlign:'center'}} onClick={this.deleteinit}>长列表</div>
                <YYListview init={this.state.init} row={this.state.row} reached={this.onreached} isreached={true} children={row} onrefresh={this.onrefresh} />
            </div>
        )
    }
}

export default YYListDemo;