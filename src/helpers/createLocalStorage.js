const createLocalStorage = () => {
  const state = {
    player: {
      name: '',
      assertions: '',
      score: 0,
      gravatarEmail: '',
    },
  };
  localStorage.setItem('state', JSON.stringify(state));
  if (!localStorage.getItem('ranking')) {
    const ranking = [];
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }
};

export default createLocalStorage;
