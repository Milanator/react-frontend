import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app



export default class ImageLightbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
    }

    render() {
        const { isOpen, photoIndex } = this.state;
        const { image } = this.props;
        return (
            <div>
                {isOpen && (
                    <Lightbox
                        mainSrc={image}
                        nextSrc={image[(photoIndex + 1) % image.length]}
                        prevSrc={image[(photoIndex + image.length - 1) % image.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + image.length - 1) % image.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % image.length,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}