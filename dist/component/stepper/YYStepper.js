import React from 'react'
import {List, Stepper} from 'antd-mobile'
import _ from 'lodash'


export default class YYStepper extends React.Component {
    state = {
        val: 1,
    }

    componentDidMount(){
        if(this.props.defaultValue){
            this.setState({
                val:this.props.defaultValue,
            })
            //设值到fieldStore
            let fields = {};
            fields[this.props.stepperName] = {
                dirty: true,
                errors: undefined,
                name: this.props.stepperName,
                touched: true,
                validating: true,
                value:this.props.defaultValue
            }
            this.props.form.setFields(fields);
        }

    }

    onChange = (val) =>{
        // console.log(val);
        this.setState({
            val:val,
        })
        //设值到fieldStore
        let fields = {};
        fields[this.props.field] = {
            dirty: true,
            errors: undefined,
            name: this.props.field,
            touched: true,
            validating: true,
            value:val
        }
        this.props.form.setFields(fields);
        if(_.isFunction(this.props.onChange)){
            this.props.onChange(val);
        }
    }


    render(){
        const {form,custom,field,required,errorMsg,trigger,label,min,max,value,step,defaultValue,disabled,readOnly,showNumber,width} = this.props;
        let getFieldProps = form.getFieldProps;
        let stepperWidth = width+'%';
        return(
            <div>
                {custom? <Stepper
                    {..._.isFunction(getFieldProps) ? getFieldProps(field, {
                        initialValue: value,
                        rules: [
                            { required, message: errorMsg },
                        ],
                        trigger: trigger,
                        valuePropName: 'value',
                    }) : null}
                    style={{width:stepperWidth,minWidth:'100px'}}
                    showNumber={showNumber}
                    readOnly={readOnly}
                    disabled={disabled}
                    max={max}
                    min={min}
                    step={step}
                    defaultValue={defaultValue}
                    value={this.state.val}
                    onChange={this.onChange}
                />: <List>
                    <List.Item
                        wrap
                        extra={
                            <Stepper
                                {..._.isFunction(getFieldProps) ? getFieldProps(field, {
                                    initialValue: value,
                                    rules: [
                                        { required, message: errorMsg },
                                    ],
                                    trigger: trigger,
                                    valuePropName: 'value',
                                }) : null}
                                style={{width:stepperWidth,minWidth:'100px'}}
                                showNumber={showNumber}
                                readOnly={readOnly}
                                disabled={disabled}
                                max={max}
                                min={min}
                                step={step}
                                defaultValue={defaultValue}
                                value={this.state.val}
                                onChange={this.onChange}
                            />
                        }
                    >
                        {label}
                    </List.Item>
                </List>}

            </div>
        )

    }
}

YYStepper.defaultProps = {
    custom:false,
    label:'步进器',
    field: '1-stepper',
    value:'',
    min:-Infinity,
    max:Infinity,
    step:1,             //默认每次改变步数
    disabled:false,
    readOnly:false,
    showNumber:true,
    required:false,
    errorMsg:'',
    trigger:'onChange',
    width:100,

};