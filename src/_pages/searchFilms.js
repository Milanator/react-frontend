import React, { Component } from 'react';
import MaterialIcon from 'react-google-material-icons'

import axios from "axios"
import TopNavigation from "./../_components/TopNavigation";

let ourApiUrl = 'http://localhost:3000/';
let baseUrl = 'http://localhost:3001/';

var apikey= "e0338266d7945597731b014d7e806075";
var apiurlparams = "&language=en-US&query=";
var searchword = "harry";
var  apiurl= "https://api.themoviedb.org/3/search/movie?api_key="+ apikey  + apiurlparams + searchword;


class SearchFilms extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
        this.getApiData = this.getApiData.bind(this);

        window.onload =this.getApiData;

    }
    getApiData() {
        let that = this;

        axios.get(apiurl).then(res => {
            const data= res.data.results;
            console.log(data);
            that.setState({ data });
            console.log(that.state);
        });
    }

    render() {
        return (
            <div>
                <TopNavigation/>
                <div className="content">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">search for films</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        placeholder="Enter email">
                        placeholder="Enter email">
                        <button> search</button>
                    </div>
                    {this.state.data.map(data=> (
                        <div  key={data.id} className="card">
                            <img src={"https://image.tmdb.org/t/p/w500/"+data.poster_path} alt=""/>

                            <div className="marks">

                                <MaterialIcon icon="star_half" size={25}/>
                                <p id="rating">{(data.vote_average*10) }%</p>
                                <a className=" image"> <MaterialIcon icon="check_box" size={25}/></a>
                                <a className=" image"><MaterialIcon icon="bookmark_border" size={25}/></a>

                            </div>
                            <h3><a href="#">{data.title}</a></h3>
                            <p>{ data.overview.length < 230 ? data.overview  :
                                data.overview.substring(0,240)+"..."}
                            </p>

                            <p>language: {data.original_language}</p>

                        </div>

                    ))}
                </div>
            </div>
        );
    }
}

export default SearchFilms;