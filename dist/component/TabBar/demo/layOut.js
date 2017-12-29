/**
 * Created by whh on 2017/12/26.
 */
import React, {Component} from 'react';
import YYTabBar from '../YYTabBar'
import img from '../../../../src/img/applist-active.png'

class Layout extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        const tabs = [
            {
                title:'First',
                badge:'new',
                icon:'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
                selectedIcon:'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg',
                route:'/tabBar'
            },
            {
                title:'Second',
                dot:true,
                icon:'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg',
                selectedIcon:img,
                route:'/tabBar/second'
            },{
                title:'Third',
                badge:1,
                icon:'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg',
                selectedIcon:'https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg',
                route:'/tabBar/third',
                onPress:() => {this.props.router.push('/tabBar/third');console.log('这个是自己的事件')}
            }
        ]
        return (
            //必须传递{...this.props}为了使内部可以取到pathname跳转路由
                <YYTabBar {...this.props} tabs={tabs}></YYTabBar>
        )
    }
}
export default Layout;
