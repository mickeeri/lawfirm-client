import { Route } from 'react-router';
import React from 'react';
import { USER_SIGNIN_PATH } from './constants';
import UserSignIn from './components/UserSignIn';

const UserRoutes = (
  <Route path={USER_SIGNIN_PATH} components={UserSignIn} />
);

export default UserRoutes;
