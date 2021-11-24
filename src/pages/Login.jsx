import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.isButtonDisabled = this.isButtonDisabled.bind(this);
  }

  handleOnChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.isButtonDisabled());
    
  }

  isButtonDisabled() {
    const { name, email } = this.state;
    if (name.length === 0 || email.length === 0){
      this.setState({
        isDisabled: true,
      })
    } else {
      this.setState({
        isDisabled: false,
      })
    };
  }

  render() {
    const { isButtonDisabled } = this;
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
        >
          Jogar
        </button>
      </div>
    );
  }
}
