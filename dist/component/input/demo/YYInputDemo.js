import React from 'react'
import {YYInput,YYForm} from '../../../index'
import { Modal, Button, Toast, WhiteSpace,List} from 'antd-mobile/lib/index'
const alert = Modal.alert;


class YYImagepickerDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            init:'',
            open:false,
            name:'',
        }
    }
    componentWillMount () {

    }

    componentDidMount () {


    }

    onOk = (value)=>{
        console.log(value);
        console.log('1')

    }
    submit = () => {
        this.props.form.validateFields(['name-1','name-2'], (err, values) => {
            if (!err) {
                console.log(values);
            } else {
                let arr=[];
                for(let i in err){
                    arr.push(err[i])
                }
                Toast.info(arr[0].errors[0].message,1.5);
                console.log(arr[0].errors[0].message)
            }
        })
    }


    render(){
        const {form} = this.props;
        return(
            <div>

                <YYInput
                    form={form}
                    label="人员姓名"
                    field="name-1"
                    extra='今天啊'
                    updatePlaceholder={true}
                    onExtraClick={this.onOk}
                    required={true}
                    value={this.state.name}
                />
                <YYInput
                    form={form}
                    label="人员性别"
                    field="name-2"
                    required={true}
                    value={this.state.name}
                />

                    <WhiteSpace/>
                    <Button type="ghost"  onClick={this.submit} >提交验证</Button>
            </div>
        )
    }
}

export default YYForm.create()(YYImagepickerDemo);