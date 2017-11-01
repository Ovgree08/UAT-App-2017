import axios from 'axios';

// Constants

const START_EVENTS = 'START_EVENTS';
const LOAD_EVENTS = 'LOAD_EVENTS';
const ERROR_EVENTS = 'ERROR_EVENTS';

// Initial State

const initialState = {
  loading: false,
  error: null,
  events: [],
};

// Reducer

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case START_EVENTS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_EVENTS:
      return {
        ...state,
        loading: false,
        events: action.data,
      };
    case ERROR_EVENTS:
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

const startEvents = () => ({
  type: START_EVENTS,
});

const loadEvents = EVENTS => ({
  type: LOAD_EVENTS,
  data: EVENTS,
});

const errorEvents = error => ({
  type: ERROR_EVENTS,
  data: error,
});

export const fetchEvents = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(startEvents());
    setTimeout(() => {
      axios
        .get(`http://104.236.123.82/events/${id}`)
        .then(data => {
          dispatch(loadEvents(data.data));
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    }, 1000);
  });
};
