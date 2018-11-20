import React, { Component } from 'react';
import MaterialIcon from 'react-google-material-icons';
import '../css/filmcard.css';

class FilmCard extends Component {

    render() {

        const {id, poster_path, rating, title, overview, original_language, ...rest} = this.props;

        return (
            <div className="card" {...rest}>
                <img src={"https://image.tmdb.org/t/p/w500" + poster_path} alt="movie poster" />

                <div className="marks">

                    <MaterialIcon icon="star_half" size={25} />
                    <p id="rating">{rating} %</p>
                    <a className="filmcard-image"> <MaterialIcon icon="check_box" size={25} /></a>
                    <a className="filmcard-image"><MaterialIcon icon="bookmark_border" size={25} /></a>

                </div>
                <h3>
                    {title}
                </h3>
                <p>
                    {overview < 230 ? overview : overview.substring(0, 240) + "..."}
                </p>
                <p>
                    language: {original_language}
                </p>
            </div>
        );
    }
}

export default FilmCard;