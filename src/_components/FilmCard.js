import React, { Component } from 'react';
import MaterialIcon from 'react-google-material-icons'


let ourApiUrl = 'http://localhost:3000/';
let baseUrl = 'http://localhost:3001/';

class FilmCard extends Component {


    render() {
        return (
            <div className="card">
                <img src="#" />

                    <div className="marks">

                        <MaterialIcon icon="star_half" size={25}/>
                        <p id="rating">50%</p>
                        <a className=" filmcard-image"> <MaterialIcon icon="check_box" size={25}/></a>
                        <a className=" filmcard-image"><MaterialIcon icon="bookmark_border" size={25}/></a>

                    </div>
                    <h3><a href="#">FILM NAME</a></h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc feugiat, eros ut euismod ultrices, nisi ligula
                        sollicitudin eros, a posuere felis massa vel odio.
                        Vivamus vel elementum lacus<a href="#"> ...</a>
                    </p>
                    <p>language: EN</p>
            </div>
        );
    }
}

export default FilmCard;