import getQuestion from '../../services/getQuestion';
import getToken from '../../services/getToken';

export const LOGIN = 'LOGIN';
export const TRIVIA = 'TRIVIA';
export const TOKEN_FAIL = 'TOKEN_FAIL';
export const TOKEN = 'TOKEN';
export const TRIVIA_FAIL = 'TRIVIA_FAIL';
export const INDEX = 'INDEX';
export const LOADING_TRIVIA = 'LOADING_TRIVIA';
export const LOADING_TOKEN = 'LOADING_TOKEN';

export const actionLogin = (name, email) => ({
  type: LOGIN,
  name,
  email,
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

export const trivia = (payload) => ({
  type: TRIVIA,
  payload,
});

export const triviaLoading = () => ({
  type: LOADING_TRIVIA,
});

export const tokenLoading = () => ({
  type: LOADING_TOKEN,
});

export const index = () => ({
  type: INDEX,
});

export const questionThunk = (token) => (
  async (dispatch) => {
    dispatch(triviaLoading());
    try {
      const response = await getQuestion(token);
      dispatch(trivia(response));
    } catch (error) {
      return console.log(error);
    }
  }
);

export const tokenThunk = () => (dispatch) => getToken()
  .then(
    (payload) => {
      dispatch(actionToken(payload));
      dispatch(questionThunk(payload));
    },

    () => dispatch(actionTokenFail()),
  );
