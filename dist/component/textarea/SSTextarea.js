/**
 * Created By Tangjingqi 2017/8/24
 * */
import React, {Component} from 'react';
import {TextareaItem, Icon} from 'antd-mobile/lib/index';
// import PropTypes from 'prop-types';
// import {createForm} from 'rc-form';
import _ from 'lodash';
import SSIcon from '../icon/SSIcon';
// import './css/SSTextarea.css';

/*
* title: "备注", //文本域的标题
    icon: 'icon-xingzhuang7',//默认的icon图标
    color: 'green',//font颜色
    inputRow: 3,//文本域默认行数
    placeholder: '请输入你的内容',//默认的值
    editable: true,//是否可以编辑
    disabled: false,//是否禁用
    value: ''
* */
class SSTextarea extends React.Component {
    state = {
        expand: false,
        textareaHeight: '10px',
        inputRow: 1
    }

    validateCallBack = (rule, value, callback) => {
        if (_.isFunction(this.props.validateCallBack)) {
            this.props.validateCallBack(rule, value, callback)
            callback()
        } else {
            callback()
        }
    }

    onClick = (value) => {
        if (_.isFunction(this.props.onClick)) this.props.onClick(value)
    }

    onBlur = (value) => {
        if (_.isFunction(this.props.onBlur)) this.props.onBlur(value)
    }
    onFocus = (value) => {
        this.setState({
            expand: true,
            textareaHeight: '',
            inputRow: value ? Math.ceil(this.getBytesLength(value) / 40) + 1 : 1
})
        if (_.isFunction(this.props.onFocus)) this.props.onFocus(value);
    }

    onErrorClick = () => {
        if (_.isFunction(this.props.onErrorClick)) this.props.onErrorClick()
    }

    onChange = (value) => {
        //设值到fieldStore
        let fields = {}
        fields[this.props.field] = {
            dirty: true,
            errors: undefined,
            name: this.props.field,
            touched: true,
            validating: true,
            value: value
        }
        this.props.form.setFields(fields)

        if (_.isFunction(this.props.onChange)) this.props.onChange(value)
    }

    expand = () => {
        if (!this.state.expand) {
            this.setState({
                expand: true,
                textareaHeight: '',
                inputRow: this.props.value ? Math.ceil(this.getBytesLength(this.props.value) / 40) + 1 : 1
            })
        } else {
            this.setState({
                expand: false,
                textareaHeight: '10px',
                inputRow: 1
            })
        }
    }

    getBytesLength(str) {
        if(_.isEmpty(str)){
            return 0;
        }else{
            // 在GBK编码里，除了ASCII字符，其它都占两个字符宽
            return str.replace(/[^\x00-\xff]/g, 'xx').length;
        }
    }

    render() {
        let {textareaHeight, inputRow} = this.state;
        let {
            value, editable, disabled, placeholder, color, icon, form, required,
            trigger, label, field, clear, hasError, count
        } = this.props;
        let getFieldProps = form ? form.getFieldProps : null;
        if(_.isEmpty(value)){
            value = '';
        }else{
            value = _.isObject(value) ? value.name : value;
        }
        let style = {
            paddingTop: '10px',
            paddingLeft: '14px',
            paddingBottom: '6px',
            fontSize: '0.34rem',
            borderBottom: '1px solid #ddd',
            backgroundColor: '#fff'
        }
        let style1 = {
            marginLeft: '0.3rem'
        }
        let style3 = {
            borderBottom: '1px solid #ddd',
            height: textareaHeight || 'auto',
        }
        let errorMsg = '必填项' + label + '未填写';
        return (
            <div>
                <div style={style}>
                    <SSIcon color={color} icon={icon}/>
                    <span style={style1}>
                        {label}
                    </span>
                    <span style={{display: required ? '' : 'none'}}><SSIcon icon="icon-bixutian" color="red"/></span>
                    <div style={{float: 'right', display: 'inline-block', marginRight: '0.3rem'}}><a
                        onClick={this.expand}>{this.state.expand ? <Icon type="up"/> : <Icon type="down"/>}</a></div>
                </div>
                <TextareaItem
                    {..._.isFunction(getFieldProps) ? getFieldProps(field, {
                        initialValue: value,
                        rules: [
                            {required, message: errorMsg},
                            {validator: this.validateCallBack},
                        ],
                        valuePropName: 'value',
                        trigger: trigger
                    }) : null}
                    rows={inputRow}
                    count={count}
                    placeholder={placeholder}
                    autoHeight
                    editable={editable}
                    disabled={disabled}
                    style={style3}
                    onClick={this.onClick}
                    clear={clear}
                    error={hasError}
                    onErrorClick={this.onErrorClick}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    onChange={this.onChange}
                />
            </div>
        )
    };
}

SSTextarea.defaultProps = {
    value: '',
    label: '备注', //文本域的标题
    icon: 'icon-xingzhuang7',//默认的icon图标
    color: 'green',//font颜色
    inputRow: 100,//文本域默认行数
    placeholder: '请输入你的内容',//默认的值
    editable: true,//是否可以编辑
    disabled: false,//是否禁用,
    field: '',
    name: '',
    clear: true,
    hasError: false,
    count: 0
}
export default SSTextarea;