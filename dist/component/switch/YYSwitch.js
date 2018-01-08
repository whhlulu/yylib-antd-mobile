/**
 * Created By whh 2017/12/26
 * */
import React from 'react';
import {List, Switch} from 'antd-mobile';
import {createForm} from 'rc-form';
import PropTypes from 'prop-types';
import _ from 'lodash';

class YYSwitch extends React.Component {

    onChange = (checked,index) => {
        if (_.isFunction(this.props.onClick)) this.props.onClick(checked)
    }
    onTabClick = (tab,index) => {
        if (_.isFunction(this.props.onTabClick)) this.props.onTabClick(tab,index)
    }

    render() {
        let {key,name,checked,disabled,onClick,color,platform} = this.props;
        const {getFieldProps} = this.props.form;
        return (
            <div>
                <List.Item
                    extra={<div><Switch
                        {..._.isFunction(getFieldProps) ? getFieldProps(key,{
                            initialValue:checked,
                            valuePropName:'checked',
                        }):null
                        }
                        disabled={disabled}
                        color={color}
                        platform={platform}
                        onClick={(checked)=>{this.onChange(checked)}}
                    /></div>}
                >{name}</List.Item>
            </div>
        )
    };
}
;

YYSwitch.defaultProps = {
    key:'switch1',     //switch的name
    name:'滑动开关',       //开关名称
    checked:false,      //是否默认被选中
    disabled:false,     //是否不可修改
    onClick:{},         //click事件触发的回调函数
    onChange:{},
    color:'#3BC1FF',    //打开后显示颜色
    platform:'ios',         //默认样式风格

}
let switchexample = createForm()(YYSwitch);
export default switchexample;