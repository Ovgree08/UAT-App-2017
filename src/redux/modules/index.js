import { combineReducers } from 'redux';

import organizations from './organizations';
import events from './events';
import user from './user';
import tests from './tests';
import scores from './scores';
import athletes from './athletes';

export default combineReducers({
  organizations,
  events,
  user,
  tests,
  scores,
  athletes,
});
