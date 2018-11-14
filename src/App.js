import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'

import Login from './_pages/Login.js';
import Home from "./_pages/Home";
import FilmCard from "./_components/FilmCard";

// helper function for checking authenticated user
function checkAuth() {

	const token = localStorage.getItem('token');
	const refreshToken = localStorage.getItem('refreshToken');

	if( !token || !refreshToken ){
		return false;
	}

	return true;
}

// redirecting to inside application or login
function Auth({ component: Component, ...rest }) {
	return (
		<Route{...rest} render={props =>
			checkAuth() ?
				( <Component {...props} /> ) :
				( <Redirect to={{ pathname: "/login" }} /> )
		}
		/>
	);
}

class App extends Component{

render() {
	return (
	  <div className={'app-routes'}>
		  <Route exact path={'/login'} component={Login} />
		  <Route path={'/filmcard'} component={FilmCard} />
		  <Auth path={'/home'} component={Home} onEnter={Auth}/>
	  </div>
	);
  }
}


export default App;
