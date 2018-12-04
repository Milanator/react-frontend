import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom'
import {checkAuth} from "./_helpers/helper";

// PAGES
import Login from './_pages/Login.js';
import Home from "./_pages/Home";
import Register from "./_pages/Register";

import MyWatchlist from "./_pages/MyWatchlist";
import CompletedMovies from "./_pages/CompletedMovies";
import Profile from "./_pages/Profile";
import FilmDetail from "./_pages/FilmDetail";
import MyLists from './_pages/MyLists';
import SearchFilms from "./_pages/SearchFilms";

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
				<Route exact path={'/'} component={Login}/>
				<Route exact path={'/register'} component={Register}/>

				{/* FOR LOGGED USERS */}
				<Auth path={'/home'} exact component={Home} onEnter={Auth}/>
				<Auth path={'/film/search/:value'} exact component={SearchFilms}/>
				<Auth path={'/film/:id?'} exact component={FilmDetail} />
				<Auth path={'/mylists'} exact component={MyLists}/>
				<Auth path={'/completedmovies'} exact component={CompletedMovies}/>
				<Auth path={'/profile'} exact component={Profile}/>
				<Auth path={'/mywatchlist'} exact component={MyWatchlist}/>
			</div>
		);
	}
}


export default App;
