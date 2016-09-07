import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AUTH_TOKEN_LS_KEY } from './shared';
import { SIGNIN_SUCCESS } from './users';
import routes from './routes';
import configureStore from './configureStore';

const store = configureStore();

// If user is signed in...
if (localStorage.getItem(AUTH_TOKEN_LS_KEY)) {
  // ...update application state.
  store.dispatch({ type: SIGNIN_SUCCESS });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
