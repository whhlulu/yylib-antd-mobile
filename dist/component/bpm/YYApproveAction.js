/**
 * Created By whh 2018/1/2
 * */
import React, {Component} from 'react';
import {createForm} from 'rc-form';
import {Button, Modal, NavBar, Icon, List, TextareaItem, Radio, Checkbox, Flex, Picker} from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;
const Item = List.Item;
const prompt = Modal.prompt;
const alert = Modal.alert;
import PropTypes from 'prop-types';
import {YYIcon, YYToast, YYRefer, YYApproveHistory, YYAssignRef, YYForm} from "../../index";
import {MODULE_URL} from '../../common/RestUrl';
import ajax from '../../utils/ajax';
import '../../../css/YYApproveAction.css';
import classnames from 'classnames';

class YYApproveAction extends React.Component {
    state = {
        comment: '同意！',
        bohuiValueRadio: ['提交人'],//驳回选择项
        bohuiDate: [],
        showAssignRef: false,
        actionType: 'tongyi',
        showAddsignRef: false,
    }
    static propTypes = {
        billTypeId: PropTypes.string,
        userId: PropTypes.string,
        billId: PropTypes.string,
        approveType: PropTypes.string,
    };
    static defaultProps = {
        billTypeId: '',
        userId: '',
        billId: '',
        approveType: '审批'
    };

    componentDidMount() {
        this.getInfo();
    }

    getInfo = () => {
        let {billTypeId, userId, billId, approveType} = this.props;
        if (approveType !== '审批')return false;
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
                            bpmId: getBpmIdData.bpmId,
                            inPower: beforeRejectData.inPower,
                            rejectAble: beforeRejectData.rejectAble,//审核
                            addsignAble: beforeRejectData.addsignAble,//改派
                            assignAble: beforeRejectData.assignAble,//指派
                            bohuiDate: beforeRejectData.data.array ? beforeRejectData.data.array : null,
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
    otherHandleClick = (type) => {
        let {billTypeId, userId, billId, approveType, onOk} = this.props;
        let url = null;
        if (type === '弃审') {
            url = MODULE_URL.unapprove
        } else if (type === '收回') {
            url = MODULE_URL.doCallBack
        } else {
            YYToast.fail("approveType错误！", 2);
            return false;
        }
        if (!billId) {
            YYToast.fail("找不到对应的表单！", 2);
        } else if (!billTypeId) {
            YYToast.fail("找不到对应的单据类型！", 2);
        } else {
            YYToast.loading('Loading...', 0, null, false);
            ajax.postJSON(url, {userId: userId, billId: billId, billTypeId: billTypeId}, null, function (error) {
            }, function (data) {
                if (data != null && data.status == 200) {
                    let param = eval("(" + data.text + ")");
                    if (param != null) {
                        if (param.success == true && param.msg) {
                            YYToast.success(param.msg, 2)
                        } else {
                            YYToast.fail(param.msg, 2);
                        }
                    }
                }
                if (onOk && typeof(onOk) == "function") {
                    onOk(JSON.parse(data.text));
                }
            });
        }
    }
    shouhuiClick = () => {

    }
    //点击审批动作判断
    actionBtnClick = (type) => {
        let {bohuiValueRadio, bohuiDate, showAddsignRef, addsingUser} = this.state;
        if (type === 'tongyi') {
            this.setState({actionType: type, comment: '同意!'}, () => {
                alert(
                    '同意',
                    <ActionModal
                        actionType={this.state.actionType}
                        comment={this.state.comment}
                        onChangeComment={v => this.setState({comment: v})}/>,
                    [
                        {text: '取消', onPress: () => console.log('取消')},
                        {text: '确定', onPress: () => {this.beforeApprove()}}
                    ]
                )
            })
        } else if (type === 'bohui') {
            this.setState({actionType: type, comment: '驳回!'}, () => {
                alert(
                    '驳回',
                    <ActionModal
                        actionType={this.state.actionType}
                        comment={this.state.comment}
                        onChangeComment={v => this.setState({comment: v})}
                        bohuiDate={bohuiDate}
                        bohuiValueRadio={bohuiValueRadio}
                        onChange={v => this.setState({bohuiValueRadio: v})}
                        onOk={v => this.setState({bohuiValueRadio: v})}/>,
                    [
                        {text: '取消', onPress: () => console.log('取消')},
                        {text: '确定', onPress: () => {this.beforeApprove()}}
                    ]
                )
            })

        } else if (type === 'shenhe') {
            this.setState({actionType: type, comment: '已审核!'}, () => {
                alert(
                    '审核',
                    <ActionModal
                        actionType={this.state.actionType}
                        comment={this.state.comment}
                        onChangeComment={v => this.setState({comment: v})}/>,
                    [
                        {text: '取消', onPress: () => console.log('取消')},
                        {text: '确定', onPress: () => {this.beforeApprove()}}
                    ]
                )
            })
        } else if (type === 'gaipai') {
            this.setState({actionType: type, comment: '改派!'}, () => {
                alert(
                    '改派',
                    <GaipAction
                        {...this.props}
                        comment={this.state.comment}
                        onChangeComment={v => this.setState({comment: v})}
                        showAddsignRef={showAddsignRef}
                        addsingUser={addsingUser}
                        onClose={() => {
                        }}
                        onOk={user => this.setState({addsingUser: user})}/>,
                    [
                        {text: '取消', onPress: () => console.log('取消')},
                        {text: '确定', onPress: () => {this.beforeApprove()}}
                    ]
                )
            })
        } else {
            console.log('审批动作代码错误！')
        }
    }
    //审批前判断
    beforeApprove = () => {
        let {actionType, comment, assignAble} = this.state;//指派
        console.log(actionType, comment)
        this.setState({comment}, () => {
            if (assignAble !== null && assignAble === true && (actionType === 'tongyi' || actionType === 'shenhe')) {
                //assignAble指派为true,并且同意或者审核，判断显示指派情况
                this.showAssign();
            } else {
                this.doApprove([]);
            }
        })
    }
    //审批操作
    doApprove = (assign) => {
        let {userId, billId, billTypeId} = this.props;
        let {bpmId, actionType, bohuiValueRadio, addsingUser, comment, addsignAble} = this.state;//bpmid,审批意见，驳回id，改派对象,审批语,改派
        let opinionContent = null;
        if (actionType === 'tongyi') opinionContent = "同意";
        else if (actionType === 'bohui') opinionContent = "不同意且退回";
        else if (actionType === 'shenhe') opinionContent = "审核";
        else if (actionType === 'gaipai') {
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
            comment: comment,
            delegateUser: actionType === 'gaipai' && addsingUser ? addsingUser.userId : null,//改派的用户Id
            activityId: bohuiValueRadio[0],//驳回id
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
        YYToast.loading('Loading...', 0, null, false);
        ajax.postText(url, data, (text) => {
            var data = JSON.parse(text);
            if (data.success && data.success === true) {
                YYToast.success(data.msg, 2)
                this.getInfo();
            } else {
                YYToast.fail(data.msg, 2)
            }
            if (this.props.onOk && typeof(this.props.onOk) == "function") {
                this.props.onOk(data);
            }
        })
    }
    showAssign = () => {
        this.setState({
            showAssignRef: true,
        });
    }
    closeAssign = () => {
        this.actionBtnClick('tongyi')
    }
    comfirmAssign = (val) => {
        this.setState({
            showAssignRef: false,
        });
        this.doApprove([val]);
    }

    render() {
        let {billTypeId, userId, approveType, billId, onOk, className, ...restProps} = this.props;
        let {bpmId, inPower, rejectAble, addsignAble, assignAble, bohuiDate, bohuiValueRadio, showAssignRef} = this.state;
        let yyApproveActionCls = classnames('yy-approve-action', className);
        let bohuiCls = classnames('action-btn bohui', rejectAble ? '' : 'disabled');
        let gaipaiCls = classnames('action-btn gaipai', addsignAble ? '' : 'disabled');
        let shenheCls = classnames('action-btn shenhe', (inPower && !rejectAble) ? '' : 'disabled');
        let tongyiCls = classnames('action-btn tongyi', rejectAble ? '' : 'disabled');
        let AssignRef = showAssignRef ? <YYAssignRef
            visible={showAssignRef}
            type={"approve"}
            billTypeId={billTypeId}
            bpmId={this.state.bpmId}
            userId={userId}
            // onClose={this.closeAssign}
            comfirm={this.comfirmAssign}
        /> : null;
        return (
            <div className={yyApproveActionCls} {...restProps}>
                {approveType === '审批' ? <div >
                    {AssignRef}
                    <span className={bohuiCls}
                          onClick={rejectAble ? this.actionBtnClick.bind(this, 'bohui') : null}><YYIcon
                        className="action-icon" type="delete" size='xxs'/>驳回</span>
                    <span className={gaipaiCls}
                          onClick={addsignAble ? this.actionBtnClick.bind(this, 'gaipai') : null}><YYIcon
                        className="action-icon" type="edit" size='xxs'/>改派</span>
                    <span className={shenheCls}
                          onClick={(inPower && !rejectAble) ? this.actionBtnClick.bind(this, 'shenhe') : null}><YYIcon
                        className="action-icon" type="screen" size='xxs'/>审核</span>
                    <span className={tongyiCls}
                          onClick={rejectAble ? this.actionBtnClick.bind(this, 'tongyi') : null}><YYIcon
                        className="action-icon" type="upload" size='xxs'/>同意</span>
                </div> : <span className="block"
                               onClick={this.otherHandleClick.bind(this, approveType)}>{approveType}</span>}
            </div>

        )
    }
    ;
}
export default YYApproveAction;

class ActionModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            actionType: this.props.actionType,
            comment: this.props.comment,
            bohuiValueRadio: this.props.bohuiValueRadio
        }
    }

    onChangeComment = (v) => {
        this.setState({comment: v}, () => {
            this.props.onChangeComment(v);
        })
    }
    onChange = (v) => {
        this.setState({bohuiValueRadio: v}, () => {
            this.props.onChange(v);
        })
    }
    onOk = (v) => {
        this.setState({bohuiValueRadio: v}, () => {
            this.props.onOk(v);
        })
    }

    render() {
        let {bohuiDate} = this.props;
        let pickerDate = [{label: '提交人', value: '提交人'}];
        if (bohuiDate && bohuiDate.length > 0) {
            for (let i = 0; i < bohuiDate.length; i++) {
                pickerDate.push({
                    label: bohuiDate[i].activityName,
                    value: bohuiDate[i].activityId
                })
            }
        }
        let {actionType, comment, bohuiValueRadio} = this.state;
        return (
            <div>
                {actionType === 'bohui' ? <Picker
                    data={pickerDate}
                    title="选择驳回处"
                    cols={1}
                    value={bohuiValueRadio}
                    onChange={this.onChange}
                    onOk={this.onOk}>
                    <Item arrow="horizontal">流程退回至</Item>
                </Picker> : <div>{actionType==='tongyi'?'流程将继续':'流程继续流转,一般在会签时使用'}</div>}
                <TextareaItem
                    style={{border: '1px solid #f4f4f4', borderRadius: '2px', marginLeft: '-4px', padding: '1px'}}
                    placeholder="请输入审批语..."
                    value={comment}
                    onChange={this.onChangeComment}
                    rows={2}
                />
            </div>

        )
    }
}

class GaipActionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: this.props.comment,
            showAddsignRef: this.props.showAddsignRef,
            addsingUser: this.props.addsingUser,
        }
    }

    onChangeComment = (v) => {
        this.setState({comment: v}, () => {
            this.props.onChangeComment(v);
        })
    }
    showAddsign = () => {
        this.setState({
            showAddsignRef: true,
        });
    }
    onClose = () => {
        this.setState({showAddsignRef: false}, () => {
            this.props.onClose();
        })
    }
    onOk = (user) => {
        this.setState({showAddsignRef: false, addsingUser: user}, () => {
            this.props.onOk(user);
        })
    }

    render() {
        let {form} = this.props;
        let {comment, showAddsignRef, addsingUser} = this.state;
        return (
            <div>
                <Item arrow="horizontal" onClick={this.showAddsign}
                      extra={addsingUser ? addsingUser.name : '请选择'}>流程改派至</Item>
                <YYRefer
                    referlabel="流程改派至"
                    form={form}
                    referName='Addsign'
                    onOk={this.onOk}
                    onClose={this.onClose}
                    multiMode={false}
                    open={showAddsignRef}
                    referCode='00023'
                    referStyle='tree-list'
                />
                <TextareaItem
                    style={{border: '1px solid #f4f4f4', borderRadius: '2px', marginLeft: '-4px', padding: '1px'}}
                    placeholder="请输入审批语..."
                    value={comment}
                    onChange={this.onChangeComment}
                    rows={2}
                />
            </div>
        )
    }
}
const GaipAction = YYForm.create()(GaipActionForm)