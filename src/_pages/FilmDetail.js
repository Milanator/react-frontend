import React from 'react';
import axios from "axios";
import {movieApiKeyPart, movieDbDomain} from "../_helpers/variable";

let apiUrl = movieDbDomain + 'movie';

class FilmDetail extends React.Component {

	constructor(props){

		super(props);

		this.state = {
			filmId: this.props.match.params.id
		}
	}

	componentDidMount = () => {

		let filmId = this.state.filmId;
		let url = apiUrl+'/'+filmId+movieApiKeyPart;

		axios({
			method: 'get',
			url: url
		}).then((resp) => {

			let data = resp.data;

			console.log( data );

		}).catch(err => {
			console.log(err);
		});

	}

	render() {
		return (
			<div>
				{'film detail'}

			</div>
		);
	}
}

export default FilmDetail;