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
            <div className='YYInput'>
                <YYInput
                    form={form}
                    label="人员薪金加一二"
                    field="name-1"
                    extra='今天'
                    clear={true}
                    updatePlaceholder={true}
                    onExtraClick={this.onOk}
                    required={true}
                    value={this.state.name}
                />
                <YYInput
                    form={form}
                    label="人员手机"
                    field="name-2"
                    showIcon={true}
                    clear={false}
                    type='phone'
                    icon='phone'
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