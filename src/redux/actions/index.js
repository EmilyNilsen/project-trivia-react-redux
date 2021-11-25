import getQuestion from '../../services/getQuestion';
import getToken from '../../services/getToken';

export const LOGIN = 'LOGIN';
export const TRIVIA = 'TRIVIA';
export const TOKEN_FAIL = 'TOKEN_FAIL';
export const TOKEN = 'TOKEN';
export const TRIVIA_FAIL = 'TRIVIA_FAIL';
export const INDEX = 'INDEX';

export const actionLogin = (payload) => ({
  type: LOGIN,
  payload,
});

export const actionToken = (payload) => ({
  type: TOKEN,
  payload,
});
export const actionTokenFail = () => ({
  type: TOKEN_FAIL,
});
export const triviaError = (payload) => ({
  type: TRIVIA_FAIL,
  payload,
});

export const trivia = (questions) => ({
  type: TRIVIA,
  questions,
});
export const index = () => ({
  type: INDEX,

});
export const tokenThunk = () => (dispatch) => getToken()
  .then(
    (payload) => {
      dispatch(actionToken(payload));
    },

    () => dispatch(actionTokenFail()),
  );

export const questionThunk = (token) => (
  async (dispatch) => {
    try {
      const json = await getQuestion(token);
      return dispatch(trivia(json.results));
    } catch (error) {
      return console.log(error);
    }
  }
);
