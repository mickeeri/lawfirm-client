import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import routes from './routes';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { SIGNIN_SUCCESS } from './users';
import { AUTH_TOKEN_LS_KEY } from './shared';
import createLogger from 'redux-logger';

const middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem(AUTH_TOKEN_LS_KEY);

// If user is signed in...
if (token) {
  // ...update application state.
  store.dispatch({ type: SIGNIN_SUCCESS });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
