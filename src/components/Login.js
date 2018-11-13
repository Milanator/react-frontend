import React, { Component } from 'react';
import logo from "./../Logo.png";
import axios from 'axios';

let ourApiUrl = 'http://localhost:3000/';
let baseUrl = 'http://localhost:3001/';

class Login extends Component {

	constructor(){

		super();

		this.state = {
			user: {
				password: '',
				email: '',
				authenticated: '',
				error: null
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

		const {email,password} = this.state.user;

		const params = new URLSearchParams();
		params.append('email', email);
		params.append('password', password);

		axios({
			method: 'post',
			url: ourApiUrl+'user/check',
			data: params
		}).then(res => {
			this.state.user.authenticated = res.data[0] ? 1 : 0;
		}).catch(err => {
			console.log( err );
		});
	}

    render() {
        return (

            <div className="container">

                <h1 className="form-heading">login Form</h1>
                
                <div className="login-form">
                    <div className="main-div">

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