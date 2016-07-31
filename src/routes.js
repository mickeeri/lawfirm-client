import React from 'react';
import App from './components/App';
import { Route, IndexRoute } from 'react-router';
import Welcome from './components/Welcome'


export default (
  <Route path="/" component={App} >
    <IndexRoute components={Welcome} />
  </Route>
);