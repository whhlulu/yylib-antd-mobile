/**
 * Created by whh on 2017/12/26.
 */
import React, {Component} from 'react';
import {Tabs, WhiteSpace, Badge,WingBlank} from 'antd-mobile';
import YYTabs from '../YYTabs'
const tabs = [
    { title: <Badge text={'3'}>正常的</Badge> },
    { title: <Badge text={'今日(20)'}>都很正常</Badge> },
    { title: <Badge dot>我是一个</Badge> },
];
const tabs2 = [
    { title: '详细标题', sub: '1' },
    { title: '一个短', sub: '2' },
    { title: '我是一个很长很长的得得得得标题', sub: '3' },
    { title: '我是一个很长很长的得得得得标题', sub: '4' },
    { title: '我是一个很长很长的得得得得标题', sub: '5' },
    { title: '我是一个很长很长的得得得得标题', sub: '6' },
];
class YYTabsDemo extends Component {

    render() {
        return (
            <div>
                <h3>基本使用</h3>
                <YYTabs
                    tabs={tabs}
                        initialPage={1}
                        onChange={(tab, index) => {
                            console.log('onChange', index, tab);
                        }}
                        onTabClick={(tab, index) => {
                            console.log('onTabClick', index, tab);
                        }}
                >
                    <div style={{ height: '150px', backgroundColor: '#fff' }}>
                        Content of first tab
                    </div>
                    <div style={{ height: '150px', backgroundColor: '#fff' }}>
                        Content of second tab
                    </div>
                    <div style={{ height: '150px', backgroundColor: '#fff' }}>
                        Content of third tab
                    </div>
                </YYTabs>
                <YYTabs
                    type="left" tabs={tabs2}
                    onChange={(tab, index) => {
                        console.log('onChange', index, tab);
                    }}
                    onTabClick={(tab, index) => {
                        console.log('onTabClick', index, tab);
                    }}
                >
                    <div style={{ height: '150px', backgroundColor: '#fff' }}>
                        Content of first tab
                    </div>
                    <div style={{ height: '150px', backgroundColor: '#fff' }}>
                        Content of second tab
                    </div>
                    <div style={{ height: '150px', backgroundColor: '#fff' }}>
                        Content of third tab
                    </div>
                </YYTabs>
                <WhiteSpace />
                <YYTabs type="left" tabs={tabs2}
                      initialPage={1}
                      tabBarPosition="bottom"
                >
                    <div style={{ height: '150px', backgroundColor: '#fff' }}>
                        Content of first tab
                    </div>
                    <div style={{ height: '150px', backgroundColor: '#fff' }}>
                        Content of second tab
                    </div>
                    <div style={{ height: '150px', backgroundColor: '#fff' }}>
                        Content of third tab
                    </div>
                </YYTabs>
                <WhiteSpace />
            </div>
        );
    }
}

export default YYTabsDemo;