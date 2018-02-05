import React from 'react'
import {Icon, WhiteSpace, Button} from 'antd-mobile'
import {YYLocateSteps} from '../../../index'

class YYLocateStepsDemo extends React.Component {
    state = {
        data: [
            {id: 'test1', title: '表头', icon: <Icon type="check"/>},
            {id: 'test2', title: '表ti', icon: <Icon type="check"/>},
            {id: 'test3', title: 'shenpi', icon: <Icon type="check"/>},]
    }

    render() {
        return (
            <div style={{height: "100%", width: "100%", position: "relative"}}>
                <YYLocateSteps data={this.state.data} defaultHeight={44} scrollId="testsc">
                    <Icon type="check" style={{position: 'fixed', bottom: '60px', right: '60px'}}/>
                </YYLocateSteps>
                <div id="testsc" style={{
                    height: "450px",
                    width: "100%",
                    position: "absolute",
                    top: "100px",
                    overflowY: 'scroll',
                    backgroundColor: '#ccc'
                }}>
                    <div style={{overflowY: 'scroll'}}>
                        <p id="test1" style={{color: 'blue'}}>第一个节点</p>
                        <div style={{height: '300px'}}></div>
                        <p id="test2" style={{color: 'blue'}}>第二个节点</p>
                        <div style={{height: '600px'}}></div>
                        <p id="test3" style={{color: 'blue'}}>第三个节点</p>
                        <div style={{height: '400px'}}></div>
                    </div>
                </div>

            </div>
        )
    }
}

export default YYLocateStepsDemo;