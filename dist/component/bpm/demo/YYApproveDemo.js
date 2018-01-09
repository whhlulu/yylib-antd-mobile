/**
 * Created By whh 2018/1/2
 * */
import React, {Component} from 'react';
import {Toast, Button, Popover, NavBar, Icon,Radio,List} from 'antd-mobile'
const RadioItem = Radio.RadioItem;
const Item = Popover.Item;
import YYApprove from '../YYApprove'
import YYIcon from '../../icon/YYIcon'

class YYApproveDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showApprove: false,
            visible:false,
            value2: 0,
        }
    }

    onSelect = (opt,index) => {
        this.setState({
            visible:false
        })
        if(index==0){
            this.showApprove()
        }
    };
    showApprove = () => {
        this.setState({
            showApprove: true
        })
    }
    render() {
        return (
            <div>
                <NavBar mode="light" rightContent={
                    <Popover
                        visible={this.state.visible}
                        overlay={[
                            (<Item icon={<YYIcon type="edit" size='xs'/>}>执行审批</Item>),
                            (<Item disabled icon={<Icon type="cross" size='xs'/>}>执行弃审</Item>),
                            (<Item icon={<YYIcon type="more-o" size='xs'/>}>审批历史</Item>),
                        ]}
                        onSelect={this.onSelect}
                    >
                        <div>审批</div>
                    </Popover>
                }
                >
                    NavBar
                </NavBar>
                {this.state.showApprove ? <YYApprove
                showApprove={this.state.showApprove}
                billTypeId='CSM5'
                userId="5afbe1b5-d718-4654-b915-db4409251854"
                billId='63c847474148c720dce60042a3f0b52e'/>
                : null}
            </div>
        )
    };
}

export default YYApproveDemo;