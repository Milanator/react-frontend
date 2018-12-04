import React from 'react';
import axios from "axios";
import {movieApiKeyPart, movieDbDomain, apikey, ourApiUrl} from "../_helpers/variable";
import LoadingIndicator from "../_components/LoadingIndicator";
import TopNavigation from "../_components/TopNavigation";
import "../css/FilmDetail.css"
import ListButtons from "../_components/ListButtons";
import"../_helpers/method"
import ImageSlider from "../_components/ImageSlider";
import {isMovieInSeenList, isMovieInWatchList, setFilmGenre, setMyListToMovie} from "../_helpers/method";
import FilmCardSlider from "../_components/FilmCardSlider";

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
            axios.get (imageurl +filmId+"/images?api_key=" + apikey)
                .then(res => {
                    console.log(res);
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

            let films = setFilmGenre(genresArray, this.state.films);
            films = isMovieInSeenList(films,seenList);
            films = isMovieInWatchList(films,watchList);
            films = setMyListToMovie(films,myListMovies);

            this.setState({ films:films,userLists:userLists,genres: genresArray });
        }).then(() => {
            this.setState({ isLoading: false });
        }).catch((err) => {
            console.log(err);
        });

    }

    render() {
        const {filmId, filmData, inSeenList, inWatchList,userLists,images} = this.state;

        if (filmId == 0 ||filmData ==0||images==0) {
            return <LoadingIndicator/>;
        } else {
            if (filmData.videos.results[0])
                return(
                    <div>
                        <TopNavigation/>
                        <div className={"content"}>
                            {console.log(images.backdrops)}
                            <img className={"FilmDetailImage"} src={"https://image.tmdb.org/t/p/w342/" + filmData.poster_path}/>
                            <h1>{filmData.original_title}</h1>

                                <ListButtons
                                    id={filmData.filmId}
                                    rating={filmData.vote_average *10}
                                    inSeenList={inSeenList}
                                    inWatchList={inWatchList}
                                    sendWatchSeen={this.setWatchSeen}
                                    userLists={userLists}
                                 />


                            <p>{filmData.overview}</p>
                            <p>Original language : {filmData.original_language}</p>

                            <iframe src={"https://www.youtube.com/embed/" + filmData.videos.results[0].key} width={600} height={300}>
                            </iframe>

                            <table className="table">
                                <tr>
                                    <th>Release year</th>
                                    <td>{filmData.release_date}</td>
                                </tr>
                                     <tbody>
                                        <tr>
                                            <th>Runtime</th>
                                            <td>{filmData.runtime}</td>
                                        </tr>
                                        <tr>
                                            <th>Status</th>
                                            <td>{filmData.status}</td>
                                        </tr>
                                        <tr>
                                            <th>Average vote</th>
                                            <td>{filmData.vote_average *10}</td>
                                        </tr>
                                        <tr>
                                            <th>Vote count</th>
                                            <td>{filmData.vote_count}</td>
                                        </tr>
                                        <tr>
                                            <th>Budget</th>
                                            <td>{filmData.budget}</td>
                                        </tr>
                                        <tr>
                                            <th>Revenue</th>
                                            <td>{filmData.revenue}</td>
                                        </tr>
                                </tbody>
                            </table>
                            <ImageSlider
                                images={images.backdrops}
                                />
                        </div>
                    </div>
                );
            else{
                return(
                    <div>

                        <TopNavigation/>
                        <div className={"content"}>

                            <img src={"https://image.tmdb.org/t/p/w342/" + filmData.poster_path}/>
                            <h1>{filmData.original_title}</h1>

                            <ListButtons
                                id={filmData.filmId}
                                rating={filmData.vote_average *10}
                                inSeenList={inSeenList}
                                inWatchList={inWatchList}
                                sendWatchSeen={this.setWatchSeen}
                                userLists={userLists}
                            />


                            <p>{filmData.overview}</p>
                            <p>Original language : {filmData.original_language}</p>

                        </div>
                    </div>
                );
            }

        }
    }
}


export default FilmDetail;