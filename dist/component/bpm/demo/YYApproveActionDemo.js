/**
 * Created By whh 2018/1/2
 * */
import React, {Component} from 'react';
import {YYApproveAction} from '../../../index'

class YYApproveActionDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <YYApproveAction
                    className="my-approve"
                    style={{top:0}}
                    billTypeId='PCM2'
                    userId="5afbe1b5-d718-4654-b915-db4409251854"
                    billId="f5e2266ac832f719cef42d78f4abff2a"
                    onOk={(v)=>console.log(v)}
                />
                <YYApproveAction
                    style={{top:50}}
                    billTypeId='PCM2'
                    userId="5afbe1b5-d718-4654-b915-db4409251854"
                    billId="f5e2266ac832f719cef42d78f4abff2a"
                    approveType="收回"
                    onOk={(v)=>console.log(v)}
                />
                <YYApproveAction
                    style={{top:100}}
                    billTypeId='PCM2'
                    userId="5afbe1b5-d718-4654-b915-db4409251854"
                    billId="f5e2266ac832f719cef42d78f4abff2a"
                    approveType="弃审"
                    onOk={(v)=>console.log(v)}
                />
                <YYApproveAction
                    approveType="审批"
                    billTypeId='CTM3'
                    userId="5db93165-c97e-4929-b865-b355355c108b"
                    billId="531af9ad4ee84a74c5491bf6b1e0a83a"
                    onOk={(v)=>console.log(v)}
                />
            </div>
        )
    };
}

export default YYApproveActionDemo;