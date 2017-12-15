import React from 'react'
import YYReferlist from '../YYReferlist'
import {List, Badge, ListView, PullToRefresh, Button} from 'antd-mobile/lib/index';
import {Link} from 'react-router'

let page;
class YYreferDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open:false,
        }
    }
    componentWillMount () {
        page = this;
    }

    componentDidMount () {


    }
    openRefer = ()=>{
       this.setState({
           open:true,
       })
    }
    onOk = (value)=>{
        console.log(value);
       this.setState({
           open:false,
       })
    }


    render(){
        return(
            <div>
                <Button onClick={this.openRefer}>点击选择参照</Button>
                <YYReferlist
                    onOk={this.onOk}
                    multiMode={true}
                    open={this.state.open}
                />

            </div>
        )
    }
}

export default YYreferDemo;