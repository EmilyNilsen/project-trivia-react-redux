import React from 'react';
import { Link } from 'react-router-dom';

class ButtonRanking extends React.Component {
  render() {
    return (
      <Link to="/">
        <button
          type="submit"
          data-testid="btn-go-home"
        >
          Voltar ao início
        </button>
      </Link>
    );
  }
}

export default ButtonRanking;
