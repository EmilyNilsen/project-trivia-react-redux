import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.isButtonDisabled = this.isButtonDisabled.bind(this);
  }

  handleOnChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  isButtonDisabled() {
    const { name, email } = this.state;
    return name.length === 0 && email.length === 0;
  }

  render() {
    const { isButtonDisabled } = this;
    const { name, email } = this.state;
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
          email="email"
          data-testid="input-gravatar-email"
          placeholder="Email"
          value={ email }
        />
        <button
          type="button"
          disabled={ isButtonDisabled }
          data-testid="btn-play"
        >
          Jogar
        </button>
      </div>
    );
  }
}
