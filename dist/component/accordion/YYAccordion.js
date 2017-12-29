/**
 * Created By whh 2017/12/28
 * */
import React, {Component} from 'react';
import {Accordion} from 'antd-mobile';
import classnames from 'classnames';
import '../../../css/YYAccordion.css'

class YYAccordion extends Component {
    static Panel = Accordion.Panel;
    render() {
        const accordionCls = classnames('yy-accordion', this.props.className);
        return <Accordion {...this.props} className={accordionCls}>
            {this.props.children}
        </Accordion>
    }
}
YYAccordion.defaultProps = {}
export default YYAccordion;