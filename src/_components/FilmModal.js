import React, {Component} from 'react';
import {Header, Image, Modal, Icon, Grid, Container, Label} from 'semantic-ui-react'
import FilmCard from './FilmCard';
import {apikey, ourApiUrl} from "../_helpers/variable";
import axios from "axios";

class FilmModal extends Component {

    constructor(props) {

        super(props);

        let userId = atob(JSON.parse(localStorage.getItem('user')).id);

        this.state = {
            userId: userId,
            // FROM HOME, ....
            seenList: this.props.inSeenList,
            watchList: this.props.inWatchList
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
                that.setState({watchList: 1 - that.state.watchList});
            } else if (icon.classList.contains('seenlist')) {
                // set opposite value
                that.setState({seenList: 1 - that.state.seenList});
            }

        }).catch(err => {
            console.log(err);
        });
    };

    // receive data from child --> FILMCARD.JS
    setWatchSeen = (watch,seen) => {
        this.setState({watchList: watch});
        this.setState({seenList: seen});
    };

    render() {

        const {id, poster_path, rating, title, overview, original_language,genres, ...rest} = this.props;
        const {userId,seenList,watchList} = this.state;
        return (

            <div>
                <Modal trigger={
                    <FilmCard id={id}
                              poster_path={poster_path}
                              rating={rating}
                              title={title}
                              overview={overview}
                              original_language={original_language}
                              inSeenList={seenList}
                              inWatchList={watchList}
                              sendWatchSeen={this.setWatchSeen}
							  genres={genres}
                    />
                } centered={false}>
                    <Modal.Header color="blue">{title}</Modal.Header>
                    <Modal.Content image scrolling>
                        <Image wrapped size="large" src={"https://image.tmdb.org/t/p/w500" + poster_path}/>
                        <Modal.Description>
                            <Header size="large">
                                <Grid columns={7}>
                                    <Grid.Column width={4}>
                                        <Label color="blue" size="large">
                                            <Icon name="star half"/> {rating}%
                                        </Label>
                                    </Grid.Column>
                                    <Grid.Column/><Grid.Column/><Grid.Column/>
                                    <Grid.Column>

                                        { watchList == 1 ? (
                                            <a href={ourApiUrl+"watchlist/user/"+userId+"/film/"+id+'/delete'}
                                               onClick={this.addSeenWatchList}
                                               data-inverse-url={ourApiUrl+"watchlist/user/"+userId+"/film/"+id}
                                            >
                                                <Icon link
                                                      color="blue"
                                                      name={"bookmark" + (watchList ? "" : " outline")}
                                                      className={'watchlist'}/>
                                            </a>
                                        ):(
                                            <a href={ourApiUrl+"watchlist/user/"+userId+"/film/"+id}
                                               onClick={this.addSeenWatchList}
                                               data-inverse-url={ourApiUrl+"watchlist/user/"+userId+"/film/"+id+'/delete'}
                                            >
                                                <Icon link
                                                      color="blue"
                                                      name={"bookmark" + (watchList ? "" : " outline")}
                                                      className={'watchlist'}
                                                />
                                            </a>
                                        )}

                                    </Grid.Column>
                                    <Grid.Column>

                                        { seenList == 1 ? (
                                            <a href={ourApiUrl+"seenlist/user/"+userId+"/film/"+id+'/delete'}
                                               onClick={this.addSeenWatchList}
                                               data-inverse-url={ourApiUrl+"seenlist/user/"+userId+"/film/"+id}
                                            >
                                                <Icon link
                                                      color="blue"
                                                      name={"check square"+ (seenList ? "" : " outline")}
                                                      className={'seenlist'}
                                                />
                                            </a>
                                        ) : (
                                            <a href={ourApiUrl+"seenlist/user/"+userId+"/film/"+id}
                                               onClick={this.addSeenWatchList}
                                               data-inverse-url={ourApiUrl+"seenlist/user/"+userId+"/film/"+id+'/delete'}
                                            >
                                                <Icon link color="blue"
                                                      name={"check square"+ (seenList ? "" : " outline")}
                                                      className={'seenlist'}
                                                />
                                            </a>
                                        )}

                                    </Grid.Column>
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