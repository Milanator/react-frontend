import React, { Component } from 'react';
import axios from 'axios';
import { Pagination, Button, Icon, Input } from 'semantic-ui-react';
import LoadingIndicator from './../_components/LoadingIndicator';
import FilmModal from "../_components/FilmModal";
import TopNavigation from './../_components/TopNavigation';
import { movieDbDomain, movieApiKeyPart, ourApiUrl } from '../_helpers/variable';
import PageTitle from '../_components/PageTitle';
import '../css/main.css';
import FilterMenu from '../_components/FilterMenu';

var apiUrlParams = "&language=en-US&sort_by=popularity.desc";
var apiUrl = movieDbDomain + "3/discover/movie" + movieApiKeyPart + apiUrlParams;
//let getFilmsByFilterCriteria = movieDbDomain + "3/discover/movie" + movieApiKeyPart + "&language=en-US&sort_by=popularity.desc&page=1";

class Home extends Component {

	constructor(props) {
		super(props);

		let userId = atob(JSON.parse(localStorage.getItem('user')).id);
		let userName = atob(JSON.parse(localStorage.getItem('user')).name);

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
			isActive: false
		};

		this.handlePaginationChange = this.handlePaginationChange.bind(this);
	}

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

			axios.get(ourApiUrl + 'seenlist/user/' + userId).then(res => {

				let arraySeenList = new Array();
				seenList = res.data;

				seenList.forEach((item) => {
					arraySeenList.push(item.film_id);
				});
				that.setState({ seenList: arraySeenList });
			}),

			axios.get(ourApiUrl + 'watchlist/user/' + userId).then(res => {

				let arrayWatchList = new Array();
				watchList = res.data;

				watchList.forEach((item) => {
					arrayWatchList.push(item.film_id);
				});
				that.setState({ watchList: arrayWatchList });
			})
		]).then(() => {
			this.setState({ isLoading: false });
		});
	}

	handlePaginationChange = (e, { activePage }) => {
		this.setState({ isLoading: true });

		this.setState({ activePage }, () => {
			let requestUrl;
			if (this.state.chosenGenre === 0 || this.state.chosenYear === 0 || (this.state.chosenGenre == '' && this.state.chosenYear == '')) {
				requestUrl = apiUrl + '&page=' + this.state.activePage;
			} if (this.state.chosenGenre == '' && this.state.chosenYear != '') {
				requestUrl = apiUrl + '&page=' + this.state.activePage + '&primary_release_year=' + this.state.chosenYear;
			} if (this.state.chosenGenre != '' && this.state.chosenYear != '') {
				requestUrl = apiUrl + '&page=' + this.state.activePage + '&primary_release_year=' + this.state.chosenYear + '&with_genres=' + this.state.chosenGenre.key;
			} if (this.state.chosenGenre != '' && this.state.chosenYear == '') {
				requestUrl = apiUrl + '&page=' + this.state.activePage + '&with_genres=' + this.state.chosenGenre.key;
			}

			axios.get(requestUrl).then(res => {
				const films = res.data.results;
				this.setState({ films });
				console.log(requestUrl);
			}).then(() => {
				this.setState({ isLoading: false });
			});
		});
	}

	onUpdate(result, chosenGenre, chosenYear) {
		this.setState({ films: result, chosenGenre, chosenYear })
	}

	render() {

		if (this.state.films.length == 0 || this.state.isLoading) {
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
							chosenYear={this.state.chosenYear} />
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