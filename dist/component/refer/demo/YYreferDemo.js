import React from 'react'
import {YYRefer,YYForm} from '../../../index'
import {Button} from 'antd-mobile';


class YYreferDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            init:'',
            open:false,
            openz:false,
            openw:false,
        }
    }
     openRefer=(e)=>{
         if(e=='1'){
             this.setState({
                 open:true,
             })

         }
         if(e=='2'){
             this.setState({
                 openz:true,
             })
         }
         if(e=='3'){
             this.setState({
                 openw:true,
             })
         }
         if(e=='4'){
             this.setState({
                 openl:true,
             })
         }

    }
    onOk = (value,name)=>{
        //确定界面的事件
        console.log(value);
        console.log(name);
        switch(name){
            case 'zyl':
                this.setState({
                    open:false,
                });
                break;
            case 'lzf':
                this.setState({
                    openz:false
                });
                break;
            case 'whh':
                this.setState({
                    openw:false
                });
                break;
            case 'lzftree':
                this.setState({
                    openl:false
                })
                break;
            default:
                break;
        }

    }
    onClose =(name)=>{
        switch(name){
            case 'zyl':
                this.setState({
                    open:false,
                });
                break;
            case 'lzf':
                this.setState({
                    openz:false
                });
                break;
            case 'whh':
                this.setState({
                    openw:false
                })
                break;
            case 'lzftree':
                this.setState({
                    openl:false
                })
                break;
        }
    }
    showform = ()=>{
        this.props.form.validateFields(['zyl', 'lzf','whh','lzftree'], (err, values) => {
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


    render(){
        const {form} = this.props;
        return(
            <div>
                <Button onClick={this.openRefer.bind(this,'1')}>点击选择列表参照zyl</Button>
                <Button onClick={this.openRefer.bind(this,'2')}>点击选择树参照lzf</Button>
                <Button onClick={this.openRefer.bind(this,'3')}>点击选择数表参照whh</Button>
                <Button onClick={this.openRefer.bind(this,'4')}>点击选择异步树参照</Button>
                <Button onClick={this.showform}>点击显示所有value</Button>

                <YYRefer
                    referName='zyl'
                    onOk={this.onOk}
                    onClose={this.onClose}
                    multiMode={true}
                    form={form}
                    values={[{code:"15110101919",
                        creationTimestamp:1516707936087,
                        dr:0,
                        id:"0342fcce-1949-426c-8b5a-ec9b4cdfb0f3",
                        modificationTimestamp:1516707936087,
                        name:"王祖贤",
                        tenantId:null,
                        userId:"0342fcce-1949-426c-8b5a-ec9b4cdfb0f3",
                        userName:"王祖贤"
                    }]}
                    open={this.state.open}
                    referCode='00026'
                    referStyle='list'
                    modalHeight='part'
                />
                <YYRefer
                    referName='lzf'
                    onOk={this.onOk}
                    onClose={this.onClose}
                    multiMode={true}
                    form={form}
                    open={this.state.openz}
                    referCode='bd-005'
                    referStyle='tree'
                />
                <YYRefer
                    referName='whh'
                    onOk={this.onOk}
                    onClose={this.onClose}
                    multiMode={true}
                    form={form}
                    open={this.state.openw}
                    referCode='00023'
                    referStyle='tree-list'
                />
                <YYRefer
                    referName='lzftree'
                    onOk={this.onOk}
                    onClose={this.onClose}
                    multiMode={true}
                    form={form}
                    open={this.state.openl}
                    referCode='bd-005_lazytree'
                    referStyle='lazy-tree'
                />
            </div>

        )
    }
}

export default YYForm.create()(YYreferDemo);