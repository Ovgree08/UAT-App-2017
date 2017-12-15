import axios from 'axios';

// Constants

const START_TESTS = 'START_TESTS';
const LOAD_TESTS = 'LOAD_TESTS';
const ERROR_TESTS = 'ERROR_TESTS';

// Initial State

const initialState = {
  loading: false,
  error: null,
  tests: [],
};

// Reducer

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case START_TESTS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_TESTS:
      return {
        ...state,
        loading: false,
        tests: action.data,
      };
    case ERROR_TESTS:
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

const startTests = () => ({
  type: START_TESTS,
});

const loadTests = events => ({
  type: LOAD_TESTS,
  data: events,
});

const errorTests = error => ({
  type: ERROR_TESTS,
  data: error,
});

export const fetchTests = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(startTests());
    axios
      .get(`http://162.243.240.17:3000/tests/${id}`)
      //.get(`http://192.168.1.168:4000/tests/${id}`)
      .then(data => {
        dispatch(loadTests(data.data));
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};
