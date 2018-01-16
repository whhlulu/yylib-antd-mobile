import React from 'react'
import { YYSwitch,YYToast,YYForm } from '../../../index'

class YYSwitchDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentWillMount () {

    }

    componentDidMount () {


    }
    onChange1 = (value)=>{
        this.props.form.validateFields(['滑动开关1', '滑动开关2', '滑动开关3'], (err, value) => {
            if (!err) {
                console.log(value);
            } else {
                let arr=[];
                for(let i in err){
                    arr.push(err[i])
                }
                YYToast.info(arr[0].errors[0].message,1.5)
                console.log(err);
            }
        })
    }
    onChange2= (value)=>{

    }

    render(){
        let {form} = this.props;
        return(
            <div>
                <YYForm>
                <YYSwitch field='滑动开关1' form={form} checked={true} onClick={this.onChange1}/>
                <YYSwitch field='滑动开关2' form={form}  checked={false} platform='android' color='red' onClick={this.onChange2}/>
                <YYSwitch field='滑动开关3' form={form} disabled={true} checked={true} />
                </YYForm>
            </div>
        )
    }
}

export default YYForm.create()(YYSwitchDemo);