import React from 'react'
import {Icon} from 'antd-mobile'
import {YYLocateSteps} from '../../../index'

class YYLocateStepsDemo2 extends React.Component {
    state = {
        data: [
            {id: 'test1', title: '表头', icon: <Icon type="check"/>},
            {id: 'test2', title: '表ti', icon: <Icon type="check"/>},
            {id: 'test3', title: 'shenpi', icon: <Icon type="check"/>},]
    };

    render() {
        return (
            <div style={{height: "100vh" , width: "100%",display: "flex", flexDirection: "column"}}>
                <YYLocateSteps data={this.state.data} defaultHeight={44} scrollId="testsc">
                    <Icon type="check" style={{position: 'fixed', bottom: '60px', right: '60px'}}/>
                </YYLocateSteps>
                <div style={{height:"44px",backgroundColor:"#fff",flexShrink:"0"}}>title</div>
	            <div id="testsc" style={{
		            width: "100%",
		            overflowY: 'scroll',
                    flexGrow:"1",
		            backgroundColor: '#ccc'
	            }}>
		            <ul className="test-body-items" id="oneTem">
			            <li id="test1" style={{color: 'blue'}}>第一个节点</li>
			            <li style={{backgroundColor: "#ccc", height: "80px"}}>asdadasdaa</li>
			            <li style={{backgroundColor: "#C389FA", height: "80px"}}>1312312312312</li>
			            <li style={{backgroundColor: "#ccc", height: "80px"}}>asdadasdaa</li>
			            <li style={{backgroundColor: "#C389FA", height: "80px"}}>1312312312312</li>
			            <li style={{backgroundColor: "#ccc", height: "80px"}}>asdadasdaa</li>
			            <li style={{backgroundColor: "#C389FA", height: "80px"}}>1312312312312</li>
			            <li style={{backgroundColor: "#ccc", height: "80px"}}>asdadasdaa</li>
			            <li style={{backgroundColor: "#C389FA", height: "80px"}}>1312312312312</li>
			            <li style={{backgroundColor: "#ccc", height: "80px"}}>asdadasdaa</li>
			            <li id="test2" style={{color: 'blue'}}>第二个节点</li>
			            <li style={{backgroundColor: "#C389FA", height: "80px"}}>1312312312312</li>
			            <li style={{backgroundColor: "#ccc", height: "80px"}}>asdadasdaa</li>
			            <li style={{backgroundColor: "#C389FA", height: "80px"}}>1312312312312</li>
			            <li style={{backgroundColor: "#ccc", height: "80px"}}>asdadasdaa</li>
			            <li style={{backgroundColor: "#C389FA", height: "80px"}}>1312312312312</li>
			            <li style={{backgroundColor: "#ccc", height: "80px"}}>asdadasdaa</li>
			            <li style={{backgroundColor: "#C389FA", height: "80px"}}>1312312312312</li>
			            <li style={{backgroundColor: "#ccc", height: "80px"}}>asdadasdaa</li>
			            <li style={{backgroundColor: "#C389FA", height: "80px"}}>1312312312312</li>
			            <li id="test3" style={{color: 'blue'}}>第三个节点</li>
			            <li style={{backgroundColor: "#C389FA", height: "80px"}}>1312312312312</li>
			            <li style={{backgroundColor: "#ccc", height: "80px"}}>asdadasdaa</li>
			            <li style={{backgroundColor: "#C389FA", height: "80px"}}>1312312312312</li>
			            <li style={{backgroundColor: "#ccc", height: "80px"}}>asdadasdaa</li>
			            <li style={{backgroundColor: "#C389FA", height: "80px"}}>1312312312312</li>
			            <li style={{backgroundColor: "#ccc", height: "80px"}}>asdadasdaa</li>
			            <li style={{backgroundColor: "#C389FA", height: "80px"}}>1312312312312</li>
			            <li style={{backgroundColor: "#ccc", height: "80px"}}>asdadasdaa</li>
			            <li style={{backgroundColor: "#C389FA", height: "80px"}}>1312312312312</li>
		            </ul>
                </div>
	            <div style={{height:"50px",backgroundColor:"#fff",flexShrink:"0"}}>foot</div>
            </div>
        )
    }
}

export default YYLocateStepsDemo2;