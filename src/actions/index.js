import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_CLIENTS } from './types';
import { PATHS } from '../constants';

const ROOT_URL = 'http://localhost:3090/v1';
//-------------------------
// Auth
//-------------------------
export const authError = (error) => (
  { type: AUTH_ERROR, payload: error }
);

export const signinUser = ({ email, password }) => (dispatch) => {
  axios.post(`${ROOT_URL}/authenticate`, { auth: { email, password } }).then(
    response => {
      // Update state to indicate user is authenticated.
      dispatch({ type: AUTH_USER });
      // Save JWT token.
      localStorage.setItem('auth_token', response.data.auth_token);
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

//-------------------------
// Clients
//-------------------------
export const fetchClients = () => (dispatch) => {
  axios.get(`${ROOT_URL}/clients`, {
    headers: { Authorization: localStorage.getItem('auth_token') },
  }).then(
    response => {
      dispatch( {type: FETCH_CLIENTS, payload: response.data.clients, });
    }
  ).catch(
    error => {
      console.error('Fel uppstod', error);
    }
  )
}

