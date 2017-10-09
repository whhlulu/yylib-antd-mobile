import React, {Component} from 'react';
import {Popup} from 'react-weui';
import '../../css/SSNavBar.css'
import _ from 'lodash';

class SSPopup extends Component {

    onRequestClose = () => {
        if (_.isFunction(this.props.onRequestClose)) this.props.onRequestClose();
    }

    componentWillMount() {
        let that = this;
        document.addEventListener("backbutton", () => {
            if (_.isFunction(that.props.backClick)) {
                that.props.backClick();
            }
        }, false);
    }

    render() {
        const {enableMask, show, fullScreen} = this.props;
        let style = {
            height: fullScreen ? '100vh' : 'auto',
            overflow: 'scroll',
            zIndex: 5000,
            display: show ? '' : 'none',
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            backgroundColor: '#EFEFF4',
        }
        return (
            <div className="animated fadeInRight" style={style}>
                {this.props.children}
            </div>
        );
    }

    /*<Popup
                    enableMask={enableMask}
                    show={show}
                    onRequestClose={this.onRequestClose}>
                    <div className="animated fadeInRight" style={{height: fullScreen ? '100vh' : 'auto', overflow: 'scroll'}}>
                        {this.props.children}
                    </div>
                </Popup>*/
}

SSPopup.defaultProps = {
    enableMask: false,
    show: false,
    fullScreen: true,
}
export default SSPopup;