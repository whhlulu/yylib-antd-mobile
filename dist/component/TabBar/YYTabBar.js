/**
 * Created By whh 2017/12/26
 * */
import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import '../../../css/YYTabBar.css';
import PropTypes from 'prop-types';
import _ from 'lodash';

class YYTabBar extends React.Component {
    render() {
        let {tabs, children} = this.props;
        const pathname = this.props.location.pathname;
        return (
            <div style={{position: 'fixed', height: '100%', width: '100%', top: 0}}>
                <TabBar>
                    {tabs.length > 0 ? tabs.map((item, index) => {
                        return <TabBar.Item
                            key={index}
                            title={item.title}
                            badge={item.badge}
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + item.icon + ') center center /  21px 21px no-repeat'
                            }}/>}
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + item.selectedIcon + ') center center /  21px 21px no-repeat'
                            }}/>}
                            selected={pathname === item.route}
                            onPress={() => {
                                if (_.isFunction(item.onPress)) {item.onPress()}
                                else {this.props.router.push(item.route)}

                            }}>
                            { pathname === item.route ? children : null }
                        </TabBar.Item>
                    }) : null}
                </TabBar>
            </div>
        )
    };
}
;

YYTabBar.defaultProps = {}

export default YYTabBar;