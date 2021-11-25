import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import Timer from '../components/timer';
import AnswerButtons from '../components/AnswerButtons';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      questionIndex: 0,
      timer: new Timer(),
      seconds: 30,
      shouldSort: true,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
  }

  componentDidMount() {
    const { updateTimer } = this;
    const { timer } = this.state;

    timer.startTimer(updateTimer);
  }

  componentWillUnmount() {
    const { timer } = this.state;
    timer.clearTimer();
  }

  updateTimer(seconds) {
    this.setState({ shouldSort: false },
      () => this.setState({ seconds }));
  }

  nextQuestion() {
    const { questionIndex, timer } = this.state;

    this.setState({ questionIndex: questionIndex + 1, shouldSort: true }, () => {
      timer.startTimer();
    });
  }

  render() {
    const { nextQuestion } = this;
    const {
      score,
      questionIndex,
      seconds,
      timer,
      shouldSort,
    } = this.state;
    const { name, email, questions } = this.props;

    if (questions.length === 0) return (<Redirect to="/" />);

    const currentQuestion = questions[questionIndex];
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = currentQuestion;
    const answers = { correctAnswer, incorrectAnswers };

    return (
      <>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${MD5(email).toString()}` }
            alt="profile"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score">{ score }</span>
        </header>
        <div>
          <p data-testid="question-category">{ currentQuestion.category }</p>
          <p data-testid="question-text">{ currentQuestion.question }</p>
          <AnswerButtons
            answers={ answers }
            nextQuestion={ nextQuestion }
            isTimerRunning={ timer.isTimerRunning }
            shouldSort={ shouldSort }
          />
          <p>{ `00:${String(seconds).padStart(2, '0')}` }</p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
  questions: state.game.questions,
  questionIndex: state.game.questionIndex,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
