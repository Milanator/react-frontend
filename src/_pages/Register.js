import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

import logo from "../img/Logo.png";
import {ourApiUrl} from "../_helpers/variable";

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
	}

	onChangeInput = (event) => {

		let value = event.target.value;
		let index = event.target.name;

		this.state.user[index] = value;
	}

	userRegister = (event) => {

		event.preventDefault();

		let that = this;
		let {confirm_password,password,email,name} = this.state.user;

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
			}).then( () => {
				that.setState({ success: "Successful registration!" })
			}).catch(err => {
				console.log(err);
			})
		} else{
			that.setState({ error: 'Different passwords!' })
		}
	}

	render() {
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
							<div className={'alert alert-danger'}><p>{ this.state.error }</p></div>
						}

						{/* IF REGISTRATION IS SUCCESSFUL  */}
						{
							this.state.success &&
							<div className={'alert alert-success'}><p>{ this.state.success }</p></div>
						}

						<div className="login-image">
							<img src={logo} width="70px"/>
						</div>
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