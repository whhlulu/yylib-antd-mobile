import React from 'react';
import './deleteTap.less'
import {Icon} from 'antd-mobile'
class deleteTap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount(){
        var xScrollWidth = this.refSwipe.scrollWidth;//获取元素滚动宽度，最小为屏幕宽
        var docWidth = document.documentElement.clientWidth;//获取屏幕宽度
        this.refSwipe.scrollLeft = xScrollWidth - docWidth;
    }
    componentDidUpdate(){
        var xScrollWidth = this.refSwipe.scrollWidth;//获取元素滚动宽度，最小为屏幕宽
        var docWidth = document.documentElement.clientWidth;//获取屏幕宽度
        this.refSwipe.scrollLeft = xScrollWidth - docWidth;
    }

    render() {
        const {rows,displayField} = this.props;
        return (
            <div style={{padding:'0px 10px',backgroundColor:'white',textAlign:'left'}}>
                <div id="deleteTap" style={this.props.style}  ref={ node => this.refSwipe =node }>
                    {rows&&rows.length>0?
                        rows.map((item,index) => {
                            return <div className='tap-tag' key={index} ><a>{item[displayField]}</a><div className='tap-icon'><Icon  type='cross' size='md' onClick={()=>this.props.handleClick(item)}/></div></div>
                        })
                        :<div>首页</div>}
                </div>
            </div>
        )
    }
}
export default deleteTap;