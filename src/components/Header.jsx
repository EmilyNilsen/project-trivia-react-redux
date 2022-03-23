import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';

export default class Header extends Component {
  render() {
    const { name, email, score } = this.props;

    return (
      <header>
        <div className="container-header">
            <img
              src={ `https://www.gravatar.com/avatar/${MD5(email).toString()}` }
              alt="profile"
              data-testid="header-profile-picture"
              className="image-user"
              />
            <h3 className='title-game'>TRIVIA</h3>
            <div className="infos-user">
              <p>Player: <span data-testid="header-player-name">{ name }</span></p>
              <p>Pontuação:<span data-testid="header-score">{ score }</span></p>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;
