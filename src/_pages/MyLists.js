import React, { Component } from 'react';
import axios from 'axios';
import { Button, Icon } from 'semantic-ui-react';

import '../css/mylists.css';

import TopNavigation from '../_components/TopNavigation';
import PageTitle from '../_components/PageTitle';
import FilmModal from '../_components/FilmModal';
import LoadingIndicator from '../_components/LoadingIndicator';

import { movieDbDomain, movieApiKeyPart, ourApiUrl } from '../_helpers/variable';
import { setFilmGenre } from "../_helpers/method";
import FilmCardSlider from '../_components/FilmCardSlider';

let apiUrl = movieDbDomain + "movie/";
let genreApiUrl = movieDbDomain + "genre/movie/list" + movieApiKeyPart;

class MyLists extends Component {
    constructor(props) {
        super(props);

        let userId = atob(JSON.parse(localStorage.getItem('user')).id);

        this.state = {
            seenListFilms: [],
            watchListFilms: [],
            seenListIndices: [],
            watchListIndices: [],
            genres: [],
            userId: userId,
            isLoading: true
        };
    }

    async componentDidMount() {
        let seenListIndices, watchListIndices;
        let { userId } = this.state;
        let watchListPromises = [];
        let seenListPromises = [];
        let film = {};

        await axios.get(ourApiUrl + 'watchlist/user/' + userId)
            .then(resp => {

                let arrayWatchList = new Array();
                watchListIndices = resp.data;

                watchListIndices.forEach((item) => {
                    arrayWatchList.push(item.film_id);
                });
                this.setState({ watchListIndices: arrayWatchList });
            });

        await axios.get(ourApiUrl + 'seenlist/user/' + userId)
            .then(resp => {
                let arraySeenList = new Array();
                seenListIndices = resp.data;

                seenListIndices.forEach((item) => {
                    arraySeenList.push(item.film_id);
                });
                this.setState({ seenListIndices: arraySeenList });
            });

        await axios.get(genreApiUrl).then(res => {
            this.setState({ genres: res.data.genres });
        });

        // create list of films in watchlist
        let arrayWatchList = new Array();
        this.state.watchListIndices.forEach(function (film) {
            const requestUrl = apiUrl + film + movieApiKeyPart;
            watchListPromises.push(axios.get(requestUrl));
        });

        await axios.all(watchListPromises).then(function (results) {
            results.forEach(function (response) {
                film = response.data;
                arrayWatchList.push(film);
            })
        });

        arrayWatchList = setFilmGenre(this.state.genres, arrayWatchList);
        this.setState({ watchListFilms: arrayWatchList, isLoading: false });

        // create list of already completed films
        let arraySeenList = new Array();
        this.state.seenListIndices.forEach(function (film) {
            const requestUrl = apiUrl + film + movieApiKeyPart;
            seenListPromises.push(axios.get(requestUrl));
        });

        await axios.all(seenListPromises).then(function (results) {
            results.forEach(function (response) {
                film = response.data;
                arraySeenList.push(film);
            })
        });
        arraySeenList = setFilmGenre(this.state.genres, arraySeenList);
        this.setState({ seenListFilms: arraySeenList, isLoading: false });

    }

    render() {
        const { watchListFilms, seenListFilms, seenListIndices, watchListIndices, genres } = this.state;

        if (this.state.isLoading == true) {
            return <div><TopNavigation /><LoadingIndicator /></div>
        } else {
            return (
                <div>
                    <TopNavigation />

                    <div className="container">

                        <div className="mylists-button-panel">
                            <Button
                                icon
                                inverted
                                labelPosition='left'
                                color='blue'>
                                <Icon name='plus' />New List
                            </Button>
                        </div>


                        <PageTitle title="Watchlist" />
                        <div className="slider-container">
                            <FilmCardSlider
                                title='Watchlist'
                                films={watchListFilms}
                                watchListIndices={watchListIndices}
                                seenListIndices={seenListIndices}
                                genres={genres} />

                        </div>


                        <PageTitle title="Completed Movies" />
                        <div className="slider-container">
                            <FilmCardSlider
                                title='Completed Movies'
                                films={seenListFilms}
                                watchListIndices={watchListIndices}
                                seenListIndices={seenListIndices}
                                genres={genres} />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default MyLists;