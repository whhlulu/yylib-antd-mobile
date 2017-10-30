import React, {Component} from 'react';
import SSForm from '../../form/SSForm';
import SSPage from '../../page/SSPage';
import SSList from '../../list/SSList';
import SSListItem from '../../list/SSListItem'
import SSNavBar from '../../navbar/SSNavBar'
let url = 'https://dev.yonyouccs.com/icop-technology-web/tAStieManWorkInstru/queryList';
class ListDemo extends SSPage{
    constructor(props) {
        super(props);
        this.state = {
            ListData: []
        }
    }
    initData = (result) => {
        this.setState({
            ListData: result
        })
    };
    onLoadMore = (result) => {
        this.setState({
            ListData: result
        })
    };
    onClick = (e) => {
        console.log('onClick', e)
    };
    render(){

        return(
            <SSForm>
                <SSNavBar
                    title='例子'
                />
                {/*  <SSignature saveData={this.saveData}/>*/}

                <SSList multiLine url={url} initData={this.initData} onLoadMore={this.onLoadMore}>


                    <SSListItem
                        type="2"
                        l1="板筋安装"
                        r1='2017-03-21完成'
                        l2="钢筋工长：张三"

                        l3="计划完成时间:2017-03-21"
                        onClick={(e) => this.onClick(e)}
                    />


                    <SSListItem
                        type="2"
                        l1="板筋安装"
                        r1='未确认'
                        l2="钢筋工长：张三"
                        l3="计划完成时间:2017-03-21"
                        onClick={(e) => this.onClick(e)}
                    />

                    <SSListItem
                        type="3"
                        l1="验收20160403"
                        r1='已同步'
                        l2="物资名称：钢筋"
                        l3="型号:HRB40032"
                        l4="取样通知单编号：AAAAAAAAAAAAAAA"
                        onClick={(e) => this.onClick(e)}
                    />

                    <SSListItem
                        type="3"
                        l1="验收20160403"
                        r1='见证取样0次'
                        l2="物资名称：钢筋"
                        l3="型号:HRB40032"
                        l4="单据类型：钢筋原材取样通知单"
                        onClick={(e) => this.onClick(e)}
                    />

                    <SSListItem
                        type="4"
                        l1="图纸编号：会所0526"
                        r1='结构施工图'
                        l2="期间：2017年3月第2周"
                        onClick={(e) => this.onClick(e)}
                    />

                    <SSListItem
                        type="5"
                        l1="TSK0986001"
                        r1='自由态'
                        l2="施工部位"
                        r2="交底日期 2017-03-06"
                        onClick={(e) => this.onClick(e)}
                    />



                    <SSListItem
                        type="6"
                        l1="TSK0986001"
                        r1='钢筋原材料'
                        l2='钢筋原材料'
                        l3='规格型号：TKB400E'
                        r3='复核整改单数量3'
                        onClick={(e) => this.onClick(e)}
                    />
                    <SSListItem
                        type="7"
                        l1="TSK0986001"
                        r1='未交底'
                        l2='检查人：陈海'
                        r2='复核整改单数量3'
                        onClick={(e) => this.onClick(e)}
                    />


                    <SSListItem
                        type="8"
                        l1="TSK0986001"
                        r1='已提交'
                        l2='施工组织设计名称：陈海'
                        l3='复核日期 2017-03-06'
                        r3='已同步'
                        onClick={(e) => this.onClick(e)}
                    />


                    <SSListItem
                        type="9"
                        l1="TSK0986001"
                        r1='已同步'
                        l2='整改责任人：陈海'
                        r2='复核日期 2017-03-06'
                        l3='吊篮作业未采取防摆动措施或吊兰钢丝绳垂掉下拉，需要注意或吊兰钢丝绳垂掉下拉，需要注意'
                        onClick={(e) => this.onClick(e)}
                    />
                    <SSListItem
                        type="10"
                        l1="TSK0986001"
                        r1='已同步'
                        l2='名称：123'
                        r2='复核日期 2017-03-06'
                        onClick={(e) => this.onClick(e)}
                    />
                    <SSListItem
                        type="11"
                        l1="TSK0986001"
                        r1='自由态'
                        l2="主讲人：万达经理"
                        r2="交底日期 2017-03-06"
                        onClick={(e) => this.onClick(e)}
                    />
                    <SSListItem
                        type="12"
                        l1={<span>砌体工程实测实量：<em style={{fontStyle:'normal',color:'red'}}>94.81%</em></span>}
                        l2="E区-商业街-店面"
                        onClick={(e) => this.onClick(e)}
                    />
                </SSList>


            </SSForm>


        )


    }
}

export default SSForm.create()(ListDemo);