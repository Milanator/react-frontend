import React, { Component } from 'react';
import axios from 'axios';
import { Button, Icon } from 'semantic-ui-react';

import { movieDbDomain, movieApiKeyPart, ourApiUrl } from '../_helpers/variable';
import { setFilmGenre, setMyListToMovie } from '../_helpers/method';
import '../css/main.css';

import TopNavigation from './../_components/TopNavigation';
import LoadingIndicator from './../_components/LoadingIndicator';
import FilmCardSlider from './../_components/FilmCardSlider';
import PageTitle from './../_components/PageTitle';

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
            userListsWithFilms: [],
            userId: userId,
            userLists: [],
            isLoading: true,
            genres: []
        };

    }

    componentDidMount() {

        let userLists, myListMovies, genresArray;
        let { userId } = this.state;

        axios.all([

            // films
            axios.get(ourApiUrl + 'mylist/user/' + userId + '/all').then(res => {

                const films = res.data;
                this.setState({ films });
            }).catch((error) => { console.log(error); }),

            // genres
            axios.get(genreApiUrl).then(res => {

                genresArray = res.data.genres;
                genresArray.unshift({ id: 0, name: 'All' });

            }).catch((error) => { console.log(error); }),

            // get all names and IDs of lists
            axios.get(ourApiUrl + "mylist/user/" + userId + "/category").then((res) => {

                userLists = res.data;
            }).catch((error) => { console.log(error); }),

            // get all names and IDs of lists
            axios.get(ourApiUrl + "mylist/user/" + userId + "/all").then((res) => {

                myListMovies = res.data;
            }).catch((error) => {

                console.log(error);
            })

        ]).then(() => {

            let films = setFilmGenre(genresArray, this.state.films);
            films = setMyListToMovie(films, myListMovies);

            this.setState({ films: films, userLists: userLists, genres: genresArray });
        }).then(() => {

            this.createUserListsWithFilms();
        }).then(() => {
            this.setState({ isLoading: false });
        }).catch((err) => {
            console.log(err);
        });
    }

    createUserListsWithFilms() {
        let userListsWithFilms = [];
        this.state.userLists.map(list => {
            let listFilms = [];
            this.state.films.map(film => {
                if (list.id == film.myList_id) {
                    listFilms.push(film);
                }
            });
            let newList = { 'id': list.id, 'name': list.name, films: listFilms };
            userListsWithFilms.push(newList);
        });

        console.log(userListsWithFilms)
        this.setState({ userListsWithFilms });
    }

    render() {
        console.log(this.state);
        const { userListsWithFilms, userLists, isLoading, genres } = this.state;

        if (userListsWithFilms.length === 0 || isLoading || genres === 0) {
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

                    <div className="container sliders">

                        <div className="mylists-button-panel">
                            <Button
                                icon
                                inverted
                                labelPosition='left'
                                color='blue'>
                                <Icon name='plus' />New List
                            </Button>
                        </div>

                        {userListsWithFilms.map(list => (
                            <div>
                                <PageTitle title={list.name} />

                                <div className="slider-container">
                                    <FilmCardSlider
                                        films={list.films}
                                        userLists={userLists}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>


                </div>

            );
        }
    }

}

export default Home;