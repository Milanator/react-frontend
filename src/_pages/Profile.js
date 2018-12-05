import React, {Component} from 'react';
import axios from "axios";
import {ourApiUrl} from "../_helpers/variable";

import '../css/filmcard.css';
import '../css/profile.css'

import TopNavigation from "./../_components/TopNavigation";
import {setUserInBrowserStorage} from "../_helpers/helper";

class Profile extends Component {

	constructor(props) {

		super(props);

		let user = JSON.parse(localStorage.getItem('user'));

		this.state = {
			user: {
				profilePicture: atob(user.profilePicture),
				name: atob(user.name),
				email: atob(user.email),
				userId: atob(user.id),
				oldPassword: '',
				newPassword: '',
				passwordConfirmation: '',
				seenCount: "",
				watchCount: ""
			},
			error: ''
		}

		this.handleForm = this.handleForm.bind(this);
		this.onChangeInput = this.onChangeInput.bind(this);
	}

	onChangeInput = (event) => {

		let value = event.target.value;
		let name = event.target.name;

		this.state.user[name] = value;
	}

	handleForm = (event) => {

		event.preventDefault();

		let that = this;
		let {name,email,userId,newPassword,oldPassword,passwordConfirmation,profilePicture} = this.state.user;


		// if user doesnt try to change password
		if( !newPassword || !passwordConfirmation ){
			newPassword = passwordConfirmation = oldPassword;
		}

		// different passwords
		if (newPassword !== passwordConfirmation) {

			that.setState({error: 'Different passwords!'});
			return;
		}

		axios({
			method: 'POST',
			url: ourApiUrl + "user/update",
			data: {
				userId: userId,
				name: name,
				email: email,
				oldPassword: oldPassword,
				newPassword: newPassword,
				profilePicture: profilePicture
			}
		}).then((resp) => {

			// check, if password is not correct
			if( resp.data.affectedRows == 0 ){

				that.setState({error: 'Incorrect passwords!'});
			} else if( resp.data.code === "ER_DATA_TOO_LONG" ){ // incorrect profile picture format

				that.setState({error: 'Incorrect image format!'});
			} else{

				let days = 30;
				// with expiration
				setUserInBrowserStorage(email,days,profilePicture,name,userId);
				window.location.reload();
			}
		}).catch(error => {
			console.log( error );
			that.setState({error: 'Error. '});
		});
	}

	render() {

		const {profilePicture,name,email,userId,newPassword,oldPassword,passwordConfirmation} = this.state.user;

		return (
			<div id="profile">
				<TopNavigation/>
				<div id="picture">
					<img src={profilePicture} width={200} height={200}/>
					<h1>{name}</h1>
				</div>
				<form action={ourApiUrl + 'user'} method={'POST'} onSubmit={this.handleForm}>
					{/* IF IS SOME AUTHENTICATION ERROR, THEN WILL SHOW MESSAGE  */}
					{
						this.state.error &&
						<div className={'alert alert-danger'}><p>{this.state.error}</p></div>
					}
					<div id="informations">
						<h1>Your Profile</h1>
						<p>Attention: For each change in profile you have to enter your current password. </p>
						<input type="hidden" name="userId" value={userId}/>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input type="text" className="form-control" id="name" placeholder="Enter name" name={'name'} defaultValue={name} onChange={this.onChangeInput}/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input type="email" className="form-control" id="email" placeholder="Enter email" name={'email'} defaultValue={email} onChange={this.onChangeInput}/>
						</div>
						<div className="form-group">
							<label htmlFor="profilePicture">Link to profile picture</label>
							<input type="test" className="form-control" id="profilePicture" placeholder="Enter link on profile picture" name={'profilePicture'} defaultValue={profilePicture} onChange={this.onChangeInput}/>
						</div>
						<div className="form-group">
							<label htmlFor="newPassword">New Password</label>
							<input type="password" className="form-control" id="newPassword" placeholder="Enter password" name={'newPassword'} defaultValue={newPassword} onChange={this.onChangeInput}/>
						</div>
						<div className="form-group">
							<label htmlFor="passwordConfirmation">Password Confirmation</label>
							<input type="password" className="form-control" id="passwordConfirmation" placeholder="Enter password" name={'passwordConfirmation'} defaultValue={passwordConfirmation} onChange={this.onChangeInput}/>
						</div>
						<div className="form-group">
							<label htmlFor="oldPassword">Current Password</label>
							<input type="password" className="form-control" id="oldPassword" placeholder="Enter password" name={'oldPassword'} defaultValue={oldPassword} onChange={this.onChangeInput}/>
						</div>
						<button id="edit-profile" className="btn btn-primary">Save Profile</button>
					</div>
				</form>
			</div>

		)
	};
}


export default Profile;