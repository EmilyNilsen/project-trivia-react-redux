import { LOGIN, TOKEN, TOKEN_FAIL, LOADING_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  error: null,
  token: '',
  isLoading: false,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };

  case LOADING_TOKEN:
    return {
      ...state,
      isLoading: !state.isLoading,
    };

  case TOKEN:
    return { ...state,
      token: action.payload,
    };
  case TOKEN_FAIL:
    return { ...state,
      error: action.payload.response_message,
    };
  default:
    return state;
  }
};

export default loginReducer;
