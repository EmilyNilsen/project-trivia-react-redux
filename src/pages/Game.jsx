import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Timer from '../components/timer';
import AnswerButtons from '../components/AnswerButtons';
import './Style/GameStyle.css';
import Header from '../components/Header';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      questionIndex: 0,
      timer: new Timer(),
      isTimerRunning: true,
      seconds: 30,
      shouldSort: true,
      btnDisplay: 'none',
    };

    this.updateTimer = this.updateTimer.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleNext = this.handleNext.bind(this);
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
    if (seconds === 0) this.handleButton();

    this.setState({ shouldSort: false },
      () => this.setState({ seconds }));
  }

  handleButton() {
    const { timer } = this.state;
    timer.clearTimer();

    this.setState({
      btnDisplay: 'block',
      isTimerRunning: false,
    });
  }

  handleNext() {
    const { updateTimer } = this;
    const { questionIndex, timer } = this.state;

    this.setState({
      questionIndex: questionIndex + 1,
      shouldSort: true,
      btnDisplay: 'none',
      isTimerRunning: true,
    }, () => {
      timer.startTimer(updateTimer);
    });
  }

  render() {
    const { handleButton, handleNext } = this;
    const {
      score,
      questionIndex,
      seconds,
      isTimerRunning,
      shouldSort,
      btnDisplay,
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
        <Header name={ name } email={ email } score={ score } />
        <div>
          <p data-testid="question-category">{ currentQuestion.category }</p>
          <p data-testid="question-text">{ currentQuestion.question }</p>
          <AnswerButtons
            answers={ answers }
            handleButton={ handleButton }
            isTimerRunning={ isTimerRunning }
            shouldSort={ shouldSort }
          />
          <p>{ `00:${String(seconds).padStart(2, '0')}` }</p>
          <button
            type="button"
            onClick={ handleNext }
            data-testid="btn-next"
            style={ { display: btnDisplay } }
          >
            Next
          </button>
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
