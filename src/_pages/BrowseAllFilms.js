import React, { Component } from 'react';
import TopNavigation from '../_components/TopNavigation';
import axios from 'axios';
import FilmModal from '../_components/FilmModal';
import FilterSidebar from '../_components/FilterSidebar';
import LoadingIndicator from '../_components/LoadingIndicator';
import '../css/main.css';
import { Pagination } from 'semantic-ui-react';
import { movieDbDomain, movieApiKeyPart } from '../_helpers/variable';

var apiurlparams = "&language=en-US&sort_by=popularity.desc&page=";
var apiUrl = movieDbDomain + "3/discover/movie" + movieApiKeyPart + apiurlparams;
var data;
var isLoading;

class BrowseAllFilms extends Component {
	constructor(props) {
		super(props);
		isLoading = true;

		this.state = {
			data: [],
			activePage: 1
		};

		this.handlePaginationChange = this.handlePaginationChange.bind(this);
	}

	componentDidMount() {
		axios.get(apiUrl + this.state.activePage).then(res => {
			isLoading = false;
			const data = res.data.results;
			this.setState({ data });
		});
	}

	handlePaginationChange = (e, { activePage }) => {
		isLoading = true;
		this.setState({ activePage }, () => {
			axios.get(apiUrl + this.state.activePage).then(res => {
				isLoading = false;
				data = res.data.results;
				this.setState({ data });
			})
		});

	}

	render() {
		if (isLoading == true) {
			return <div><LoadingIndicator /></div>
		} else {
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
					<div className="pagination-component">
						<Pagination activePage={this.state.activePage} totalPages={20} onPageChange={this.handlePaginationChange} />
					</div>
				</div>
			);
		}
	}
}

export default BrowseAllFilms;