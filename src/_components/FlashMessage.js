import React, { Component } from 'react';

class FlashMessage extends Component {

    constructor(props){
        
        super(props)
    }

    render() {

        const {type,message,...rest} = this.props

        return (

            <div className={'alert alert-'+type} {...rest}>
                {message}
            </div>

        );
    }
}

export default FlashMessage;