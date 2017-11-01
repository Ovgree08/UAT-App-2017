import axios from 'axios';

// Constants

const START_AUTHENTICATION = 'START_AUTHENTICATION';
const LOAD_AUTHENTICATION = 'LOAD_AUTHENTICATION';
const ERROR_AUTHENTICATION = 'ERROR_AUTHENTICATION';

// Initial State

const initialState = {
  loading: false,
  error: null,
  token: null,
};

// Reducer

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case START_AUTHENTICATION:
      return {
        ...state,
        loading: true,
      };
    case LOAD_AUTHENTICATION:
      return {
        ...state,
        loading: false,
        token: action.data.token,
      };
    case ERROR_AUTHENTICATION:
      return {
        ...state,
        loading: false,
        error: action.data.message,
      };
    default:
      return state;
  }
}

// Actions

export const startAuth = () => ({
  type: START_AUTHENTICATION,
});

export const loadAuth = token => ({
  type: LOAD_AUTHENTICATION,
  data: token,
});

export const errorAuth = error => ({
  type: ERROR_AUTHENTICATION,
  data: error,
});
