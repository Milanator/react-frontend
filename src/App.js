import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom'
import {checkAuth} from "./_helpers/helper";

import Login from './_pages/Login.js';
import Home from "./_pages/Home";
import Register from "./_pages/Register";

import BrowseAllFilms from './_pages/BrowseAllFilms';
import FilmDetails from './_pages/FilmDetails';

// redirecting to inside application or login
function Auth({component: Component, ...rest}) {
	return (
		<Route{...rest} render={props =>
			checkAuth() ?
				(<Component {...props} />) :
				(<Redirect to={{pathname: "/login"}}/>)
		}/>
	);
}

class App extends Component {

	render() {
		return (
			<div className={'app-routes'}>
				<Route exact path={'/login'} component={Login}/>
				<Route exact path={'/register'} component={Register}/>
				<Route path={'/browseAll'} component={BrowseAllFilms}/>
				<Route path={'/details/:filmId'} component={FilmDetails} />
				<Auth path={'/home'} component={Home} onEnter={Auth}/>
			</div>
		);
	}
}


export default App;
