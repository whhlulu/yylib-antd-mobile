/**
 * Created By whh 2018/1/2
 * */
import React, {Component} from 'react';
import {Modal, Icon, List, Checkbox,Button} from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
import {createForm} from 'rc-form';
import classnames from 'classnames';
import YYToast from '../toast/YYToast';
import YYNavBar from '../navBar/YYNavBar';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {MODULE_URL} from '../../common/RestUrl';
import ajax from '../../utils/ajax';
import '../../../css/YYApprove.css';

class YYAssignRef extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: this.props.visible,
            activeKey: '',
            AssignUser: [],
            selectedNodes: [],
        }
    }

    componentDidMount() {
        console.log(1)
        let {visible, type, bpmId, userId} = this.props;
        let params = {
            userId: userId,
            cbiztypeId: "",
            bpmId: bpmId,
            approveType: "同意"
        };
        let url = '';
        if (type != null && type == 'approve') {
            url = MODULE_URL.queryAssignUser;
        } else if (type != null && type == 'submit') {
            url = MODULE_URL.queryStartAssignUser;
        }
        ajax.postText(url, params, (AssignUserTextData) => {
            var AssignUserData = JSON.parse(AssignUserTextData);
            if (AssignUserData.success && AssignUserData.success === true && AssignUserData.assignAble === true) {
                this.setState({
                    activeKey: AssignUserData.data[0].activityId,
                    AssignUser: AssignUserData.data[0].participants
                })
            } else {
                YYToast.fail('没有审批权限!！', 2);
            }
        })
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.visible !== this.state.visible) {
            this.setState({
                visible: nextprops.visible
            })
        }
    }

    closeAssign = () => {
        this.setState({
            visible: false
        })
        if (_.isFunction(this.props.onClose)){
            this.props.onClose();
        }
    }
    onAssignChange = (selectedNode) => {
        //多选模式
        let selectedNodes = this.state.selectedNodes;
        if (!selectedNodes.some((item) => {
                return item === selectedNode
            })) {
            selectedNodes.push(selectedNode);
            this.setState({
                selectedNodes: selectedNodes
            });
        } else {
            let newNodes = [];
            // eslint-disable-next-line
            selectedNodes.map((item) => {
                if (item !== selectedNode) {
                    newNodes.push(item);
                }
            })
            this.setState({
                selectedNodes: newNodes
            });
        }
    }
    comfirm=()=>{
        if(this.state.selectedNodes.length>0){
            this.props.comfirm({activeKey:this.state.activeKey,targetKeys:this.state.selectedNodes});
        }else(
            YYToast.fail('请选择下一个环节的参与者！',2)
        )

    }
    render() {
        let {type, bpmId, userId} = this.props;
        let {visible, AssignUser,selectedNodes} = this.state;
        return (
            <div className="yy-assign-ref">
                <Modal popup
                       visible={visible}
                       maskClosable={false}
                       animationType="slide-up"
                >
                    <div className="yy-bpm-modal-body">
                        <YYNavBar
                            mode="light"
                            leftContent={<Icon type="left"/>}
                            onLeftClick={this.closeAssign}>
                            指派下一环节参与人</YYNavBar>
                        <List>
                            {AssignUser && AssignUser.length > 0 ? AssignUser.map(i => (
                                <CheckboxItem key={i.id} onChange={() => this.onAssignChange(i.id)}>
                                    {i.name}
                                </CheckboxItem>
                            )) : null}
                        </List>
                        <Button className="yy-button-bottom" disabled={!(selectedNodes.length>0)} type="primary"
                                onClick={this.comfirm}>确定</Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

YYAssignRef.defaultProps = {
    userId: '',
    billId: ''
}
export default YYAssignRef;