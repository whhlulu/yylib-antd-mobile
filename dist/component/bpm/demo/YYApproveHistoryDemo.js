/**
 * Created by whh on 2018/1/2.
 */
import React, {Component} from 'react';
import {Button} from 'antd-mobile';
import YYApproveHistory from '../YYApproveHistory'

class YYViewApproveDemo extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount () {

    }

    render() {
        return (
            <div>
                <YYApproveHistory
                    userId = 'df26de87-f52c-4d47-ab5e-a0be455224e1'
                    billId = '2f8865f9e41a5cf7bf012adbb5463699'/>
            </div>
        );
    }
}

export default YYViewApproveDemo;