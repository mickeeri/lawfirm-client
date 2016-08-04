import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { lawsuitsReducer } from '../lawsuits';
import { usersReducer } from '../users';

const rootReducer = combineReducers({
  form,
  lawsuits: lawsuitsReducer,
  users: usersReducer,
});

export default rootReducer;
