/**
 * Created By whh 2018/1/2
 * */
import React, {Component} from 'react';
import {Steps, Toast, Picker, List} from 'antd-mobile';
import {createForm} from 'rc-form';
const Step = Steps.Step;
import '../../../css/YYApproveHistory.css';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {MODULE_URL} from '../../common/RestUrl';
import ajax from '../../utils/ajax';
import classnames from 'classnames';

class YYApproveHistory extends React.Component {
    constructor(props) {
        super(props)
        this.bpmsList = [];
        this.state = {
            loading: true,
            bpmProcessInfo: [],//审批记录
            bpmId: '',
        }
    }

    componentDidMount() {
        let {userId, billId} = this.props;
        ajax.getText(MODULE_URL.getBpmIds, {'billId': billId}, (testData) => {
            var data = JSON.parse(testData);
            if (data.success && data.success == true) {
                if (data.bpmIdList && data.bpmIdList.length > 0) {
                    this.setState({
                        bpmId: data.bpmIdList[0]
                    })
                    for (let i = data.bpmIdList.length; i >= 1; i--) {
                        this.bpmsList.push({
                            value: data.bpmIdList.length - i,
                            label: '第' + i + '次',
                            bpmId: data.bpmIdList[data.bpmIdList.length - i],
                        });
                    }
                } else {
                    Toast.fail('没有审批历史', 2);
                }
            } else {
                Toast.fail('查看审批记录失败，请检查参数', 2);
            }
        })
        this.postHistoryInfo();
    }

    postHistoryInfo = () => {
        let {userId, billId} = this.props;
        let {bpmId} = this.state;
        ajax.postText(MODULE_URL.querySingleHistoricProcessInfo, {
            'billId': billId,
            'userId': userId,
            bpmId: bpmId,
            isFinish: false
        }, (testData) => {
            var data = JSON.parse(testData);
            if (data.success && data.success == true) {
                let array = data.data.array.reverse()
                this.setState({
                    loading: false,
                    bpmProcessInfo: data.data.array
                })
            } else {
                Toast.fail('查看审批记录失败，请检查参数', 1);
            }
        })
    }

    switchStatus = (state) => {
        var item = '';//'wait', 'process', 'finish', 'error'
        switch (state) {
            case "completed"://通过
                return ''
            case "delete"://作废
                return 'error'
                break;
            case "ACTIVITI_DELETED"://不通过
                return 'error'
                break;
            case "disagree_continue"://不同意但继续
                return 'wait'
                break;
            case "deleted"://取消
                return 'wait'
                break;
            case "reject"://驳回
                return 'error'
                break;
            case "withdraw"://弃审
                return 'wait'
                break;
            case "stop"://中止
                return 'error'
                break;
            case "callback"://收回
                return 'error'
                break;
            default:
                return ''
                break;
        }
    }

    render() {
        const {getFieldProps} = this.props.form;
        let {bpmProcessInfo, loading, bpmId} = this.state;
        let {userId, billId, className, ...restProps} = this.props;
        const basicCls = classnames('yy-bpm-steps', className);
        return (
            <div className="yy-approve-history">
                <List>
                    <Picker data={this.bpmsList}
                            cols={1}
                            {...getFieldProps('district', {initialValue: [0]})}
                            onOk={v => {
                                this.setState({bpmId: this.bpmsList[v].bpmId});
                                this.postHistoryInfo()
                            }}>
                        <List.Item arrow="horizontal">审批记录次数</List.Item>
                    </Picker>
                </List>
                <div className="yy-bpm-iframe">
                    <iframe
                        id="demoFrame"
                        title="yylib-antd-mobile"
                        name="demoFrame"
                        style={{width: 'calc(100vw - 2rem)', border: 'none'}}
                        src={MODULE_URL.diagramUrl + bpmId}
                    />
                </div>
                <Steps {...restProps} className={basicCls} size="small" current={bpmProcessInfo.length}>
                    {
                        bpmProcessInfo && bpmProcessInfo.length > 0 ? bpmProcessInfo.map((item, index) => {
                            return <Step
                                key={index}
                                description={<div className="approveItem">
                                    <div><span className="left-top">{item.approveUserName}</span><span
                                        className="right-top">{item.approveDatetime}</span></div>
                                    <div><span className="left-bottom">{item.approveState}</span><span
                                        className="right-bottom">{item.approveComment}</span></div>
                                </div>}
                                status={this.switchStatus(item.state)}/>
                        }) : null
                    }
                </Steps>
            </div>

        )
    };
}

YYApproveHistory.defaultProps = {
    userId: '',
    billId: ''
}
const YYApproveHistoryFrom = createForm()(YYApproveHistory);
export default YYApproveHistoryFrom;