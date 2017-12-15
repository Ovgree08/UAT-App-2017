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

const loadEvents = events => ({
  type: LOAD_EVENTS,
  data: events,
});

const errorEvents = error => ({
  type: ERROR_EVENTS,
  data: error,
});

export const fetchEvents = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(startEvents());
    axios
      .get(`http://162.243.240.17:3000/events/${id}`)
      //.get(`http://192.168.1.168:4000/events/${id}`)
      .then(data => {
        dispatch(loadEvents(data.data));
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};
