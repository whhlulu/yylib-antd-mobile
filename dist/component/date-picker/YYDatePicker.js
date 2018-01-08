/**
 * Created by Tangjingqi on 2017/8/24.
 */
import React, {Component} from 'react';
import {DatePicker, List} from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
// import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
// import PropTypes from 'prop-types';
import _ from 'lodash';
import '../../../css/YYDatePicker.css'
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const utcOffset = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
class YYDatePicker extends Component {
    state = {
        dpValue: now,
        visible: false
    };


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

    onChange = (date) => {
        //设值到fieldStore
        let fields = {};
        fields[this.props.field] = {
            dirty: true,
            errors: undefined,
            name: this.props.field,
            touched: true,
            validating: true,
            value: date
        }
        this.props.form.setFields(fields);
        this.setState({
            visible: false
        })
        if (_.isFunction(this.props.onChange)) this.props.onChange(date);
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
        if(_.isFunction(this.props.validateCallBack)){
            console.log('1')
            this.props.validateCallBack(rule, value, callback);
            callback();
        }else{
            callback();
        }
    }
    render() {
        let Item = List.Item;
        let { maxDate, mode, minDate, maxTime, minTime, value,arrow,
            disabled,label, form, extra, required, trigger, field, format} = this.props;

        // let style = {
        //     marginTop: '10px',
        //     marginLeft: '44px',
        //     paddingBottom: '6px',
        //     fontSize: '0.34rem',
        //     // borderBottom: '1PX solid #ddd'
        // }
        let errorMsg='必填项'+ label+'未填写';
        let titleStyle = {
            marginLeft: '0.3rem'
        }
        if(mode=='time'){
            format='HH:mm'
        } else if(mode=='datetime'){
            format='YYYY-MM-DD HH:mm'
        }

        let getFieldProps = form ? form.getFieldProps : null;
        return (
            <div className="dateLine" onClick={() => disabled ? null : this.setState({visible: true})}>
                <DatePicker
                    {..._.isFunction(getFieldProps) ? getFieldProps(field, {
                        initialValue:  this.state.dpValue,
                        rules: [
                            { required, message: errorMsg },
                            { validator: this.validateCallBack },
                        ],
                        trigger: trigger,
                        valuePropName: 'value',
                    }) : null}
                    visible={this.state.visible}
                    onDismiss={this.onDismiss}
                    extra={extra}
                    title={<a style={{color: '#108ee9'}} onClick={this.clearDate}>清除</a>}
                    format={format}
                    minDate={minDate}
                    maxDate={maxDate}
                    mode={mode}
                    disabled={disabled}
                    onChange={this.onChange}
                    use12Hours={false}
                >
                    <Item arrow={disabled ? "" : arrow}>
                        <span style={titleStyle}>{label}</span>
                        <span style={{display: required ? '' : 'none'}}></span>
                    </Item>
                </DatePicker>
            </div>
        )

    };
};

YYDatePicker.defaultProps = {
    maxDate: '',
    minDate: moment('1900-08-06 +0800', 'YYYY-MM-DD Z')._d,
    arrow: 'horizontal',
    listemValue: '日期',
    value:'',
    mode: 'date',
    extra:'',
    label: '日期',
    color: 'red',//font颜色
    disabled: false,
    errorMsg: "",
    required: false,
    field: 'default',
    format: "YYYY-MM-DD",
}

export default YYDatePicker;