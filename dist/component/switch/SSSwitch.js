/**
 * Created by fuyu on 2017/8/24.
 */
import React, {Component} from 'react';
import { List, Switch } from 'antd-mobile/lib/index';
import _ from 'lodash'
import SSIcon from '../icon/SSIcon'
const Item=List.Item;

class SSSwitch extends Component {
    state = {
        checked: !!this.props.value
    }
    onChange = (flag) => {
        if (_.isFunction(this.props.onChange)) this.props.onChange(flag);
        this.setState({
            checked: flag
        })
    }
    render() {
        const {form, value, label, icon, iconColor, disabled, field, checkedText, unCheckedText} = this.props;
        let getFieldProps = form ? form.getFieldProps : null;
        return (
            <Item
                extra={<div><span style={{color: '#4dd865', marginRight: '0.1rem'}}>{this.state.checked ? checkedText: unCheckedText}</span><Switch
                    {..._.isFunction(getFieldProps) ? getFieldProps(field, {
                        initialValue: !!value ,
                        valuePropName: 'checked',
                    }) : null}
                    onClick={this.onChange}
                    platform="cross"
                    disabled={disabled}
                /></div>}
                thumb={<SSIcon icon={icon} color={iconColor}/>}
            >{label}</Item>
        );
    };
}
SSSwitch.defaultProps={
    label: "",
    icon: "icon-xingzhuang9",
    color: "green",
    value: true,
    field: '',
    disabled: false,
    checkedText: '',
    unCheckedText: ''
}
export default SSSwitch;
