import App from './App';
import React from 'react';
import Welcome from './shared/components/Welcome';
import { Route, IndexRoute } from 'react-router';
import { USER_SIGNIN_PATH, USER_SIGNOUT_PATH, USER_SIGNUP_PATH, UserSignIn, UserSignOut, UserSignUp } from './users';
import { LAWSUITS_PATH, LawsuitsIndex, LawsuitShow } from './lawsuits';
import { ClientShow, ClientsIndex, CLIENTS_PATH } from './clients';
import requireAuth from './shared/hocs/requireAuth';

export default (
  <Route path="/" component={App} >
    <IndexRoute components={Welcome} />
    <Route path={USER_SIGNIN_PATH} components={UserSignIn} />
    <Route path={USER_SIGNOUT_PATH} components={UserSignOut} />
    <Route path={USER_SIGNUP_PATH} components={UserSignUp} />
    <Route path={LAWSUITS_PATH} components={requireAuth(LawsuitsIndex)} />
    <Route path={`${LAWSUITS_PATH}/:id`} component={requireAuth(LawsuitShow)} />
    <Route path={CLIENTS_PATH} components={requireAuth(ClientsIndex)} />
    <Route path={`${CLIENTS_PATH}/:id`} components={requireAuth(ClientShow)} />
  </Route>
);
