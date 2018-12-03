import React, { Component } from 'react';
import Slider from 'react-slick';

import FilmModal from '../_components/FilmModal';
import { Icon } from 'semantic-ui-react';


class FilmCardSlider extends Component {
    render() {
        const { films, watchListIndices, seenListIndices, title, genres } = this.props;

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
                                rating={film.vote_average * 10}
                                title={film.title}
                                overview={film.overview}
                                original_language={film.original_language}
                                key={film.id}
                                inSeenList={seenListIndices.includes(film.id) ? 1 : 0}
                                inWatchList={watchListIndices.includes(film.id) ? 1 : 0}
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