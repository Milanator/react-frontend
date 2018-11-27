import React, {Component} from 'react';
import {Icon, Grid, Label} from 'semantic-ui-react';
import axios from "axios";

import '../css/filmcard.css';

import {textLimit} from "../_helpers/helper";
import {ourApiUrl} from "../_helpers/variable";

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

		const {id, poster_path, rating, title, overview, original_language, ...rest} = this.props;
		const {userId,watchList,seenList} = this.state;

		return (
			<div className="card" {...rest} key={id}>
				<img src={"https://image.tmdb.org/t/p/w500" + poster_path} alt="movie poster"/>
				<div className="marks">
					<Grid verticalAlign="middle">
						<Grid.Column textAlign="center" width={9}>
							<Label size="small" color="grey">
								<Icon name="star half"/> {rating}%
							</Label>
						</Grid.Column>
						<Grid.Column>

							{watchList == 1 ? (
								<a href={ourApiUrl + "watchlist/user/" + userId + "/film/" + id + '/delete'} onClick={this.addSeenWatchList} data-inverse-url={ourApiUrl + "watchlist/user/" + userId + "/film/" + id}>
									<Icon link color="blue"
										  name={"bookmark" + (watchList ? "" : " outline")}
										  className={'watchlist'}
									/>
								</a>
							) : (
								<a href={ourApiUrl + "watchlist/user/" + userId + "/film/" + id} onClick={this.addSeenWatchList} data-inverse-url={ourApiUrl + "watchlist/user/" + userId + "/film/" + id + '/delete'}>
									<Icon link color="blue"
										  name={"bookmark" + (watchList ? "" : " outline")}
										  className={'watchlist'}
									/>
								</a>
							)}

						</Grid.Column>
						<Grid.Column>

							{seenList == 1 ? (
								<a href={ourApiUrl + "seenlist/user/" + userId + "/film/" + id + '/delete'} onClick={this.addSeenWatchList} data-inverse-url={ourApiUrl + "seenlist/user/" + userId + "/film/" + id}>
									<Icon link color="blue"
										  name={"check square" + (seenList ? "" : " outline")}
										  className={'seenlist'}
									/>
								</a>
							) : (
								<a href={ourApiUrl + "seenlist/user/" + userId + "/film/" + id} onClick={this.addSeenWatchList} data-inverse-url={ourApiUrl + "seenlist/user/" + userId + "/film/" + id + '/delete'}>
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
			</div>
		);
	}
}

export default FilmCard;