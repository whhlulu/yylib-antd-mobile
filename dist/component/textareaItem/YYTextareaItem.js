import React from 'react';
import {List, TextareaItem} from 'antd-mobile';
// import {createForm} from 'rc-form';
// import PropTypes from 'prop-types';
import _ from 'lodash'


class YYTextareaItem extends React.Component {
    state = {
    }

    onBlur = (value) => {
        if (_.isFunction(this.props.onChange)) this.props.onBlur(value);
    }
    onFocus = (value) => {
        if (_.isFunction(this.props.onChange)) this.props.onFocus(value);
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



    validateCallBack = (rule, value, callback) => {
        if(_.isFunction(this.props.validateCallBack)){
            this.props.validateCallBack(rule, value, callback);
            callback();
        }else{
            callback();
        }
    }
    render() {
        const {label, trigger, field,required,form, value,placeholder,labelNumber,clear,editable,disabled,rows,count,autoHeight,prefixListCls} = this.props;
        let getFieldProps = form.getFieldProps;
        let errorMsg='必填项'+ label+'未填写';
        return (
            <List>
                <TextareaItem
                    {..._.isFunction(getFieldProps) ? getFieldProps(field, {
                        initialValue: value,
                        rules: [
                            { required, message: errorMsg },
                            { validator: this.validateCallBack },
                        ],
                        trigger: trigger,
                        valuePropName: 'value',
                    }) : null}
                    title={label}
                    labelNumber={labelNumber}
                    placeholder={placeholder}
                    onChange={this.onChange}
                    clear={clear}
                    editable={editable}
                    disabled={disabled}
                    rows={rows}
                    count={count}
                    autoHeight={autoHeight}
                    prefixListCls={prefixListCls}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                />
            </List>
        );
    }
}

YYTextareaItem.defaultProps = {
    label: "",
    field: "default",
    placeholder:'',
    labelNumber:5,
    clear:true,
    editable:true,
    disabled:false,
    rows:1,
    count:0,
    autoHeight:false,
    errorMsg: "请输入必填项!",
    required: false,
    hasError: false,
    value: null,
    trigger: "onChange",
}
export default YYTextareaItem;
