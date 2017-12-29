/**
 * Created by whh on 2017/12/26.
 */
import React, {Component} from 'react';
import {Tabs, WhiteSpace, Badge,WingBlank} from 'antd-mobile';
import YYTabs from '../YYTabs'

const tabs2 = [
    { title: 'First Tab', sub: '1' },
    { title: 'Second Tab', sub: '2' },
    { title: 'Third Tab', sub: '3' },
];
class YYTabsDemo extends Component {

    render() {
        return (
            <div>
                <h3>固定高度</h3>
                <div style={{ height: '200px' }}>
                    <YYTabs tabs={tabs2}>
                        <div style={{ overflow: 'hidden',height: '250px', backgroundColor: '#fff' }}>
                            <p>Content of first tab</p>
                            <p>Content of first tab</p>
                            <p>Content of first tab</p>
                            <p>Content of first tab</p>
                            <p>Content of first tab</p>
                            <p>Content of first tab</p>
                            <p>Content of first tab</p>
                            <p>Content of first tab</p>
                            <p>Content of first tab</p>
                            <p>Content of first tab</p>
                            <p>Content of first tab</p>
                            <p>Content of first tab</p>
                            <p>Content of first tab</p>
                        </div>
                        <div style={{ overflow: 'hidden',height: '250px', backgroundColor: '#fff' }}>
                            Content of second tab
                        </div>
                        <div style={{ overflow: 'hidden',height: '250px', backgroundColor: '#fff' }}>
                            Content of third tab
                        </div>
                    </YYTabs>
                </div>
            </div>
        );
    }
}

export default YYTabsDemo;