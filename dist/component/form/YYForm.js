import React, {Component} from 'react';
import {createForm} from 'rc-form';

class YYForm extends Component {
    render() {
        return (
            <div>
                <form>
                    {this.props.children}
                </form>
            </div>);

    }
}

YYForm.create = createForm;
export default YYForm;