import React from 'react'
import {hashHistory} from 'react-router';
import {Button} from 'antd-mobile/lib/index';


class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={
            init:'',
            open:false,
            openz:false,
            openw:false,
        }
    }
    openRefer=(e)=>{
        if(e=='1'){
            console.log(this.props);

        }
    }


    render(){
        return(
            <div>
                <Button onClick={this.openRefer.bind(this,'1')}>点击测试</Button>
            </div>

        )
    }
}

export default Test;