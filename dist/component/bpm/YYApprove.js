/**
 * Created By whh 2018/1/2
 * */
import React, {Component} from 'react';
import {Button, Toast, Modal, NavBar, Icon, List, TextareaItem, Radio, Flex} from 'antd-mobile';
const RadioItem = Radio.RadioItem;
import {createForm} from 'rc-form';
import YYIcon from '../Icon/YYIcon';
import YYNavBar from '../NavBar/YYNavBar';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {MODULE_URL} from '../../common/RestUrl';
import ajax from '../../utils/ajax';
import classnames from 'classnames';
import '../../../css/YYApprove.css';

class YYApprove extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showApprove: this.props.showApprove,//是否显示审批
            valueRadio: 0,//审批动作0,1,2,3
            bohuiValueRadio: '提交人',//驳回选择项
            showAssignRef:false,//是否显示指派参照
        }
    }

    componentDidMount() {
        let {showApprove, userId, billId} = this.props;
        ajax.getText(MODULE_URL.getBpmId, {'billId': billId}, (getBpmIdTextData) => {
            var getBpmIdData = JSON.parse(getBpmIdTextData);
            if (getBpmIdData.success && getBpmIdData.success == true) {
                if (getBpmIdData.bpmId) {
                    ajax.postText(MODULE_URL.beforeReject, {
                        'bpmId': getBpmIdData.bpmId,
                        'userId': userId
                    }, (beforeRejectTextData) => {
                        var beforeRejectData = JSON.parse(beforeRejectTextData);
                        this.setState({
                            inPower: beforeRejectData.inPower,
                            rejectAble: beforeRejectData.rejectAble,//审核
                            addsignAble: beforeRejectData.addsignAble,//改派
                            assignAble: beforeRejectData.assignAble,//指派
                            bohuiDate: beforeRejectData.data,
                        })
                    })
                } else {
                    Toast.fail('没有审批历史', 2);
                }
            } else {
                Toast.fail('查看审批记录失败，请检查参数', 2);
            }
        })
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.showApprove !== this.state.showApprove) {
            this.setState({
                showApprove: nextprops.showApprove
            })
        }
    }

    beforeApprove = () => {
        let {valueRadio, assignAble} = this.state;
        if (assignAble != null && assignAble == true && (valueRadio == 0 || valueRadio == 2)) {
            //assignAble指派为true,并且同意或者审核，判断显示指派情况
            this.showAssign();
        } else {
            this.doApprove([]);
        }
    }
    doApprove = () => {
        let userId = this.state.userId;//登录用户ID
        let bill = {};
        bill = this.state.bill ? this.state.bill : null;//单据信息
        let changeKey = USERID;//改派的用户Id
        let bpmId = null;
        if (bill) {
            bpmId = bill.bpmId ? bill.bpmId : null;//流程实例ID
        }

        let opinion = this.state.opinion ? this.state.opinion : null;//审批意见
        let activityId = this.state.activityId ? this.state.activityId : null;//不同意且退回，退回到的哪里
        let opinionContent = null;
        if (opinion == 1) {
            opinionContent = "同意";
        } else if (opinion == 2) {
            opinionContent = "不同意且退回";
            if (activityId == null || activityId == '') {
                message.info("请选择需要退回的节点！");
                return;
            }
        } else if (opinion == 3) {
            opinionContent = "审核";
        } else if (opinion == 4) {
            opinionContent = "改派";
            if (!changeKey) {
                message.error("请选择需要改派处！");
                return;
            }
        } else if (opinion == 5) {
            opinionContent = "加签";
        }
        let comment = this.state.customTip ? this.state.customTip : "";
        if (comment == "") {
            comment = opinionContent;
        }
        let approveObject = [];
        let assignAble = false;
        if (assign != null && assign.length > 0) {
            assignAble = true
        }
        approveObject = {
            userId: userId,
            bill: bill,
            bpmId: bpmId,
            approveType: opinionContent,
            comment: comment,
            delegateUser: changeKey,
            activityId: activityId,
            assignAble: assignAble,
            assign: assign
        };//回调数据
        this.onBpmApprove(approveObject);
        this.setState({
            comfirmable: true
        });

    }
    showApproveModal = () => {
        this.setState({
            showApprove: false
        })
    }
    bohuiOnChange = (value) => {
        this.setState({
            bohuiValueRadio: value,
        });
    }
    approveActionOnChange = (value) => {
        this.setState({
            valueRadio: value,
        });
    }
    showAssign(){
        this.setState({
            showAssignRef:true,
        });
    }
    closeAssign(){
        this.setState({
            showAssignRef:false,
        });
    }
    render() {
        let {showApprove, valueRadio, inPower, rejectAble, addsignAble, assignAble, bohuiValueRadio, bohuiDate,showAssignRef} = this.state;
        const {getFieldProps} = this.props.form;
        let customTip = null;//审批语
        let radioText = null;//审批对应的操作
        let radioText0 = <List renderHeader={() => '审批说明:'}><div className="yy-radioText">流程将继续</div></List>;
        let radioText1 = <List renderHeader={() => '请选择流程退回处:'}>
            <RadioItem key="提交人" value="提交人" checked={bohuiValueRadio === '提交人'}
                       onChange={() => this.bohuiOnChange('提交人')}>提交人</RadioItem>
            {bohuiDate && bohuiDate.length > 0 ? bohuiDate.map((item) => {
                <RadioItem key={item.activityId} value={item.activityId} checked={bohuiValueRadio === item.activityId}
                           onChange={() => this.bohuiOnChange(item.activityId)}>{item.activityName}</RadioItem>
            }) : null}
        </List>;
        let radioText2 = <List renderHeader={() => '审批说明:'}><div className="yy-radioText">流程继续流转,本项一般在会签时使用</div></List>;
        let radioText3 = <List renderHeader={() => '请选择流程改派处:'}>

        </List>;
        switch (valueRadio) {
            case 0:
                radioText = radioText0;
                customTip = '同意！';
                break;
            case 1:
                radioText = radioText1;
                customTip = '驳回！';
                break;
            case 2:
                radioText = radioText2;
                customTip = '已审核！';
                break;
            case 3:
                radioText = radioText3;
                customTip = '改派';
                break;
            default:
                radioText = [<div>{valueRadio}</div>];
                customTip = {valueRadio};
                break;
        }
        const viewAssign = showAssignRef ? 'zhipai' : null;
        return (
            <div className="yy-approve">
                {viewAssign}
                <Modal
                    popup
                    visible={showApprove}
                    maskClosable={false}
                    animationType="slide-up"
                >
                    <div className="yy-modal-body">
                        <YYNavBar
                            mode="light"
                            leftContent={<Icon type="left"/>}
                            onLeftClick={this.showApproveModal}
                            rightContent={inPower ? <span key="1" onClick={this.beforeApprove}>确定</span> : null}>
                            审批</YYNavBar>
                        <List renderHeader={() => '审批意见:'}>
                            <RadioItem key={0} disabled={!rejectAble} checked={valueRadio === 0}
                                       onChange={() => this.approveActionOnChange(0)}>同意</RadioItem>
                            <RadioItem key={1} disabled={!rejectAble} checked={valueRadio === 1}
                                       onChange={() => this.approveActionOnChange(1)}>不同意且退回</RadioItem>
                            <RadioItem key={2} disabled={rejectAble} checked={valueRadio === 2}
                                       onChange={() => this.approveActionOnChange(2)}>审核</RadioItem>
                            <RadioItem key={3} disabled={!addsignAble} checked={valueRadio === 3}
                                       onChange={() => this.approveActionOnChange(3)}>改派</RadioItem>
                        </List>
                        {radioText}
                        <List renderHeader={() => '审批语:'}>
                            <TextareaItem
                                {...getFieldProps('note3')}
                                value={customTip}
                                rows={3}
                            />
                        </List>
                    </div>
                </Modal>
            </div>
        )
    };
}

YYApprove.defaultProps = {
    userId: '',
    billId: ''
}
const YYApproveForm = createForm()(YYApprove);
export default YYApproveForm;