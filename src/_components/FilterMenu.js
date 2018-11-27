import React, { Component } from 'react'
import { Menu, Dropdown, Button } from 'semantic-ui-react'
import axios from 'axios'
import { movieDbDomain, movieApiKeyPart, ourApiUrl } from '../_helpers/variable';

let yearArray = [{ key: 0, value: 'All', text: 'All' }];
let getGenresApiUrl = movieDbDomain + "3/genre/movie/list" + movieApiKeyPart + "&language=en-US";
let getFilmsByFilterCriteria = movieDbDomain + "3/discover/movie" + movieApiKeyPart + "&language=en-US&sort_by=popularity.desc&page=1";

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
            chosenYear: '',
        }

    }

    componentDidMount() {
        let genresArray;
        axios.get(getGenresApiUrl)
            .then(res => {
                genresArray = res.data.genres;
                genresArray.unshift({ id: 0, name: 'All' });
                this.setState({ genres: genresArray });
            })
            .catch(error => {
                console.log(error);
            }); 
    }

    handleFilterClick(e) {
        let requestUrl;
        if (this.state.chosenGenre.key === 0 || this.state.chosenYear === 0 || (this.state.chosenGenre.key == '' && this.state.chosenYear == '')) {
            requestUrl = getFilmsByFilterCriteria;
        } if (this.state.chosenGenre.key == '' && this.state.chosenYear != '') {
            requestUrl = getFilmsByFilterCriteria + '&primary_release_year=' + this.state.chosenYear;
        } if (this.state.chosenGenre.key != '' && this.state.chosenYear != '') {
            requestUrl = getFilmsByFilterCriteria + '&primary_release_year=' + this.state.chosenYear + '&with_genres=' + this.state.chosenGenre.key;
        } if (this.state.chosenGenre.key != '' && this.state.chosenYear == '') {
            requestUrl = getFilmsByFilterCriteria + '&with_genres=' + this.state.chosenGenre.key;
        }

        axios.get(requestUrl)
            .then(res => {
                this.props.onUpdate(res.data.results, this.state.chosenGenre, this.state.chosenYear);
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
        let chosenYear = data.options.find(o => o.value === value).key;
        this.setState({ chosenYear });
    }

    render() {
        const { value, chosenGenre, chosenYear, years, genres, ...rest } = this.state;
        return (
            <Menu borderless text compact size="small">
                <Menu.Menu>
                    <Dropdown
                        placeholder='Select Genre'
                        search
                        selection
                        value={value}
                        options={genres.map(genre => ({
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
                        options={years}
                        onChange={this.handleYearChange.bind(this)} />
                </Menu.Menu>
                <Button
                    content='Filter'
                    icon='right arrow'
                    labelPosition='right'
                    color='blue'
                    compact
                    onClick={this.handleFilterClick.bind(this)} />
            </Menu>
        )
    }
}