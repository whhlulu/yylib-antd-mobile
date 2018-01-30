import React from 'react'
import {Icon, WhiteSpace} from 'antd-mobile'
import {YYLocateSteps} from '../../../index'

class YYResultDemo extends React.Component {
    state = {
        data:[{id:'1',title:'表头',icon:<Icon type="check"/>},{id:'2',title:'表ti',icon:<Icon type="check"/>},{id:'3',title:'shenpi',icon:<Icon type="check"/>},]
    }

    render() {
        return (
            <div>
                <YYLocateSteps data={this.state.data}>
                    <Icon type="check" style={{position:'fixed',bottom:'60px',right:'60px'}}/>
                </YYLocateSteps>
            </div>
        )
    }
}

export default YYResultDemo;