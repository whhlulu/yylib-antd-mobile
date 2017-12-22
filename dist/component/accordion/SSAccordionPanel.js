import React, {Component} from 'react';
import { Accordion } from '../../common/antd-m/index';

class SSAccordionPanel extends Component{
    render() {
        return (<Accordion.Panel {...this.props}>
            {this.props.children}
        </Accordion.Panel>);
    }
}

SSAccordionPanel.defaultProps = {
}

export default SSAccordionPanel;