/**
 * Created by whh on 2017/12/26.
 */
import React, {Component} from 'react';
import {List,WingBlank,WhiteSpace} from 'antd-mobile';
import YYAccordion from '../YYAccordion'

class YYAccordionDemo extends Component {

    render() {
        return (
            <div>
                <WingBlank><h3>基本</h3></WingBlank>
                <YYAccordion defaultActiveKey="t2" onChange={this.onChange}>
                    <YYAccordion.Panel header="Title 1">
                        c1
                    </YYAccordion.Panel>
                    <YYAccordion.Panel header="Title 2" key="t2"><List>
                        <List.Item>content 1</List.Item>
                        <List.Item>content 2</List.Item>
                        <List.Item>content 3</List.Item>
                    </List></YYAccordion.Panel>
                    <YYAccordion.Panel header="Title 3">
                        text text text text text text text text text text text text text text text
                    </YYAccordion.Panel>
                </YYAccordion>
                <WhiteSpace size="xl"/>
                <WingBlank><h3>手风琴模式</h3></WingBlank>
                <YYAccordion accordion defaultActiveKey="t2" onChange={this.onChange}>
                    <YYAccordion.Panel header="Title 1">
                        c1
                    </YYAccordion.Panel>
                    <YYAccordion.Panel header="Title 2" key="t2"><List>
                        <List.Item>content 1</List.Item>
                        <List.Item>content 2</List.Item>
                        <List.Item>content 3</List.Item>
                    </List></YYAccordion.Panel>
                    <YYAccordion.Panel header="Title 3">
                        text text text text text text text text text text text text text text text
                    </YYAccordion.Panel>
                </YYAccordion>
            </div>

        );
    }
}

export default YYAccordionDemo;