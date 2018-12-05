import React, {Component} from 'react';
import {Header, Image, Modal, Grid, Container} from 'semantic-ui-react'
import FilmCard from './FilmCard';
import ListButtons from "./ListButtons";
import {addMyList, addSeenWatchList} from "../_helpers/method";

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

	// function for add to seen and watchlist list also
	addSeenWatchList = (event) => {

		addSeenWatchList(event,this,1)
	}

	addToMyList = (event) => {

		addMyList(event,this,1)
	}

    // receive data from child --> FILMCARD.JS
    setWatchSeen = (watch,seen) => {
        this.setState({inWatchList: watch});
        this.setState({inSeenList: seen});
    };

    render() {

        const {movieId, poster_path, rating, title, overview, original_language,genres,userLists,movieInMyLists, ...rest} = this.props;
        const {userId,inSeenList,inWatchList} = this.state;

        return (

            <div>
                <Modal trigger={
                    <FilmCard movieId={movieId}
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
										movieId={movieId}
										rating={rating}
										poster_path={poster_path}
										title={title}
										overview={overview}
										genres={genres}
										original_language={original_language}
									/>
                                </Grid>
                            </Header>
                            <Container textAlign="left">
                                <p>Language: {original_language}</p>
                                <p>
                                    {overview}
                                    </p>
                                <a className={"btn btn-primary"} href={"film/"+ movieId}>
									See all details</a>
                            </Container>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        );

    }
}

export default FilmModal;