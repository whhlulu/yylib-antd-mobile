/**
 * Created by hezx on 2017/8/24.
 */
import React, {Component} from 'react';
import {List, Picker} from 'antd-mobile/lib/index';
import '../../../css/YYPicker.css'
// import {createForm} from 'rc-form';
// import PropTypes from 'prop-types';
import _ from 'lodash'

const Item = List.Item;

class YYPicker extends Component {
    state = {
        visible: false
    }

    clearDate = () => {
        //设值到fieldStore
        let fields = {};
        fields[this.props.field] = {
            dirty: true,
            errors: undefined,
            name: this.props.field,
            touched: true,
            validating: true,
            value: null
        }
        this.props.form.setFields(fields);
        this.setState({
            visible: false
        })
    }

    onChange = (value) => {
        //设值到fieldStore
        let fields = {};
        fields[this.props.field] = {
            dirty: true,
            errors: undefined,
            name: this.props.field,
            touched: true,
            validating: true,
            value: value
        }
        this.props.form.setFields(fields);

        if (_.isFunction(this.props.onChange)) this.props.onChange(value);
    }

    onOk = (value) => {
        if (_.isFunction(this.props.onOk)){
            this.setState({
                visible: false
            })
            this.props.onOk(value);
        }else{
            this.setState({
                visible: false
            })
        }
    }

    onDismiss = (value) => {
        if (_.isFunction(this.props.onDismiss)){
            this.props.onDismiss(value);
        }else{
            this.setState({
                visible: false
            })
        }
    }

    validateCallBack = (rule, value, callback) => {
        if (_.isFunction(this.props.validateCallBack)) {
            this.props.validateCallBack(rule, value, callback);
            callback();
        } else {
            callback();
        }
    }
    pickerChange = (value)=>{
        if (_.isFunction(this.props.onPickerChange)){
            this.props.onPickerChange(value);
        }
    }

    render() {
        const {label, field, data, required, errorMsg, disabled, extra, visible,
            trigger, form, value, cols,cascade} = this.props;
        let getFieldProps = form ? form.getFieldProps : null;
        return (
            <div onClick={() => disabled ? null : this.setState({visible: true})}>
                <Picker style={{display: visible ? '' : 'none'}} data={data}
                        extra={extra}
                        title={<a style={{color: '#108ee9'}} onClick={this.clearDate}>清除</a>}
                        cols={cols}
                        visible={this.state.visible}
                        disabled={disabled}
                        cascade={cascade}
                        onPickerChange={this.pickerChange}
                        onOk={this.onOk}
                        onDismiss={this.onDismiss}
                        {..._.isFunction(getFieldProps) ? getFieldProps(field, {
                            initialValue: value,
                            rules: [
                                { required, message: errorMsg },
                                { validator: this.validateCallBack },
                            ],
                            trigger: trigger,
                            valuePropName: 'value',
                        }) : null}
                >
                    <List.Item arrow={disabled ? "" : "horizontal"}>
                        <span style={disabled?{marginLeft:'0.3rem',color:'gray'}:{marginLeft:'0.3rem'}}>{label}</span>
                    </List.Item>
                </Picker>
            </div>
        );
    }
}

YYPicker.defaultProps = {
    form: {},
    label: "选择",
    field: "default",
    cols:1,
    errorMsg: "请输入必填项!",
    required: false,
    disabled: false,
    value: null,
    extra: "",
    visible: true,
    trigger: "onChange",
    cascade:true,
}
export default YYPicker;
