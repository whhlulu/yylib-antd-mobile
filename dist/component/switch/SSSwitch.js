/**
 * Created by fuyu on 2017/8/24.
 */
import React, {Component} from 'react';
import { List, Switch } from 'antd-mobile';
import _ from 'lodash'
import SSIcon from '../icon/SSIcon'
const Item=List.Item;

class SSSwitch extends Component {
    onChange = (e) => {
        if (_.isFunction(e)) this.props.onChange(e);
    }
    render() {
        const {form, value, label, icon, iconColor, disabled, field} = this.props;
        let getFieldProps = form ? form.getFieldProps : null;
        return (
                <Item
                    extra={<Switch
                        {..._.isFunction(getFieldProps) ? getFieldProps(field, {
                            initialValue: !!value ,
                            valuePropName: 'checked',
                        }) : null}
                        onClick={this.onChange}
                        platform="cross"
                        disabled={disabled}
                    />}
                    thumb={<SSIcon icon={icon} color={iconColor}/>}
                >{label}</Item>
        );
    };
}
SSSwitch.defaultProps={
    label:"",
    icon:"icon-xingzhuang9",
    color:"green",
    value:true,
    field: '',
    disabled: false,

}
export default SSSwitch;
