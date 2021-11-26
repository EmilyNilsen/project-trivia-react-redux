const createLocalStorage = () => {
  const state = {
    player: {
      name: '',
      assertions: '',
      score: '',
      gravatarEmail: '',
    },
  };
  const ranking = [];
  localStorage.setItem('state', JSON.stringify(state));
  localStorage.setItem('ranking', JSON.stringify(ranking));
};

export default createLocalStorage;
