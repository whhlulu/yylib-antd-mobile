/**
 * Created By whh 2018/1/2
 * */
import React, {Component} from 'react';
import {Steps, Toast} from 'antd-mobile';
const Step = Steps.Step;
import '../../../css/YYApproveHistory.css';
import PropTypes from 'prop-types';
import _ from 'lodash';
import YYIcon from '../Icon/YYIcon';
import {MODULE_URL} from '../../common/RestUrl';
import ajax from '../../utils/ajax';
import classnames from 'classnames';

class YYApproveHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading:true,
            bpmProcessInfo: []
        }
    }

    componentDidMount() {
        let {userId, billId} = this.props;
        ajax.getText(MODULE_URL.getBpmIds, {'billId': billId}, (testData) => {
            var data = JSON.parse(testData);
            if (data.success && data.success == true) {
                if (data.bpmIdList && data.bpmIdList.length > 0) {

                } else {
                    Toast.fail('没有审批历史', 2);
                }
            } else {
                Toast.fail('查看审批记录失败，请检查参数', 2);
            }
        })
        ajax.postText(MODULE_URL.querySingleHistoricProcessInfo, {'billId': billId, 'userId': userId}, (testData) => {
            var data = JSON.parse(testData);
            if (data.success && data.success == true) {
                let array = data.data.array.reverse()
                this.setState({
                    loading:false,
                    bpmProcessInfo: data.data.array
                })
            } else {
                Toast.fail('查看审批记录失败，请检查参数', 1);
            }
        })
    }
switchStatus=(state)=>{
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
        let {bpmProcessInfo,loading} = this.state;
        let {userId, billId,className,...rest} = this.props;
        const basicCls = classnames('YYApproveHistory', className);
        return (
            <Steps {...rest} className={basicCls} size="small" current={bpmProcessInfo.length}>
                {
                    bpmProcessInfo && bpmProcessInfo.length>0 ? bpmProcessInfo.map((item,index) => {
                        return <Step
                            key={index}
                            description={<div className="approveItem">
                                <div><span className="left-top">{item.approveUserName}</span><span className="right-top">{item.approveDatetime}</span></div>
                                <div><span className="left-bottom">{item.approveState}</span><span className="right-bottom">{item.approveComment}</span></div>
                            </div>}
                            status={this.switchStatus(item.state)}/>
                    }) : null
                }


            </Steps>
        )
    };
}

YYApproveHistory.defaultProps = {
    userId: '',
    billId: ''
}

export default YYApproveHistory;