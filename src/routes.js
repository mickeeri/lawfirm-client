import React from 'react';
import App from './components/App';
import { Route, IndexRoute } from 'react-router';
import Welcome from './components/Welcome'
import Signin from './components/auth/Signin';
import ClientsIndex from './components/clients/ClientsIndex';
import requireAuth from './components/auth/requireAuth';
import { PATHS } from './constants';

export default (
  <Route path="/" component={App} >
    <IndexRoute components={Welcome} />
    <Route path={PATHS.signin} component={Signin} />
    <Route path={PATHS.clients} component={requireAuth(ClientsIndex)} />
  </Route>
);