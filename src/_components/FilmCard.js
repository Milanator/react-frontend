import React, {Component} from 'react';
import axios from "axios";

import '../css/filmcard.css';

import {getClosest, textLimit} from "../_helpers/helper";
import {ourApiUrl} from "../_helpers/variable";
import ListButtons from "./ListButtons";


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

		event.preventDefault();
		event.stopPropagation();

		let that = this;
		let icon = event.target;
		let anchorTag = icon.parentNode;
		let url = anchorTag.getAttribute('href');
		let inverseUrl = anchorTag.getAttribute('data-inverse-url');

		axios({
			method: 'get',
			url: url
		}).then(() => {

			// change visual of icon
			icon.classList.toggle('outline');
			// change href of anchors
			anchorTag.setAttribute('href',inverseUrl);
			anchorTag.setAttribute('data-inverse-url',url);

			if (icon.classList.contains('watchlist')) {
				// set opposite value
				that.setState({inWatchList: 1 - that.state.inWatchList});
			} else if (icon.classList.contains('seenlist')) {
				// set opposite value
				that.setState({inSeenList: 1 - that.state.inSeenList});
			}

			// send data to film modal --> update seen and watch button
			that.props.sendWatchSeen(that.state.inWatchList,that.state.inSeenList,that.state.movieInMyLists)

		}).catch(err => {
			console.log(err);
		});
	};

	// function for adding and removing to myList
	addToMyList = (event) => {

		let target = event.target;
		target = getClosest(target,'.addToList');
		let listId = Number(target.getAttribute('data-list-id'));
		let data = {
			listId: listId,
			movieId: Number(target.getAttribute('data-movie-id')),
			posterPath: target.getAttribute('data-poster-path'),
			title: target.getAttribute('data-title'),
			overview: target.getAttribute('data-overview'),
			originalLanguage: target.getAttribute('data-original-language'),
			myListId: listId
		};
		const {movieInMyLists} = this.state;
		const index = movieInMyLists.indexOf(listId);
		let that = this;
		let url;

		console.log( data );

		// IF LIST CONTAINS MOVIE
		if( index !== -1 ){

			movieInMyLists.splice(index, 1);
			url = ourApiUrl+'mylist/delete';
		} else{		// IF LIST DOESNT CONTAIN MOVIE

			movieInMyLists.push(listId);
			url = ourApiUrl+'mylist/add';
		}

		axios({
			method: 'post',
			url: url,
			data: data
		}).then((res) => {

			that.setState({movieInMyLists: movieInMyLists});
			// send data to film modal --> update seen and watch button
			that.props.sendWatchSeen(that.state.inWatchList,that.state.inSeenList,that.state.movieInMyLists)

		}).catch(err => {
			console.log(err);
		});
	}

	render() {

		const {id, poster_path, rating, title, overview, original_language,genres,userLists,movieInMyLists, ...rest} = this.props;
		const {userId,inWatchList,inSeenList} = this.state;

		return (
			<div className="card" {...rest} key={id}>
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
					filmId={id}
					rating={rating}
					poster_path={poster_path}
					title={title}
					overview={overview}
					original_language={original_language}
				/>
				<h3>
					{title}
				</h3>
				<p>
					{textLimit(overview, 100)}
				</p>

				<div className={'fix-bottom'}>
					<p>
						Language: {original_language}
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