import React from 'react';
import App from './components/App';
import { Route, IndexRoute } from 'react-router';
import Welcome from './components/Welcome'
import SignInPage from './components/auth/SignInPage';
import ClientsIndex from './components/clients/ClientsIndex';
import requireAuth from './components/auth/requireAuth';
import SignOut from './components/auth/SignOut';
import { PATHS } from './constants';

export default (
  <Route path="/" component={App} >
    <IndexRoute components={Welcome} />
    <Route path={PATHS.signIn} components={SignInPage} />
    <Route path={PATHS.signOut} component={SignOut} />
    <Route path={PATHS.clients} component={requireAuth(ClientsIndex)} />
  </Route>
);