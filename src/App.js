import React, { Component } from 'react';
import './App.css';
import Login from './components/Login.js';
import { Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className={'app-routes'}>
		  <Switch>
			  <Route path={'/login'} component={Login} />
		  </Switch>
	  </div>
    );
  }
}

export default App;
