/**
 * Created By whh 2018/1/29
 * */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from '../../../css/YYLocateSteps.css'

class YYLocateSteps extends React.Component {
    state = {
        activeIndex: 0,
        right: -62
    };
    static propTypes = {
        data: PropTypes.array,//{id,title,icon}
        defaultHeight: PropTypes.number,
    };
    static defaultProps = {
        data: [],
        defaultHeight: 0,
    };
    onChange = (index, item, e) => {
        e.preventDefault();
        e.stopPropagation();
        let curDom = document.getElementById(item["id"]);//获取点击代表元素
        let parentDom = curDom.parentNode;//获取点击代表元素
        parentDom.scrollTop = 200;
        //document.documentElement.scrollTop = curDom.offsetTop - this.props.defaultHeight;
        //document.body.scrollTop = curDom.offsetTop - this.props.defaultHeight;
        /*let duration = 500, interval = 10, target = curDom.offsetTop;
         let step = (target / duration) * interval;
         let timer = window.setInterval(function () {
         let curTop = document.documentElement.scrollTop || document.body.scrollTop;
         if (curTop === target) {
         window.clearInterval(timer);
         return;
         }
         curTop -= step
         document.documentElement.scrollTop = curTop;
         document.body.scrollTop = curTop;
         }, interval)*/

        this.setState({
            activeIndex: index
        })
        if (_.isFunction(this.props.onChange)) this.props.onChange(index, item)
    }
    showSteps = () => {
        console.log(1)
        this.setState({
            right: 0
        })
    }
    hideSteps = () => {
        this.setState({
            right: -62
        })
    }

    render() {
        let {data, defaultHeight, onChange, children, className, ...restProps} = this.props;
        const {activeIndex} = this.state;
        let wrapClz = classnames('yy-locate-steps', className);
        let wrapStepClz = (index) => classnames('yy-locate-step', activeIndex === index ? 'active' : null);
        return (
            <div className={wrapClz} {...restProps}>
                <div onClick={this.showSteps}>{children}</div>
                    <div className="yy-locate-steps-body" style={{right: this.state.right + 'px'}}>
                        {data && data.length > 0 ? data.map((item, index) => {
                            return <div className={wrapStepClz(index)} key={item.id}
                                        onClick={this.onChange.bind(this, index, item)}>
                                <div className="yy-locate-step-icon">{item.icon}</div>
                                <div className="yy-locate-step-title">{item.title}</div>
                                <div className="yy-locate-step-tail"></div>
                            </div>
                        }) : null}
                    </div>
                {this.state.right===0?<div className="yy-locate-steps-mask" onClick={this.hideSteps}></div>:null}
            </div>
        )
    };
}

export default YYLocateSteps;