import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_ERROR,
  AUTH_USER,
  FETCH_CLIENT,
  FETCH_CLIENTS,
  FETCH_LAWSUIT,
  FETCH_LAWSUITS,
  FETCH_USERS,
  UNAUTH_USER,
} from './types';
import { PATHS, USER_ID_LS_KEY, AUTH_TOKEN_LS_KEY } from '../constants';

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
      // Save JWT token and user info.
      localStorage.setItem(AUTH_TOKEN_LS_KEY, response.data.auth_token);
      localStorage.setItem(USER_ID_LS_KEY, response.data.signed_in_user_id);
      localStorage.setItem('firm_id', response.data.firm_id); // TODO: do I need firm id?
      // Redirect to clients index.
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
  localStorage.removeItem(AUTH_TOKEN_LS_KEY);
  localStorage.removeItem('firm_id');
  localStorage.removeItem(USER_ID_LS_KEY);
  return { type: UNAUTH_USER };
};

//-------------------------
// Clients
//-------------------------
export const fetchClients = ({ query, page }) => (dispatch) => {
  const firmId = localStorage.getItem('firm_id');
  axios.get(`${ROOT_URL}/firm/${firmId}/clients?query=${query}&page=${page}`, {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
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
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
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
  // Filter by provided user id. If not defined, use currently signed in user.
  const userId = filter.userId ? filter.userId : localStorage.getItem(USER_ID_LS_KEY);
  const firmId = localStorage.getItem('firm_id');
  axios.get(`${ROOT_URL}/firm/${firmId}/lawsuits?query=${filter.query}&page=${filter.page}&status=${filter.status}&user_id=${userId}`, {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
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
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
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

//-------------------------
// Users
//-------------------------
export const fetchUsers = () => (dispatch) => {
  axios.get(`${ROOT_URL}/users`, {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  }).then(
    response => {
      dispatch({ type: FETCH_USERS, payload: response.data });
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
