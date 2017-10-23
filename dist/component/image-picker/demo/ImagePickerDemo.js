import React, {Component} from 'react';
import SSForm from '../../form/SSForm';
import SSIcon from '../../icon/SSIcon';
import SSImagePicker from '../SSImagePicker';
import SSSwitch from '../../switch/SSSwitch';
import SSButton from '../../button/SSButton';
import SSPage from '../../page/SSPage';

class NativeDemo extends SSPage {

    render() {
        let source = {
            sourceId: '980474b965bfa7df43fff4208fa7e30',  //主表单据id，子表附件也取主表id
            sourceType: 'aerialDrawing',  //业务类型（可自定义），与PC端保持一致，子表的sourceType: 子表id+ '_' +业务类型
            billType: 'POV01'  //单据类型
        }
        const {form} = this.props;
        return (
            <div>
                <SSForm>
                    <SSButton>呵呵</SSButton>
                    <SSImagePicker label="附件3" source={source}/>
                    <SSIcon color="red" icon="icon-Add"/>
                    <SSSwitch field="switch" value={false} form={form} label="开关" unCheckedText="不通过" checkedText="通过"/>
                </SSForm>
            </div>
        );
    }
}

export default SSForm.create()(NativeDemo);