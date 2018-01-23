/**
 * Created By whh 2018/1/22
 * */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from '../../../css/YYResult.css'

class YYResult extends React.Component {
    state = {};
    static propTypes = {
        type: PropTypes.string,
    };
    static defaultProps = {
        type: 'no',
        message: null,
    };

    render() {
        let {type, img, message, className, onClick, ...restProps} = this.props;
        let resultClz = classnames('yy-result', className);
        let imgSrc = require('../../common/img/no.png');
        let messageDefault = '当前页面无信息，请查看其他页面~';
        switch (type) {
            case '404':
                imgSrc = require('../../common/img/404.png');
                messageDefault = '暂无数据已去寻找，点击并刷新~';
                break;
            case '403':
                imgSrc = require('../../common/img/403.png');
                messageDefault = '暂无信号，请检查网络~';
                break;
            case 'dev':
                imgSrc = require('../../common/img/dev.png');
                messageDefault = '正在开发，中敬请期待~';
                break;
            default:
                break;
        }
        return (
            <div className={resultClz} {...restProps} onClick={onClick}>
                {img ? <div>
                    {typeof img === 'string' ? <img src={img}/> : img}
                </div> : <img src={imgSrc}/>}
                {message ? <div>
                    {typeof message === 'string' ? <p>{message}</p> : message}
                </div> : <p>{messageDefault}</p>}
            </div>
        )
    };
}

export default YYResult;