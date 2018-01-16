import React from 'react'
import YYReferlist from '../YYReferlist'
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
            case 'wyy':
                this.setState({
                    openw:false
                });
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
            case 'wyy':
                this.setState({
                    openw:false
                })
                break;
        }
    }


    render(){
        return(
            <div>
                <Button onClick={this.openRefer.bind(this,'1')}>点击选择参照1</Button>
                <Button onClick={this.openRefer.bind(this,'2')}>点击选择参照2</Button>
                <Button onClick={this.openRefer.bind(this,'3')}>点击选择参照3</Button>

                <YYReferlist
                    referName='zyl'
                    onOk={this.onOk}
                    onClose={this.onClose}
                    multiMode={true}
                    open={this.state.open}
                    referCode='bd-005'
                    referStyle='tree'
                />
                <YYReferlist
                    referName='lzf'
                    onOk={this.onOk}
                    onClose={this.onClose}
                    multiMode={true}
                    open={this.state.openz}
                    referStyle='list'
                    referCode='bd-009'
                    modalHeight='part'
                />
                <YYReferlist
                    referName='wyy'
                    onOk={this.onOk}
                    onClose={this.onClose}
                    multiMode={true}
                    open={this.state.openw}
                    referCode='bd-006_test'
                    referStyle='tree-list'
                />
            </div>

        )
    }
}

export default YYreferDemo;