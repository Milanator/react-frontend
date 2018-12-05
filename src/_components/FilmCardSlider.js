import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import FilmModal from '../_components/FilmModal';

import '../css/mylists.css';
import { Button } from 'semantic-ui-react';


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

        if (films.length != 0) {
            return (
                <div>
                    <Slider {...settings}>
                        {films.map(film => (
                            <div>
                                <FilmModal
                                    movieId={film.movie_id}
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
        } else {
            return (
                <div className="empty-list">
                    <p>
                    You Haven't Added Any Movies to This List
                    </p>
                    <p>
                    <Button 
                        as={ Link } 
                        to={'/home'}
                        color="blue"
                        content="Find Movies"
                        />
                        <Button 
                        as={ Link } 
                        to={'/home'}
                        color="blue"
                        content="Find Movies"
                        />
                    </p>
                </div>
            )
        }

    }
}

export default FilmCardSlider;