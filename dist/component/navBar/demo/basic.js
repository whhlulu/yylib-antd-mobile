/**
 * Created by whh on 2017/12/26.
 */
import React, {Component} from 'react';
import {Icon} from 'antd-mobile';
import YYNavBar from '../YYNavBar'
class YYNavBarDemo extends Component {
    state = {};

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <YYNavBar
                    mode="light"
                    leftContent={<Icon type="left"/>}
                    rightContent={[
                        <Icon key="0" type="search" style={{marginRight: '16px'}}/>,
                        <Icon key="1" type="ellipsis"/>,
                    ]}
                >NavBar</YYNavBar>
                <YYNavBar
                    mode="dark"
                    leftContent='返回'
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{marginRight: '16px'}}/>,
                        <Icon key="1" type="ellipsis"/>,
                    ]}
                >NavBar</YYNavBar>
            </div>
        );
    }
}

export default YYNavBarDemo;