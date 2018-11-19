import React, { Component } from 'react';
import MaterialIcon from 'react-google-material-icons';
import { baseUrl } from "../_helpers/variable";

let detailsUrl = baseUrl + "details/";
let width;

class FilmCard extends Component {

    render() {

        return (
            <div className="card" key={this.props.id} style={{width: width}}>
                <img src={"https://image.tmdb.org/t/p/w500" + this.props.image} />

                <div className="marks">

                    <MaterialIcon icon="star_half" size={25} />
                    <p id="rating">{this.props.rating} %</p>
                    <a className="filmcard-image"> <MaterialIcon icon="check_box" size={25} /></a>
                    <a className="filmcard-image"><MaterialIcon icon="bookmark_border" size={25} /></a>

                </div>
                <h3>
                    <a href={detailsUrl + this.props.id}>{this.props.filmName}</a>
                </h3>
                <p>
                    {this.props.overview < 230 ? this.props.overview : this.props.overview.substring(0, 240)}
                    <a href={detailsUrl + this.props.id}>...</a>
                </p>
                <p>
                    language: {this.props.language}
                </p>
            </div>
        );
    }
}

export default FilmCard;