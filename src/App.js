import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom'
import {checkAuth} from "./_helpers/helper";

// PAGES
import Login from './_pages/Login.js';
import Home from "./_pages/Home";
import Register from "./_pages/Register";

import FilmCard from "./_components/FilmCard";
import MyWatchlist from "./_pages/MyWatchlist";
import CompletedMovies from "./_pages/CompletedMovies";
import Profile from "./_pages/Profile";
import FilmDetail from "./_pages/FilmDetail";
import MyLists from './_pages/MyLists';

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
				<Route path={'/profile'} component={Profile}/>

				{/* FOR LOGGED USERS */}
				<Auth path={'/home'} component={Home} onEnter={Auth}/>
				<Auth path={'/film/:id?'} component={FilmDetail} />
				<Auth path={'/mylists'} component={MyLists}/>
				<Auth path={'/completedmovies'} component={CompletedMovies}/>
				<Auth path={'/mywatchlist'} component={MyWatchlist}/>
			</div>
		);
	}
}


export default App;
