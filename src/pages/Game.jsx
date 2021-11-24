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
      questionIndex: 0,
      profilePictureLink: `https://www.gravatar.com/avatar/${MD5(email).toString()}`,
    };

    this.buildAnswersElement = this.buildAnswersElement.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    this.setState(
      (prevState) => ({ ...prevState, questionIndex: prevState.questionIndex + 1 }),
    );
  }

  buildAnswersElement() {
    const { nextQuestion } = this;
    const { questionIndex } = this.state;
    const { questions } = this.props;
    const { answers: { correctAnswer, wrongAnswers } } = questions[questionIndex];

    const answers = [
      <button
        type="button"
        onClick={ nextQuestion }
        key="correct-answer"
        data-testid="correct-answer"
      >
        { correctAnswer }
      </button>,
      wrongAnswers.map((answer, idx) => (
        <button
          type="button"
          onClick={ nextQuestion }
          key={ `wrong-answer-${idx}` }
          data-testid={ `wrong-answer${idx}` }
        >
          { answer }
        </button>
      ))];
    const HALF_RANDOM = 0.5;
    return answers.sort(() => (Math.random() - HALF_RANDOM));
  }

  render() {
    const { buildAnswersElement } = this;
    const { profilePictureLink, score, questions, questionIndex } = this.state;
    const { name } = this.props;

    const currentQuestion = questions[questionIndex];

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
          <p data-testid="question-category">{ currentQuestion.category }</p>
          <p data-testid="question-text">{ currentQuestion.text }</p>
          { buildAnswersElement() }
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ login, game }) => ({
  name: login.name,
  email: login.email,
  questions: game.questions,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
