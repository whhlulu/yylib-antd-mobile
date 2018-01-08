import React from 'react'
import { YYForm,YYDatePicker } from '../../../index'
import moment from 'moment';
import 'moment/locale/zh-cn';
let timeex;
class YYDatePickerDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentWillMount () {
            const nowtime = Date.now();
            const now = new Date(nowtime)
        timeex = moment('2200-12-03 +0800', 'YYYY-MM-DD Z');

    }

    componentDidMount () {
        console.log(this.props.form);
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
                <YYDatePicker maxDate={timeex._d} field='date' form={form} onChange={this.onchang}/>
                <YYDatePicker   mode='time' field='time' onChange={this.onchang}  form={form}/>
                    <YYDatePicker   mode='datetime' field='datetime'onChange={this.onchang}  form={form}/>
                </YYForm>
            </div>
        )
    }
}

export default YYForm.create()(YYDatePickerDemo);