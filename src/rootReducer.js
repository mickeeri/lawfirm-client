import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { dialogReducer } from 'redux-dialog';
import { lawsuitsReducer } from './lawsuits';
import { usersReducer } from './users';
import { clientsReducer } from './clients';
import { counterpartsReducer } from './counterparts';

const rootReducer = combineReducers({
  form,
  lawsuits: lawsuitsReducer,
  users: usersReducer,
  clients: clientsReducer,
  dialogs: dialogReducer,
  counteparts: counterpartsReducer,
});

export default rootReducer;
