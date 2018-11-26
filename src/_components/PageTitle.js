import React, { Component } from 'react';

class PageTitle extends Component {
    render() {
        return (

            <div className="page-title">
                {this.props.title}
            </div>

        );
    }
}

export default PageTitle;