import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import clientsReducer from './clientsReducer';
import lawsuitsReducer from './lawsuitsReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  clients: clientsReducer,
  lawsuits: lawsuitsReducer,
});

export default rootReducer;
