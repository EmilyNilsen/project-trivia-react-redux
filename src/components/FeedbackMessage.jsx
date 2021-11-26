import React from 'react';

class FeedbackMessage extends React.Component {
  feedbackMessage() {
    const storage = JSON.parse(localStorage.getItem('state'));
    const getAssertions = storage.player.assertions;
    const assertions = 3;

    if (getAssertions < assertions) {
      return (
        <h1 data-testid="feedback-text">
          Podia ser melhor...
        </h1>);
    }
    if (getAssertions >= assertions) {
      return (
        <h1 data-testid="feedback-text">
          Mandou bem!
        </h1>);
    }
  }

  render() {
    return (
      <div>
        {this.feedbackMessage()}
      </div>
    );
  }
}

export default FeedbackMessage;
