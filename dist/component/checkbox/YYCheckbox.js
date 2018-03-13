import React from 'react'
import {List, Checkbox} from 'antd-mobile'
import _ from 'lodash'

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
export default class YYCheckbox extends React.Component {
    state = {
        checked: false,
    }

    componentDidMount(){
        if(this.props.checked){
            this.setState({
                checked:true
            })
        }
        /*if(this.props.defaultValue){
            this.setState({
                val:this.props.defaultValue,
            })
            //设值到fieldStore
            let fields = {};
            fields[this.props.field] = {
                dirty: true,
                errors: undefined,
                name: this.props.field,
                touched: true,
                validating: true,
                value:this.props.defaultValue
            }
            this.props.form.setFields(fields);
        }*/

    }
    componentWillReceiveProps(nextprops){
        if(this.props.checked!==nextprops.checked){
            this.setState({
                checked:!this.state.checked
            })
        }
    }

    onChange = (e) =>{
         if(this.props.checked==undefined){
            //设值到fieldStore
             let fields = {};
             fields[this.props.field] = {
                 dirty: true,
                 errors: undefined,
                 name: this.props.field,
                 touched: true,
                 validating: true,
                 value:e.target.checked
             }
             this.props.form.setFields(fields);
             if(_.isFunction(this.props.onChange)){
                 this.props.onChange(e.target.checked);
             }
         } else {
             if(_.isFunction(this.props.onChange)){
                 this.props.onChange(!this.state.checked);
             }
         }
         /*this.setState({
             checked:!this.state.checked,
         })*/

        /*//设值到fieldStore
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
        }*/
    }


    render(){
        const {form,label,custom,disabled,field,checked,required,errorMsg,trigger} = this.props;
        let getFieldProps = form.getFieldProps;
        // let getFieldProps = form.getFieldProps;
        // let stepperWidth = width+'%';
        return(
            <div>
                {custom?<AgreeItem
                        {..._.isFunction(getFieldProps) ? getFieldProps(field, {
                            initialValue: this.state.checked,
                            valuePropName: 'value',
                        }) : null}
                    {...this.props}
                    onChange={this.onChange}
                    >
                        {label}
                    </AgreeItem>:
                    <List>
                    <CheckboxItem
                        {..._.isFunction(getFieldProps) ? getFieldProps(field, {
                            initialValue: this.state.checked,
                            valuePropName: 'value',
                        }) : null}
                        {...this.props}
                        onChange={this.onChange}
                    >
                        {label}
                    </CheckboxItem>
                    </List>
                    }
            </div>
        )

    }
}

YYCheckbox.defaultProps = {
    custom:false,
    field:'default',
    label:'复选框',
    disabled:false,



};