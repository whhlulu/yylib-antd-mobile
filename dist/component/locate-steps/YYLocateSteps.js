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
    };
    static propTypes = {
        data: PropTypes.array,//{id,title,icon}
        defaultHeight: PropTypes.number,
    };
    static defaultProps = {
        data: [],
        defaultHeight: 0,
    };
    onChange = (index, item) => {
        this.setState({
            activeIndex: index
        })
        if (_.isFunction(this.props.onChange)) this.props.onChange(index, item)
    }

    render() {
        let {data, defaultHeight, onChange,children, className, ...restProps} = this.props;
        const {activeIndex} = this.state;
        let wrapClz = classnames('yy-locate-steps', className);
        let wrapStepClz = (index) => classnames('yy-locate-step', activeIndex === index ? 'active' : null);
        return (
            <div className={wrapClz} {...restProps}>
                {children}
                <div className="yy-locate-steps-body">
                    {data && data.length > 0 ? data.map((item, index) => {
                        return <div className={wrapStepClz(index)} key={item.id}
                                    onClick={this.onChange.bind(this, index, item)}>
                            <div className="yy-locate-step-icon">{item.icon}</div>
                            <div className="yy-locate-step-title">{item.title}</div>
                            <div className="yy-locate-step-tail"></div>
                        </div>
                    }) : null}
                </div>
                <div className="yy-locate-steps-mask"></div>
            </div>
        )
    };
}

export default YYLocateSteps;