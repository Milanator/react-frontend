import React, { Component } from 'react';

class FlashMessage extends Component {

    constructor(props){
        
        super(props)
    }

    render() {

        const {message,type,...rest} = this.props

        return (

            <div className={'alert alert-'+type} {...rest}>
                {message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

        );
    }
}

export default FlashMessage;