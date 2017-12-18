import React from 'react'
import YYReferlist from '../YYReferlist'
import {Button} from 'antd-mobile/lib/index';


class YYreferDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            init:'',
            open:false,
        }
    }
    componentWillMount () {

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