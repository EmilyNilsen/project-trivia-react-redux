import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Configuration from './pages/Configuration';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ () => <Login /> } />
        <Route exact patch="/Configuration" component={ Configuration } />
      </Switch>
    );
  }
}

export default App;
