import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom'
import {checkAuth} from "./_helpers/helper";

// PAGES
import Login from './_pages/Login.js';
import Home from "./_pages/Home";
import Register from "./_pages/Register";
import NewFilms from "./_pages/newFilms";

import BrowseAllFilms from './_pages/BrowseAllFilms';
import FilmCard from "./_components/FilmCard";

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
				<Route exact path={['/login','/']} component={Login}/>
				<Route exact path={'/register'} component={Register}/>
				<Route path={'/filmcard'} component={FilmCard}/>

				{/* FOR LOGGED USERS */}
				<Auth path={'/home'} component={Home} onEnter={Auth}/>
				<Auth path={'/browseAll'} component={BrowseAllFilms}/>
				<Auth path={'/newfilms'} component={NewFilms}/>
			</div>
		);
	}
}


export default App;
