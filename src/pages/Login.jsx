import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionLogin, fetchGameInfo } from '../redux/actions';
import createLocalStorage from '../helpers/createLocalStorage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.isButtonDisabled = this.isButtonDisabled.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.isButtonDisabled());
  }

  async handleOnClick() {
    const { name, email } = this.state;
    const { setLogin, history, fetchGame } = this.props;
    setLogin(name, email);
    await fetchGame();
    createLocalStorage();
    this.addNameAndEmailInStorage(name, email);
    history.push('/game');
  }

  addNameAndEmailInStorage(name, email) {
    const stateJson = localStorage.getItem('state');
    const state = JSON.parse(stateJson);
    state.player.name = name;
    state.player.gravatarEmail = email;
    localStorage.setItem('state', JSON.stringify(state));
  }

  isButtonDisabled() {
    const { name, email } = this.state;
    if (name.length === 0 || email.length === 0) {
      this.setState({
        isDisabled: true,
      });
    } else {
      this.setState({
        isDisabled: false,
      });
    }
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        <input
          type="text"
          onChange={ this.handleOnChange }
          name="name"
          data-testid="input-player-name"
          placeholder="Nome"
          value={ name }
        />
        <input
          type="email"
          onChange={ this.handleOnChange }
          name="email"
          data-testid="input-gravatar-email"
          placeholder="Email"
          value={ email }
        />
        <button
          type="button"
          disabled={ isDisabled }
          data-testid="btn-play"
          onClick={ this.handleOnClick }
        >
          Jogar
        </button>
        <Link to="/Configuration">
          <button
            type="submit"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLogin: (name, email) => dispatch(actionLogin(name, email)),
  fetchGame: () => dispatch(fetchGameInfo()),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  setLogin: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
