import React, { Component } from 'react';
import axios from 'axios';
import { Pagination } from 'semantic-ui-react';
import LoadingIndicator from './../_components/LoadingIndicator';
import FilmModal from "../_components/FilmModal";
import TopNavigation from './../_components/TopNavigation';
import {movieDbDomain, movieApiKeyPart, ourApiUrl} from '../_helpers/variable';

var apiurlparams = "&language=en-US&sort_by=popularity.desc&primary_release_year=2018page=";
var apiUrl = movieDbDomain + "3/discover/movie" + movieApiKeyPart + apiurlparams;

var films;
var isLoading;

class Home extends Component {

	constructor(props) {
		super(props);

		isLoading = true;

		let userId = atob(JSON.parse(localStorage.getItem('user')).id);
		let userName = atob(JSON.parse(localStorage.getItem('user')).name);

		this.state = {
			name: userName,
			films: [],
			activePage: 1,
			userId: userId,
			isLoading: true,
			seenList: [],
			watchList: []
		};

		this.handlePaginationChange = this.handlePaginationChange.bind(this);
	}

	componentDidMount() {

		let that = this;
		let seenList,watchList;
		let {userId} = this.state;

		axios.all([

			axios.get(apiUrl + this.state.activePage).then(res => {
				isLoading = false;
				const films = res.data.results;
				that.setState({films});
			}),

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

	handlePaginationChange = (e, { activePage }) => {
		isLoading = true;
		this.setState({ activePage }, () => {
			axios.get(apiUrl + this.state.activePage).then(res => {
				isLoading = false;
				films = res.data.results;
				this.setState({ films });
			})
		});

	}

	render() {

		if( this.state.films.length == 0 || this.state.isLoading ){
			return <LoadingIndicator />;
		} else {

			return (

				<div>
					<TopNavigation />
					<div className="container">
						<h1 className={'title'}>Welcome {this.state.name}</h1>



						<h1>New Films</h1>
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

						<div className="pagination-component">
							<Pagination activePage={this.state.activePage} totalPages={20} onPageChange={this.handlePaginationChange} />
						</div>
					</div>
				</div>
			);
		}

	}
}

export default Home;