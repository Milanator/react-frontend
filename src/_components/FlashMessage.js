import React, { Component } from 'react';

class FlashMessage extends Component {
    render() {
        return (

            <div className={'alert alert-'+this.props.type}>
                {this.props.message}
            </div>

        );
    }
}

export default FlashMessage;