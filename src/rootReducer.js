import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { dialogReducer } from 'redux-dialog';
import { lawsuitsReducer } from './lawsuits';
import { usersReducer } from './users';
import { clientsReducer } from './clients';
import { counterpartsReducer } from './counterparts';
import sharedReducer from './shared/reducer';
import modalsReducer from './modals/reducer';

const rootReducer = combineReducers({
  form,
  lawsuits: lawsuitsReducer,
  users: usersReducer,
  clients: clientsReducer,
  dialogs: dialogReducer,
  counterparts: counterpartsReducer,
  shared: sharedReducer,
  modals: modalsReducer,
});

export default rootReducer;
