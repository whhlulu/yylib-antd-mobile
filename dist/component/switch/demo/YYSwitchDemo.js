import React from 'react'
import { YYSwitch } from '../../../index'

class YYSwitchDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentWillMount () {

    }

    componentDidMount () {


    }
    onChange1 = (value)=>{
        console.log(value);
        console.log('滑动开关1')
    }
    onChange2= (value)=>{
        console.log(value);
        console.log('滑动开关2')
    }

    render(){
        return(
            <div>
                <YYSwitch name='滑动开关1' checked={true} onClick={this.onChange1}/>
                <YYSwitch name='滑动开关2' checked={false} platform='android' color='red' onClick={this.onChange2}/>
                <YYSwitch name='滑动开关3' disabled={true} checked={true} />
            </div>
        )
    }
}

export default YYSwitchDemo;