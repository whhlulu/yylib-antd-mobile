import React from 'react'
import {YYForm,Url} from '../../../index'
import YYCheckbox from '../../checkbox/YYCheckbox'
import YYFlex from '../../flex/YYFlex'
import {Button} from 'antd-mobile';



class YYCheckboxDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url:'',
            checked1:true,
            checked2:true,
        }
    }
    componentDidMount(){
        this.setState({
            url:window.location.href,
        })
    }



    showform = ()=>{
        this.props.form.validateFields(['1','2','3'], (err, values) => {
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
                <YYCheckbox field='1' form={form} disabled={true} label='Agree1'/>
                <YYCheckbox field='2' form={form} label='Agree2' checked={this.state.checked1} onChange={e =>{this.setState({checked1:!this.state.checked1});console.log(e,'1')}}/>
                <div style={{padding:10,color:'grey'}}>自定义模式</div>
                <YYFlex direction='row'>
                    <YYFlex.Item>
                        <YYCheckbox field='3' form={form} custom={true} checked={this.state.checked2} onChange={e =>{this.setState({checked2:!this.state.checked2});console.log(e,'2')}}/></YYFlex.Item>
                    <YYFlex.Item>
                        <YYCheckbox field='4' form={form} custom={true} onChange={e =>console.log(e,'1')}/>
                    </YYFlex.Item>

                </YYFlex>

                <Button onClick={this.showform}>点击在console里显示所有value</Button>
            </div>


        )
    }
}

export default YYForm.create()(YYCheckboxDemo);