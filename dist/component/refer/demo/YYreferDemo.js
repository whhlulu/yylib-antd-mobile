import React from 'react'
import {YYRefer,YYForm} from '../../../index'
import {Button,Toast} from 'antd-mobile';



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
    componentDidMount(){
        console.log(window.location.href)
        document.addEventListener('backbutton',()=>{
            Toast('监听后退键',1)
        },false)
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
         if(e=='5'){
             this.setState({
                 openk:true,
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
            case 'lzftreelist':
                this.setState({
                    openk:false
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
            case 'lzftreelist':
                this.setState({
                    openk:false
                })
                break;
        }
    }
    showform = ()=>{
        this.props.form.validateFields(['zyl', 'lzf','whh','lzftree','lzftreelist','zyl-1', 'lzf-1','whh-1','lzftree-1','lzftreelist-1'], (err, values) => {
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
                <Button onClick={this.openRefer.bind(this,'1')}>点击选择自定义列表参照zyl</Button>
                <YYRefer
                    referName='zyl'
                    referlabel='列表参照'
                    onOk={this.onOk}
                    onClose={this.onClose}
                    multiMode={true}
                    form={form}
                    open={this.state.open}
                    referCode='00026'
                    referStyle='list'
                    displayField='name'
                    // modalHeight='part'
                />
                <Button onClick={this.openRefer.bind(this,'2')}>点击选择自定义树参照lzf</Button>
                <YYRefer
                    referName='lzf'
                    referlabel='树参照'
                    onOk={this.onOk}
                    onClose={this.onClose}
                    multiMode={true}
                    form={form}
                    open={this.state.openz}
                    referCode='bd-005'
                    referStyle='tree'
                />
                <Button onClick={this.openRefer.bind(this,'3')}>点击选择自定义数表参照whh</Button>
                <YYRefer
                    referName='whh'
                    referlabel='数表参照'
                    onOk={this.onOk}
                    onClose={this.onClose}
                    multiMode={true}
                    form={form}
                    open={this.state.openw}
                    // referCode='00023'
                    referCode='bd-006_test'
                    referStyle='tree-list'
                />
                <Button onClick={this.openRefer.bind(this,'4')}>点击选择自定义异步树参照</Button>
                <YYRefer
                    referName='lzftree'
                    referlabel='异步数参照'
                    onOk={this.onOk}
                    onClose={this.onClose}
                    multiMode={true}
                    form={form}
                    open={this.state.openl}
                    referCode='bd-005_lazytree'
                    referStyle='lazy-tree'
                />
                <Button onClick={this.openRefer.bind(this,'5')}>点击选择自定义异步树表参照</Button>
                <YYRefer
                    referName='lzftreelist'
                    referlabel='异步数表参照'
                    onOk={this.onOk}
                    onClose={this.onClose}
                    multiMode={true}
                    form={form}
                    open={this.state.openk}
                    referCode='0015'
                    referStyle='lazy-tree-list'
                />

                <YYRefer
                    referName='zyl-1'
                    referlabel='列表参照'
                    custom={false}
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
                    referCode='00026'
                    referStyle='list'
                    displayField='name'
                    // modalHeight='part'
                />
                <YYRefer
                    referName='lzf-1'
                    referlabel='树参照'
                    custom={false}
                    multiMode={true}
                    form={form}
                    referCode='bd-005'
                    referStyle='tree'
                />
                <YYRefer
                    referName='whh-1'
                    referlabel='数表参照'
                    custom={false}
                    multiMode={true}
                    form={form}
                    referCode='bd-006_test'
                    referStyle='tree-list'
                />
                <YYRefer
                    referName='lzftree-1'
                    referlabel='异步数参照'
                    custom={false}
                    multiMode={true}
                    icon='tag'
                    form={form}
                    referCode='bd-005_lazytree'
                    referStyle='lazy-tree'
                />
                <YYRefer
                    referName='lzftreelist-1'
                    referlabel='异步数表参照'
                    custom={false}
                    multiMode={true}
                    icon='tag'
                    form={form}
                    referCode='0015'
                    referStyle='lazy-tree-list'
                />
                <Button onClick={this.showform}>点击显示所有value</Button>
            </div>


        )
    }
}

export default YYForm.create()(YYreferDemo);