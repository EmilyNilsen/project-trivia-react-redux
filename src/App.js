import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';
import Configuration from './pages/Configuration';
import FeedbackMessage from './components/FeedbackMessage'

class App extends Component {
  render() {
    return (
      <Switch>

        <Route exact path="/game" component={ Game } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/Configuration" component={ Configuration } />
        <Route exact path="/feedback" component={ FeedbackMessage } />
      </Switch>
    );
  }
}

export default App;
