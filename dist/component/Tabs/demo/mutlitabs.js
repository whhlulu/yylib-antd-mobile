/**
 * Created by whh on 2017/12/26.
 */
import React, {Component} from 'react';
import {Tabs, WhiteSpace, Badge, WingBlank} from 'antd-mobile';
import YYTabs from '../YYTabs'

const tabs = [
    {title: '1st Tab'},
    {title: '2nd Tab'},
    {title: '3rd Tab'},
    {title: '4th Tab'},
    {title: '5th Tab'},
    {title: '6th Tab'},
    {title: '7th Tab'},
    {title: '8th Tab'},
    {title: '9th Tab'},
];
class YYTabsDemo extends Component {
    renderContent = tab =>
        (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            <p>Content of {tab.title}</p>
        </div>);
    render() {
        return (
            <div>
                <h3>超出界面宽度，多于5个标签</h3>
                <YYTabs tabs={tabs}>
                    {this.renderContent}
                </YYTabs>
            </div>
        );
    }
}

export default YYTabsDemo;