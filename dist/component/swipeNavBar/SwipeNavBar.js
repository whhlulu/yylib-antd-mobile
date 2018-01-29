import React from 'react';
import './swipeNavBar.less'
class SwipeNavBar extends React.Component {
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
        const rows = this.props.rows;
        return (
            <div style={{padding:'0px 10px',backgroundColor:'white',textAlign:'left'}}>
                <div id="mySwipeNavBar" style={this.props.style}  ref={ node => this.refSwipe =node }>
                    {rows&&rows.length>0?
                        rows.map((item) => {
                            return <div key={item.id} onClick={()=>this.props.handleClick(item)}><a>{item.name}</a></div>
                        })
                        :<div>首页</div>}
                </div>
            </div>
        )
    }
}
export default SwipeNavBar;