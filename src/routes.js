import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Welcome from './shared/components/Welcome';
import {
  USER_SIGNIN_PATH,
  USER_SIGNOUT_PATH,
  USER_SIGNUP_PATH,
  UserSignIn,
  UserSignOut,
  UserSignUp,
} from './users';
import { LAWSUITS_PATH, LawsuitsIndex, LawsuitShow, COISearch, COI_SEARCH_PATH } from './lawsuits';
import { ClientShow, ClientsIndex, ClientNew, CLIENTS_PATH, CLIENT_NEW_PATH } from './clients';
import requireAuth from './shared/hocs/requireAuth';
import beforeAuth from './shared/hocs/beforeAuth';

export default (
  <Route path="/" component={App} >
    <IndexRoute components={Welcome} />
    <Route path={USER_SIGNIN_PATH} components={beforeAuth(UserSignIn)} />
    <Route path={USER_SIGNOUT_PATH} components={UserSignOut} />
    <Route path={USER_SIGNUP_PATH} components={beforeAuth(UserSignUp)} />

    <Route path={LAWSUITS_PATH} components={requireAuth(LawsuitsIndex)} />
    <Route path={`${LAWSUITS_PATH}/:id`} component={requireAuth(LawsuitShow)} />
    <Route path={COI_SEARCH_PATH} components={requireAuth(COISearch)} />

    <Route path={CLIENT_NEW_PATH} components={requireAuth(ClientNew)} />
    <Route path={CLIENTS_PATH} components={requireAuth(ClientsIndex)} />
    <Route path={`${CLIENTS_PATH}/:id`} components={requireAuth(ClientShow)} />
  </Route>
);
