/**
 * Created by whh on 2017/12/26.
 */
import React, {Component} from 'react';
import {Tabs, WhiteSpace, Badge,WingBlank} from 'antd-mobile';
import YYTabs from '../YYTabs'
const tabs = [
    { title: <Badge text={'3'}>First Tab</Badge> },
    { title: <Badge text={'今日(20)'}>Second Tab</Badge> },
    { title: <Badge dot>Third Tab</Badge> },
];
const tabs2 = [
    { title: 'First Tab', sub: '1' },
    { title: 'Second Tab', sub: '2' },
    { title: 'Third Tab', sub: '3' },
];
class YYTabsDemo extends Component {

    render() {
        return (
            <div>
                <h3>基本使用</h3>
                <YYTabs tabs={tabs}
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
                <WhiteSpace />
                <YYTabs tabs={tabs2}
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