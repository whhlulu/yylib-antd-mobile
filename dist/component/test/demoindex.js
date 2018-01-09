import React from 'react'
import {Button} from 'antd-mobile';


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
    openRefer=(value)=>{
        switch (value){
            case '1':
                console.log('111');
                this.props.router.push({pathname:"/listview"});
                break;
            case '2':
                console.log('222');
                this.props.router.push({pathname:"/referdemo"});
                break;
            case '3':
                console.log('实验pulltorefresh')
                this.props.router.push({pathname:"/pull"});
                break;
            case '4':
                console.log('input')
                this.props.router.push({pathname:"/input"});
                break;
            case '5':
                console.log('switch')
                this.props.router.push({pathname:"/switch"});
                break;
            case '6':
                console.log('datepicker')
                this.props.router.push({pathname:'/datepicker'});
                break;
        }
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
                <Button onClick={this.openRefer.bind(this,'1')}>查看listDemo</Button>
                <Button onClick={this.openRefer.bind(this,'2')}>查看refer</Button>
                <Button onClick={this.openRefer.bind(this,'3')}>查看pulltorefresh</Button>
                <Button onClick={this.openRefer.bind(this,'4')}>查看input输入框</Button>
                <Button onClick={this.openRefer.bind(this,'5')}>查看switch滑动开关</Button>
                <Button onClick={this.openRefer.bind(this,'6')}>查看datepicker</Button>
            </div>
        )
    }
}

export default YYreferDemo;