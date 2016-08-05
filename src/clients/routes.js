import { Route } from 'react-router';
import React from 'react';
import requireAuth from '../shared/hocs/requireAuth';
import { CLIENTS_PATH } from './constants';
import ClientsIndex from './components/ClientsIndex';

const ClientRoutes = (
  <Route path={CLIENTS_PATH} components={requireAuth(ClientsIndex)} />
)

export default ClientRoutes;
