import React, {Component} from 'react';
import {Icon, Grid, Label} from 'semantic-ui-react';
import '../css/filmcard.css';

import {textLimit} from "../_helpers/helper";
import {addToSeenList, addToWatchList} from "./SeenWatchListMethods";
import {ourApiUrl} from "../_helpers/variable";

class FilmCard extends Component {

	constructor(props) {
		super(props);

		let userId = atob(JSON.parse(localStorage.getItem('user')).id);

		this.state = {
			userId: userId
		};
	}

	addToSeenList = addToSeenList;
	addToWatchList = addToWatchList;


	render() {

		const {id, poster_path, rating, title, overview, original_language, ...rest} = this.props;
		const userId = this.state.userId;

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
							<a href={ourApiUrl + "watchlist/user/" + userId + "/film/" + id} onClick={this.addToWatchList}>
								<Icon color="grey" name="bookmark outline"/>
							</a>
						</Grid.Column>
						<Grid.Column>
							<a href={ourApiUrl + "seenlist/user/" + userId + "/film/" + id} onClick={this.addToSeenList}>
								<Icon color="grey" name="check square outline"/>
							</a>
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