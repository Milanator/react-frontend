import React, { Component } from 'react';
import MaterialIcon from 'react-google-material-icons';
import { Icon, Grid, GridColumn, Popup } from 'semantic-ui-react';
import '../css/filmcard.css';

class FilmCard extends Component {

    render() {

        const { id, poster_path, rating, title, overview, original_language, ...rest } = this.props;

        return (
            <div className="card" {...rest}>
                <img src={"https://image.tmdb.org/t/p/w500" + poster_path} alt="movie poster" />

                <div className="marks">
                    <Grid verticalAlign="middle">
                        <Grid.Column textAlign="center" width={9}>
                            <Icon color="grey" name="star half" />{rating}%                            
                        </Grid.Column>
                        <Grid.Column>
                           <Icon color="grey" name="bookmark outline" />
                        </Grid.Column>
                        <Grid.Column>
                            <Icon  color="grey" name="check square outline" />
                        </Grid.Column>
                    </Grid>

                </div>
                <h3>
                    {title}
                </h3>
                <p>
                    {overview < 230 ? overview : overview.substring(0, 240) + "..."}
                </p>
                <p>
                    language: {original_language}
                </p>
            </div>
        );
    }
}

export default FilmCard;