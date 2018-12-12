import React, { Component } from 'react';
import $ from 'jquery'

class FlashMessage extends Component {

    constructor(props){
        
        super(props)
    }

    toggleAlert = (event) => {

        let target = event.target;
        $(target).closest('.alert').hide();
    }

    render() {

        const {message,type,...rest} = this.props

        return (

            <div className={'flash-message alert alert-'+type} {...rest}>
                {message}
                <button type="button" className={"close"} aria-label="Close" onClick={this.toggleAlert}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

        );
    }
}

export default FlashMessage;