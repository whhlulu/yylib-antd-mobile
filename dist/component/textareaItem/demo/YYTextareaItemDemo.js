import React from 'react'
import {YYForm,Url} from '../../../index'
import YYTextareaItem from '../../textareaItem/YYTextareaItem'
import {Button} from 'antd-mobile';



class YYTextareaItemDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url:'',
        }
    }
    componentDidMount(){
        this.setState({
            url:window.location.href,
        })
    }



    showform = ()=>{
        this.props.form.validateFields(['text1','text2','text3','text4','text5','text6','text7','text8'], (err, values) => {
            if (!err) {
                console.log(values);
            } else {
                let arr = [];
                for (let i in err) {
                    arr.push(err[i])
                }
                // Toast.info(arr[0].errors[0].message,1.5);
                console.log(arr[0].errors[0].message)
            }
        })
    }
    Change = (val) => {
        console.log(val);
    }
    onBlur = (val) => {
        console.log(val)
    }
    onFocus = (val) => {
        console.log(val)
    }

    render(){
        const {form} = this.props;
        return(
            <div>
                <Url/>
                <div style={{padding:10,color:'grey'}}>标准模式</div>
                <YYTextareaItem
                    field='text1'
                    label='标题'
                    labelNumber={2}
                    onChange={this.Change}
                    form={form}
                    value='默认内容'
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                />
                <div style={{padding:10,color:'grey'}}>自适应高度/固定高度</div>
                <YYTextareaItem
                    field='text2'
                    label='自适应高度'
                    labelNumber={5}
                    onChange={this.Change}
                    form={form}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    autoHeight={true}
                />
                <YYTextareaItem
                    field='text3'
                    placeholder='固定高度'
                    labelNumber={4}
                    onChange={this.Change}
                    form={form}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    rows={5}
                />
                <div style={{padding:10,color:'grey'}}>清除按钮</div>
                <YYTextareaItem
                    field='text4'
                    label='清除'
                    labelNumber={2}
                    onChange={this.Change}
                    form={form}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    clear={true}
                />
                <div style={{padding:10,color:'grey'}}>限制输入长度</div>
                <YYTextareaItem
                    field='text5'
                    label='限制长度'
                    placeholder='可输入10个字'
                    labelNumber={4}
                    onChange={this.Change}
                    form={form}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    clear={true}
                    count={10}
                />
                <div style={{padding:10,color:'grey'}}>计数功能</div>
                <YYTextareaItem
                    field='text6'
                    placeholder='可计数。。。'
                    onChange={this.Change}
                    form={form}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    clear={true}
                    count={100}
                    rows={5}
                />
                <div style={{padding:10,color:'grey'}}>不可编辑/禁用</div>
                <YYTextareaItem
                    field='text7'
                    label='不可编辑'
                    value='not editable'
                    onChange={this.Change}
                    form={form}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                   editable={false}
                />
                <YYTextareaItem
                    field='text8'
                    label='禁用'
                    value='disbaled'
                    onChange={this.Change}
                    form={form}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    disabled={true}
                />
                <div style={{padding:10,color:'grey'}}></div>
                <Button onClick={this.showform}>点击在console里显示所有value</Button>
            </div>


        )
    }
}

export default YYForm.create()(YYTextareaItemDemo);