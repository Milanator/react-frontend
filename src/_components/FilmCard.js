import React, { Component } from 'react';
import MaterialIcon from 'react-google-material-icons'
import {textLimit} from './../_helpers/helper'
import './../css/FilmCard.css';

class FilmCard extends Component {

	constructor(props){

		super(props);
		this.state = {
			films: this.props.films
		};
	}

    render() {
		if( this.state.films.length == 0 ){

			return <div>Loading</div>
		} else{
			return (
				<div>
					{ this.state.films.map(film => (
						<div className="card" key={film.id}>
							<img src={"https://image.tmdb.org/t/p/w500/" + film.poster_path} alt={film.title}/>

							<div className="marks">
								<MaterialIcon icon="star_half" size={25}/>
								<p id="rating">
									{(film.vote_average * 10)}%
								</p>
								<a className="image"> <MaterialIcon icon="check_box" size={25}/></a>
								<a className="image"><MaterialIcon icon="bookmark_border" size={25}/></a>
							</div>
							<h3><a href="#">{ film.title }</a></h3>
							<p>
								{ textLimit(film.overview,150) }
							</p>
							<a href="#">read more</a>
							<p>language: { film.original_language }</p>
						</div>
					))}
				</div>
			);
		}
    }
}

export default FilmCard;