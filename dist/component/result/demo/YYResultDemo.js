import React from 'react'
import {Icon, WhiteSpace} from 'antd-mobile'
import {YYResult} from '../../../index'

class YYResultDemo extends React.Component {
    state = {}

    render() {
        const pStyle = {color:'gray',height:'30px',lineHeight:'30px',paddingLeft:'20px'}
        return (
            <div>
                <p style={pStyle}>1、'no'-没有数据</p>
                <YYResult type='no'/>

                <WhiteSpace size="xl"/>
                <p style={pStyle}>2、'404'-网络失败、点击事件</p>
                <YYResult type='404' onClick={() => console.log('点击')}/>

                <WhiteSpace size="xl"/>
                <p style={pStyle}>3、'404'-网络失败、点击事件</p>
                <YYResult type='403'/>

                <WhiteSpace size="xl"/>
                <p style={pStyle}>4、'dev'-开发中</p>
                <YYResult type='dev'/>

                <WhiteSpace size="xl"/>
                <p style={pStyle}>5、自定义img，自定义message</p>
                <YYResult img={<Icon type="loading"/>} message={<div><p>测试</p><p>Loading</p></div>}/>

                <WhiteSpace size="xl"/>
            </div>
        )
    }
}

export default YYResultDemo;