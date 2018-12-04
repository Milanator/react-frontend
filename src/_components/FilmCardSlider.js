import React, { Component } from 'react';
import Slider from 'react-slick';

import FilmModal from '../_components/FilmModal';

import '../css/mylists.css';


class FilmCardSlider extends Component {
    render() {
        const { films, userLists } = this.props;

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
                    {films.map(film => (
                        <div>
                            <FilmModal
                                id={film.id}
                                poster_path={film.poster_path}
                                rating={film.vote_average}
                                title={film.title}
                                overview={film.overview}
                                original_language={film.original_language}
                                key={film.id}
                                inSeenList={film.inSeenList}
                                inWatchList={film.inWatchList}
                                movieInMyLists={film.inMyLists}
                                userLists={userLists}
                                genres={film.genre}
                            />
                        </div>
                    ))}

                </Slider>

            </div>
        );
    }
}

export default FilmCardSlider;