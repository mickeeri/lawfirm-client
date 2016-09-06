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
import { COUNTERPARTS_PATH } from './counterparts/constants';
import CounterpartShow from './counterparts/components/CounterpartShow';
import TasksIndex from './tasks/components/TasksIndex';
import { TASKS_PATH } from './tasks/constants';
import LawsuitOverview from './lawsuits/components/LawsuitOverview';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={Welcome} />
    <Route path={USER_SIGNIN_PATH} component={beforeAuth(UserSignIn)} />
    <Route path={USER_SIGNOUT_PATH} component={UserSignOut} />
    <Route path={USER_SIGNUP_PATH} component={beforeAuth(UserSignUp)} />

    <Route path={`${COUNTERPARTS_PATH}/:id`} component={requireAuth(CounterpartShow)} />

    <Route path={LAWSUITS_PATH} component={requireAuth(LawsuitsIndex)} />
    <Route path={`${LAWSUITS_PATH}/:id`} component={requireAuth(LawsuitShow)}>
      <IndexRoute component={LawsuitOverview} />
      <Route path={`${LAWSUITS_PATH}/:id${TASKS_PATH}`} component={requireAuth(TasksIndex)} />
    </Route>
    <Route path={COI_SEARCH_PATH} component={requireAuth(COISearch)} />

    <Route path={CLIENT_NEW_PATH} component={requireAuth(ClientNew)} />
    <Route path={CLIENTS_PATH} component={requireAuth(ClientsIndex)} />
    <Route path={`${CLIENTS_PATH}/:id`} component={requireAuth(ClientShow)} />
  </Route>
);
