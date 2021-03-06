/**
 * Created by ByChan on 2017.8.29.
 */
import React from 'react'
import { Button, Flex, WingBlank } from 'antd-mobile'
import '../../../css/YYButton.css'
import classNames from 'classnames'
import { hashHistory } from 'react-router'

/*
* Button组件
* type
*   fill :项目里面一整行的绿色图标   可以传递fix 固定在页面底部
*   center :项目里面两翼留白的绿色图标
*   dashed :项目里面的蓝色虚线图标
*   add : 所有列表页的圆形增加图标(已加上定位)
*   saveDel　: 单行两个图标，下面有详细说明
*
* text
*   单个按钮上面的文字  默认为保存  type为add和saveDel时不用传
*
* onClick
*   单个按钮点击事件
*
*当type为saveDel和footer时：可以传递lClick,rClick,lText,rText
*   rClick   rText   右边按钮的文字和函数  text默认为保存
*   cClick   cText   左边按钮的文字和函数  text默认为删除
*   lClick   lText   左边按钮的文字和函数  text默认为取消
*
*disabled   控制按钮不可点击，颜色置灰，单个按钮加disabled   多个为 ldisabled  cdisabled rdisabled  使用同上
*
* */
export default class YYButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  render () {
    let children
    let {type, text, onClick, rClick, lClick, rText, lText, cText, disabled, fix, ldisabled, cdisabled, rdisabled, cClick} = this.props

    switch (type) {
      case 'fill':
        children = <Button
           className={classNames({'no_radius': false, 'fix_btn': fix, 'disabledStyle': disabled})}
          activeStyle={!disabled}
          type="primary"
          onClick={disabled ? '' : onClick}>
          {text}
        </Button>
        break
      default:
        break
    }
    return (
      <div>
        {children}
      </div>
    )
  }
}
 YYButton.defaultProps = {
    type: 'fill',
    text: '保存',
    onClick: () => {return false},
    rClick: () => {return false},
    cClick: () => {return false},
    lClick: () => {
        hashHistory.goBack()
    },
    rText: '保存',
    lText: '取消',
    cText: '删除',
    fix: 0,
    disabled: false,
    ldisabled: 0,
    cdisabled: 0,
    rdisabled: 0,
}