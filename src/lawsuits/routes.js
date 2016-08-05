import { LAWSUITS_PATH, LAWSUIT_PATH } from './constants';
import { Route } from 'react-router';
import LawsuitShow from './components/LawsuitShow';
import LawsuitsIndex from './components/LawsuitsIndex';
import React from 'react';
import requireAuth from '../shared/hocs/requireAuth';

export const LawsuitsIndexRoute = (
  <Route path={LAWSUITS_PATH} components={requireAuth(LawsuitsIndex)} />
)

export const LawsuitShowRoute = (
  <Route path={`${LAWSUIT_PATH}:id`} component={requireAuth(LawsuitShow)} />
)
