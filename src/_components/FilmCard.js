import React, { Component } from 'react';
import { Icon, Grid, Label } from 'semantic-ui-react';
import '../css/filmcard.css';
import {textLimit} from "../_helpers/helper";

class FilmCard extends Component {

	render() {

		const { id, poster_path, rating, title, overview, original_language, ...rest } = this.props;
		
		return (
			<div className="card" {...rest}>
				<img src={"https://image.tmdb.org/t/p/w500" + poster_path} alt="movie poster" />

				<div className="marks">
					<Grid verticalAlign="middle">
						<Grid.Column textAlign="center" width={9}>
							<Label size="small" color="grey">
								<Icon name='star half' /> {rating}%
							</Label>
						</Grid.Column>
						<Grid.Column>
							<Icon color="grey" name="bookmark outline" />
						</Grid.Column>
						<Grid.Column>
							<Icon color="grey" name="check square outline" />
						</Grid.Column>
					</Grid>

				</div>
				<h3>
					{title}
				</h3>
				<p>
					{/*{ textLimit(overview,230) }*/}
				</p>
				<p>
					language: {original_language}
				</p>
			</div>
		);
	}
}

export default FilmCard;