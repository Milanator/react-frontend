import React, { Component } from 'react'
import { Menu, Dropdown, Button } from 'semantic-ui-react'
import axios from 'axios'
import { movieDbDomain, movieApiKeyPart, ourApiUrl } from '../_helpers/variable';

let yearArray = [{ key: 0, value: 'All', text: 'All' }];
let getFilmsByFilterCriteria = movieDbDomain + "discover/movie" + movieApiKeyPart + "&language=en-US&sort_by=popularity.desc&page=1";

export default class FilterMenu extends Component {

    constructor(props) {
        super(props);

        for (let i = 2018; i > 1900; i--) {
            var year = { key: i, value: i, text: i };
            yearArray.push(year);
        }

        this.state = {
            genres: [],
            years: yearArray,
            films: [],
            chosenGenre: '',
            chosenYear: yearArray[0],
        }

    }
    
    handleFilterClick(e) {
        let requestUrl = getFilmsByFilterCriteria;

        if(this.state.chosenGenre && this.state.chosenGenre.key !== 0) {
            requestUrl = requestUrl + '&with_genres=' + this.state.chosenGenre.key;
        }

        if(this.state.chosenYear && this.state.chosenYear.key !== 0) {
            requestUrl = requestUrl + '&primary_release_year=' + this.state.chosenYear.key;
        }

        console.log(requestUrl);

        axios.get(requestUrl)
            .then(res => {
                this.props.onUpdate(res.data.results, res.data.total_pages, this.state.chosenGenre, this.state.chosenYear);
            }).catch(error => {
                console.log(error);
            });
    }

    handleGenreChange(e, data) {
        const { value } = data;
        let chosenGenre = data.options.find(o => o.value === value);
        this.setState({ chosenGenre });
    }

    handleYearChange(e, data) {
        const { value } = data;
        let chosenYear = data.options.find(o => o.value === value);
        this.setState({ chosenYear });
    }

    render() {
        const { value, years } = this.state;
        const { genres } = this.props;

        let chosenYear = this.state.chosenYear;

        if(this.props.chosenYear) {
            chosenYear = this.props.chosenYear;
        }

        console.log(years.indexOf(this.props.chosenYear));
        return (
            <Menu borderless text compact size="small">
                <Menu.Menu>
                    <Dropdown
                        placeholder='Select Genre'
                        search
                        selection
                        value={value}
                        defaultValue={genres[0].name}
                        options={
                            genres.map(genre => ({
                            key: genre.id,
                            value: genre.name,
                            text: genre.name
                        }))}
                        onChange={this.handleGenreChange.bind(this)} />
                </Menu.Menu>
                <Menu.Menu>
                    <Dropdown
                        placeholder='Select Year'
                        search
                        selection
                        value={value}
                        defaultValue={years[years.indexOf(chosenYear)].value}
                        options={years}
                        onChange={this.handleYearChange.bind(this)} />
                </Menu.Menu>
                <Button
                    icon='right arrow'
                    inverted
                    color='blue'
                    onClick={this.handleFilterClick.bind(this)} />
            </Menu>
        )
    }
}