import { Route } from 'react-router';
import React from 'react';
import LawsuitsIndex from './components/LawsuitsIndex';
import { LAWSUITS_PATH } from './constants';
import { requireAuth } from '../shared';

const LawsuitRoutes = (
  <Route path={LAWSUITS_PATH} components={requireAuth(LawsuitsIndex)} />
);

export default LawsuitRoutes;


// <Route path={`${PATHS.lawsuit}/:id`} component={requireAuth(LawsuitShow)} />