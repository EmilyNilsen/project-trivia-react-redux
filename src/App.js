import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ () => <Login /> } />
        <Route exact path="/game" component={ () => <Game /> } />
      </Switch>
    );
  }
}

export default App;
