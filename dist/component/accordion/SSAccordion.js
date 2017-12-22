import React, {Component} from 'react';
import { Accordion } from '../../common/antd-m/index';
import '../../../css/SSAccordion.css'

class SSAccordion extends Component{
    render() {
        return (<Accordion className="ss-accordion" {...this.props}>
            {this.props.children}
        </Accordion>);
    }
}
SSAccordion.defaultProps = {

}
export default SSAccordion;