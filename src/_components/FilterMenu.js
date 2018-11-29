import React, { Component } from 'react'
import { Menu, Dropdown, Button } from 'semantic-ui-react'
import axios from 'axios'
import { movieDbDomain, movieApiKeyPart, ourApiUrl } from '../_helpers/variable';

let yearArray = [{ key: 0, value: 'All', text: 'All' }];
let genresArray = [];
let getFilmsByFilterCriteria = movieDbDomain + "discover/movie" + movieApiKeyPart + "&language=en-US&sort_by=popularity.desc&page=1";

export default class FilterMenu extends Component {

    constructor(props) {
        super(props);

        // create array with years (1900 - 2018) for filter dropdown
        for (let i = 2018; i > 1900; i--) {
            var year = { key: i, value: i, text: i };
            yearArray.push(year);
        }

        // create (correctly formatted) array with genres for filter dropdown
        for (let i = 0; i < this.props.genres.length; i++) {
            var genre = { key: this.props.genres[i].id, value: this.props.genres[i].name, text: this.props.genres[i].name }
            genresArray.push(genre);
        }

        this.state = {
            genres: genresArray,
            years: yearArray,
            films: [],
            chosenGenre: genresArray[0],
            chosenYear: yearArray[0],
        }
    }

    handleFilterClick(e) {
        let requestUrl = getFilmsByFilterCriteria;

        // create requestUrl with correct parameters
        if (this.state.chosenGenre && this.state.chosenGenre.key !== 0) {
            requestUrl = requestUrl + '&with_genres=' + this.state.chosenGenre.key;
        }

        if (this.state.chosenYear && this.state.chosenYear.key !== 0) {
            requestUrl = requestUrl + '&primary_release_year=' + this.state.chosenYear.key;
        }

        // request film results for set filter
        axios.get(requestUrl)
            .then(res => {
                this.props.onUpdate(res.data.results, res.data.total_pages, this.state.chosenGenre, this.state.chosenYear);
            }).catch(error => {
                console.log(error);
            });
    }

    // handle changes in genre filter
    handleGenreChange(e, data) {
        const { value } = data;
        let chosenGenre = data.options.find(o => o.value === value);
        this.setState({ chosenGenre });
    }

    // handle changes in year filter
    handleYearChange(e, data) {
        const { value } = data;
        let chosenYear = data.options.find(o => o.value === value);
        this.setState({ chosenYear });
    }

    render() {
        const { value, years, genres } = this.state;

        let chosenYear = this.state.chosenYear;
        let chosenGenre = this.state.chosenGenre;

        /*  
        *   Get already selected filter values if they have been set 
        *   (this is the case after the user requested another page of results at least once)
        */
        if (this.props.chosenYear) {
            chosenYear = this.props.chosenYear;
        }

        if (this.props.chosenGenre) {
            chosenGenre = this.props.chosenGenre;
        }

        return (
            <Menu borderless text compact size="small">
                <Menu.Menu>
                    <Dropdown
                        placeholder='Select Genre'
                        search
                        selection
                        value={value}
                        defaultValue={genres[genres.indexOf(chosenGenre)].value}
                        options={genres}
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