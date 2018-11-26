import React, {Component} from 'react';
import axios from "axios"
import FilmModal from "../_components/FilmModal";
import LoaderExampleInlineCentered from "../_components/LoadingIndicator";
import {ourApiUrl} from "../_helpers/variable";

let apikey = "e0338266d7945597731b014d7e806075";
let apiurlparams = "&language=en-US&sort_by=popularity.desc";
let apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + apikey + apiurlparams;

class NewFilms extends Component {

	constructor(props) {

		super(props);

		let userId = atob(JSON.parse(localStorage.getItem('user')).id);

		this.state = {
			films: [],
			seenList: [],
			watchList: [],
			userId: userId,
			isLoading: true
		};
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {

		let that = this;
		let seenList,watchList;
		let {userId} = this.state;

		axios.all([

			axios.get(apiUrl).then(res => {
				const films = res.data.results;
				that.setState({films});
			}),

			axios.get(ourApiUrl+'seenlist/user/'+userId).then(res => {

				let arraySeenList = new Array();
				seenList = res.data;

				seenList.forEach((item) => {
					arraySeenList.push(item.film_id);
				});
				that.setState({seenList: arraySeenList});
			}),

			axios.get(ourApiUrl+'watchlist/user/'+userId).then(res => {

				let arrayWatchList = new Array();
				watchList = res.data;

				watchList.forEach((item) => {
					arrayWatchList.push(item.film_id);
				});
				that.setState({watchList:arrayWatchList});
			})
		]).then(() => {

			this.setState({isLoading: false});
		});
	}

	render() {

		if( this.state.films.length == 0 || this.state.isLoading ){

			return <LoaderExampleInlineCentered />;
		} else{

			return (
				<div>
					<h1>New Films</h1>
					{ this.state.films.map((film) => (
						<FilmModal
							id={film.id}
							poster_path={film.poster_path}
							rating={film.vote_average * 10}
							title={film.title}
							overview={film.overview}
							original_language={film.original_language}
							key={film.id}
							inSeenList={this.state.seenList.includes(film.id) ? 1 : 0}
							inWatchList={this.state.watchList.includes(film.id) ? 1 : 0}
						/>
					)) }
				</div>
			);
		}
	}
}

export default NewFilms;