/**
 * Created by liulei on 2017/8/24.
 */
import React, {Component} from 'react'
import {List, Popup, InputItem} from 'antd-mobile/lib/index'
import PropTypes from 'prop-types'
import _ from 'lodash'
import SSReferList from './SSReferList'
import SSReferTree from './SSReferTree'
import SSInput from '../input/SSInput'
import {hashHistory} from 'react-router';
import SSIcon from '../icon/SSIcon'
import SSReferTreeList from "./SSReferTreeList";

const Item = List.Item
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let maskProps
if (isIPhone) {
  // Note: the popup content will not scroll.
  maskProps = {
    onTouchStart: e => e.preventDefault(),
  }
}

class SSRefer extends Component {
  static propTypes = {
    extra: PropTypes.string || PropTypes.element,//右边内容
    label: PropTypes.string,//标签名
    arrow: PropTypes.string,//箭头方向(右,上,下), 可选horizontal,up,down,empty，如果是empty则存在对应的dom,但是不显示
    align: PropTypes.string,//Flex 子元素垂直对齐，可选top,middle,bottom
    error: PropTypes.bool,//报错样式,右侧文字颜色变成橙色
    multipleLine: PropTypes.bool,//多行
    wrap: PropTypes.bool,//是否换行，默认情况下，文字超长会被隐藏，
    activeStyle: PropTypes.object,//自定义active的样式
    platform: PropTypes.string,//设定组件的平台特有样式, 可选值为 android, ios， 默认为 cross， 即组件会自动检测设备 UA 应用不同平台的样式
    displayField: PropTypes.string,//参照显示名称字段
  }
  state = {
    value: this.props.value,
    isNewState:false,
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.value) !== JSON.stringify(this.props.value)) {
      this.setState({
        value: nextProps.value,
        isNewState:true,
      })
    }
  }

  onOkSuccess = (selectNodes) => {
    Popup.hide();
    if (this.props.referStyle === 'tree-list') {
      hashHistory.go(-2);
    } else {
      hashHistory.goBack();
    }
    this.setState({
      value: _.isEmpty(selectNodes) ? null : selectNodes
    })

    let fields = {}
    fields[this.props.field] = {
      dirty: true,
      errors: undefined,
      name: this.props.field,
      touched: true,
      validating: true,
      value: _.isEmpty(selectNodes) ? null : selectNodes
    }
    this.props.form.setFields(fields);
  }

  onOk = (selectNodes) => {
    let nodes = _.clone(selectNodes);
    if (selectNodes && Array.isArray(selectNodes)) {
      nodes.map((node) => {
        delete node.children;
      })
    } else {
      delete nodes.children;
    }
    if (_.isFunction(this.props.onOk)) {
      if (!!this.props.onOk(nodes)) {
        this.onOkSuccess(nodes);
      }
    } else {
      this.onOkSuccess(nodes);
    }
  }
  onClick = (e) => {
    e.stopPropagation();
    if (this.props.referStyle == 'tree') {
      let curUri = hashHistory.getCurrentLocation().pathname;
      if (curUri.endsWith('/')) {
        hashHistory.push(curUri + 'refer');
      } else {
        hashHistory.push(curUri + '/refer');
      }
      Popup.show(<SSReferTree displayField={this.props.displayField} multiMode={this.props.multiMode}
                              condition={JSON.stringify(this.props.condition)} onOk={this.onOk}
                              referCode={this.props.referCode}
                              referName={this.props.referName}/>,
        {animationType: 'slide-up', maskProps, maskClosable: false})
    } else if (this.props.referStyle == 'list') {
      let curUri = hashHistory.getCurrentLocation().pathname;
      if (curUri.endsWith('/')) {
        hashHistory.push(curUri + 'refer');
      } else {
        hashHistory.push(curUri + '/refer');
      }
      Popup.show(
        <SSReferList displayField={this.props.displayField} multiMode={this.props.multiMode} onOk={this.onOk}
                     condition={JSON.stringify(this.props.condition)} referCode={this.props.referCode}
                     referName={this.props.referName}/>
        , {animationType: 'slide-up', maskProps, maskClosable: false})
    } else if (this.props.referStyle == 'tree-list') {
      let curUri = hashHistory.getCurrentLocation().pathname;
      if (curUri.endsWith('/')) {
        hashHistory.push(curUri + 'tree');
      } else {
        hashHistory.push(curUri + '/tree');
      }
      Popup.show(
        <SSReferTreeList displayField={this.props.displayField} multiMode={this.props.multiMode}
                         onOk={this.onOk} listCondition={JSON.stringify(this.props.listCondition)}
                         treeCondition={JSON.stringify(this.props.treeCondition)}
                         referCode={this.props.referCode} referName={this.props.referName}/>
        , {animationType: 'slide-up', maskProps, maskClosable: false})
    }
  }
  onLongPress = () => {
    if (_.isFunction(this.props.onImageClick)) this.props.onLongPress()
  }
  getFieldInfo = () => {
    if (_.isFunction(this.props.getFieldInfo)) this.props.getFieldInfo()
  }
  getValue = () => {
    return this.state.value
  }

  render() {
    let {
      arrow, align, error, multipleLine, wrap, activeStyle, platform, label, form, field,
      required, icon, iconColor, disabled, displayField
    } = this.props
    let {isNewState,value} = this.state
    let displayValue = '';
    let values;

    if (form) {
      let _value = form.getFieldValue(field);
      if(!isNewState&&_value){
        values = _value
      }else {
        values = value
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
    return (
      <Item className="borderBottom"
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
      ><SSInput field={field} form={form} label={label} value={values} required={this.props.required}
                visible={false}/>
        <SSIcon icon={icon} color={iconColor}/>
        <span style={{marginLeft: '0.3rem'}}>{label}</span>
        <span style={{display: required ? '' : 'none'}}><SSIcon icon="icon-bixutian" color="red"/></span>
      </Item>
    )
  }
}

SSRefer.defaultProps = {
  extra: '',
  icon: '',
  iconColor: '',
  defaultValue: {name: '请选择'},
  arrow: 'horizontal',
  align: 'middle',
  error: false,
  multipleLine: false,
  wrap: false,
  required: false,
  activeStyle: {},
  platform: 'cross',
  label: '参照名称',
  referCode: '',
  referName: '',
  condition: {},
  listCondition: {},
  treeCondition: {},
  value: null,
  referStyle: '',
  field: '',
  displayField: 'name',
  multiMode: false,
}

export default SSRefer;