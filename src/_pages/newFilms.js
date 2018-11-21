import React, {Component} from 'react';
import axios from "axios"
import FilmCard from "../_components/FilmCard";
import FilmModal from "../_components/FilmModal";

let apikey = "e0338266d7945597731b014d7e806075";
let apiurlparams = "&language=en-US&sort_by=popularity.desc";
let apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + apikey + apiurlparams;

class NewFilms extends Component {

	constructor(props) {
		super(props);

		this.state = {
			films: []
		};
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {

		let that = this;

		axios.get(apiUrl).then(res => {
			const films = res.data.results;
			that.setState({films});
		});
	}

	render() {
		if( this.state.films.length == 0 ){

			return <div>Loading</div>
		} else{

			return (
				<div>
					<h1>New Films</h1>
					{ this.state.films.map((film) => (
						<FilmModal film={film} />
					)) }
				</div>
			);
		}
	}
}

export default NewFilms;