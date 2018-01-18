/**
 * Created By whh 2018/1/2
 * */
import React, {Component} from 'react';
import {Popover, NavBar, Icon} from 'antd-mobile'
const Item = Popover.Item;
import YYApprove from '../YYApprove'
import YYIcon from '../../icon/YYIcon'

class YYApproveDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showApprove: false,
            visible:false,
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
                billTypeId='IVM3'
                userId="5afbe1b5-d718-4654-b915-db4409251854"
                billId="a993d7f47cd53fe7e995873d70572bbe"/>
                : null}
            </div>
        )
    };
}

export default YYApproveDemo;