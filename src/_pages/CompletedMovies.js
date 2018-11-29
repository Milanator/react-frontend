import React, { Component } from 'react';
import axios from 'axios';

import '../css/main.css';
import '../css/lists.css';

import PageTitle from '../_components/PageTitle';
import TopNavigation from '../_components/TopNavigation';
import FilmModal from '../_components/FilmModal';
import LoadingIndicator from '../_components/LoadingIndicator';

import { movieDbDomain, movieApiKeyPart, ourApiUrl } from '../_helpers/variable';
import {setFilmGenre} from "../_helpers/method";

let apiUrl = movieDbDomain + "movie/";
let genreApiUrl = movieDbDomain + "genre/movie/list" + movieApiKeyPart;

class CompletedMovies extends Component {

    constructor(props) {

        super(props);

        let userId = atob(JSON.parse(localStorage.getItem('user')).id);

        this.state = {
            films: [],
            seenList: [],
            watchList: [],
            genres: [],
            userId: userId,
            isLoading: true
        };
    }

    async componentDidMount() {

        let seenList, watchList;
        let { userId } = this.state;
        let promises = [];
        let film = {};

        await axios.get(ourApiUrl + 'watchlist/user/' + userId)
            .then(resp => {

                let arrayWatchList = new Array();
                watchList = resp.data;

                watchList.forEach((item) => {
                    arrayWatchList.push(item.film_id);
                });
                this.setState({ watchList: arrayWatchList });
            });

        await axios.get(ourApiUrl + 'seenlist/user/' + userId)
            .then(resp => {
                let arraySeenList = new Array();
                seenList = resp.data;

                seenList.forEach((item) => {
                    arraySeenList.push(item.film_id);
                });
                this.setState({ seenList: arraySeenList });
            });

        await axios.get(genreApiUrl).then(res => {
            this.setState({ genres: res.data.genres });
        });

        let arraySeenList = new Array();
        this.state.seenList.forEach(function (film) {
            const requestUrl = apiUrl + film + movieApiKeyPart;
            promises.push(axios.get(requestUrl));
        });

        await axios.all(promises).then(function (results) {
            results.forEach(function (response) {
                film = response.data;
                arraySeenList.push(film);
            })
        });
        arraySeenList = setFilmGenre(this.state.genres, arraySeenList);
        this.setState({ films: arraySeenList, isLoading: false });

    }

    render() {
        console.log(this.state.films);
        
        if (this.state.isLoading == true) {
            return <div><TopNavigation /><LoadingIndicator /></div>
        } if (this.state.seenList.length == 0) {
            return (
                <div>
                    <TopNavigation />
                    <div className="empty-list">
                        You don't have any movies completed yet.
                </div>
                </div>
            )
        } else {
            return (
                <div>
                    <TopNavigation />
                    <div className="container">
                        <PageTitle title="Movies You Have Watched" />
                        <div className="container">
                            {this.state.films.map(film => (
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
                    </div>
                </div>
            );
        }
    }
}

export default CompletedMovies;