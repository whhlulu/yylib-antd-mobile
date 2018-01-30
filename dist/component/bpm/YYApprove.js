/**
 * Created By whh 2018/1/2
 * */
import React, {Component} from 'react';
import {Button, Modal, NavBar, Icon, List, TextareaItem, Radio,Checkbox, Flex,WhiteSpace} from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;
const Item = List.Item;
import {YYForm, YYPicker,YYIcon,YYToast,YYNavBar,YYRefer,YYApproveHistory,YYAssignRef} from '../../index'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import {MODULE_URL} from '../../common/RestUrl';
import ajax from '../../utils/ajax';
import '../../../css/YYApprove.css';

class YYApprove extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showApprove: this.props.showApprove,//是否显示审批
            showApproveHistory: false,//是否显示审批历史
            valueRadio: 0,//审批动作0,1,2,3
            bohuiValueRadio: '提交人',//驳回选择项
            showAssignRef: false,//是否显示指派参照
            showAddsignRef: false,//是否显示改派参照
            customTip: '同意！',
            PickerData:[],//审批动作
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
                        let PickerData = [];
                        if(beforeRejectData.rejectAble){
                            PickerData.push({label: '同意', value: 0},{label: '不同意且退回', value: 1})
                        }
                        if(beforeRejectData.inPower && !beforeRejectData.rejectAble){
                            PickerData.push({label: '审核', value: 2})
                        }
                        if(beforeRejectData.addsignAble){
                            PickerData.push({label: '改派', value: 3})
                        }
                        let bohuiDate = [{label:'提交人',value:'提交人'}];
                        if(beforeRejectData.data&&beforeRejectData.data.array.length>0){
                            for(let i=0;i<beforeRejectData.data.array.length;i++){
                                bohuiDate.push({
                                    value:beforeRejectData.data.array[i].activityId,
                                    label:beforeRejectData.data.array[i].activityName,
                                })
                            }
                        }
                        this.setState({
                            bpmId: getBpmIdData.bpmId,
                            PickerData:PickerData,
                            inPower: beforeRejectData.inPower,
                            rejectAble: beforeRejectData.rejectAble,//审核
                            addsignAble: beforeRejectData.addsignAble,//改派
                            assignAble: beforeRejectData.assignAble,//指派
                            bohuiDate: bohuiDate,
                        })
                    })
                } else {
                    YYToast.fail('没有审批历史', 2);
                }
            } else {
                YYToast.fail('查看审批记录失败，请检查参数', 2);
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
    //审批前判断
    beforeApprove = () => {
        let {valueRadio, assignAble} = this.state;
        if (assignAble != null && assignAble == true && (valueRadio == 0 || valueRadio == 2)) {
            //assignAble指派为true,并且同意或者审核，判断显示指派情况
            this.showAssign();
        } else {
            this.doApprove([]);
        }
    }
    //审批操作
    doApprove = (assign) => {
        let {userId, billId, billTypeId} = this.props;
        let {bpmId, valueRadio, bohuiValueRadio, addsingUser, customTip} = this.state;//bpmid,审批意见，驳回id，改派对象,审批语
        let opinionContent = null;
        if (valueRadio == 0) opinionContent = "同意";
        else if (valueRadio == 1) opinionContent = "不同意且退回";
        else if (valueRadio == 2) opinionContent = "审核";
        else if (valueRadio == 3) {
            opinionContent = "改派";
            if (!addsingUser) {
                YYToast.fail("请选择需要改派处！", 2);
                return;
            }
        }
        let approveObject = {};
        approveObject = {
            userId: userId,
            bill: {
                billTypeId: billTypeId,
                billId: billId,
                bpmId: bpmId
            },
            bpmId: bpmId,
            approveType: opinionContent,
            comment: customTip,
            delegateUser: addsingUser ? addsingUser.userId : null,//改派的用户Id
            activityId: bohuiValueRadio,//驳回id
            assignAble: (assign != null && assign.length > 0) ? true : false,
            assign: assign
        };//回调数据
        this.onBpmApprove(approveObject);
    }
    //提交审批
    onBpmApprove = (data) => {
        let url = '';
        if (data.approveType == "同意" || data.approveType == "审核") {
            url = MODULE_URL.doApprove
        } else if (data.approveType == "改派") {
            url = MODULE_URL.delegateTaskCompletely
        } else if (data.approveType == "不同意且退回") {
            url = MODULE_URL.disApprove
        }
        ajax.postText(url, data, (text) => {
            var data = JSON.parse(text);
            if(data.success && data.success===true){
                this.setState({
                    showApprove: false
                })
                YYToast.success(data.msg,2)
            }else{
                YYToast.fail(data.msg,2)
            }
        })
    }
    showApproveModal = () => {
        this.setState({
            showApprove: false
        })
    }
    clickApproveHistory = () => {
        if(this.state.inPower){
            this.setState({
                showApprove: false,
                showApproveHistory: true
            })
        }else{
            YYToast.fail('无查看权限',1)
        }

    }
    showApproveHistoryModal = () => {
        this.setState({
            showApprove: true,
            showApproveHistory: false
        })
    }
    bohuiOnChange = (valueList) => {
        let value = valueList[0];
        this.setState({
            bohuiValueRadio: value,
        });
    }
    approveActionOnChange = (valueList) => {
        let value = valueList[0];
        switch (value) {
            case 0:
                this.setState({customTip: '同意！'});
                break;
            case 1:
                this.setState({customTip: '驳回！'});
                break;
            case 2:
                this.setState({customTip: '已审核！'});
                break;
            case 3:
                this.setState({customTip: '改派！'});
                break;
            default:
                this.setState({customTip: '错误！'});
                break;
        }
        this.setState({
            valueRadio: value,
        });
    }
    showAssign = () => {
        this.setState({
            showAssignRef: true,
        });
    }
    closeAssign = () => {
        this.setState({
            showAssignRef: false,
        });
    }
    comfirmAssign = (val) => {
        this.closeAssign();
        console.log(val);
        this.doApprove([val]);

    }
    checkedAddsign = (user) => {
        this.closeAddsign();
        console.log(user)
        this.setState({
            addsingUser: user
        })
    }
    showAddsign = () => {
        this.setState({
            showAddsignRef: true,
        });
    }
    closeAddsign = () => {
        this.setState({
            showApprove: true,
            showAddsignRef: false,
            showApproveHistory: false,
        });
    }
    customTipOnChange = (value) => {
        this.setState({
            customTip: value,
        });
    }

    render() {
        let {showApprove, showApproveHistory, PickerData,valueRadio, inPower, rejectAble, addsignAble, assignAble, bohuiValueRadio, bohuiDate, showAssignRef, customTip} = this.state;
        let {userId, billId, billTypeId,orgId,form} = this.props;
        let radioText = null;
        let radioText0 = <Item disabled={true}>流程将继续</Item>;
        let radioText1 = <YYPicker value={[bohuiValueRadio]}
                                   data={bohuiDate}
                                   form={form}
                                   cols={1}
                                   label="流程将退回到"
                                   field="bohuiValueRadio"
                                   required={true}
                                   onOk={this.bohuiOnChange}/>;
        let radioText2 = <Item disabled={true}>流程继续流转,本项一般在会签时使用</Item>;
        let radioText3 = <div>
                <Item className="yy-item" arrow="horizontal" onClick={this.showAddsign}
                      extra={this.state.addsingUser ? this.state.addsingUser.name : null}>当前任务改在</Item>
            <YYRefer
                referName='Addsign'
                onOk={this.checkedAddsign}
                onClose={this.closeAddsign}
                multiMode={false}
                open={this.state.showAddsignRef}
                referCode='00023'
                referStyle='tree-list'
                form={form}
            /></div>;
        switch (valueRadio) {
            case 0:radioText = radioText0;break;
            case 1:radioText = radioText1;break;
            case 2:radioText = radioText2;break;
            case 3:radioText = radioText3;break;
            default:radioText = valueRadio;break;
        }
        const YYApproveHistoryModal = inPower ?
            <Modal popup
                   visible={showApproveHistory}
                   maskClosable={false}
                   animationType="slide-up"
            >
                <div className="yy-bpm-modal-body">
                    <YYNavBar
                        className="no-border-navbar"
                        mode="light"
                        leftContent={<Icon type="left"/>}
                        onLeftClick={this.showApproveHistoryModal}>
                        审批历史</YYNavBar>
                    <YYApproveHistory
                        userId={userId}
                        billId={billId}/>
                </div>
            </Modal> : null;
        const AssignRef = showAssignRef ? <YYAssignRef
            visible={showAssignRef}
            type = {"approve"}
            billTypeId={billTypeId}
            bpmId = {this.state.bpmId}
            userId = {userId}
            comfirm = {this.comfirmAssign}
        />:null;
        return (
            <div className="yy-approve">
                {AssignRef}
                {YYApproveHistoryModal}
                <Modal
                    popup
                    visible={showApprove}
                    maskClosable={false}
                    animationType="slide-up"
                >
                    <div className="yy-bpm-modal-body">
                        <YYNavBar
                            className="no-border-navbar"
                            mode="light"
                            leftContent={<Icon type="left"/>}
                            onLeftClick={this.showApproveModal}
                            rightContent={<Button type="ghost" size="small" inline disabled={!inPower}
                                                  onClick={this.clickApproveHistory}>查看审批历史</Button>}>
                            审批</YYNavBar>
                        <List>
                        <YYPicker value={[valueRadio]}
                                  data={PickerData}
                                  form={form}
                                  cols={1}
                                  label="审批意见"
                                  field="valueRadio"
                                  required={true}
                                  disabled={PickerData.length<1}
                                  onOk={this.approveActionOnChange}/>
                        {radioText}
                        </List>
                        <WhiteSpace />
                        <List>
                            <TextareaItem
                                title="审批语"
                                placeholder={'请输入审批语'}
                                value={customTip}
                                onChange={this.customTipOnChange.bind(this)}
                                rows={3}
                            />
                        </List>
                        <Button className="yy-button-bottom-in" disabled={!inPower} type="primary"
                                onClick={this.beforeApprove}>确定</Button>
                    </div>
                </Modal>
            </div>
        )
    }
    ;
}

YYApprove.defaultProps = {
    userId: '',
    billId: ''
}
export default YYForm.create()(YYApprove);