import React, {Component} from 'react';
import SSForm from '../../form/SSForm';
import SSIcon from '../../icon/SSIcon';
import SSImagePicker from '../SSImagePicker';
import SSSwitch from '../../switch/SSSwitch';
import SSButton from '../../button/SSButton';
import SSPage from '../../page/SSPage';
import SSInput from '../../input/SSInput';
import SSRefer from '../../refer/SSRefer';
import SSTextarea from '../../textarea/SSTextarea';

class NativeDemo extends SSPage {

    change(flag) {
        debugger;
    }
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
                    <SSRefer
                        field="speakerUnitId"
                        icon="icon-xingzhuang1"
                        iconColor="#FFBF00"
                        label="主讲单位"
                        referName="主讲单位参照"
                        multiMode={false}
                        referCode="schedule_arrange"
                        form={form}
                        referStyle="list"
                    />
                    <SSInput showIcon={false} label="测试图标粉丝发生的放松放松防水" form={form}/>
                    <SSTextarea required field="area" value="haha" form={form} label="文本域"/>
                    <SSSwitch showIcon={false} field="switch" value={true} form={form} label="开关" unCheckedText="不通过" checkedText="通过" onChange={this.change}/>
                    <div><input type="number"/><input type="number"/><input type="number"/><input type="number"/><input type="number"/></div>
                </SSForm>
            </div>
        );
    }
}

export default SSForm.create()(NativeDemo);