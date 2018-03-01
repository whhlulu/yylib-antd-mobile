import React from 'react'
import {List, InputItem} from 'antd-mobile/lib/index'
import _ from 'lodash'
import YYReferList from './YYReferList';
import YYReferTree from './YYReferTree';
import YYReferTreeList from './YYReferTreeList'
import YYReferLazyTree from './YYReferLazyTree'
import YYReferLazyTreeList from './YYReferLazyTreeList'
import {YYInput,YYIcon} from '../../index'
import '../../../css/refer.less'

const Item = List.Item
export default class YYRefer extends React.Component {
    state = {
        value: this.props.value,
        isNewState:false,
        openRefer:false,
    }

    componentDidMount(){
        if(this.props.values!==''){
            let fields = {}
            fields[this.props.referName] = {
                dirty: true,
                errors: undefined,
                name: this.props.referName,
                touched: true,
                validating: true,
                value: this.props.values
            }
            this.props.form.setFields(fields);
        }
    }
    onOk = (selected,refername)=>{
        // console.log(selected,refername);
        this.setState({
            value: _.isEmpty(selected) ? null : selected,
            openRefer:false,
        })

        let fields = {}
        fields[this.props.referName] = {
            dirty: true,
            errors: undefined,
            name: this.props.referName,
            touched: true,
            validating: true,
            value: _.isEmpty(selected) ? null : selected
        }
        this.props.form.setFields(fields);
        if(this.props.custom){
            this.props.onOk(selected,refername);
        }

    }

    onClose = (refername)=>{
        this.setState({
            openRefer:false
        })
        if(this.props.custom){
            this.props.onClose(refername);
        }
    }
    onClick = ()=>{
        this.setState({
            openRefer:true
        })
    }
    render(){
        const {form,referlabel,referCode,multiMode,displayField,disabled,referStyle,referName,open,modalHeight,referParams,condition,listCondition,custom,
        arrow,align,error,multipleLine,wrap,activeStyle,platform,required,icon,iconColor} = this.props;
        let modalStyle;
        let referprops = {
            referlabel:referlabel,
            referName:referName,
            referStyle:referStyle,
            referCode:referCode,
            modalHeight:modalHeight,
            displayField:displayField,
            referParams:referParams,
            multiMode:multiMode,
            disabled:disabled,
            condition:condition,
            listCondition:listCondition,
            onOk:this.onOk,
            onClose:this.onClose,
            custom:custom,
        }
        let displayValue = '';
        let values;
        if(custom){
            if(referStyle == 'list'){
                modalStyle = <YYReferList {...referprops} open={open}/>
            } else if(referStyle == 'tree'){
                modalStyle = <YYReferTree {...referprops} open={open}/>
            } else if(referStyle == 'tree-list'){
                modalStyle = <YYReferTreeList {...referprops} open={open}/>
            } else if(referStyle == 'lazy-tree'){
                modalStyle = <YYReferLazyTree {...referprops} open={open}/>
            } else if(referStyle == 'lazy-tree-list'){
                modalStyle = <YYReferLazyTreeList {...referprops} open={open}/>
            }
        } else {
            if(referStyle == 'list'){
                modalStyle = <YYReferList {...referprops} open={this.state.openRefer} />
            } else if(referStyle == 'tree'){
                modalStyle = <YYReferTree {...referprops} open={this.state.openRefer}/>
            } else if(referStyle == 'tree-list'){
                modalStyle = <YYReferTreeList {...referprops} open={this.state.openRefer}/>
            } else if(referStyle == 'lazy-tree'){
                modalStyle = <YYReferLazyTree {...referprops} open={this.state.openRefer}/>
            } else if(referStyle == 'lazy-tree-list'){
                modalStyle = <YYReferLazyTreeList {...referprops} open={this.state.openRefer}/>
            }



            if (form) {
                let _value = form.getFieldValue(referName);
                if(_value){
                    values = _value
                }else {
                    values = ''
                }
                // values = _value || this.state.value;
                if (!!values) {
                    if (!Array.isArray(values)) {
                        if (Object.getOwnPropertyNames(values).length > 0) {
                            displayValue = values[displayField];
                        } else {
                            values = null;
                            displayValue = disabled ? null : '请选择';
                        }
                    } else if (values.length > 0) {
                        displayValue = values.map(v => v[displayField]).join();
                    }
                } else {
                    displayValue = disabled ? null : '请选择';
                }
            }
        }

        return(
            <div>
                {custom?
                    <div style={{display:'none'}}>
                    {modalStyle}
                    <YYInput form={form} field={referName} />
                    </div>:<Item className="referBottom"
                                 ref="refer"
                                 extra={displayValue}
                                 arrow={disabled ? '' : arrow}
                                 align={align}
                                 error={error}
                                 multipleLine={multipleLine}
                                 wrap={wrap}
                                 activeStyle={activeStyle}
                                 platform={platform}
                                 onClick={disabled ? null : this.onClick}
                    ><div style={{display:'none'}}>
                        {modalStyle}
                        <YYInput form={form} field={referName} />
                    </div>
                        <div style={{top:'0.27rem',display:'inline-block',position:'relative'}}><YYIcon type={icon} color={iconColor}/></div>
                        <span style={{marginLeft: '0.5rem'}}>{referlabel}</span>
                        <span style={{display: required ? '' : 'none'}}><YYIcon type="asterisk" size="xs"/></span>
                    </Item>
                }
            </div>


        )

    }
}

YYRefer.defaultProps = {
    referlabel: '参照',
    referCode: '00026',
    modalHeight:'all',
    displayField: 'name',
    referParams: {},
    multiMode: true,
    disabled:false,
    open:false,
    onOk:{},
    referName:'key',
    referStyle:'list',
    condition:{},
    listCondition:{},
    values:'',
    custom:true,
    arrow:'horizontal',         //箭头的方向
    align:'middle',             //子元素垂直对齐
    error:false,
    multipleLine:false,
    wrap:false,
    required:false,
    activeStyle:{},             //自定义active的样式
    platform:'cross',
    icon:'org',
    iconColor:'#333'
};