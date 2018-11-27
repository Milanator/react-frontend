import React, {Component} from 'react';
import {Icon, Grid, Label} from 'semantic-ui-react';
import '../css/filmcard.css';
import '../css/profile.css'

import {textLimit} from "../_helpers/helper";
import {ourApiUrl} from "../_helpers/variable";
import axios from "axios";
import TopNavigation from "./TopNavigation";

class Profile extends Component {


    constructor(props) {
        super(props);
        
        let user = JSON.parse(localStorage.getItem('user'));
        this.state = {
            user: {
                profilePicture: atob(user.profilePicture),
                name: atob(user.name),
                email: atob(user.email),
                userid: atob(user.id),
                seenCount: "",
                watchCount: "",
            }
        }

        var that = this;
        axios.get(ourApiUrl + "/seenlist/user/" + that.state.user.userid+ "/count" )
            .then(res => {
                that.setState({
                watchCount: res.data});
                console.log(that.state);

            })
            .catch(error => {
                console.log(error);
            });

        }



    render() {
        return(
<div id="profile">
<TopNavigation/>

    <div id ="picture">
<img src={this.state.user.profilePicture} width={200} height={200}  />
        <h1>{this.state.user.name}</h1>
    </div>
    <div id = "informations">
        <h1> Informations:</h1>
        <table class ="table">
            <thead>
        <tr>
            <td> <h3>Name</h3> </td>
            <td> {this.state.user.name} </td>

        </tr>
            <tr>
                <td><h3>Mail</h3></td>
                <td> {this.state.user.email} </td>
            </tr>

        <tr>
            <td><h3>seen list</h3></td>
            <td> {this.state.user.watchCount} </td>
        </tr>

        <tr>
            <td><h3>Watched list</h3></td>
            <td> {this.state.user.email} </td>
        </tr>

        </thead>
        </table>
        <button  id ="editprofile" type="button" className="btn btn-dark"> Edit profile</button>
    </div>
</div>

        )};
}



export default Profile;