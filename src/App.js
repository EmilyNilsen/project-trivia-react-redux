import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';
import Configuration from './pages/Configuration';

class App extends Component {
  render() {
    return (
      <Switch>
<<<<<<< HEAD
        <Route exact path="/" component={ () => <Login /> } />
        <Route exact path="/game" component={ () => <Game /> } />
=======
        <Route exact path="/" component={ Login } />
        <Route exact patch="/Configuration" component={ Configuration } />
>>>>>>> 001b214fe80bbbb514c3c57683c4594e7eb172e1
      </Switch>
    );
  }
}

export default App;
