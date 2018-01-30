import React from 'react'
import {List, InputItem} from 'antd-mobile/lib/index'
import _ from 'lodash'
import YYReferList from './YYReferList';
import YYReferTree from './YYReferTree';
import YYReferTreeList from './YYReferTreeList'
import YYReferLazyTree from './YYReferLazyTree'
import YYReferLazyTreeList from './YYReferLazyTreeList'
import {YYInput} from '../../index'

export default class YYRefer extends React.Component {
    state = {
        value: this.props.value,
        isNewState:false,
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
            value: _.isEmpty(selected) ? null : selected
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
        this.props.onOk(selected,refername);

    }

    onClose = (refername)=>{
        this.props.onClose(refername);
    }

    render(){
        const {from,referlabel,referCode,multiMode,displayField,disabled,referStyle,referName,open,modalHeight,referParams,condition,listCondition} = this.props;
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
            open:open,
            condition:condition,
            listCondition:listCondition,
            onOk:this.onOk,
            onClose:this.onClose,
        }
        if(referStyle == 'list'){
            modalStyle = <YYReferList {...referprops}/>
        } else if(referStyle == 'tree'){
            modalStyle = <YYReferTree {...referprops}/>
        } else if(referStyle == 'tree-list'){
            modalStyle = <YYReferTreeList {...referprops}/>
        } else if(referStyle == 'lazy-tree'){
            modalStyle = <YYReferLazyTree {...referprops}/>
        } else if(referStyle == 'lazy-tree-list'){
            modalStyle = <YYReferLazyTreeList {...referprops}/>
        }
        return(
            <div style={{display:'none'}}>
                {modalStyle}
                <YYInput from={from} field={referName}/>
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
};