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
		scrollId: PropTypes.string
	};
	static defaultProps = {
		data: [],
		defaultHeight: 0,
		scrollId: document.documentElement
	};
	
	componentDidMount() {
		let scrollDom = document.getElementById(this.props.scrollId);
		let eleTop = [],
			plpData = this.props.data;
		plpData.map((item, index) => {
			let iHeight = document.getElementById(item["id"]).offsetTop;
			eleTop.push(iHeight);
		});
		let scrollDomHeight = scrollDom.offsetHeight;
		let scrollTimer;
		let scrollTop;
		const timeout = 400;
		/*滚动触发相应的楼梯颜色变化*/
		scrollDom.addEventListener("scroll", (e) => {
			scrollTop = e.srcElement.scrollTop;
			clearTimeout(scrollTimer);
			scrollTimer = setTimeout(this.handler, timeout)
		});
		this.handler = () => {
			let length = eleTop.length;
			for (let i = 0; i < length; i++) {
				let leHeight = eleTop[i] - scrollTop;
				if (0 <= leHeight && leHeight <= scrollDomHeight) {
					this.setState({
						activeIndex: i
					});
					return;
				}
			}
		};
		
	}
	
	componentWillUnmount() {
		window.clearInterval(this.timer);
		this.timer = null;
	}
	
	onChange = (index, item, e) => {
		e.preventDefault();
		e.stopPropagation();
		let curDom = document.getElementById(item["id"]);//获取点击代表元素
		let scrollDom = document.getElementById(this.props.scrollId);//获取点击代表元素
		//let sbody = document.getElementsByTagName("body")[0];
		//scrollDom.scrollTop = curDom.offsetTop - curDom.parentNode.parentNode.offsetTop;
		//TODO 添加滚动效果
		window.clearInterval(this.timer);
		this.timer = null;
		let target = curDom.offsetTop - this.props.defaultHeight,
			currentScroll = scrollDom.scrollTop;
		let differScroll = target - currentScroll;
		//let duration = 500, interval = 10;
		let step = differScroll / Math.abs(differScroll) * 10;
		this.timer = window.setInterval(() => {
			currentScroll = scrollDom.scrollTop;
			if (currentScroll >= target - 10 && currentScroll <= target + 10) {
				window.clearInterval(this.timer);
				this.timer = null;
				scrollDom.scrollTop = curDom.offsetTop - curDom.parentNode.parentNode.offsetTop;
				return;
			}
			scrollDom.scrollTop += step;
		}, 1);
		
		this.setState({
			activeIndex: index
		});
		if (_.isFunction(this.props.onChange)) this.props.onChange(index, item)
	};
	showSteps = () => {
		this.setState({
			right: 0
		})
	};
	hideSteps = () => {
		window.clearInterval(this.timer);
		this.timer = null;
		this.setState({
			right: -62
		})
	};
	
	render() {
		let {data, defaultHeight, scrollId, onChange, children, className, ...restProps} = this.props;
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
				{this.state.right === 0 ?
					<div className="yy-locate-steps-mask" onTouchStart={this.hideSteps}></div> : null}
			</div>
		)
	};
}

export default YYLocateSteps;