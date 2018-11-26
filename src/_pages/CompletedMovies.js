import React, { Component } from 'react';
import TopNavigation from '../_components/TopNavigation';
import axios from 'axios';
import FilmModal from '../_components/FilmModal';
import LoadingIndicator from '../_components/LoadingIndicator';
import '../css/main.css';
import '../css/lists.css';
import { movieDbDomain, movieApiKeyPart } from '../_helpers/variable';
import { ourApiUrl } from "../_helpers/variable";
import PageTitle from '../_components/PageTitle';

var apiurlparams = "&language=en-US";
var apiUrl = movieDbDomain + "3/movie/";

class CompletedMovies extends Component {
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

        let arraySeenList = new Array();
        this.state.seenList.forEach(function (film) {
            const requestUrl = apiUrl + film + movieApiKeyPart + apiurlparams;
            promises.push(axios.get(requestUrl));
        });

        await axios.all(promises).then(function (results) {
            results.forEach(function (response) {
                film = response.data;
                arraySeenList.push(film);
            })
        });
        this.setState({ films: arraySeenList, isLoading: false });

    }

    render() {

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