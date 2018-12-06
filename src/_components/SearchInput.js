import _ from 'lodash'
import React, { Component } from 'react'
import axios from 'axios';
import {Search,Grid} from 'semantic-ui-react'

import {slugify, textLimit} from "../_helpers/helper";
import {apikey,baseUrl} from "../_helpers/variable";

let apiUrlParams = "&language=en-US&query=";
let apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apikey + apiUrlParams;

export default class SearchInput extends Component {

	constructor(props) {

		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {

		this.resetComponent()
	}

	resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

	handleResultSelect = (e, { result }) => this.setState({ value: result.title });

	handleSearchChange = (e, { value }) => {

		this.setState({ isLoading: true, value });

		setTimeout(() => {

			if (this.state.value.length < 1)
				return this.resetComponent();

			// I DONT KNOW, WHAT THAT DOES
			const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
			const isMatch = result => re.test(result.title);

			// create url - append value in input
			let url = apiUrl + this.state.value;

			axios({
				method: 'get',
				url: url
			}).then((resp) => {

				let data = resp.data.results;
				let finalArray = [];
				let moreFilms = false;
				data = _.filter(data, isMatch);

				if( data.length > 5 ){
					moreFilms = true;
				}

				// set correct format
				data.slice(0, 6).forEach((value,key) => {

					// PRICE IS ID, BECAUSE SEMANTIC UI DOESNT WORK GOOD WITH OTHER PARAMETERS IN OBJECT - ID DIDNT WORK GOOD
					finalArray[key] = {
						childKey: value.id,
						price: value.id,
						title: value.title,
						description: textLimit(value.overview,30),
						image: "https://image.tmdb.org/t/p/w500" + value.poster_path,
						moreFilms: moreFilms,
						orderNumber: key,
						searchWord: this.state.value
					};
				});

				this.setState({
					isLoading: false,
					results: finalArray,
				});

			}).catch(err => {
				console.log(err);
			});
		}, 800)
	};

	handleSubmit = (event) => {

		if(event.keyCode === 13 && event.shiftKey === false) {
			window.location.href = baseUrl + 'movie/search/' + slugify(this.state.value);
		}
	}

	resultsWindow = ({price, title, image, moreFilms,description,orderNumber,searchWord}) => {

		if( orderNumber < 5 ){

			return (
				<a href={baseUrl+'film/'+price}>
					{ image &&
					<div key='image' className='image' style={{'justifyContent':'center','display':'flex'}}>
						<img srcSet={image || 'undefined'} alt="" style={{'margin':'0'}}/>
					</div>
					}
					<div key={price}>
						{title && <div className='title'>{title}</div>}
						{description && <div className='description'>{description}</div>}
					</div>
				</a>
			)
		} else if( moreFilms ){

			return (
				<div key={price}>
					<a href={baseUrl+'movie/search/'+slugify(searchWord)}>
						{'More films'}
					</a>
				</div>
			)
		}
	}

	render() {

		const { isLoading, value, results } = this.state;

		return (
			<Grid>
				<Grid.Column width={6}>
					<Search
						loading={isLoading}
						onResultSelect={this.handleResultSelect}
						onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
						results={results}
						value={value}
						placeholder={'Search...'}
						onKeyDown={this.handleSubmit}
						resultRenderer={this.resultsWindow}
						{...this.props}
					/>
				</Grid.Column>
			</Grid>
		)
	}
}
