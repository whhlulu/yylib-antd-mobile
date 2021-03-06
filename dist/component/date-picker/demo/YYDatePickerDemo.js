import React from 'react'
import { YYForm,YYDatePicker } from '../../../index'
import 'moment/locale/zh-cn';

class YYDatePickerDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){

    }
    onchang = ()=>{
        this.props.form.validateFields(['date','time','datetime'],(err,value)=>{
            if(!err){
                console.log(value);
            }
        })
    }


    render(){
        let {form}= this.props;
        return(
            <div>
                <YYForm>
                <YYDatePicker disabled={true} mode='date' field='date' form={form} onChange={this.onchang}/>
                <YYDatePicker   mode='time' use12Hours={true} field='time' label='时间'  onChange={this.onchang}  form={form}/>
                    <YYDatePicker   mode='datetime' field='datetime' label='时间+日期' onChange={this.onchang} maxDate={new Date('2040-1-18')} form={form}/>
                </YYForm>
            </div>
        )
    }
}

export default YYForm.create()(YYDatePickerDemo);