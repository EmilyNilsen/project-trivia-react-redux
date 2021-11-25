import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import './Style/GameStyle.css';

class Game extends Component {
  constructor(props) {
    super(props);

    const { email } = this.props;

    this.state = {
      score: 0,
      questionIndex: 0,
      profilePictureLink: `https://www.gravatar.com/avatar/${MD5(email).toString()}`,
      correctColor: '',
      incorrectColor: '',
      btnDisplay: 'none',
    };

    this.buildAnswersElement = this.buildAnswersElement.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      correctColor: 'correct',
      incorrectColor: 'incorrect',
      btnDisplay: 'block',
    });
  }

  nextQuestion() {
    this.setState(
      (prevState) => ({ ...prevState,
        questionIndex: prevState.questionIndex + 1,
        correctColor: '',
        incorrectColor: '',
      }),
    );
  }

  buildAnswersElement() {
    const { questionIndex, correctColor, incorrectColor } = this.state;
    const { questions } = this.props;
    const { correct_answer: correctAnswer,
      incorrect_answers: IncorrectAnswers,
    } = questions[questionIndex];

    const answers = [
      <button
        type="button"
        onClick={ this.handleClick }
        className={ correctColor }
        key="correct-answer"
        data-testid="correct-answer"
      >
        { correctAnswer }
      </button>,
      IncorrectAnswers.map((answer, idx) => (
        <button
          type="button"
          onClick={ this.handleClick }
          className={ incorrectColor }
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
    const { nextQuestion } = this;
    const { buildAnswersElement } = this;
    const { profilePictureLink, score, questionIndex } = this.state;
    const { name, questions = [] } = this.props;
    // console.log(questions);
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
          { currentQuestion ? (
            <>
              <p data-testid="question-category">{ currentQuestion.category }</p>
              <p data-testid="question-text">{ currentQuestion.question }</p>
              { buildAnswersElement() }
              <button
                type="button"
                onClick={ nextQuestion }
              >
                Next

              </button>
            </>
          ) : (
            <>
              <p data-testid="question-category">Carregando...</p>
              <p data-testid="question-text">Carregando...</p>
            </>
          ) }
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
