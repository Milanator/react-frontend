import React, {Component} from 'react';
import {Header, Image, Modal, Icon, Grid, Container, Label,Dropdown} from 'semantic-ui-react'
import FilmCard from './FilmCard';
import {ourApiUrl} from "../_helpers/variable";
import axios from "axios";
import ListButtons from "./ListButtons";
import {getClosest} from "../_helpers/helper";

class FilmModal extends Component {

    constructor(props) {

        super(props);

        let userId = atob(JSON.parse(localStorage.getItem('user')).id);

        this.state = {
            userId: userId,
            // FROM HOME, ....
			inSeenList: this.props.inSeenList,
			inWatchList: this.props.inWatchList
        };

        this.addSeenWatchList = this.addSeenWatchList.bind(this);
        this.setWatchSeen = this.setWatchSeen.bind(this);
    }

    addSeenWatchList = (event) => {

        event.preventDefault();
        event.stopPropagation();

        let that = this;
        let icon = event.target;
        let anchorTag = icon.parentNode;
        let url = anchorTag.getAttribute('href');
        let inverseUrl = anchorTag.getAttribute('data-inverse-url');

        axios({
            method: 'get',
            url: url
        }).then(() => {

            // change visual of icon
            icon.classList.toggle('outline');
            // change href of anchors
            anchorTag.setAttribute('href',inverseUrl);
            anchorTag.setAttribute('data-inverse-url',url);

            if (icon.classList.contains('watchlist')) {
                // set opposite value
                that.setState({inWatchList: 1 - that.state.inWatchList});
            } else if (icon.classList.contains('seenlist')) {
                // set opposite value
                that.setState({inSeenList: 1 - that.state.inSeenList});
            }

        }).catch(err => {
            console.log(err);
        });
    };

	// function for adding and removing to myList
	addToMyList = (event) => {

		let target = event.target;
		target = getClosest(target,'.addToList');
		let listId = Number(target.getAttribute('data-list-id'));
		let data = {
			listId: listId,
			movieId: Number(target.getAttribute('data-movie-id')),
			posterPath: target.getAttribute('data-poster-path'),
			title: target.getAttribute('data-title'),
			overview: target.getAttribute('data-overview'),
			originalLanguage: target.getAttribute('data-original-language'),
			myListId: listId
		};
		const {movieInMyLists} = this.props;
		const index = movieInMyLists.indexOf(listId);
		let that = this;
		let url;

		// IF LIST CONTAINS MOVIE
		if( index !== -1 ){

			movieInMyLists.splice(index, 1);
			url = ourApiUrl+'mylist/delete';
		} else{		// IF LIST DOESNT CONTAIN MOVIE

			movieInMyLists.push(listId);
			url = ourApiUrl+'mylist/add';
		}

		axios({
			method: 'post',
			url: url,
			data: data
		}).then((res) => {

			that.setState({movieInMyLists: movieInMyLists});
			// send data to film modal --> update seen and watch button
			that.props.sendWatchSeen(that.state.inWatchList,that.state.inSeenList,that.state.movieInMyLists)

		}).catch(err => {
			console.log(err);
		});
	}

    // receive data from child --> FILMCARD.JS
    setWatchSeen = (watch,seen) => {
        this.setState({inWatchList: watch});
        this.setState({inSeenList: seen});
    };

    render() {

        const {id, poster_path, rating, title, overview, original_language,genres,userLists,movieInMyLists, ...rest} = this.props;
        const {userId,inSeenList,inWatchList} = this.state;

        return (

            <div>
                <Modal trigger={
                    <FilmCard id={id}
                              poster_path={poster_path}
                              rating={rating}
                              title={title}
                              overview={overview}
                              original_language={original_language}
                              inSeenList={inSeenList}
                              inWatchList={inWatchList}
                              sendWatchSeen={this.setWatchSeen}
							  genres={genres}
							  userLists={userLists}
							  movieInMyLists={movieInMyLists}
                    />
                } centered={false}>
                    <Modal.Header color="blue">{title}</Modal.Header>
                    <Modal.Content image scrolling>
						{ poster_path ? (
							<Image wrapped size="large" src={"https://image.tmdb.org/t/p/w500" + poster_path}/>
						): (
							<Image wrapped size="large" className={'undefined-logo'} src={require('../img/Logo.png')}/>
						)}
                        <Modal.Description>
                            <Header size="large">
                                <Grid columns={7}>
                                    <Grid.Column/><Grid.Column/>
									<ListButtons
										userLists={userLists}
										movieInMyLists={movieInMyLists}
										addToMyList={this.addToMyList}
										addSeenWatchList={this.addSeenWatchList}
										userId={userId}
										inWatchList={inWatchList}
										inSeenList={inSeenList}
										filmId={id}
										rating={rating}
										poster_path={poster_path}
										title={title}
										overview={overview}
										original_language={original_language}
									/>
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