import React from 'react';
import axios from "axios";

import {movieApiKeyPart, movieDbDomain, apikey, ourApiUrl} from "../_helpers/variable";
import {addMyList, setMyListToMovie} from "../_helpers/method";

import LoadingIndicator from "../_components/LoadingIndicator";
import TopNavigation from "../_components/TopNavigation";
import ListButtons from "../_components/ListButtons";
import ImageSlider from "../_components/ImageSlider";
import {setFilmGenre, setMyListToMovie} from "../_helpers/method";
import FilmCardSlider from "../_components/FilmCardSlider";
import ImageLightbox from "../_components/ImageLightbox";

import"../_helpers/method"
import "../css/FilmDetail.css"

let apiUrl = movieDbDomain + 'movie';
var imageurl = "https://api.themoviedb.org/3/movie/";
class FilmDetail extends React.Component {

        constructor(props) {

            super(props);

        this.state = {
            filmId: this.props.match.params.id,
            filmData: [],
            inSeenList:"",
            userLists: [],
            images:[],

        }
       }

        componentDidMount() {

        let filmId = this.state.filmId;
        let url = apiUrl + '/' + filmId + movieApiKeyPart;

        axios.get(url + "&append_to_response=videos")
            .then(res => {
                console.log(res);
                this.setState({filmData: res.data})
            }).catch(err => {
            console.log(err);
        });

        let that = this;
        let seenList, watchList, userLists, myListMovies, genresArray,images;
        let { userId } = this.state;
        axios.all([
            //images
            axios.get (imageUrl +movieId+"/images?api_key=" + apikey)
                .then(res => {
                    this.setState({images: res.data})
                }).catch(err => {
                console.log(err);
            }),

            // watchlist
            axios.get(ourApiUrl + 'watchlist/user/' + userId).then(res => {

                watchList = res.data;
            }).catch((error) => { console.log( error ); }),

            // get all names and idies lists
            axios.get(ourApiUrl + "mylist/user/"+userId+"/category").then((res) => {

                userLists = res.data;
                     }).catch((error) => { console.log( error ); }),

            // get all names and idies lists
            axios.get(ourApiUrl + "mylist/user/"+userId+"/all").then((res) => {

                myListMovies = res.data;
                // myListMovies = setMyListToMovie(this.state.films,myListMovies);
            }).catch((error) => {

                console.log( error );
            })

        ]).then(() => {

            let films = setMyListToMovie(this.state.filmData,myListMovies);
            let filmListIdies = films[0].inMyLists;

            this.setState({ films:films,userLists:userLists,genres: genresArray });
        }).then(() => {
            this.setState({ isLoading: false });
        }).catch((err) => {
            console.log(err);
        });

        }

	addToMyList = (event) => {

		addMyList(event, this, 0)
	}

    render() {

        if (filmId == 0 ||filmData ==0||images==0) {
            return <LoadingIndicator/>;
        } else {
                return(
                    <div>
                        <TopNavigation/>
                        <div className={"content"}>
                            <img className="filmdetailimg" src={"https://image.tmdb.org/t/p/w342/" + filmData.poster_path}/>
                            <h1>{filmData.original_title}</h1>

                                <ListButtons
                                    id={filmData.filmId}
                                    rating={filmData.vote_average }
                                    inSeenList={inSeenList}
                                    inWatchList={inWatchList}
                                    sendWatchSeen={this.setWatchSeen}
                                    userLists={userLists}
                                 />

                            {filmData.videos.results[0] && (
                                <iframe src={"https://www.youtube.com/embed/" +
                                filmData.videos.results[0].key} width={600} height={300}>
                                </iframe>
                            )}

                            <p>{filmData.overview}</p>
                            <p>Original language : {filmData.original_language}</p>
                                {filmData.videos.results[0] && (
                            <iframe src={"https://www.youtube.com/embed/" + filmData.videos.results[0].key} width={600} height={300}>
                            </iframe>)}

                            <table className="table">
                                <tr>
                                    <th>Release year</th>
                                    <td>{filmData.release_date}</td>
                                </tr>
                                     <tbody>
                                        <tr>
                                            <th>Runtime</th>
                                            <td>{filmData.runtime} minutes</td>
                                        </tr>
                                        <tr>
                                            <th>Status</th>
                                            <td>{filmData.status}</td>
                                        </tr>
                                        <tr>
                                            <th>Average vote</th>
                                            <td>{filmData.vote_average *10}%</td>
                                        </tr>
                                        <tr>
                                            <th>Vote count</th>
                                            <td>{formatMoney(filmData.vote_count, 0)}</td>
                                        </tr>
                                        <tr>
                                            <th>Budget</th>
                                            <td>{formatMoney(filmData.budget, 0)}$</td>
                                        </tr>
                                        <tr>
                                            <th>Revenue</th>
                                            <td>{formatMoney(filmData.revenue,0)}$</td>
                                        </tr>
                                </tbody>
                            </table>

                            <ImageSlider
                                images={images.backdrops} />

                            <ImageLightbox image = {images.backdrops} />

							<CommentBlock
								movieId={movieId}
								userId={userId}
								profilePicture={profilePicture}
								userName={userName}
								comments={comments}
								DBoffest={DBoffest}
							/>

                        </div>
                        <Footer/>
                    </div>
                );
            }

        }

}
    export default FilmDetail;