import React from 'react';
import axios from "axios";

import {movieApiKeyPart, movieDbDomain, apikey, ourApiUrl} from "../_helpers/variable";
import {addMyList, setMyListToMovie} from "../_helpers/method";

import LoadingIndicator from "../_components/LoadingIndicator";
import TopNavigation from "../_components/TopNavigation";
import ListButtons from "../_components/ListButtons";
import ImageSlider from "../_components/ImageSlider";
import ImageLightbox from "../_components/ImageLightbox";
import CommentBlock from "../_components/CommentBlock";
import FlashMessage from '../_components/FlashMessage';

import"../_helpers/method"
import "../css/FilmDetail.css"
import "bootstrap"

let apiUrl = movieDbDomain + 'movie';
let imageUrl = "https://api.themoviedb.org/3/movie/";

class FilmDetail extends React.Component {

    constructor(props) {

        super(props);

		let user = JSON.parse(localStorage.getItem('user'));
		let userId = atob(user.id);
		let profilePicture = atob(user.profilePicture);
		let userName = atob(user.name);

        this.state = {
            movieId: this.props.match.params.id,
            filmData: [],
            inSeenList:"",
            userLists: [],
            images:[],
			userId: userId,
			userName: userName,
			profilePicture: profilePicture,
			movieInMyLists: [],
			comments: [],
			isLoading: true,
            DBoffest: 0,
            flashMessage: ''
        }

        this.addToMyList = this.addToMyList.bind(this);
       }

    componentDidMount() {

        let movieId = this.state.movieId;
        let url = apiUrl + '/' + movieId + movieApiKeyPart;
        let userLists, myListMovies, genresArray,comments;
        let {userId,DBoffest} = this.state;

        axios.all([

        	// film with video
			axios.get(url + "&append_to_response=videos")
				.then(res => {

					let filmData = [];
					filmData.push(res.data);
					this.setState({filmData: filmData})
				}).catch(err => { console.log(err); }),

            //images
            axios.get (imageUrl +movieId+"/images?api_key=" + apikey)
                .then(res => {
                    this.setState({images: res.data})
                }).catch(err => { console.log(err); }),

            // get all names and idies lists
            axios.get(ourApiUrl + "mylist/user/"+userId+"/category").then((res) => {

                userLists = res.data;
            }).catch((error) => { console.log( error ); }),

            // get all names and idies lists
            axios.get(ourApiUrl + "mylist/user/"+userId+"/all").then((res) => {

                myListMovies = res.data;
            }).catch((error) => { console.log( error ); }),

			// get comments by movie id
			axios.get(ourApiUrl + "comment/movie/"+movieId+"/"+DBoffest).then((res) => {

                comments = res.data;
                DBoffest += 3;
			}).catch((error) => { console.log( error ); })


        ]).then(() => {

            let films = setMyListToMovie(this.state.filmData,myListMovies);
            let filmListIdies = films[0].inMyLists;

            this.setState({ films:films,userLists:userLists,genres:genresArray,movieInMyLists:filmListIdies,comments:comments.reverse() });
        }).then(() => {
            this.setState({ isLoading: false });
        }).catch((err) => {
            console.log(err);
        });

    }

	addToMyList = (event) => {

		addMyList(event, this, 0, 1)
    }
    
    changeFlashMessage = (message) => {

        console.log(message)
    }

    render() {

        const {movieId,userLists,images,userId,profilePicture,userName,comments,isLoading,DBoffest} = this.state;
        let {filmData,flashMessage} = this.state;
        filmData = filmData[0];

        if ( movieId == 0 || filmData == 0 || images == 0 || isLoading ) {
            return <LoadingIndicator/>;
        } else {
                return(
                    <div>
                        <TopNavigation/>
                        <div className={"content"}>

                            { flashMessage && 
                                <FlashMessage message={flashMessage} type={'success'} style={{ marginTop: "10px" }}/>
                            }
                            
                            <div className={'main-detail clearfix'}>
                                <div className={'image'}>
                                    <img className={"filmdetailimg"} src={"https://image.tmdb.org/t/p/w342/" + filmData.poster_path}/>
                                </div>
                                <div className={'description'}>
                                    <h1 className={'title'}>{filmData.original_title}</h1>

                                        <ListButtons
                                            userLists={userLists}
                                            rating={filmData.vote_average}
                                            movieInMyLists={this.state.movieInMyLists}
                                            addToMyList={this.addToMyList}
                                            userId={userId}
                                            movieId={filmData.id}
                                            poster_path={filmData.poster_path}
                                            title={filmData.title}
                                            overview={filmData.overview}
                                            original_language={filmData.original_language}
                                            genres={filmData.genres}
                                        />


                                    <p>{filmData.overview}</p>
                                    <p>Original language: {filmData.original_language}</p>
                                </div>
                            </div>

                            <div className={'video'}>
                                {filmData.videos.results[0] && (
                                    <iframe src={"https://www.youtube.com/embed/" + filmData.videos.results[0].key} width={600} height={300}>
                                    </iframe>
                                )}
                            </div>

                            <ImageSlider
                                images={images.backdrops}
                                />
                            <ImageLightbox 
                                image={images.backdrops} 
                                />

                            <table className={"table col-4"}>
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
                                            <td>{filmData.vote_count}</td>
                                        </tr>
                                        <tr>
                                            <th>Budget</th>
                                            <td>{filmData.budget}$</td>
                                        </tr>
                                        <tr>
                                            <th>Revenue</th>
                                            <td>{filmData.revenue}$</td>
                                        </tr>
                                </tbody>
                            </table>

							<CommentBlock
								movieId={movieId}
								userId={userId}
								profilePicture={profilePicture}
								userName={userName}
								comments={comments}
								DBoffest={DBoffest}
							/>

                        </div>
                    </div>
                );
            }

        }

}


export default FilmDetail;