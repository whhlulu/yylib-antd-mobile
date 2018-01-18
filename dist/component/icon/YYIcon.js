/**
 * Created by TJQ on 2017/8/24.
 * Edited by whh on 2017/12/28.
 */
import React, {Component} from 'react';
import {Icon} from 'antd-mobile';
import PropTypes from 'prop-types';
import iconfont from '../../../svg/iconfont'
class YYIcon extends Component {
    render() {
        const {type, size, color} = this.props;
        //单个svg引入方式
        /*let svg = void 0;
        if (type) {
            try {
                svg = require('../../../svg/' + type + '.svg');
            } catch (e) {
                console.error(e);
            } finally {
            }
        }*/
        const CustomIcon = ({type, className = '', size = 'md', ...restProps}) => (
            <svg className={`am-icon am-icon-${type} am-icon-${size} ${className}`}{...restProps}>
                <use xlinkHref={'#icon-'+type}/>
                {/* svg-sprite-loader@0.3.x */}{/* <use xlinkHref={#${type.default.id}} /> */} {/* svg-sprite-loader@latest */}
            </svg>
        );
        return (
            <CustomIcon {...this.props} type={type} size={size} color={color}/>
        );
    }
}

YYIcon.defaultProps = {
    type: '',
    color: '', //图标的颜色
    size: 'md',
}

YYIcon.propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
}

export default YYIcon;
