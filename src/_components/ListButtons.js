import React, { Component } from 'react';
import {Dropdown,Grid} from "semantic-ui-react";
import {Icon} from "semantic-ui-react";

import {ourApiUrl} from "../_helpers/variable";

class ListButtons extends Component {

	render() {

		const {
			userLists,movieInMyLists,addSeenWatchList,inWatchList,inSeenList,userId,addToMyList,rating,
			filmId,poster_path,title,overview,original_language
		} = this.props;
		const ratingWidth = 75;

		return (

			<div className={'marks'}>
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
					<Dropdown text='' multiple icon='add' color="blue" className={'addToMyList'}>
						<Dropdown.Menu>
							<Dropdown.Menu scrolling>
								{userLists.map(list =>
									<Dropdown.Item key={list.id}
												   data-list-id={list.id}
												   data-movie-id={filmId}
												   data-poster-path={poster_path}
												   data-title={title}
												   data-overview={overview}
												   data-original-language={original_language}
												   onClick={addToMyList}
												   className={'addToList'}
												   text={ movieInMyLists && movieInMyLists.includes(list.id) ?
										(
											<span
												// onClick={addToMyList}
											>
												<Icon link
												  color="blue"
												  name={"plus"}
												  // data-list-id={list.id}
												  // data-movie-id={filmId}
												/>
												{list.name}
											</span>
										)
										: (
											<span
												// onClick={addToMyList}
												// data-list-id={list.id}
												// data-movie-id={filmId}
											>
											<Icon link
												  color="blue"
												  name={"plus square outline"}
												  // data-list-id={list.id}
												  // data-movie-id={filmId}
											/>
												{list.name}
										</span>
										)
									}/>
								)}
							</Dropdown.Menu>
						</Dropdown.Menu>
					</Dropdown>
				</Grid.Column>
				<Grid.Column>

					{ inWatchList ? (
						<a href={ourApiUrl + "watchlist/user/" + userId + "/film/" + filmId + '/delete'} onClick={addSeenWatchList} data-inverse-url={ourApiUrl + "watchlist/user/" + userId + "/film/" + filmId} data-toggle="tooltip" data-placement="bottom" title="Remove from Watchlist">
							<Icon link
								  color="blue"
								  name={"bookmark" + (inWatchList ? "" : " outline")}
								  className={'watchlist'} />
						</a>
					) : (
						<a href={ourApiUrl + "watchlist/user/" + userId + "/film/" + filmId} onClick={addSeenWatchList} data-inverse-url={ourApiUrl + "watchlist/user/" + userId + "/film/" + filmId + '/delete'} data-toggle="tooltip" data-placement="bottom" title="Add to Watchlist">
							<Icon link
								  color="blue"
								  name={"bookmark" + (inWatchList ? "" : " outline")}
								  className={'watchlist'}
							/>
						</a>
					)
					}

				</Grid.Column>
				<Grid.Column>

					{inSeenList ? (
						<a href={ourApiUrl + "seenlist/user/" + userId + "/film/" + filmId + '/delete'} onClick={addSeenWatchList} data-inverse-url={ourApiUrl + "seenlist/user/" + userId + "/film/" + filmId} data-toggle="tooltip" data-placement="bottom" title="Remove from seenlist">
							<Icon link color="blue"
								  name={"check square" + (inSeenList ? "" : " outline")}
								  className={'seenlist'}
							/>
						</a>
					) : (
						<a href={ourApiUrl + "seenlist/user/" + userId + "/film/" + filmId} onClick={addSeenWatchList} data-inverse-url={ourApiUrl + "seenlist/user/" + userId + "/film/" + filmId + '/delete'} data-toggle="tooltip" data-placement="bottom" title="Add towatchlist">
							<Icon link color="blue"
								  name={"check square" + (inSeenList ? "" : " outline")}
								  className={'seenlist'}
							/>
						</a>
					)}

				</Grid.Column>
			</Grid>
			</div>

		);
	}
}

export default ListButtons;