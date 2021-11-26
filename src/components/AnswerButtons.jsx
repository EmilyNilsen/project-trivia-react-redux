import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AnswerButtons extends Component {
  render() {
    const {
      answers: {
        correctAnswer,
        incorrectAnswers,
      },
      handleButton,
      isTimerRunning,
      shouldSort,
    } = this.props;

    const buttons = [
      <button
        type="button"
        className={ !isTimerRunning ? 'correct' : undefined }
        onClick={ handleButton }
        key="correct-answer"
        data-testid="correct-answer"
        disabled={ !isTimerRunning }
      >
        { correctAnswer }
      </button>,
      incorrectAnswers.map((answer, idx) => (
        <button
          type="button"
          className={ !isTimerRunning ? 'incorrect' : undefined }
          onClick={ handleButton }
          key={ `wrong-answer-${idx}` }
          data-testid={ `wrong-answer${idx}` }
          disabled={ !isTimerRunning }
        >
          { answer }
        </button>
      ))];

    if (shouldSort) {
      const HALF_RANDOM = 0.5;
      buttons.sort(() => (Math.random() - HALF_RANDOM));
    }

    return (
      buttons
    );
  }
}

export default AnswerButtons;

AnswerButtons.propTypes = {
  answers: PropTypes.objectOf(PropTypes.array),
}.isRequired;
