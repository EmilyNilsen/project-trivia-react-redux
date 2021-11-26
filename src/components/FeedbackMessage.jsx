import React from 'react';

class FeedbackMessage extends React.Component {
  feedbackMessage() {
    const storage = JSON.parse(localStorage.getItem('state'));
    const getScore = storage.player.score;
    const badScore = 3;

    if (getScore < badScore) {
      return (
        <h1 data-testid="feedback-text">
          Podia ser melhor...
        </h1>);
    }
    if (getScore >= badScore) return <h1 data-testid="feedback-text">Mandou bem!</h1>;
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
