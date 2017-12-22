import React from 'react'
import YYImagepicker from '../YYImagePicker'
import { Modal, Button} from 'antd-mobile'
const alert = Modal.alert;


class YYImagepickerDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            init:'',
            open:false,
        }
    }
    componentWillMount () {

    }

    componentDidMount () {


    }
    openRefer = ()=>{
        this.setState({
            open:true,
        })
    }
    onOk = (value)=>{
        console.log(value);
        this.setState({
            open:false,
        })
    }


    render(){
        let source = {
            sourceId: '980474b965bfa7df43fff4208fa7e30',  //主表单据id，子表附件也取主表id
            sourceType: 'aerialDrawing',  //业务类型（可自定义），与PC端保持一致，子表的sourceType: 子表id+ '_' +业务类型
            billType: 'POV01'  //单据类型
        }
        return(
            <div>
                {/*<Button onClick={()=> alert('删除','确定删除么？',[*/}
                    {/*{text:'取消',onPress:()=>console.log('取消')},*/}
                    {/*{text:'确定',onPress:()=>console.log('确定')}*/}
                {/*])}>alert</Button>*/}
                <YYImagepicker label="添加附件" source={source}/>

            </div>
        )
    }
}

export default YYImagepickerDemo;