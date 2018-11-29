import React, {Component} from 'react';
import {Icon, Grid, Label} from 'semantic-ui-react';
import axios from "axios";

import '../css/filmcard.css';

import {textLimit} from "../_helpers/helper";
import {ourApiUrl} from "../_helpers/variable";

import {Modal} from "semantic-ui-react/dist/commonjs/modules/Modal/Modal";


class FilmCard extends Component {

	constructor(props) {

		super(props);

		let userId = atob(JSON.parse(localStorage.getItem('user')).id);

		this.state = {
			userId: userId,
			// FROM FILM MODAL - after loading
			seenList: this.props.inSeenList,
			watchList: this.props.inWatchList
		};
		this.addSeenWatchList = this.addSeenWatchList.bind(this);
	}

	// if props are updated, if data are changed
	componentWillReceiveProps = (nextProps) => {

		this.setState({watchList: nextProps.inWatchList});
		this.setState({seenList: nextProps.inSeenList});
	};

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
				that.setState({watchList: 1 - that.state.watchList});
			} else if (icon.classList.contains('seenlist')) {
				// set opposite value
				that.setState({seenList: 1 - that.state.seenList});
			}

			// send data to film modal --> update seen and watch button
			that.props.sendWatchSeen(that.state.watchList,that.state.seenList)

		}).catch(err => {
			console.log(err);
		});
	};

	render() {

		const {id, poster_path, rating, title, overview, original_language,genres, ...rest} = this.props;
		const {userId,watchList,seenList} = this.state;

		const ratingWidth = 75;


		return (
			<div className="card" {...rest} key={id}>
				<img src={"https://image.tmdb.org/t/p/w500" + poster_path} className={'poster-picture'} alt="movie poster"/>
				<div className="marks">
					<Grid verticalAlign="middle">
						<Grid.Column textAlign="center" width={9}>
							<div className="rating">
								<div className={'stars'} style={{width:(ratingWidth/100)*rating}}>
									<img srcSet={require('./../img/5-stars.png')} style={{width:ratingWidth}}/>
								</div>
								<div className={"rate"}>
									{rating}%
								</div>
							</div>
						</Grid.Column>
						<Grid.Column>

							{watchList == 1 && (
								<a href={ourApiUrl + "watchlist/user/" + userId + "/film/" + id + '/delete'} onClick={this.addSeenWatchList} data-inverse-url={ourApiUrl + "watchlist/user/" + userId + "/film/" + id} data-toggle="tooltip" data-placement="bottom" title="Add to Watchlist">
									<Icon link color="blue"
										  name={"bookmark" + (watchList ? "" : " outline")}
										  className={'watchlist'} />
								</a>
							)
							}

						</Grid.Column>
						<Grid.Column>

							{seenList == 1 ? (
								<a href={ourApiUrl + "seenlist/user/" + userId + "/film/" + id + '/delete'} onClick={this.addSeenWatchList} data-inverse-url={ourApiUrl + "seenlist/user/" + userId + "/film/" + id} data-toggle="tooltip" data-placement="bottom" title="Add towatchlist">
									<Icon link color="blue"
										  name={"check square" + (seenList ? "" : " outline")}
										  className={'seenlist'}
									/>
								</a>
							) : (
								<a href={ourApiUrl + "seenlist/user/" + userId + "/film/" + id} onClick={this.addSeenWatchList} data-inverse-url={ourApiUrl + "seenlist/user/" + userId + "/film/" + id + '/delete'} data-toggle="tooltip" data-placement="bottom" title="Add to seenlist">
									<Icon link color="blue"
										  name={"check square" + (seenList ? "" : " outline")}
										  className={'seenlist'}
									/>
								</a>
							)}

						</Grid.Column>
					</Grid>
				</div>
				<h3>
					{title}
				</h3>
				<p>
					{textLimit(overview, 230)}
				</p>
				<p>
					language: {original_language}
				</p>

				<p>
					{ genres && genres.map((genre) => (
						<span className="badge badge-primary">{genre}</span>
					))}
				</p>

			</div>
		);
	}
}

export default FilmCard;