import React, { Component } from 'react';
import { Header, Image, Modal, Icon, Grid, Container } from 'semantic-ui-react'
import FilmCard from './FilmCard';

class FilmModal extends Component {
  render() {
    const { id, poster_path, rating, title, overview, original_language, ...rest } = this.props;

    return (

      <div>
        <Modal trigger={<FilmCard
          id={id}
          poster_path={poster_path}
          rating={rating}
          title={title}
          overview={overview}
          original_language={original_language} />}
          centered={false}>

          <Modal.Header>{title}</Modal.Header>

          <Modal.Content image>

            <Image wrapped size='large' src={"https://image.tmdb.org/t/p/w500" + poster_path} />

            <Modal.Description>

              <Header size="large">

                <Grid columns={7}>
                  <Grid.Column width={4}>
                    <Icon name="star half" /> {rating}%
                  </Grid.Column>
                  <Grid.Column /><Grid.Column /><Grid.Column />
                  <Grid.Column>
                    <Icon link name="bookmark outline" />
                  </Grid.Column>
                  <Grid.Column>
                    <Icon link name="check square outline" />
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