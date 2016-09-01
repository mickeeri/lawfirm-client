import { browserHistory } from 'react-router';
import * as types from './actionTypes';
import * as api from './api';
import { LAWSUITS_PATH } from '../lawsuits';
import { AUTH_TOKEN_LS_KEY } from '../shared';

const usersFailure = (errorMessage) => ({
  type: types.USER_FAILURE,
  errorMessage,
});

// AUTH
const saveTokenAndRedirect = (authToken) => {
  localStorage.setItem(AUTH_TOKEN_LS_KEY, authToken);
  browserHistory.push(LAWSUITS_PATH);
};

const signInUserSuccess = (authToken) => {
  localStorage.setItem(AUTH_TOKEN_LS_KEY, authToken);
  return { type: types.SIGNIN_SUCCESS };
};

export const siginUserFailure = (errorMessage) => ({
  type: types.SIGNIN_FAILURE,
  errorMessage,
});

const signInRequest = () => ({
  type: types.SIGNIN_REQUEST,
});

export const signInUser = ({ email, password }) => (dispatch) => {
  dispatch(signInRequest());
  return api.signInUser(email, password).then(
    response => {
      dispatch(signInUserSuccess(response.data.auth_token));
    },
    error => {
      dispatch(siginUserFailure(error.response.data.message));
    });
};

export const signOutUser = () => {
  localStorage.removeItem(AUTH_TOKEN_LS_KEY);
  return { type: types.SIGNOUT_USER };
};

// FETCH
export const fetchUsersSuccess = (payload) => ({
  type: types.FETCH_USERS_SUCCESS,
  payload,
});

export const fetchUsers = () => (dispatch) =>
  api.fetchUsers().then(
    response => {
      dispatch(fetchUsersSuccess(response.data));
    },
    error => {
      dispatch(usersFailure(error.response.data.message));
    }
  );

// CREATE
const createUserSuccess = (authToken) => {
  saveTokenAndRedirect(authToken);
  return { type: types.CREATE_USER_SUCCESS };
};

export const createUser = (params) => (dispatch) =>
  api.createUser(params).then(
    response => {
      dispatch(createUserSuccess(response.data.auth_token));
    },
    error => {
      usersFailure(error.response.data.message);
    }
  );
