import axios from 'axios';

// Constants

const START_ORGANIZATIONS = 'START_ORGANIZATIONS';
const LOAD_ORGANIZATIONS = 'LOAD_ORGANIZATIONS';
const ERROR_ORGANIZATIONS = 'ERROR_ORGANIZATIONS';

// Initial State

const initialState = {
  loading: false,
  error: null,
  organizations: [],
};

// Reducer

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case START_ORGANIZATIONS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_ORGANIZATIONS:
      return {
        ...state,
        loading: false,
        organizations: action.data,
      };
    case ERROR_ORGANIZATIONS:
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

const startOrgs = () => ({
  type: START_ORGANIZATIONS,
});

const loadOrgs = organizations => ({
  type: LOAD_ORGANIZATIONS,
  data: organizations,
});

const errorOrgs = error => ({
  type: ERROR_ORGANIZATIONS,
  data: error,
});

export const fetchOrganizations = () => dispatch => {
  dispatch(startOrgs());
  setTimeout(() => {
    axios
      .get('http://104.236.123.82/organizations')
      .then(data => dispatch(loadOrgs(data.data)))
      .catch(err => dispatch(errorOrgs(err)));
  }, 1000);
};
