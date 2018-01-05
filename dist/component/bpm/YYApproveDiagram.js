/**
 * Created By whh 2018/1/2
 * */
import React, {Component} from 'react';
import {Toast} from 'antd-mobile';
import '../../../css/YYApproveDiagram.css';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {MODULE_URL} from '../../common/RestUrl';
import ajax from '../../utils/ajax';
import classnames from 'classnames';

class YYApproveDiagram extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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

    render() {
        return (
            <div>
                shenpitu
            </div>
        )
    };
}

YYApproveDiagram.defaultProps = {
    userId: '',
    billId: ''
}

export default YYApproveDiagram;