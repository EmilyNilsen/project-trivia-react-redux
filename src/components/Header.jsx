import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';

export default class Header extends Component {
  render() {
    const { name, email, score } = this.props;

    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${MD5(email).toString()}` }
          alt="profile"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;
