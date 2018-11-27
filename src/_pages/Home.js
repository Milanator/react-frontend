import React, {Component} from 'react';
import axios from 'axios';

import {movieDbDomain, movieApiKeyPart, ourApiUrl} from '../_helpers/variable';

import FilmModal from "../_components/FilmModal";
import TopNavigation from './../_components/TopNavigation';
import PageTitle from '../_components/PageTitle';
import {Pagination} from 'semantic-ui-react';
import LoadingIndicator from './../_components/LoadingIndicator';
import FilterSidebar from "../_components/FilterSidebar";

let apiurlparams = "&language=en-US&sort_by=popularity.desc&primary_release_year=2018&page=";
let apiUrl = movieDbDomain + "discover/movie" + movieApiKeyPart + apiurlparams;
let genreApiUrl = movieDbDomain + "genre/movie/list" + movieApiKeyPart;

class Home extends Component {

	constructor(props) {

		super(props);

		let user = JSON.parse(localStorage.getItem('user'));
		let userId = atob(user.id);
		let userName = atob(user.name);

		this.state = {
			name: userName,
			films: [],
			activePage: 1,
			totalPages: null,
			userId: userId,
			seenList: [],
			watchList: [],
			isLoading: true,
			genres: []
		};

		this.handlePaginationChange = this.handlePaginationChange.bind(this);
		this.setFilmGenre = this.setFilmGenre.bind(this);
	}

	// THIS IS FIRST ACTION ON PAGE
	componentDidMount() {

		let that = this;
		let seenList, watchList;
		let {userId} = this.state;

		axios.all([

			// genres
			axios.get(genreApiUrl).then(res => {
				this.setState({ genres: res.data.genres });
			}),

			// films
			axios.get(apiUrl + this.state.activePage).then(res => {

				let films = res.data.results;
				const totalPages = res.data.total_pages;

				that.setState({films, totalPages});
			}),

			// seenlist
			axios.get(ourApiUrl + 'seenlist/user/' + userId).then(res => {

				let arraySeenList = [];
				seenList = res.data;

				seenList.forEach((item,key) => {

					arraySeenList.push(item.film_id);
				});
				that.setState({seenList: arraySeenList});
			}),

			// watchlist
			axios.get(ourApiUrl + 'watchlist/user/' + userId).then(res => {

				let arrayWatchList = [];
				watchList = res.data;

				watchList.forEach((item,key) => {

					arrayWatchList.push(item.film_id);
				});
				that.setState({watchList: arrayWatchList});
			})
		]).then(() => {

			let films = this.setFilmGenre(this.state.genres);
			this.setState({films});
		}).then(() => {

			this.setState({isLoading: false});
		}).catch((err) => {

			console.log( err );
		});
	}

	handlePaginationChange = (e, {activePage}) => {

		this.setState({isLoading: true});

		this.setState({activePage}, () => {

			axios.get(apiUrl + this.state.activePage).then(res => {

				const films = res.data.results;
				this.setState({films});
			}).then(() => {

				this.setState({isLoading: false});
			});
		});
	}

	// set genres to film
	setFilmGenre = (genres) => {

		let genreArray = [];
		let films = this.state.films;

		// set genre array, where ID is key and value is name
		genres.forEach((genre,key) => {

			genreArray[genre.id] = genre.name;
		});

		// create and set parameter genre to this.state.films
		films.forEach((film,key) => {

			film.genre = [];

			film.genre_ids.forEach((id,key) => {

				film.genre.push(genreArray[id]);
			});
		});

		return films;
	}

	render() {

		if (this.state.films.length == 0 || this.state.isLoading) {
			return <LoadingIndicator/>;
		} else {

			return (

				<div>
					<TopNavigation/>
					<div className="container">
						<FilterSidebar
							genres={this.state.genres}
						/>
						<PageTitle title="Find the Latest Movies on Movie Bot"/>
						{this.state.films.map((film) => (
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
								genres={film.genre}
							/>
						))}
						<div className="pagination-component">
							<Pagination activePage={this.state.activePage} totalPages={this.state.totalPages} onPageChange={this.handlePaginationChange}/>
						</div>
					</div>
				</div>
			);
		}

	}
}

export default Home;