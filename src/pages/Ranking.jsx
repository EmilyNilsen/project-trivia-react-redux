import React, { Component } from 'react';
import ButtonRanking from '../components/buttonRanking';

class Ranking extends Component {
  constructor() {
    super();
    const rankingJson = localStorage.getItem('ranking');
    const ranking = JSON.parse(rankingJson);
    this.state = {
      ranking,
    };
  }

  sortRanking() {
    const { ranking } = this.state;
    return ranking.sort((a, b) => b.score - a.score);
  }

  render() {
    const ranking = this.sortRanking();
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {
            ranking.map((player, index) => (
              <li key={ index }>
                <img src={ player.picture } alt="profile" />
                <span data-testid={ `player-name-${index}` }>{ player.name }</span>
                <span data-testid={ `player-score-${index}` }>{ player.score }</span>
              </li>
            ))
          }
        </ol>
        <ButtonRanking />
      </>
    );
  }
}

export default Ranking;
