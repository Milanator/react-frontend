import React, { Component } from 'react';
import TopNavigation from '../_components/TopNavigation';
import axios from 'axios';
import FilmModal from '../_components/FilmModal';
import FilterSidebar from '../_components/FilterSidebar';
import '../css/main.css';

var apikey = "e0338266d7945597731b014d7e806075";
var apiurlparams = "&language=en-US&sort_by=popularity.desc";
var apiurl = "https://api.themoviedb.org/3/discover/movie?api_key=" + apikey + apiurlparams;

class BrowseAllFilms extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: []
		};
	}

	componentDidMount() {

		axios.get(apiurl).then(res => {
			const data = res.data.results;
			this.setState({ data });
		});
	}

	render() {

		if( this.state.data.lenght == 0 ){

			return <div>Loading</div>
		} else{

			return (
				<div>
					<TopNavigation />
					<FilterSidebar />
					{this.state.data.map(film => (
						<FilmModal
							id={film.id}
							poster_path={film.poster_path}
							rating={film.vote_average * 10}
							title={film.title}
							overview={film.overview}
							original_language={film.original_language}
						/>
					))}
				</div>
			);
		}
	}
}

export default BrowseAllFilms;