import App from './App';
import React from 'react';
import Welcome from './components/Welcome';
import { Route, IndexRoute } from 'react-router';
import { UserRoutes } from './users';
import { LawsuitRoutes } from './lawsuits';
import { ClientRoutes } from './clients';

export default (
  <Route path="/" component={App} >
    <IndexRoute components={Welcome} />
    {UserRoutes}
    {LawsuitRoutes}
    {ClientRoutes}
  </Route>
);

//  <Route path={PATHS.signOut} component={SignOut} />
// <Route path={PATHS.userSignUp} component={UserSignUp} />
// <Route path={PATHS.clients} component={requireAuth(ClientsIndex)} />
// <Route path={`${PATHS.client}/:id`} component={requireAuth(ClientShow)} />
// <Route path={PATHS.lawsuits} component={requireAuth(LawsuitsIndex)} />
// <Route path={`${PATHS.lawsuit}/:id`} component={requireAuth(LawsuitShow)} />
