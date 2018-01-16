import React from 'react';
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import arrayTreeFilter from 'array-tree-filter';

import { district, provinceLite } from 'antd-mobile-demo-data';

// 如果不是使用 List.Item 作为 children
const CustomChildren = props => (
    <div
        onClick={props.onClick}
        style={{ backgroundColor: '#fff', paddingLeft: 15 }}
    >
        <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
            <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
            <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>
        </div>
    </div>
);
let data1 = [{value: "340000", label: "安徽省",children:[{value: "820000", label: "澳门特别行政区"}
    ,
    {value: "110000", label: "北京",children:[{value: "820000", label: "澳门特别行政区"}
        ,
        {value: "110000", label: "北京",children:[{value: "820000", label: "澳门特别行政区"}
            ,
            {value: "110000", label: "北京"}
            ,
            {value: "450000", label: "广西壮族自治区"}]}
        ,
        {value: "450000", label: "广西壮族自治区"}]}
    ,
    {value: "450000", label: "广西壮族自治区"}]}
    ,
    {value: "820000", label: "澳门特别行政区"}
    ,
    {value: "110000", label: "北京"}
    ,
    {value: "450000", label: "广西壮族自治区"}
    ,
    {value: "810000", label: "香港特别行政区"}
    ,
    {value: "330000", label: "浙江省"}]
const seasons = [
    [
        {
            label: '2013',
            value: '2013',
        },
        {
            label: '2014',
            value: '2014',
        },
    ],
    [
        {
            label: '春',
            value: '春',
        },
        {
            label: '夏',
            value: '夏',
        },
    ],
];

class Test extends React.Component {
    state = {
        data: [],
        cols: 1,
        pickerValue: [],
        asyncValue: [],
        sValue: ['2013', '春'],
        visible: false,
    };

    onClick = () => {
        console.log(district);
        console.log(provinceLite)
        setTimeout(() => {
            this.setState({
                data: provinceLite,
            });
        }, 120);
    };
    onPickerChange = (val) => {
        console.log(val);
        let colNum = 1;
        const d = [...this.state.data];
        const asyncValue = [...val];
        if (val[0] === 'zj') {
            d.forEach((i) => {
                if (i.value === 'zj') {
                    colNum = 2;
                    if (!i.children) {
                        i.children = [{
                            value: 'zj-nb',
                            label: '宁波',
                        }, {
                            value: 'zj-hz',
                            label: '杭州',
                        }];
                        asyncValue.push('zj-nb');
                    } else if (val[1] === 'zj-hz') {
                        i.children.forEach((j) => {
                            if (j.value === 'zj-hz') {
                                j.children = [{
                                    value: 'zj-hz-xh',
                                    label: '西湖区',
                                }];
                                asyncValue.push('zj-hz-xh');
                            }
                        });
                        colNum = 3;
                    }
                }
            });
        } else {
            colNum = 1;
        }
        this.setState({
            data: d,
            cols: colNum,
            asyncValue,
        });
    };
    getSel() {
        const value = this.state.pickerValue;
        if (!value) {
            return '';
        }
        const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
    }
    // setVal() {
    //   this.props.form.setFieldsValue({
    //     district: ['340000', '340800', '340822'],
    //   });
    // },
    render() {
        const { getFieldProps } = this.props.form;
        return (<div>
            <WhiteSpace size="lg" />
            <List style={{ backgroundColor: 'white' }} className="picker-list">
                <Picker extra="请选择(可选)"
                        data={data1}
                        title="Areas"
                        cols={4}
                        {...getFieldProps('district', {
                        })}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                >
                    <List.Item arrow="horizontal">Multiple & cascader</List.Item>
                </Picker>
                <Picker
                    data={seasons}
                    title="选择季节"
                    cascade={false}
                    extra="请选择(可选)"
                    value={this.state.sValue}
                    onChange={v => this.setState({ sValue: v })}
                    onOk={v => this.setState({ sValue: v })}
                >
                    <List.Item arrow="horizontal">Multiple</List.Item>
                </Picker>
                <Picker data={district} cols={1} {...getFieldProps('district3')} className="forss">
                    <List.Item arrow="horizontal">Single</List.Item>
                </Picker>
                <Picker
                    data={this.state.data}
                    cols={this.state.cols}
                    value={this.state.asyncValue}
                    onPickerChange={this.onPickerChange}
                    onOk={v => console.log(v)}
                >
                    <List.Item arrow="horizontal" onClick={this.onClick}>Multiple & async</List.Item>
                </Picker>
                <Picker
                    title="选择地区"
                    extra="请选择(可选)"
                    data={district}
                    value={this.state.pickerValue}
                    onChange={v => this.setState({ pickerValue: v })}
                    onOk={v => this.setState({ pickerValue: v })}
                >
                    <CustomChildren>Customized children</CustomChildren>
                </Picker>
                <Picker
                    visible={this.state.visible}
                    data={district}
                    value={this.state.pickerValue}
                    onChange={v => this.setState({ pickerValue: v })}
                    onOk={() => this.setState({ visible: false })}
                    onDismiss={() => this.setState({ visible: false })}
                >
                    <List.Item extra={this.getSel()} onClick={() => this.setState({ visible: true })}>
                        Visible state
                    </List.Item>
                </Picker>
            </List>
        </div>);
    }
}

const TestWrapper = createForm()(Test);
export default TestWrapper;