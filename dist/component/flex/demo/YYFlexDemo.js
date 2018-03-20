import React from 'react'
import {YYForm,Url} from '../../../index'
import YYFlex from '../../flex/YYFlex'
import {Button} from 'antd-mobile';



class YYStepperDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url:'',
        }
    }
    componentDidMount(){
        this.setState({
            url:window.location.href,
        })
    }



    showform = ()=>{
        this.props.form.validateFields(['text1','text2','text3','text4','text5','text6','text7','text8'], (err, values) => {
            if (!err) {
                console.log(values);
            } else {
                let arr = [];
                for (let i in err) {
                    arr.push(err[i])
                }
                // Toast.info(arr[0].errors[0].message,1.5);
                console.log(arr[0].errors[0].message)
            }
        })
    }
    Change = (val) => {
        console.log(val);
    }
    onBlur = (val) => {
        console.log(val)
    }
    onFocus = (val) => {
        console.log(val)
    }

    render(){
        const {form} = this.props;
        return(
            <div>
                <Url/>
                <div style={{padding:10,color:'grey'}}>标准模式</div>
                <YYFlex>
                    <YYFlex.Item>123</YYFlex.Item>
                    <YYFlex.Item>123</YYFlex.Item>
                    <YYFlex.Item>123</YYFlex.Item>
                </YYFlex>
                <Button onClick={this.showform}>点击在console里显示所有value</Button>
            </div>


        )
    }
}

export default YYForm.create()(YYStepperDemo);