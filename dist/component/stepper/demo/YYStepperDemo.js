import React from 'react'
import {YYStepper,YYForm,Url} from '../../../index'
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
        this.props.form.validateFields(['stepper1','stepper2','stepper3','stepper4'], (err, values) => {
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
    Change = (val)=>{
        console.log(val);
    }


    render(){
        const {form} = this.props;
        return(
            <div>
                <Url/>
                <YYStepper
                    max={10}
                    min={1}
                    width={50}
                    custom={true}
                    defaultValue={2}
                    stepperName='stepper1'
                    form={form}
                />
                <YYStepper
                    stepperLabel='普通模式'
                    max={10}
                    min={1}
                    width={100}
                    custom={false}
                    defaultValue={3}
                    step={0.1}
                    stepperName='stepper2'
                    onChange={this.Change}
                    form={form}
                />

                <YYStepper
                    stepperLabel='禁用'
                    max={10}
                    min={1}
                    width={50}
                    custom={false}
                    disabled={true}
                    defaultValue={4}
                    stepperName='stepper3'
                    form={form}
                />
                <YYStepper
                    stepperLabel='只读'
                    max={10}
                    min={1}
                    width={50}
                    custom={false}
                    readOnly={true}
                    defaultValue={5}
                    stepperName='stepper4'
                    form={form}

                />
                <Button onClick={this.showform}>点击在console里显示所有value</Button>
            </div>


        )
    }
}

export default YYForm.create()(YYStepperDemo);