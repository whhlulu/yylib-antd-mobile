import React from 'react'
import './url.css'


class Url extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url:'',
        }
    }
    componentDidMount(){
        this.setState({
            url:window.location.href,
        })
    }

    render(){
        return(
            <div>
                <div className='backgroud'>
                    <div className='innerUrl'>{this.state.url}</div>
                </div>
            </div>

        )
    }
}

export default Url;