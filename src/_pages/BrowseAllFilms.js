import React, { Component } from 'react';
import TopNavigation from '../_components/TopNavigation';
import MaterialIcon from 'react-google-material-icons';
import axios from 'axios';
import FilmCard from '../_components/FilmCard';

let ourApiUrl = 'http://localhost:3000/';
let baseUrl = 'http://localhost:3001/';

var apikey = "e0338266d7945597731b014d7e806075";
var apiurlparams = "&language=en-US&sort_by=popularity.desc";
var apiurl = "https://api.themoviedb.org/3/discover/movie?api_key=" + apikey + apiurlparams;

class BrowseAllFilms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {

        axios.get(apiurl).then(res => {
            const data = res.data.results;
            console.log(data);
            this.setState({ data });
            console.log(this.state);
        });
    }

    render() {
        return (
            <div>
                <TopNavigation />
                {this.state.data.map(data => (
                    <FilmCard
                        id={data.id}
                        image={data.poster_path}
                        rating={data.vote_average * 10}
                        filmName={data.title}
                        overview={data.overview}
                        language={data.original_language}
                    />
                ))}
            </div>
        );
    }
}

export default BrowseAllFilms;