import { LOGIN, TOKEN, TOKEN_FAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  error: null,
  token: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state,
      name: action.payload.name,
      email: action.payload.email,
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
