import React, {Component} from 'react';
import logo from "./../Logo.png";
import axios from 'axios';
import {Link} from "react-router-dom";


let ourApiUrl = 'http://localhost:3000/';
let baseUrl = 'http://localhost:3001/';

class Login extends Component {

	constructor() {

		super();

		this.state = {
			user: {
				password: '',
				email: '',
				authenticated: false,
				error: false
			}
		};
		this.checkUser = this.checkUser.bind(this);
		this.onChangeInput = this.onChangeInput.bind(this);
	}

	onChangeInput = (event) => {

		let value = event.target.value;
		let index = event.target.name;

		this.state.user[index] = value;
	}

	checkUser = (event) => {

		event.preventDefault();

		const {email, password} = this.state.user;

		const params = new URLSearchParams();
		params.append('email', email);
		params.append('password', password);

		axios({
			method: 'post',
			url: ourApiUrl + 'user/check',
			data: params
		}).then(response => {

			let data = response.data[0];
			let emptyResponse = data != undefined;

			let userValue = {
				email: emptyResponse ? data.email : this.state.user.email,
				authenticated: emptyResponse ? true : false,
				error: emptyResponse ? false : true,
				password: this.state.user.password
			};
			// CHECK RESPONSE FROM SERVER AND SET VALUES
			this.setState({user: userValue});

		}).catch(err => {
			console.log(err);
		}).then((res) => {
			console.log(res);
		});
	}

	render() {
		return (

			<div className="container">
				<ul>
					<li>
						<Link to="/login">Login</Link>
					</li>
				</ul>
				<div className="login-form">
					<div className="main-div">

						{/* IF IS SOME AUTHENTICATION ERROR, THEN WILL SHOW MESSAGE  */}
						{
							this.state.user.error &&
							<div className={'alert alert-danger'}><p>Invalid credentials</p></div>
						}

						<div className="login-image">
							<img src={logo} width="70px"/>
						</div>
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
		);
	}
}

export default Login;