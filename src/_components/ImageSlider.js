import React, { Component } from 'react';
import Slider from 'react-slick';


import '../css/mylists.css';


class ImageSlider extends Component {
    render() {
        const { images } = this.props;

        const settings = {
            arrows: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };

        return (
            <div>
                <Slider {...settings}>
                    {images.map( image=>(
                        <div>
                            <img className={"image-prps"} src={"https://image.tmdb.org/t/p/w500/"+image.file_path}
                            />
                        </div>

                    ))}

                </Slider>
                {console.log(images)}
            </div>
        );
    }
}

export default ImageSlider;