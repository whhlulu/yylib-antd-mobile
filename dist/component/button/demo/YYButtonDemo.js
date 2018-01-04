import React from 'react'
import YYButton from '../YYButton'
import YYList from '../../list/YYList'
import {List, Badge, ListView, PullToRefresh} from 'antd-mobile';
import {Link} from 'react-router'
const Item = List.Item;
const Brief = Item.Brief;


 class SS extends React.Component{
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

    }

    componentDidMount () {
        console.log('1')

    }
     
     //上拉加载的数据请求
     onreached = (fun)=>{
         let rows = [
             {headurl:'',name:'张十六',dept:'管理部',company:'用友建筑'},
             {headurl:'',name:'张十七',dept:'管理部',company:'用友建筑'},
             {headurl:'',name:'张十八',dept:'管理部',company:'用友建筑'},
             {headurl:'',name:'张十九',dept:'管理部',company:'用友建筑'},
             {headurl:'',name:'张二十',dept:'管理部',company:'用友建筑'},
         ];
         let row = [...this.state.row,...rows];
         this.setState({
             row:row
         });
         fun();
     }
    render(){
        const head = (url,name,index)=>{if(url==''||url==undefined){
            //颜色处理headColor+求余数
            let headColor = 'headColor'+(index%4);
            //名字最后一位
            let nameLast = name.substr(name.length-1,1);
            return <div classname={"headLast" + " " + 'headColor0'}><span style={{color:'white'}}>{nameLast}</span></div>;
        }else{
            return url;
        }}
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}>
                    <List classname="my-list">
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
                <YYButton/>
                <YYList init={this.state.init} row={this.state.row} reached={this.onreached} isreached={true} chilren={row}/>
            </div>
        )
    }
}

export default SS;