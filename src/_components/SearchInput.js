import _ from 'lodash'
import React, { Component } from 'react'
import axios from 'axios';
import { Search, Grid } from 'semantic-ui-react'
import {textLimit} from "../_helpers/helper";

let apikey = "e0338266d7945597731b014d7e806075";
let apiurlparams = "&language=en-US&query=";
let apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apikey + apiurlparams;

export default class SearchInput extends Component {

	componentWillMount() {
		this.resetComponent()
	}

	resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

	handleResultSelect = (e, { result }) => this.setState({ value: result.title })

	handleSearchChange = (e, { value }) => {
		this.setState({ isLoading: true, value })

		setTimeout(() => {

			if (this.state.value.length < 1)
				return this.resetComponent()

			const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
			const isMatch = result => re.test(result.title);

			let url = apiUrl + this.state.value;

			axios({
				method: 'get',
				url: url
			}).then((resp) => {

				let data = resp.data.results;

				data.forEach((value,key) => {

					data[key] = {
						title: value.title,
						description: textLimit(value.overview,30),
						image: "https://image.tmdb.org/t/p/w500" + value.poster_path
					}
				});

				this.setState({
					isLoading: false,
					results: _.filter(data, isMatch),
				})

			}).catch(err => {
				console.log(err);
			});
		}, 300)
	}

	render() {
		const { isLoading, value, results } = this.state

		return (
			<Grid>
				<Grid.Column width={6}>
					<Search
						loading={isLoading}
						onResultSelect={this.handleResultSelect}
						onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
						results={results}
						value={value}
						{...this.props}
					/>
				</Grid.Column>
			</Grid>
		)
	}
}
