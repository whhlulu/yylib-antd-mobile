/**
 * Created By whh 2018/1/2
 * */
import React, {Component} from 'react';
import {Toast, Button, Popover, NavBar, Icon} from 'antd-mobile'
const Item = Popover.Item;
import YYApprove from '../YYApprove'
import YYIcon from '../../Icon/YYIcon'

class YYApproveDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showApprove: false,
            visible:false
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
                userId="33f2ee84-4c32-4296-85da-691fb09c44d7"
                billId='c731402354b1fdcf65e68d8af4c33452'/>
                : null}

            </div>
        )
    };
}

export default YYApproveDemo;