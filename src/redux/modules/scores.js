import axios from 'axios';

// Constants

const START_SCORES = 'START_SCORES';
const LOAD_SCORES = 'LOAD_SCORES';
const ERROR_SCORES = 'ERROR_SCORES';

// Initial State

const initialState = {
  loading: false,
  error: null,
  tests: [],
};

// Reducer

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case START_SCORES:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SCORES:
      return {
        ...state,
        loading: false,
        scores: action.data,
      };
    case ERROR_SCORES:
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    default:
      return state;
  }
}

// Actions

const startScores = () => ({
  type: START_SCORES,
});

const loadScores = events => ({
  type: LOAD_SCORES,
  data: events,
});

const errorScores = error => ({
  type: ERROR_SCORES,
  data: error,
});

export const fetchScores = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(startScores());
    axios
      .get(`http://104.236.123.82/scores/${id}`)
      //.get(`http://192.168.1.168:4000/scores/${id}`)
      .then(data => {
        dispatch(loadScores(data.data));
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};
