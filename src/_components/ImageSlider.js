import React, { Component } from 'react';
import Slider from 'react-slick';
import '../css/mylists.css';
import Lightbox from "lightbox-react";

class ImageSlider extends Component {

    constructor(props){

        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
            images: this.props.images
        }
        this.setLightbox = this.setLightbox.bind(this)
    }

    setLightbox = (event) => {

        let imageKey = event.target.getAttribute('data-key');
        this.setState({ isOpen: true,photoIndex:imageKey });
    }

    render() {
        const { photoIndex, isOpen, images } = this.state;
        const prefix = "https://image.tmdb.org/t/p/w780/";

        const settings = {
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,

        };

        return (
            <div className={ImageSlider}>
                <Slider {...settings}>
                    {images.map( (image,key) => (
                        <div>
                            <img src={"https://image.tmdb.org/t/p/w500/"+image.file_path}
                                 onClick={this.setLightbox} data-key={key}
                                 />

                        </div>
                    ))}
                </Slider>

                {isOpen && (
                    <Lightbox
                        mainSrc={prefix+images[photoIndex].file_path}
                        nextSrc={prefix+images[(photoIndex + 1) % images.length].file_path}
                        prevSrc={prefix+images[(photoIndex + images.length - 1) % images.length].file_path}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}

export default ImageSlider;