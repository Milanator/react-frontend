import React, { Component } from 'react';
import './App.css';
import Login from './components/Login.js';
import FilmCard from './components/FilmCard.js';
import { Route, Switch } from 'react-router-dom'
import './css/FilmCard.css'


class App extends Component {
  render() {
    return (
      <div className={'app-routes'}>
		  <Switch>
			  <Route path={'/login'} component={Login} />
			  <Route path={'/filmcard'} component={FilmCard} />
		  </Switch>
	  </div>
    );
  }
}

export default App;
