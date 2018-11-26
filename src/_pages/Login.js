import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import '../css/login.css';

import {setUserInBrowserStorage} from "../_helpers/helper";
import {baseUrl, ourApiUrl} from "../_helpers/variable";


class Login extends Component {

	constructor() {

		super();

		this.state = {
			user: {
				password: '',
				email: '',
				auth: false,
				error: false
			},
			error: ''
		};
		this.checkUser = this.checkUser.bind(this);
		this.onChangeInput = this.onChangeInput.bind(this);
	}

	// set to this.state password and email
	onChangeInput = (event) => {

		// set password and email data to this.state
		let value = event.target.value;
		let index = event.target.name;

		this.state.user[index] = value;
	}

	// after form submit
	checkUser = (event) => {

		event.preventDefault();

		// clear all data in local storage
		localStorage.clear();

		const {email, password} = this.state.user;
		const params = new URLSearchParams();

		// set password and email to params for ajax
		params.append('email', email);
		params.append('password', password);

		// CHECK USER INPUT -->
		axios({
			method: 'post',
			url: ourApiUrl + 'user/check',
			data: params
		}).then(resp => {

			let response = resp.data[0];
			let profilePicture = response.profile_picture || '';
			let name = response.name;
			let id = response.id;
			let days = 30;
			// check existance and correctness of login user data
			let isUser = response != undefined;

			if (isUser) {
				// with expiration
				setUserInBrowserStorage(email,days,profilePicture,name,id);
				// redirect
				window.location.href = baseUrl + 'home';
			} else{

				this.setState({ error: 'Invalid credentials!' });
			}

		}).catch(err => {
			console.log(err);
		});
	}

	render() {
		document.body.style.backgroundImage="url('background.png')";

		return (
			<div className="background">
			<div className="container">
				<ul className={'nav'}>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/register">Register</Link>
					</li>
				</ul>
				<div className="login-form">
					<div className="main-div">
						{/* IF IS SOME AUTHENTICATION ERROR, THEN WILL SHOW MESSAGE  */}
						{
							this.state.error &&
							<div className={'alert alert-danger'}><p>{ this.state.error }</p></div>
						}
						<div className="panel">
							<h2>Login</h2>
							<p>Please enter your email and password</p>
						</div>
						<form id="Login" onSubmit={this.checkUser}>
							<div className="form-group">
								<input type="email" className="form-control" id="email" placeholder="Email Address" name={'email'} onChange={this.onChangeInput}/>
							</div>
							<div className="form-group">
								<input type="password" className="form-control" id="password" placeholder="Password" name={'password'} onChange={this.onChangeInput}/>
							</div>
							<button type="submit" className="btn btn-primary">Login</button>
						</form>
					</div>
				</div>
			</div>
			</div>
		);
	}
}

export default Login;