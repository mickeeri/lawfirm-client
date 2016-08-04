import {
  AUTH_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNOUT_USER,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from './actionTypes';
import * as api from './api';
import { browserHistory } from 'react-router';
import { LAWSUITS_PATH } from '../lawsuits';
import { AUTH_TOKEN_LS_KEY } from '../shared';
import { FETCH_USERS_FAILURE_MESSAGE, SIGNIN_ERROR_MESSAGE } from './constants';

export const authError = (error) => (
  { type: AUTH_ERROR, error }
);

export const signInUser = ({ email, password }) => (dispatch) => {
  return api.signInUser(email, password).then(
    response => {
      dispatch({ type: SIGNIN_SUCCESS });
      localStorage.setItem(AUTH_TOKEN_LS_KEY, response.data.auth_token);
      browserHistory.push(LAWSUITS_PATH);
    },
    error => {
      dispatch({
        type: SIGNIN_FAILURE,
        errorMessage: error.message || SIGNIN_ERROR_MESSAGE,
      });
    });
};

export const signOutUser = () => {
  localStorage.removeItem(AUTH_TOKEN_LS_KEY);
  return { type: SIGNOUT_USER };
};

export const fetchUsers = () => (dispatch) => {
  return api.fetchUsers().then(
    response => {
      dispatch({
        type: FETCH_USERS_SUCCESS,
        response: response.data,
      });
    },
    error => {
      if (error.response.status === 401) {
        dispatch(signOutUser());
      }

      dispatch({
        type: FETCH_USERS_FAILURE,
        errorMessage: error.response.data.message || FETCH_USERS_FAILURE_MESSAGE,
      });
    }
  );
};

