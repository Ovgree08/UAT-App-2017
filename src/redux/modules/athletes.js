import axios from 'axios';

// Constants

const START_ATHLETES = 'START_ATHLETES';
const LOAD_ATHLETES = 'LOAD_ATHLETES';
const ERROR_ATHLETES = 'ERROR_ATHLETES';

// Initial State

const initialState = {
  loading: false,
  error: null,
  athletes: [],
};

// Reducer

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case START_ATHLETES:
      return {
        ...state,
        loading: true,
      };
    case LOAD_ATHLETES:
      return {
        ...state,
        loading: false,
        athletes: action.data,
      };
    case ERROR_ATHLETES:
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

const startAthletes = () => ({
  type: START_ATHLETES,
});

const loadAthletes = events => ({
  type: LOAD_ATHLETES,
  data: events,
});

const errorAthletes = error => ({
  type: ERROR_ATHLETES,
  data: error,
});

export const fetchAthletes = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(startAthletes());
    axios
      .get(`http://162.243.240.17:3000/athletes/${id}`)
      //.get(`http://192.168.1.168:4000/athletes/${id}`)
      .then(data => {
        dispatch(loadAthletes(data.data));
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const addAthlete = athlete => dispatch => {
  let body = {};
  body.athlete_name = athlete.firstName + ' ' + athlete.lastName;
  body.athlete_id = parseInt(athlete.athleteId);
  body.event_id = athlete.event_id;
  return new Promise((resolve, reject) => {
    axios
      .post('http://162.243.240.17:3000/athletes/create', body)
      .then(data => {
        if (data.data && data.data.insertId) {
          dispatch(fetchAthletes(athlete.event_id));
          resolve();
        } else {
          alert(data.data.message);
          reject();
        }
      })
      .catch(err => alert(err));
  });
};
