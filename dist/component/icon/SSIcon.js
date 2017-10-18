/**
 * Created by TJQ on 2017/8/24.
 */
import React, {Component} from 'react';
import {Icon} from 'antd-mobile/lib/index';
import PropTypes from 'prop-types';

class SSIcon extends Component {
    render() {
        const {icon} = this.props;
        let svg = void 0;
        if(icon){
            try {
                svg = require('../../../svg/' + icon + '.svg');
            } catch (e) {
                console.error(e);
            } finally {
            }
        }
        return (
            <Icon {...this.props} type={svg}/>
        );
    }
}

SSIcon.defaultProps = {
    icon: '',
    color: '#868686', //图标的颜色
    size: 'xxs',
}

SSIcon.propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
}

export default SSIcon;
