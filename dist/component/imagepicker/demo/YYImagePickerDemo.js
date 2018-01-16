import React from 'react'
import {List, ImagePicker} from 'antd-mobile'
import YYImagepicker from '../YYImagePicker'
const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];
class YYImagepickerDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: data,
        }
    }

    componentDidMount() {
    }

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    };
    onAddImageClick = (e) => {
        console.log(e)
        e.preventDefault();
        this.setState({
            files: this.state.files.concat({
                url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
                id: '3',
            }),
        });
    };

    render() {
        const {form} = this.props;
        let source = {
            sourceId: '22222222222',
            sourceType: '102345678',  //业务类型（可自定义），与PC端保持一致，子表的sourceType: 子表id+ '_' +业务类型
            billType: 'M-01'  //单据类型
        }
        return (
            <div>
                <List.Item extra={'extra content'}>Title</List.Item>
                <YYImagepicker label="图片上传" source={source}
                               files={[{id: '1', url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg'}]}
                               from={form} multiple={true} disabled={false}/>
                <List.Item extra={'extra content'}>Title</List.Item>
            </div>
        )
    }
}

export default YYImagepickerDemo;