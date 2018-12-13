import React, { Component } from 'react';

import { Header, Image, Modal, Grid, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { addMyList } from "../_helpers/method";

import FilmCard from './FilmCard';
import ListButtons from "./ListButtons";
import FlashMessage from './FlashMessage'

import {capitalize} from "lodash/string";

class FilmModal extends Component {

    constructor(props) {

        super(props);

        let userId = atob(JSON.parse(localStorage.getItem('user')).id);

        this.state = {
            userId: userId,
            // FROM HOME, ....
        };


        this.changeFlashMessage = this.changeFlashMessage.bind(this)
    }

    addToMyList = (event) => {

        addMyList(event, this, 1)
    }

    // if props are updated, if data are changed
	changeFlashMessage = (flashMessage) => {

        this.props.changeFlashMessage(flashMessage)
    }

    render() {

        const { movieId, poster_path, rating, title, overview, original_language, genres, userLists, movieInMyLists } = this.props;
        const { userId, flashMessage } = this.state;

        return (

            <div>
                <Modal 
                    onClose={() => this.setState({flashMessage: false})}
                    trigger={
                    <FilmCard 
                        source='FilmCard'
                        movieId={movieId}
                        poster_path={poster_path}
                        rating={rating}
                        title={title}
                        overview={overview}
                        original_language={original_language}
                        genres={genres}
                        userLists={userLists}
                        movieInMyLists={movieInMyLists}
                        // sent props to parent
                        changeFlashMessage={this.changeFlashMessage}
                    />
                } centered={false}>
                    <Modal.Header color="blue">{title}</Modal.Header>
                    <Modal.Content image scrolling>

                        {poster_path ? (
                            <Image wrapped size="large" src={"https://image.tmdb.org/t/p/w500" + poster_path} />
                        ) : (
                             <Image wrapped size="large" className={'undefined-logo'} src={require('../img/Logo.png')} />
                        )}

                        <Modal.Description>
                            <Header size="large">
                                <div>

                                    { flashMessage && 
                                        <FlashMessage message={flashMessage.message} type={flashMessage.type}/>
                                    }
									<ListButtons
                                        source='FilmModal'
										userLists={userLists}
										movieInMyLists={movieInMyLists}
										addToMyList={this.addToMyList}
										userId={userId}
										movieId={movieId}
										rating={rating}
										poster_path={poster_path}
										title={title}
										overview={overview}
										genres={genres}
										original_language={original_language}
									/>
                                </div>
                            </Header>
                            <Container textAlign="left">
                                <p>Language: {capitalize(original_language)}</p>
                                <p>
                                    {overview}
                                </p>
                                <Button
                                    content='See All Details'
                                    color='blue'
                                    as={Link}
                                    to={'/film/' + movieId}
                                />
                            </Container>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        );

    }
}

export default FilmModal;