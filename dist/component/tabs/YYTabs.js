/**
 * Created By whh 2017/12/26
 * */
import React, {Component} from 'react';
import {Tabs} from 'antd-mobile';
import classnames from 'classnames';
import '../../../css/YYTabs.css';
import PropTypes from 'prop-types';
import _ from 'lodash';

class YYTabs extends React.Component {
    state = {
        tabBarUnderlineLeft: (this.props.initialPage?(5+this.props.initialPage*20):5)+'%'
    }

    onChange = (tab, index) => {
        this.setState({
            tabBarUnderlineLeft:(5+index*20)+"%"
        })
        if (_.isFunction(this.props.onChange)) this.props.onChange(tab, index)
    }
    onTabClick = (tab, index) => {
        if (_.isFunction(this.props.onTabClick)) this.props.onTabClick(tab, index)
    }

    render() {
        let {type, tabs, tabBarPosition, initialPage, page, swipeable, tabDirection,
            tabBarInactiveTextColor,tabBarActiveTextColor,tabBarUnderlineStyle, children, className, ...restProps} = this.props;
        let wrapClz = classnames('yy-tabs-'+(type==='left'?'left':'default'), className);
        return (
            <div className={wrapClz}>
                <Tabs {...restProps}
                      tabs={tabs}
                      tabBarPosition={tabBarPosition}
                      initialPage={initialPage}
                      page={page}
                      swipeable={swipeable}
                      onChange={this.onChange}
                      onTabClick={this.onTabClick}
                      tabDirection={tabDirection}
                      tabBarInactiveTextColor={tabBarInactiveTextColor}
                      tabBarActiveTextColor={tabBarActiveTextColor}
                      tabBarUnderlineStyle={(!tabBarUnderlineStyle)&&(type==='left')?{"width": "10%", "left": this.state.tabBarUnderlineLeft}:tabBarUnderlineStyle}
                >
                    {children}
                </Tabs>
            </div>
        )
    };
}
;

YYTabs.defaultProps = {
    type: 'default',
    tabs: [],//tab数据
    tabBarPosition: 'top',//TabBar位置
    //initialPage: null,//初始化Tab, index or key
    //page: null,//当前Tab, index or key
    swipeable: true,//是否可以滑动内容切换
    onChange: null,//tab变化时触发
    onTabClick: null,//tab 被点击的回调
    tabDirection: 'horizontal',//Tab方向 (web only)
    tabBarInactiveTextColor:'#414655',
    tabBarActiveTextColor:'#0091FA',
    tabBarUnderlineStyle:null
}

export default YYTabs;