import React from 'react';
import axios from "axios";
import {movieApiKeyPart, movieDbDomain,apikey} from "../_helpers/variable";
import LoadingIndicator from "../_components/LoadingIndicator";
import TopNavigation from "../_components/TopNavigation";
import "../css/FilmDetail.css"

let apiUrl = movieDbDomain + 'movie';
class FilmDetail extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            filmId: this.props.match.params.id,
            filmData: [],

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

    }

    render() {
        if (this.state.filmId == 0 || this.state.isLoading ||this.state.filmData ==0) {
            return <LoadingIndicator/>;
        } else {
        	if (this.state.filmData.videos.results[0])
        		return(
        		    <div>

                   <TopNavigation/>
                <div class="content">

                    <img src={"https://image.tmdb.org/t/p/w342/" + this.state.filmData.poster_path}/>
                    <h1>{this.state.filmData.original_title}</h1>
                    <p>{this.state.filmData.overview}</p>
                    <p>Original language : {this.state.filmData.original_language}</p>
                    <p>Rating : {this.state.filmData.vote_average}</p>

                    <iframe src={"https://www.youtube.com/embed/" + this.state.filmData.videos.results[0].key} width={600} height={300}>
                    </iframe>
                </div>
                    </div>
            );
        	else{
        		return(
        		    <div>
                        <TopNavigation/>
                        <div class="content">

                            <h1>test</h1>


                         </div>
                    </div>


				);
			}

        }
    }
}

export default FilmDetail;