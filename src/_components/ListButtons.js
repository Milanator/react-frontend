import React, { Component } from 'react';
import {Dropdown,Grid} from "semantic-ui-react";
import $ from 'jquery'

class ListButtons extends Component {

	constructor(props) {

		super(props)

		this.state = {
			flashMessage: ''
		}
	}

	render() {
		var alignmentRating, widthRating, widthBookmark, iconClassName;

		const { source, userLists,movieInMyLists,addToMyList,rating, movieId,poster_path,title,overview,original_language,genres, ...rest } = this.props;
		const ratingWidth = 75;

		if(source == 'FilmCard') {
			alignmentRating = 'center';
			iconClassName = 'dropdown-icon-small';
			widthRating = 10;
			widthBookmark = 3;
		} else if(source == 'FilmModal') {
			alignmentRating = 'left';
			iconClassName = 'dropdown-icon-big';
			widthRating = 14;
			widthBookmark = 2;
		} else {
			alignmentRating = 'left';
			iconClassName = 'dropdown-icon-big';
			widthRating = 14;
			widthBookmark = 2;
		}

		return (
			<div className={'marks'}>

				<div className={'hidden-data'} style={{display:'none'}}>
					<input type="hidden" name="movieId" value={movieId}/>
					<input type="hidden" name="posterPath" value={poster_path}/>
					<input type="hidden" name="title" value={title}/>
					<input type="hidden" name="overview" value={overview}/>
					<input type="hidden" name="originalLanguage" value={original_language}/>
					<input type="hidden" name="rating" value={rating}/>
					<input type="hidden" name="genres" value={JSON.stringify(genres)}/>
				</div>

				<Grid verticalAlign="middle">
				<Grid.Column textAlign={alignmentRating} width={widthRating}>
					<div className="rating">
						{ rating ? (
							<div className={'stars'} style={{width:(ratingWidth/100)*(rating*10)}}>
								<img srcSet={require('./../img/5-stars.png')} style={{width:ratingWidth}}/>
							</div>
						) : (
							<div style={{marginTop:'6px'}}></div>
						)}
						<div className={"rate"}>
							{rating*10}%
						</div>
					</div>
				</Grid.Column>
				<Grid.Column className={iconClassName} textAlign="right" width={widthBookmark}>
					<Dropdown direction='left' text='' multiple icon='bookmark' color="blue" className={'addToMyList blue-content'}>
						<Dropdown.Menu>
							<Dropdown.Menu scrolling>
								{userLists.map(list =>
									<Dropdown.Item key={list.id}
												   data-list-id={list.id}
												   data-list-name={list.name}
												   onClick={addToMyList}
												   className={'addToList'}
												   text={ movieInMyLists && movieInMyLists.includes(list.id) ?
										(

											<span className={'blue-content'}>
												<i className="fa fa-plus"></i>
												{list.name}
											</span>
										)
										: (
											<span className={'grey-content'}>
												<i className="fa fa-plus"></i>
												{list.name}
											</span>
										)
									}/>
								)}
							</Dropdown.Menu>
						</Dropdown.Menu>
					</Dropdown>
				</Grid.Column>
			</Grid>
			</div>

		);
	}
}

export default ListButtons;