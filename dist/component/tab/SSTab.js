/**
 * Created By Tangjingqi 2017/8/30
 * */
import React, {Component} from 'react';
import {Tabs, WhiteSpace, Badge} from 'antd-mobile/lib/index';
import PropTypes from 'prop-types';
// import {createForm} from 'rc-form';
import _ from 'lodash';
import SSPosition from '../position/SSPosition';
import '../../../css/SSTab.css';

/*
|||||||||||||||||||||关于定位的修改///////////////////////////
* 1、display 设置tab上方定位图层的显示(block)或隐藏 （none）  默认是block
* 2、iconColor  设置定位坐标图标左边图标 eg: icon='xingzhuang1'
* 3、color 设置定位坐标文字的颜色
* 4、title 设置地位的坐标值
*5、
* |||||||||||||||||||||关于tab的修改///////////////////////////
* 1、defaultActiveKey  默认选中项  第一项"0"   第二项"1" 一次类推
 * 2、name  类型 Array   设置tab项数    eg : name=['1','2','3'] 3项
 *
* */


class SSTab extends React.Component {
    callBack = (key) => {
        // console.log('onChange', key);
        if (_.isFunction(this.proprs.callBack)) this.props.callBack(key)
    }
    handleTabClick = (key) => {
        //console.log('onTabClick', key);
        if (_.isFunction(this.props.handleTabClick)) this.props.handleTabClick(key)
    }

    render() {
        let {callBack, handleTabClick, defaultActiveKey, names, position, icon, iconColor, color, titlevalue, display,displaytab} = this.props;
        const TabPane = Tabs.TabPane;

        let postyle = {
            display: 'inline-block',
            height: '30px',
            textAlign: 'center',
            width: '80%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            lineHeight: '30px',
            color: '#128aff',
            marginLeft: '10px'
        }

        let style2={
            display:displaytab
        }
        return (
            <div>
                <SSPosition display={display} title={titlevalue} icon={icon} color={iconColor}/>
                <Tabs activeTextColor="#fff" barStyle='' style={style2} defaultActiveKey={defaultActiveKey} animated={false}
                      onChange={callBack}
                      onTabClick={this.handleTabClick}>
                    {
                        names.map((v, index) => <TabPane tab={<span>{v}</span>} key={index}></TabPane>)
                    }
                </Tabs>
            </div>
        )
    };
};

SSTab.defaultProps = {
    defaultActiveKey: "0", //默认的选中
    names: ['One Tab', 'Two Tab', 'Threes Tab'],//设置tab项数量
    titlevalue: '用友乐道11',
    icon: 'icon-dingwei',
    iconColor: '',
    color: '',
    display: 'block',
    displaytab:'block',
}
SSTab.PropTypes = {
    defaultActiveKey: PropTypes.string,
    names: PropTypes.arr,
    position: PropTypes.string,
    icon: PropTypes.string,
    display: PropTypes.string,

}

export default SSTab;