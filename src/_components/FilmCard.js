import React, {Component} from 'react';

import '../css/filmcard.css';

import {textLimit} from "../_helpers/helper";
import ListButtons from "./ListButtons";
import {addMyList} from "../_helpers/method";
import {capitalize} from "lodash/string";


class FilmCard extends Component {

	constructor(props) {

		super(props);

		let userId = atob(JSON.parse(localStorage.getItem('user')).id);

		this.state = {
			userId: userId,
			// FROM FILM MODAL - after loading
			movieInMyLists: this.props.movieInMyLists,
			myList: this.props.myList,
			lists: [],
			isLoading: true
		};

		this.addToMyList = this.addToMyList.bind(this);
	}

	// if props are updated, if data are changed
	componentWillReceiveProps = (nextProps) => {

		this.setState({movieInMyLists: nextProps.movieInMyLists});
	};

	// function for adding and removing to myList
	addToMyList = (event) => {

		addMyList(event,this,0);
	}

	render() {

		const {movieId, poster_path, rating, title, overview, original_language,genres,userLists,movieInMyLists, ...rest} = this.props;
		const {userId} = this.state;

		return (
			<div className="card" {...rest} key={movieId}>
				{ poster_path ? (
					<img src={"https://image.tmdb.org/t/p/w500" + poster_path} className={'poster-picture'} alt="movie poster"/>
				) : (
					<div className={'undefined-logo'}>
						<img src={require('../img/Logo.png')} className={'poster-picture'} alt="movie poster"/>
					</div>
				) }

				<ListButtons
					source='FilmCard'
					userLists={userLists}
					movieInMyLists={movieInMyLists}
					addToMyList={this.addToMyList}
					userId={userId}
					movieId={movieId}
					rating={rating}
					poster_path={poster_path}
					title={title}
					overview={overview}
					original_language={original_language}
					genres={genres}
				/>
				<h3>
					{title}
				</h3>
				<p>
					{textLimit(overview, 100)}
				</p>

				<div className={'fix-bottom'}>
					<p>
						Language: {capitalize(original_language)}
					</p>

					<p>
						{ genres && genres.map((genre) => (
							
							<span className="badge badge-primary">{genre.hasOwnProperty('name') ? genre.name : genre}</span>
						))}
					</p>
				</div>

			</div>
		);
	}
}

export default FilmCard;