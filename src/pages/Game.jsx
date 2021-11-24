import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Game extends Component {
  constructor(props) {
    super(props);

    const { email } = this.props;

    this.state = {
      score: 0,
      profilePictureLink: `https://www.gravatar.com/avatar/${MD5(email).toString()}`,
    };
  }

  render() {
    const { profilePictureLink, score } = this.state;
    const { name } = this.props;

    return (
      <>
        <header>
          <img
            src={ profilePictureLink }
            alt="profile"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score">{ score }</span>
        </header>
        <div>
          <p>Jogo aqui</p>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  name: login.name,
  email: login.email,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;
