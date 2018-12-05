import React, {Component} from 'react';

import '../css/filmcard.css';

import {textLimit} from "../_helpers/helper";
import ListButtons from "./ListButtons";
import {addMyList, addSeenWatchList} from "../_helpers/method";
import {capitalize} from "lodash/string";


class FilmCard extends Component {

	constructor(props) {

		super(props);

		let userId = atob(JSON.parse(localStorage.getItem('user')).id);

		this.state = {
			userId: userId,
			// FROM FILM MODAL - after loading
			movieInMyLists: this.props.movieInMyLists,
			inSeenList: this.props.inSeenList,
			inWatchList: this.props.inWatchList,
			myList: this.props.myList,
			lists: [],
			isLoading: true
		};
		this.addSeenWatchList = this.addSeenWatchList.bind(this);
		this.addToMyList = this.addToMyList.bind(this);
	}

	// if props are updated, if data are changed
	componentWillReceiveProps = (nextProps) => {

		this.setState({inWatchList: nextProps.inWatchList});
		this.setState({inSeenList: nextProps.inSeenList});
		this.setState({movieInMyLists: nextProps.movieInMyLists});
	};

	// function for add to seen and watchlist list also
	addSeenWatchList = (event) => {

		addSeenWatchList(event,this,0)
	}

	// function for adding and removing to myList
	addToMyList = (event) => {

		addMyList(event,this,0);
	}

	render() {

		const {movieId, poster_path, rating, title, overview, original_language,genres,userLists,movieInMyLists, ...rest} = this.props;
		const {userId,inWatchList,inSeenList} = this.state;

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
					userLists={userLists}
					movieInMyLists={movieInMyLists}
					addToMyList={this.addToMyList}
					addSeenWatchList={this.addSeenWatchList}
					userId={userId}
					inWatchList={inWatchList}
					inSeenList={inSeenList}
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
							<span className="badge badge-primary">{genre}</span>
						))}
					</p>
				</div>

			</div>
		);
	}
}

export default FilmCard;