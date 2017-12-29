/**
 * Created By whh 2017/12/26
 * */
import React, {Component} from 'react';
import {Tabs} from 'antd-mobile';
import '../../../css/YYTabs.css';
import PropTypes from 'prop-types';
import _ from 'lodash';

class YYTabs extends React.Component {

    onChange = (tab,index) => {
        if (_.isFunction(this.props.onChange)) this.props.onChange(tab,index)
    }
    onTabClick = (tab,index) => {
        if (_.isFunction(this.props.onTabClick)) this.props.onTabClick(tab,index)
    }

    render() {
        let {tabs,tabBarPosition,initialPage,page,swipeable,tabDirection,children} = this.props;
        return (
            <Tabs tabs={tabs}
                  tabBarPosition={tabBarPosition}
                  initialPage={initialPage}
                  page={page}
                  swipeable={swipeable}
                  onChange={this.onChange}
                  onTabClick={this.onTabClick}
                  tabDirection={tabDirection}
            >
                {children}
            </Tabs>
        )
    };
}
;

YYTabs.defaultProps = {
    tabs: [],//tab数据
    tabBarPosition: 'top',//TabBar位置
    //initialPage: null,//初始化Tab, index or key
    //page: null,//当前Tab, index or key
    swipeable: true,//是否可以滑动内容切换
    onChange:null,//tab变化时触发
    onTabClick:null,//tab 被点击的回调
    tabDirection:'horizontal',//Tab方向 (web only)
}

export default YYTabs;