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
        window.addEventListener('scroll', ()=>{console.log(document.documentElement.scrollLeft)});
        window.addEventListener('resize', ()=>console.log('2'));
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
	        case '7':
		        console.log('locateSteps')
		        this.props.router.push({pathname:'/locateSteps'});
		        break;
            case '8':
                console.log('stepper')
                this.props.router.push({pathname:'/stepper'});
                break;
            case '9':
                console.log('textareaItem')
                this.props.router.push({pathname:'/textareaItem'});
                break;
            case '10':
                console.log('checkbox')
                this.props.router.push({pathname:'/checkbox'});
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
                <Button onClick={this.openRefer.bind(this,'7')}>查看locateStep</Button>
                <Button onClick={this.openRefer.bind(this,'8')}>查看stepper步进器</Button>
                <Button onClick={this.openRefer.bind(this,'9')}>查看textareaItem多行输入</Button>
                <Button onClick={this.openRefer.bind(this,'10')}>查看checkbox复选框</Button>
            </div>
        )
    }
}

export default YYreferDemo;