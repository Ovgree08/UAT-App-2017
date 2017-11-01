import { combineReducers } from 'redux';

import organizations from './organizations';
import events from './events';
import user from './user';

export default combineReducers({
  organizations,
  events,
  user,
});
