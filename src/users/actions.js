import { browserHistory } from 'react-router';
import {
  AUTH_ERROR,
  CREATE_USER_FAILURE,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNOUT_USER,
} from './actionTypes';
import * as api from './api';
import { LAWSUITS_PATH } from '../lawsuits';
import { AUTH_TOKEN_LS_KEY } from '../shared';
import {
  FETCH_USERS_FAILURE_MESSAGE,
  SIGNIN_ERROR_MESSAGE,
  CREATE_USER_FAILURE_MESSAGE,
} from './constants';

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
        errorMessage: error.response.data.message || SIGNIN_ERROR_MESSAGE,
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

export const createUser = (params) => (dispatch) => {
  return api.createUser(params).then(
    response => {
      localStorage.setItem(AUTH_TOKEN_LS_KEY, response.data.auth_token);
      dispatch({ type: SIGNIN_SUCCESS })
      browserHistory.push(LAWSUITS_PATH);
    },
    error => {
      dispatch({
        type: CREATE_USER_FAILURE,
        errorMessage: error.response.data.message || CREATE_USER_FAILURE_MESSAGE,
      });
    }
  );
};
