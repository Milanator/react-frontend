import React, { Component } from 'react';
import { movieDbDomain, movieApiKeyPart } from "../_helpers/variable";
import FilmCard from '../_components/FilmCard';
import LoadingIndicator from '../_components/LoadingIndicator';

import axios from 'axios';
import TopNavigation from '../_components/TopNavigation';

var movieUrl;

class FilmDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        var id = this.props.match.params.filmId;
        movieUrl = movieDbDomain + "3/movie/" + id + movieApiKeyPart + "&language=en-US";

        axios.get(movieUrl).then(res => {
            const data = res.data;
            this.setState({ data });
        });
    }

    render() {
        if (this.state.data !== null) {
            return (

                <div>
                    <TopNavigation />
                    <FilmCard
                        id={this.state.data.id}
                        image={this.state.data.poster_path}
                        rating={this.state.data.vote_average * 10}
                        filmName={this.state.data.title}
                        overview={this.state.data.overview}
                        language={this.state.data.original_language}
                    />
                </div>

            );
        } else {
            return (
                <div>
                    <LoadingIndicator />
                </div>
            )
        }

    }
}

export default FilmDetails;