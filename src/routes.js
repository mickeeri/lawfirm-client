import App from './App';
import React from 'react';
import Welcome from './components/Welcome';
import { Route, IndexRoute } from 'react-router';
import { USER_SIGNIN_PATH, USER_SIGNOUT_PATH, UserSignIn, UserSignOut } from './users';
import { LawsuitsIndexRoute, LawsuitShowRoute } from './lawsuits';
import { ClientShow, ClientsIndex, CLIENTS_PATH } from './clients';
import requireAuth from './shared/hocs/requireAuth';

export default (
  <Route path="/" component={App} >
    <IndexRoute components={Welcome} />
    <Route path={USER_SIGNIN_PATH} components={UserSignIn} />
    <Route path={USER_SIGNOUT_PATH} components={UserSignOut} />
    {LawsuitsIndexRoute}
    {LawsuitShowRoute}
    <Route path={CLIENTS_PATH} components={requireAuth(ClientsIndex)} />
    <Route path={`${CLIENTS_PATH}/:id`} components={requireAuth(ClientShow)} />
  </Route>
);

//  <Route path={PATHS.signOut} component={SignOut} />
// <Route path={PATHS.userSignUp} component={UserSignUp} />
// <Route path={PATHS.clients} component={requireAuth(ClientsIndex)} />
// <Route path={`${PATHS.client}/:id`} component={requireAuth(ClientShow)} />
// <Route path={PATHS.lawsuits} component={requireAuth(LawsuitsIndex)} />
// <Route path={`${PATHS.lawsuit}/:id`} component={requireAuth(LawsuitShow)} />
