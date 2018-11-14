import React, { Component } from 'react';
import './App.css';
import Login from './components/Login.js';
import FilmCard from './components/FilmCard.js';
import { Route, Switch } from 'react-router-dom'
import './css/FilmCard.css'
import Home from './components/Home';


class App extends Component {
  render() {
    return (
      <div className={'app-routes'}>
		  <Switch>
			  <Route path={'/login'} component={Login} />
			  <Route path={'/filmcard'} component={FilmCard} />
        <Route path={'/home'} component={Home} />
		  </Switch>
	  </div>
    );
  }
}

export default App;
