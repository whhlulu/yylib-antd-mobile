import React from 'react'
import {Icon, WhiteSpace,Button} from 'antd-mobile'
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
            <div style={{height:"100%",width:"100%",position:"relative"}}>
                <Button onClick={()=>{this.refSwipe.scrollTop = 200}}>test</Button>
                <YYLocateSteps data={this.state.data} defaultHeight={44}>
                    <Icon type="check" style={{position: 'fixed', bottom: '60px', right: '60px'}}/>
                </YYLocateSteps>
                <div style={{height:"450px",width:"100%",position:"absolute",top:"100px",overflow: 'scroll'}}>
                    <div style={{overflow:'scroll'}} ref={ node => this.refSwipe =node } onClick={() => {console.log(this,document.getElementById("tq").scrollTop);}}>
                        <p id="test1" style={{color: 'blue'}}>sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p id="test2" style={{color: 'blue'}}>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p id="test3" style={{color: 'blue'}}>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                        <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>

                    </div>
                </div>

            </div>
        )
    }
}

export default YYLocateStepsDemo;