/**
 * Created by Tangjingqi on 2017/8/24.
 */
import React, {Component} from 'react';
import {DatePicker, List} from 'antd-mobile/lib/index';
import moment from 'moment';
import 'moment/locale/zh-cn';
// import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
// import PropTypes from 'prop-types';
import _ from 'lodash';
import SSIcon from '../icon/SSIcon';
import '../../../css/SSDatePicker.css'

class SSDatePicker extends Component {
    state = {
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
            this.props.validateCallBack(rule, value, callback);
            callback();
        }else{
            callback();
        }
    }
    render() {
        let Item = List.Item;
        let {zhNow, nowDate, maxDate, mode, minDate, maxTime, minTime, gmtNow, value,arrow,
            disabled,iconColor,icon,label, form, extra, required, trigger, field, format} = this.props;

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

        let getFieldProps = form ? form.getFieldProps : null;
        return (
            <div className="dateLine" onClick={() => disabled ? null : this.setState({visible: true})}>
                <DatePicker
                    {..._.isFunction(getFieldProps) ? getFieldProps(field, {
                        initialValue: value ? moment(value, format).utcOffset(8) : null,
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
                    zhNow={zhNow}
                    format={val => val.format(format)}
                    minTime={minTime}
                    minDate={minDate}
                    nowDate={nowDate}
                    maxDate={maxDate}
                    maxTime={maxTime}
                    gmtNow={gmtNow}
                    mode={mode}
                    disabled={disabled}
                    thumb={<SSIcon color={iconColor} icon={icon}/>}
                    onChange={this.onChange}
                >
                    <Item arrow={disabled ? "" : arrow}>
                        <SSIcon color={iconColor} icon={icon}/>
                        <span style={titleStyle}>{label}</span>
                        <span style={{display: required ? '' : 'none'}}><SSIcon icon="icon-bixutian" color="red"/></span>
                    </Item>
                </DatePicker>
            </div>
        )

    };
};

SSDatePicker.defaultProps = {
    zhNow: moment().locale('zh-cn').utcOffset(8),
    nowDate: new Date().getTime(),
    maxDate: moment('2200-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8),
    minDate: moment('1990-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8),
    maxTime: moment('22:00 +0800', 'HH:mm Z').utcOffset(8),
    minTime: moment('08:30 +0800', 'HH:mm Z').utcOffset(8),
    gmtNow: moment().utcOffset(0),
    arrow: 'horizontal',
    listemValue: '日期',
    value:'',
    mode: 'date',
    extra:'',
    label: '日期',
    icon: 'icon-xingzhuang',//默认的icon图标
    color: 'red',//font颜色
    disabled: false,
    errorMsg: "",
    required: false,
    field: 'default',
    format: "YYYY-MM-DD"
}

export default SSDatePicker;