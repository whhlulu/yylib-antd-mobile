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

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                checked: nextProps.value
            })
        }
    }

    onChange = (flag) => {
        if (_.isFunction(this.props.onChange)) this.props.onChange(flag);
        this.setState({
            checked: flag
        })
    }
    render() {
        const {form, value, label, icon, iconColor, disabled, field, checkedText, unCheckedText, showIcon} = this.props;
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
                thumb={showIcon ? <SSIcon color={iconColor} icon={icon}/> : <span style={{marginLeft: '0.3rem'}}></span>}
            >{label}</Item>
        );
    };
}
SSSwitch.defaultProps={
    label: "",
    icon: "icon-xingzhuang9",
    color: "green",
    value: true,
    showIcon: true,
    field: '',
    disabled: false,
    checkedText: '',
    unCheckedText: ''
}
export default SSSwitch;
