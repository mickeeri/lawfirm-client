import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import clientsReducer from './clientsReducer';
import lawsuitsReducer from './lawsuitsReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  clients: clientsReducer,
  lawsuits: lawsuitsReducer,
  users: usersReducer,
});

export default rootReducer;
