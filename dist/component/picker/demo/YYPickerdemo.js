import React from 'react'
import {YYForm, YYPicker, YYToast} from '../../../index'
import {Button} from 'antd-mobile'
import 'moment/locale/zh-cn';

let data1 = [{
    value: "340000", label: "安徽省", children: [
        {
            value: "341500", label: "六安市", children: [
                {value: "341522", label: "霍邱县"},

                {value: "341525", label: "霍山县"},

                {value: "341502", label: "金安区"},

                {value: "341524", label: "金寨县"}]
            }
            ,
            {value: "340500", label: "马鞍山市"}
            ,
            {value: "341800", label: "宣城市"}]
        }
    ,
    {value: "820000", label: "澳门特别行政区"}
    ,
    {value: "110000", label: "北京"}
    ,
    {value: "450000", label: "广西壮族自治区"}
    ,
    {value: "810000", label: "香港特别行政区"}
    ,
    {value: "330000", label: "浙江省"}];
let data2 = [{value: "340000", label: "安徽省"}
    ,
    {value: "820000", label: "澳门特别行政区"}
    ,
    {value: "110000", label: "北京"}
    ,
    {value: "450000", label: "广西壮族自治区"}
    ,
    {value: "810000", label: "香港特别行政区"}
    ,
    {value: "330000", label: "浙江省"}];
const grade = [
    [
        {
            label: '2017界',
            value: '2017',
        },
        {
            label: '2018界',
            value: '2018',
        },
    ],
    [
        {
            label: '物理系',
            value: '001',
        },
        {
            label: '数学系',
            value: '002',
        },
    ],
];

class YYDatePickerDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data1,
            data2
        }
    }

    onOk = (value) => {
        console.log(value)
    }
    submit = () => {
        this.props.form.validateFields(['picker1', 'picker2', 'picker3'], (err, value) => {
            if (!err) {
                YYToast.success('提交成功',1)
                console.log(value);
            } else {
                let arr=[];
                for(let i in err){
                    arr.push(err[i])
                }
                YYToast.info(arr[0].errors[0].message,1.5)
                console.log(err);
            }
        })
    }

    render() {
        let {form} = this.props;
        return (
            <div>
                <YYForm>
                    <YYPicker data={this.state.data1} value={["340000", "341500", "341502"]} form={form} cols={3} label="联动选择" field="picker1" onOk={this.onOk}
                              required={true} onPickerChange={(v)=>console.log(v)}/>
                    <YYPicker data={grade} form={form} cols={2} label="无联动多选" cascade={false} field="picker2"
                              onOk={this.onOk} required={true}/>
                    <YYPicker data={this.state.data2} form={form} cols={1} label="单选" field="picker3" onOk={this.onOk}
                              required={true}/>
                    <Button onClick={this.submit}>提交</Button>
                </YYForm>
            </div>
        )
    }
}

export default YYForm.create()(YYDatePickerDemo);