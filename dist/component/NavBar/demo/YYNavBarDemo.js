/**
 * Created by whh on 2017/12/26.
 */
import React, {Component} from 'react';
import {List, WhiteSpace, Modal, ImagePicker} from 'antd-mobile';
import '../../../css/YYNavBar.css';
import _ from 'lodash';

class YYNavBar extends Component {
    state = {
    };

    componentDidMount() {
    }
    onLeftClick = () =>{
        if(_.isFunction(this.props.onLeftClick)){
            this.props.onLeftClick();
        }else{
            hashHistory.goBack();
        }
    }
    render() {
        const { title, leftContent, rightContent } = this.props;
        return (
            <NavBar style={{position: 'fixed', top: 0, width: '100%', zIndex: 888}} {...this.props}
                    leftContent={leftContent}
                    onLeftClick={this.onLeftClick}
                    rightContent={rightContent}>
                {title}
            </NavBar>
        );
    }
}
YYNavBar.defaultProps = {
    title: '',
    leftContent: '返回',
    rightContent: []
};

export default YYNavBar;