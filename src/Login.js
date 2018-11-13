import React, { Component } from 'react';
import logo from "./Logo.png";

class Login extends Component {
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

                        <form id="Login">
                            <div className="form-group">
                                <input type="email" className="form-control" id="inputEmail" placeholder="Email Address" />
                            </div>

                            <div className="form-group">
                                <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
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