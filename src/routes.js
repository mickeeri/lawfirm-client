import React from 'react';
import App from './components/App';
import { Route, IndexRoute } from 'react-router';
import Welcome from './components/Welcome'
import Signin from './components/auth/Signin';


export default (
  <Route path="/" component={App} >
    <IndexRoute components={Welcome} />
    <Route path="inlogg" component={Signin} />
  </Route>
);