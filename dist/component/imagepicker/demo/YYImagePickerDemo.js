import React from 'react'
import {List,ImagePicker} from 'antd-mobile'
import YYImagepicker from '../YYImagePicker'
const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];
class YYImagepickerDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            files: data,
        }
    }
    componentDidMount () {
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
    render(){
        const {form} = this.props;
        let source = {
            sourceId:'aaa',
            sourceType: 'aerialDrawing',  //业务类型（可自定义），与PC端保持一致，子表的sourceType: 子表id+ '_' +业务类型
            billType: 'POV01'  //单据类型
        }
        return(
            <div>
                <ImagePicker
                    files={this.state.files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={this.state.files.length < 5}
                    onAddImageClick={this.onAddImageClick}
                />
                <List>
                    <List.Item>Title</List.Item>
                </List>
                <YYImagepicker label="添加附件" source={source} files={[{id:'1',url:'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg'}]} from={form} multiple={true} disabled={false}/>
            </div>
        )
    }
}

export default YYImagepickerDemo;