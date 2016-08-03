import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_CLIENTS,
  FETCH_CLIENT,
  FETCH_LAWSUITS,
  FETCH_LAWSUIT } from './types';
import { PATHS } from '../constants';

const ROOT_URL = 'http://localhost:3090/v1';
//-------------------------
// Auth
//-------------------------
export const authError = (error) => (
  { type: AUTH_ERROR, payload: error }
);

export const signInUser = ({ email, password }) => (dispatch) => {
  axios.post(`${ROOT_URL}/authenticate`, { auth: { email, password } }).then(
    response => {
      // Update state to indicate user is authenticated.
      dispatch({ type: AUTH_USER });
      // Save JWT token.
      localStorage.setItem('auth_token', response.data.auth_token);
      localStorage.setItem('firm_id', response.data.firm_id);
      // Redirect to route '/feature'.
      browserHistory.push(PATHS.clients);
    },
  ).catch(
    (error) => {
      const errorMessage = error.response ? error.response.data.message : error.message;
      dispatch(authError(errorMessage));
    }
  );
};

export const signOutUser = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('firm_id');
  return { type: UNAUTH_USER };
};

//-------------------------
// Clients
//-------------------------
export const fetchClients = ({ query, page }) => (dispatch) => {
  const firmId = localStorage.getItem('firm_id');
  axios.get(`${ROOT_URL}/firm/${firmId}/clients?query=${query}&page=${page}`, {
    headers: { Authorization: localStorage.getItem('auth_token') },
  }).then(
    response => {
      dispatch({ type: FETCH_CLIENTS, payload: response.data });
    }
  ).catch(
    error => {
      if (error.response.status === 401 ||
        error.response.status === 403) {
        dispatch(signOutUser());
      }
      console.error('Fel uppstod', error.response.data.message);
    }
  );
};

export const fetchClient = (clientId) => (dispatch) => {
  const firmId = localStorage.getItem('firm_id');
  axios.get(`${ROOT_URL}/firm/${firmId}/clients/${clientId}`, {
    headers: { Authorization: localStorage.getItem('auth_token') },
  }).then(
    response => {
      dispatch({ type: FETCH_CLIENT, payload: response.data });
    }
  ).catch(
    error => {
      if (error.response.status === 401 ||
        error.response.status === 403) {
        dispatch(signOutUser());
      }
      console.error('Fel uppstod', error.response.data.message);
    }
  );
};

//-------------------------
// Lawsuits
//-------------------------
export const fetchLawsuits = ({ filter }) => (dispatch) => {
  const firmId = localStorage.getItem('firm_id');
  axios.get(`${ROOT_URL}/firm/${firmId}/lawsuits?query=${filter.query}&page=${filter.page}&status=${filter.status}`, {
    headers: { Authorization: localStorage.getItem('auth_token') },
  }).then(
    response => {
      dispatch({ type: FETCH_LAWSUITS, payload: response.data, filter });
    }
  ).catch(
    error => {
      if (error.response.status === 401 ||
        error.response.status === 403) {
        dispatch(signOutUser());
      }
      console.error('Fel uppstod', error.response.data.message);
    }
  );
};

export const fetchLawsuit = (lawsuitId) => (dispatch) => {
  const firmId = localStorage.getItem('firm_id');
  axios.get(`${ROOT_URL}/firm/${firmId}/lawsuits/${lawsuitId}`, {
    headers: { Authorization: localStorage.getItem('auth_token') },
  }).then(
    response => {
      dispatch({ type: FETCH_LAWSUIT, payload: response.data });
    }
  ).catch(
    error => {
      if (error.response) {
        if (error.response.status === 401 ||
          error.response.status === 403) {
          console.error(error.response.data.message);
          dispatch(signOutUser());
        }
        console.error(error.response.data.message);
      }
      console.error(error.message);
    }
  );
};
