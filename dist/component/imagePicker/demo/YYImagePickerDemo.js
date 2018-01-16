import React from 'react'
import {YYImagePicker} from '../../../index'

class YYImagePickerDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    componentDidMount() {
    }

    onChange = (files) => {
        this.setState({files})
    }
    onClick=()=>{
        console.log(this.state.files)
    }
    render() {
        let source = {
            sourceId: '22222222222',
            sourceType: '102345678',  //业务类型（可自定义），与PC端保持一致，子表的sourceType: 子表id+ '_' +业务类型
            billType: 'M-01'  //单据类型
        }
        return (
            <div>
                <YYImagePicker label="图片上传"
                               source={source}
                               maxSize={6}
                               files={this.state.files}
                               multiple={true}
                               disabled={false}
                               onChange={this.onChange}/>

                <div onClick={this.onClick}>点击查看上传图片列表console</div>
            </div>
        )
    }
}

export default YYImagePickerDemo;