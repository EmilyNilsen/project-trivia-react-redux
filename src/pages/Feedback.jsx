import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import { Link } from 'react-router-dom';
import FeedbackMessage from '../components/FeedbackMessage';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    const { email } = this.props;

    this.state = {
      profilePictureLink: `https://www.gravatar.com/avatar/${MD5(email).toString()}`,
    };
  }

  render() {
    const { name } = this.props;
    const { profilePictureLink } = this.state;
    const storage = JSON.parse(localStorage.getItem('state'));
    const getScore = storage.player.score;
    return (
      <>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ profilePictureLink }
            alt="profile player"
          />
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score">{ getScore }</span>
        </header>
        <FeedbackMessage />
        <Link data-testid="btn-ranking" to="/ranking">Ver Ranking</Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
});

Feedback.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
