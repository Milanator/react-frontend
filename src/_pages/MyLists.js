import React, { Component } from 'react';
import axios from 'axios';
import { Button, Icon } from 'semantic-ui-react';

import { movieDbDomain, movieApiKeyPart, ourApiUrl } from '../_helpers/variable';
import { setMyListToMovie } from '../_helpers/method';

import '../css/main.css';

import TopNavigation from './../_components/TopNavigation';
import LoadingIndicator from './../_components/LoadingIndicator';
import FilmCardSlider from './../_components/FilmCardSlider';
import AddListModal from './../_components/AddListModal';
import EditListModal from './../_components/EditListModal';
import FlashMessage from '../_components/FlashMessage';


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

        this.deleteList = this.deleteList.bind(this);

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

            let films = setMyListToMovie(this.state.films, myListMovies,1);

            // set genres from json to array
            films.forEach((film) => {

                film.genres = film.genres ? JSON.parse(film.genres) : []
            })

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

            let newList = { 'id': list.id, 'name': list.name, 'first': list.first, films: listFilms };

            userListsWithFilms.push(newList);
        });

        this.setState({ userListsWithFilms });
    }

    deleteList(id) {
        axios({
            data: {
                myListId: id
            },
            method: 'delete',
            url: ourApiUrl + 'mylist/delete'
        })
            .then(function (response) {
                console.log(response);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    changeFlashMessage = (flashMessage) => {

        this.setState({flashMessage:flashMessage})
    }

    render() {
        const { userListsWithFilms, userLists, isLoading, flashMessage } = this.state;
        let disabled;

        if ( isLoading ) {
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

                        { flashMessage && 
                            <FlashMessage message={flashMessage} type={'success'} style={{ marginTop: "10px" }}/>
                        }

                        <AddListModal />

                        {userListsWithFilms.map(list => {

                            if(list.first == 1) {
                                disabled = 'disabled';
                            } else {
                                disabled = '';
                            }

                            return(
                            <div>

                                <div className="list-header">

                                    <div className="list-title">
                                        {list.name}
                                    </div>

                                    <div className="list-actions">
                                        <EditListModal 
                                            myListId={list.id}
                                            myListName={list.name}
                                            disabled={disabled}
                                        />

                                        <Button
                                            disabled={disabled}
                                            className="second-delete"
                                            icon
                                            onClick={() => this.deleteList(list.id)}  >
                                            <Icon
                                                name='trash'
                                                className={'addToMyList blue-icon'} />
                                        </Button>
                                    </div>
                                </div>

                                <hr className="slider-divider" />

                                <FilmCardSlider
                                    films={list.films}
                                    userLists={userLists}
                                    changeFlashMessage={this.changeFlashMessage}
                                />

                            </div>
                            )
                        })}
                    </div>

                </div>

            );
        }
    }

}

export default Home;