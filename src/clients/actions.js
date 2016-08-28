import { browserHistory } from 'react-router';
import { closeDialog } from 'redux-dialog';
import {
  CREATE_CLIENT_FAILURE,
  CREATE_CLIENT_SUCCESS,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAILURE,
  FETCH_CLIENTS_FAILURE,
  FETCH_CLIENTS_SUCCESS,
  UPDATE_CLIENT_SUCCESS,
  ADD_CLIENT_TO_LAWSUIT,
  RESET_CLIENTS,
  TOGGLE_EDIT,
  DELETE_CLIENT_FROM_LAWSUIT,
} from './actionTypes';
import * as api from './api';
import { signOutUser } from '../users';
import {
  CREATE_CLIENT_FAILURE_MESSAGE,
  CLIENTS_PATH,
  DELETE_CLIENT_FAILURE_MESSAGE,
  CLIENT_FORM_MODAL_NAME,
  CLIENTS_DROPDOWN_MODAL_NAME,
} from './constants';
import { CONFIRM_DELETE_MODAL_NAME } from '../shared';

export const fetchClients = (props) => (dispatch) =>
  api.fetchClients(props).then(
    response => {
      dispatch({
        type: FETCH_CLIENTS_SUCCESS,
        response: response.data,
        filter: props.filter,
      });
    },
    error => {
      if (error.response.status === 401) {
        dispatch(signOutUser());
      }

      dispatch({
        type: FETCH_CLIENTS_FAILURE,
        errorMessage: error.response.data.message || 'Fel uppstod när klienter skulle hämtas.',
      });
    });

export const resetClients = () => (
  { type: RESET_CLIENTS }
);

export const toggleEdit = () => (
  { type: TOGGLE_EDIT }
);

export const deleteClient = (id) => (dispatch) =>
  api.deleteClient(id, null).then(
    () => {
      dispatch(closeDialog(CONFIRM_DELETE_MODAL_NAME));
      browserHistory.push(CLIENTS_PATH);
      dispatch({ type: DELETE_CLIENT_SUCCESS });
    },
    error => {
      dispatch({
        type: DELETE_CLIENT_FAILURE,
        errorMessage: error.response.data.message || DELETE_CLIENT_FAILURE_MESSAGE,
      });
    }
  );

export const deleteClientFromLawsuit = (id, lawsuitId) => (dispatch) =>
api.deleteClient(id, lawsuitId).then(
  response => {
    dispatch(closeDialog(CONFIRM_DELETE_MODAL_NAME));
    dispatch({ type: DELETE_CLIENT_FROM_LAWSUIT, response: response.data });
  },
  error => {
    dispatch({
      type: DELETE_CLIENT_FAILURE,
      errorMessage: error.response.data.message || DELETE_CLIENT_FAILURE_MESSAGE,
    });
  }
);

// Add client to lawsuit. Uses same api method as createUpdateClient.
export const addClientToLawsuit = (params, lawsuitId) => (dispatch) =>
  api.createUpdateClient(params, lawsuitId).then(
    response => {
      if (response.status === 201) {
        dispatch(closeDialog(CLIENT_FORM_MODAL_NAME));
      } else {
        dispatch(closeDialog(CLIENTS_DROPDOWN_MODAL_NAME));
      }

      dispatch({
        type: ADD_CLIENT_TO_LAWSUIT, // Reponse in lawsuit reducer
        response: response.data,
      });
    },
    error => {
      dispatch({
        type: CREATE_CLIENT_FAILURE,
        errorMessage: error.response.data.message || 'Okänt fel uppstod.',
      });
    }
  );

// Create new client. Also used for updating client.
export const createUpdateClient = (params) => (dispatch) =>
  api.createUpdateClient(params).then(
    response => {
      if (response.status === 201) {
        dispatch({
          type: CREATE_CLIENT_SUCCESS,
          response: response.data,
        });
        // Redirect to client page.
        browserHistory.push(`${CLIENTS_PATH}/${response.data.client.id}`);
      } else {
        dispatch({
          type: UPDATE_CLIENT_SUCCESS,
          response: response.data,
        });
      }
    },
    error => {
      dispatch({
        type: CREATE_CLIENT_FAILURE,
        errorMessage: error.response.data.message || CREATE_CLIENT_FAILURE_MESSAGE,
      });
    }
  );
