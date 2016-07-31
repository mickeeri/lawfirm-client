import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth-reducer';
import clientsReducer from './clients-reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  clients: clientsReducer,
});

export default rootReducer;
