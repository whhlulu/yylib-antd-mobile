/**
 * Created by whh on 2017/12/26.
 */
import React, {Component} from 'react';
import {NavBar} from 'antd-mobile';
import '../../../css/YYNavBar.css';
import _ from 'lodash';
import classnames from 'classnames';
import {backOrClose} from '../../utils/lfwUtil'

class YYNavBar extends Component {
    state = {
    };

    componentDidMount() {
    }
    onLeftClick = () =>{
        if(_.isFunction(this.props.onLeftClick)){
            this.props.onLeftClick();
        }else{
            backOrClose();
        }
    }
    render() {

        let { mode, leftContent, rightContent, children,className, ...restProps} = this.props;
        let wrapClz = classnames('yy-navBar', className);
        return (
            <NavBar {...restProps}
                className={wrapClz}
                    mode={mode}
                    leftContent={leftContent}
                    onLeftClick={this.onLeftClick}
                    rightContent={rightContent}>
                {children}
            </NavBar>
        );
    }
}
YYNavBar.defaultProps = {
    mode:'light',
    leftContent: null,
    rightContent: null,
    onLeftClick:null
};

export default YYNavBar;