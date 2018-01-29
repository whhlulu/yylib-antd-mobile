import React from 'react'
import YYButton from '../YYButton'
import {Button} from 'antd-mobile'



 class YYButtonDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentWillMount () {

    }

    componentDidMount () {

    }
     

    render(){
        return(
            <div>
                <YYButton type='fill' text='测试一下' disabled={false} onClick={()=>console.log('1')}/>
                <Button type="primary" >测试一下</Button>
            </div>
        )
    }
}

export default YYButtonDemo;