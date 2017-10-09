import React, {Component} from 'react';
import {createForm} from 'rc-form';

class SSForm extends Component {
    render() {
        return (
            <div className="animated fadeInRight">
                <form>
                    {this.props.children}
                </form>
            </div>);

    }
}

SSForm.create = createForm;
export default SSForm;