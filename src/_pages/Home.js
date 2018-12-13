import React, { Component } from 'react';
import axios from 'axios';
import {Pagination} from 'semantic-ui-react';

import { movieDbDomain, movieApiKeyPart, ourApiUrl } from '../_helpers/variable';
import {setFilmGenre, setMyListToMovie} from '../_helpers/method';
import '../css/main.css';

import FilmModal from "../_components/FilmModal";
import TopNavigation from './../_components/TopNavigation';
import PageTitle from '../_components/PageTitle';
import FilterMenu from '../_components/FilterMenu';
import LoadingIndicator from './../_components/LoadingIndicator';
import FlashMessage from './../_components/FlashMessage'
import Footer from "../_components/Footer";

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
			userLists: [],
			isLoading: true,
			genres: [],
			flashMessage: '',
			myListMovies: []
		};

		this.changeFlashMessage = this.changeFlashMessage.bind(this)
	}

	// THIS IS FIRST ACTION ON PAGE
	componentDidMount() {

		let that = this;
		let  userLists, myListMovies, genresArray;
		let { userId } = this.state;

		axios.all([

			// films
			axios.get(apiUrl + '&primary_release_year=2018&page=' + this.state.activePage).then(res => {

				const films = res.data.results;
				const totalPages = res.data.total_pages;
				that.setState({ films, totalPages });
			}).catch((error) => { console.log( error ); }),

			// genres
			axios.get(genreApiUrl).then(res => {

				genresArray = res.data.genres;
				genresArray.unshift({ id: 0, name: 'All' });

			}).catch((error) => { console.log( error ); }),

			// get all names and idies lists
			axios.get(ourApiUrl + "mylist/user/"+userId+"/category").then((res) => {

				userLists = res.data;
			}).catch((error) => { console.log( error ); }),

			// get all names and idies lists
			axios.get(ourApiUrl + "mylist/user/"+userId+"/all").then((res) => {

				myListMovies = res.data;
			}).catch((error) => {

				console.log( error );
			})

		]).then(() => {

			let films = setFilmGenre(genresArray, this.state.films);
			films = setMyListToMovie(films,myListMovies);

			this.setState({ films:films,userLists:userLists,genres:genresArray,myListMovies:myListMovies });
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

			// create requestUrl with correct parameters
			if (this.state.chosenGenre && this.state.chosenGenre.key !== 0) {
				requestUrl = requestUrl + '&with_genres=' + this.state.chosenGenre.key;
			}

			if (this.state.chosenYear && this.state.chosenYear.key !== 0) {
				requestUrl = requestUrl + '&primary_release_year=' + this.state.chosenYear.key;
			}

			// request film results for requested page
			axios.get(requestUrl).then(res => {

				let films = res.data.results;
				films = setFilmGenre(this.state.genres, films);
				films = setMyListToMovie(films,this.state.myListMovies);

				this.setState({ films });
			}).then(() => {
				this.setState({ isLoading: false });
			});
		});
	}

	// handle any update of the filterMenu
	onUpdate(result, totalPages, chosenGenre, chosenYear) {
		result = setFilmGenre(this.state.genres, result);
		result = setMyListToMovie(result,this.state.myListMovies);
		console.log(result)
		this.setState({ films: result, totalPages, activePage: 1, chosenGenre, chosenYear});
	}

	// props passed from filmcard throughout filmmodal
	changeFlashMessage = (flashMessage) => {

		this.setState({flashMessage})
	}

	render() {

		const {flashMessage} = this.state

		if (this.state.films.length === 0 || this.state.isLoading || this.state.genres === 0 ) {
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
						<PageTitle title="Discover New Movies" />
						<FilterMenu
							onUpdate={this.onUpdate.bind(this)}
							chosenGenre={this.state.chosenGenre}
							chosenYear={this.state.chosenYear}
							genres={this.state.genres} />

						{ flashMessage && 
                            <FlashMessage message={flashMessage.message} type={flashMessage.type}/>
                        }

						{this.state.films.map((movie) => (
							<FilmModal
								movieId={movie.id}
								poster_path={movie.poster_path}
								rating={movie.vote_average}
								title={movie.title}
								overview={movie.overview}
								original_language={movie.original_language}
								key={movie.id}
								movieInMyLists={movie.inMyLists}
								userLists={this.state.userLists}
								genres={movie.genres}
								// sent props to parent
								changeFlashMessage={this.changeFlashMessage}
							/>
						))}
					</div>

					<div className="pagination-component">
						<Pagination siblingRange={2} activePage={this.state.activePage} totalPages={this.state.totalPages} onPageChange={this.handlePaginationChange.bind(this)} />
					</div>
					<Footer/>
				</div>

			);
		}
	}

}

export default Home;