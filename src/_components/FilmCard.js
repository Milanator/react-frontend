import React, {Component} from 'react';
import {Icon, Grid, Label} from 'semantic-ui-react';
import '../css/filmcard.css';

import {textLimit} from "../_helpers/helper";
import {addSeenWatchList} from "./../_helpers/method";
import {ourApiUrl} from "../_helpers/variable";

class FilmCard extends Component {

	constructor(props) {
		super(props);

		let userId = atob(JSON.parse(localStorage.getItem('user')).id);

		this.state = {
			userId: userId,
			seenList: 0,
			watchList: 0
		};
	}

	addSeenWatchList = addSeenWatchList;

	render() {

		const {id, poster_path, rating, title, overview, original_language, inSeenList, inWatchList,...rest} = this.props;
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
							<a href={ourApiUrl + "watchlist/user/" + userId + "/film/" + id}
							   onClick={this.addSeenWatchList}
							   data-inverse-url={ourApiUrl+"watchlist/user/"+userId+"/film/"+id+'/delete'}
							>
								<Icon color="grey"
									  name={"bookmark" + (inWatchList ? "" : " outline")}/>
							</a>
						</Grid.Column>
						<Grid.Column>
							<a href={ourApiUrl + "seenlist/user/" + userId + "/film/" + id}
							   onClick={this.addSeenWatchList}
							   data-inverse-url={ourApiUrl+"seenlist/user/"+userId+"/film/"+id+'/delete'}
							>
								<Icon color="grey"
									  name={"check square"+ (inSeenList ? "" : " outline")}/>
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