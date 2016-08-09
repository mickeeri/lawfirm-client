import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { lawsuitsReducer } from './lawsuits';
import { usersReducer } from './users';
import { clientsReducer } from './clients';
import { dialogReducer } from 'redux-dialog';

const rootReducer = combineReducers({
  form,
  lawsuits: lawsuitsReducer,
  users: usersReducer,
  clients: clientsReducer,
  dialogs: dialogReducer,
});

export default rootReducer;
