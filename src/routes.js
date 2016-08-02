import App from './components/App';
import ClientShow from './components/clients/ClientShow';
import ClientsIndex from './components/clients/ClientsIndex';
import LawsuitShow from './components/lawsuits/LawsuitShow';
import LawsuitsIndex from './components/lawsuits/LawsuitsIndex';
import React from 'react';
import requireAuth from './components/auth/requireAuth';
import SignInPage from './components/auth/SignInPage';
import SignOut from './components/auth/SignOut';
import Welcome from './components/Welcome';
import { PATHS } from './constants';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={App} >
    <IndexRoute components={Welcome} />
    <Route path={PATHS.signIn} components={SignInPage} />
    <Route path={PATHS.signOut} component={SignOut} />
    <Route path={PATHS.clients} component={requireAuth(ClientsIndex)} />
    <Route path={`${PATHS.client}/:id`} component={requireAuth(ClientShow)} />
    <Route path={PATHS.lawsuits} component={requireAuth(LawsuitsIndex)} />
    <Route path={`${PATHS.lawsuit}/:id`} component={requireAuth(LawsuitShow)} />
  </Route>
);
