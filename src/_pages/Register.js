import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

import {baseUrl, ourApiUrl} from "../_helpers/variable";
import FlashMessage from '../_components/FlashMessage';

class Register extends Component {

	constructor(){

		super();
		this.state = {
			user: {
				name: '',
				email: '',
				password: '',
				confirm_password: ''
			},
			error: '',
			success: ''
		};
		this.userRegister = this.userRegister.bind(this);
		this.onChangeInput = this.onChangeInput.bind(this);
		this.createWatchSeenList = this.createWatchSeenList.bind(this);
	}

	onChangeInput = (event) => {

		let value = event.target.value;
		let index = event.target.name;

		// this.state.user[index] = value;
		this.state.user[index] = value;
	}

	createWatchSeenList = (userId) => {

		let url = ourApiUrl+'mylist/create';

		axios.all([
			axios({
				method: 'post',
				url: url,
				data: {
					userId: userId,
					name: 'Watchlist',
					description: 'A list for the movies you always wanted to see.',
					first: 1,
					shortcut: 'watch'
				}
			}),
			axios({
				method: 'post',
				url: url,
				data: {
					userId: userId,
					name: 'Completed movies',
					description: 'A list for the movies you have already seen.',
					first: 1,
					shortcut: 'seen'
				}
			}),

		]).then((resp) => {
			console.log( resp );

		}).catch((error) => {
			console.log( error )
		})
	}

	userRegister = (event) => {

		event.preventDefault();

		let that = this;
		let {confirm_password,password,email,name} = this.state.user;

		that.setState({ success:'',error:'' });

		if( confirm_password === password ){

			const params = new URLSearchParams();

			// set password and email to params for ajax
			params.append('name', name);
			params.append('email', email);
			params.append('password', password);

			axios({
				method: 'post',
				url: ourApiUrl + 'user/',
				data: params
			}).then( (resp) => {
				// SQL ERROR IS NOT ERROR LIKE RESPONSE FROM AJAX
				if(resp.data.hasOwnProperty('errno')){

					that.setState({ error: resp.data.sqlMessage })
				} else{

					let userId = resp.data.insertId;
					this.createWatchSeenList(userId);
					that.setState({ success: 'Successful registration!' })
				}
			}).then(() => {
				window.location.href = baseUrl + 'login';
			}).catch(err => {
				console.log(err);
			})
		} else{
			that.setState({ error: 'Different passwords!' })
		}
	}

	render() {
		document.body.style.backgroundImage="url('background.png')";
		return (
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
							<FlashMessage message={this.state.success} type={'danger'}/>
						}

						{/* IF REGISTRATION IS SUCCESSFUL  */}
						{
							this.state.success && 
							<FlashMessage message={this.state.success} type={'success'}/>
						}

						<div className="panel">
							<h2>Register</h2>
							<p>Please enter your user name, email and password</p>
						</div>
						<form id="Login" onSubmit={this.userRegister}>
							<div className="form-group">
								<input type="text" className="form-control" id="name" placeholder="User name" name={'name'} onChange={this.onChangeInput}/>
							</div>
							<div className="form-group">
								<input type="email" className="form-control" id="email" placeholder="Email Address" name={'email'} onChange={this.onChangeInput}/>
							</div>
							<div className="form-group">
								<input type="password" className="form-control" id="password" placeholder="Password" name={'password'} onChange={this.onChangeInput}/>
							</div>
							<div className="form-group">
								<input type="password" className="form-control" id="confirm_password" placeholder="Password confirmation" name={'confirm_password'} onChange={this.onChangeInput}/>
							</div>
							<button type="submit" className="btn btn-primary">Register</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;