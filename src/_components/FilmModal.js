import React, {Component} from 'react';
import {Header, Image, Modal, Icon, Grid, Container, Label} from 'semantic-ui-react'
import FilmCard from './FilmCard';

import {ourApiUrl} from "../_helpers/variable";
import {addToSeenList, addToWatchList} from "./SeenWatchListMethods";

class FilmModal extends Component {

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

			<div>
				<Modal trigger={
					<FilmCard id={id} poster_path={poster_path} rating={rating} title={title} overview={overview} original_language={original_language}/>
				} centered={false}>
					<Modal.Header color="blue">{title}</Modal.Header>
					<Modal.Content image scrolling>
						<Image wrapped size="large" src={"https://image.tmdb.org/t/p/w500" + poster_path}/>
						<Modal.Description>
							<Header size="large">
								<Grid columns={7}>
									<Grid.Column width={4}>
										<Label color="blue" size="large">
											<Icon name="star half"/> {rating}%
										</Label>
									</Grid.Column>
									<Grid.Column/><Grid.Column/><Grid.Column/>
									<Grid.Column>
										<a href={ourApiUrl + "watchlist/user/" + userId + "/film/" + id} onClick={this.addToWatchList}>
											<Icon color="blue" link name="bookmark outline"/>
										</a>
									</Grid.Column>
									<Grid.Column>
										<a href={ourApiUrl + "seenlist/user/" + userId + "/film/" + id} onClick={this.addToSeenList}>
											<Icon link color="blue" name="check square outline"/>
										</a>
									</Grid.Column>
								</Grid>
							</Header>
							<Container textAlign="left">
								<p>Language: {original_language}</p>
								<p>
									{overview}
								</p>
							</Container>
						</Modal.Description>
					</Modal.Content>
				</Modal>
			</div>
		);

	}
}

export default FilmModal;