import React, { Component } from 'react';
import axios from 'axios';
import { Pagination } from 'semantic-ui-react';

import { movieDbDomain, movieApiKeyPart, ourApiUrl } from '../_helpers/variable';
import { setFilmGenre } from '../_helpers/method';
import '../css/main.css';

import FilmModal from "../_components/FilmModal";
import TopNavigation from './../_components/TopNavigation';
import PageTitle from '../_components/PageTitle';
import FilterMenu from '../_components/FilterMenu';
import LoadingIndicator from './../_components/LoadingIndicator';

let apiUrlParams = "&language=en-US&sort_by=popularity.desc";
let apiUrl = movieDbDomain + "discover/movie" + movieApiKeyPart + apiUrlParams;
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
			chosenYear: '',
			chosenGenre: '',
			userId: userId,
			seenList: [],
			watchList: [],
			isLoading: true,
			genres: []
		};

		this.handlePaginationChange = this.handlePaginationChange.bind(this);
	}

	// THIS IS FIRST ACTION ON PAGE
	componentDidMount() {

		let that = this;
		let seenList, watchList;
		let { userId } = this.state;

		axios.all([

			axios.get(apiUrl + '&primary_release_year=2018&page=' + this.state.activePage).then(res => {
				const films = res.data.results;
				const totalPages = res.data.total_pages;
				that.setState({ films, totalPages });
			}),

			// genres
			axios.get(genreApiUrl).then(res => {
				let genresArray = res.data.genres;
                genresArray.unshift({ id: 0, name: 'All' });
				this.setState({ genres: genresArray });
			}),

			// seenlist
			axios.get(ourApiUrl + 'seenlist/user/' + userId).then(res => {

				let arraySeenList = [];
				seenList = res.data;

				seenList.forEach((item, key) => {

					arraySeenList.push(item.film_id);
				});
				that.setState({ seenList: arraySeenList });
			}),

			// watchlist
			axios.get(ourApiUrl + 'watchlist/user/' + userId).then(res => {

				let arrayWatchList = [];
				watchList = res.data;

				watchList.forEach((item, key) => {

					arrayWatchList.push(item.film_id);
				});
				that.setState({ watchList: arrayWatchList });
			})
		]).then(() => {
			let films = setFilmGenre(this.state.genres, this.state.films);
			this.setState({ films });
		}).then(() => {
			this.setState({ isLoading: false });
		}).catch((err) => {
			console.log(err);
		});
	}

	handlePaginationChange = (e, { activePage }) => {
		this.setState({ isLoading: true });

		this.setState({ activePage }, () => {
			let requestUrl = apiUrl + '&page=' + this.state.activePage;

			if (this.state.chosenGenre) {
				requestUrl = requestUrl + '&with_genres=' + this.state.chosenGenre;
			}

			if (this.state.chosenYear) {
				requestUrl = requestUrl + '&primary_release_year=' + this.state.chosenYear;
			}

			axios.get(requestUrl).then(res => {
				let films = res.data.results;
				films = setFilmGenre(this.state.genres, films);
				this.setState({ films });
			}).then(() => {
				this.setState({ isLoading: false });
			});
		});
	}

	onUpdate(result, totalPages, chosenGenre, chosenYear) {
		result = setFilmGenre(this.state.genres, result);
		this.setState({ films: result, totalPages, activePage: 1, chosenGenre, chosenYear });
	}

	render() {
		console.log(this.state.films);

		if (this.state.films.length == 0 || this.state.isLoading || this.state.genres == 0) {
			return (
				<div>
					<TopNavigation />
					<LoadingIndicator />
				</div>
			);
		} else {

			return (

				<div>
					<TopNavigation />
					<div className="container">
						<PageTitle title="Find the Latest Movies on Movie Bot" />
						<FilterMenu
							onUpdate={this.onUpdate.bind(this)}
							chosenGenre={this.state.chosenGenre}
							chosenYear={this.state.chosenYear}
							genres={this.state.genres} />

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
					</div>

					<div className="pagination-component">
						<Pagination activePage={this.state.activePage} totalPages={this.state.totalPages} onPageChange={this.handlePaginationChange} />

					</div>
				</div>

			);
		}
	}

}

export default Home;