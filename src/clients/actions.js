import { browserHistory } from 'react-router';
import { closeDialog } from 'redux-dialog';
import * as types from './actionTypes';
import * as api from './api';
import * as constants from './constants';
import { CONFIRM_DELETE_MODAL_NAME } from '../shared';

const clientsFailure = (errorMessage) => ({
  type: types.CLIENTS_FAILURE,
  errorMessage,
});

// FETCH
const fetchClientsSuccess = (payload, filter) => ({
  type: types.FETCH_CLIENTS_SUCCESS,
  payload,
  filter,
});

const fetchClientsRequest = (filter) => ({
  type: types.FETCH_CLIENTS_REQUEST,
  filter,
});

const fetchClientSuccess = (payload) => ({
  type: types.FETCH_CLIENT_SUCCESS,
  payload,
});

export const fetchClients = (props) => (dispatch) => {
  dispatch(fetchClientsRequest(props.filter));
  return api.fetchClients(props).then(
      response => {
        if (response.data.clients) {
          dispatch(fetchClientsSuccess(response.data, props.filter));
        } else if (response.data.client) {
          dispatch(fetchClientSuccess(response.data));
        }
      },
      error => {
        dispatch(clientsFailure(error.response.data.message));
      }
    );
};

export const resetClients = () => ({
  type: types.RESET_CLIENTS,
});

export const toggleEdit = () => ({
  type: types.TOGGLE_EDIT,
});

const deleteClientSucess = (dispatch) => {
  dispatch(closeDialog(CONFIRM_DELETE_MODAL_NAME));
  browserHistory.push(constants.CLIENTS_PATH);
  return { type: types.DELETE_CLIENT_SUCCESS };
};

// DELETE
export const deleteClient = (id) => (dispatch) =>
  api.deleteClient(id, null).then(
    () => {
      dispatch(deleteClientSucess(dispatch));
    },
    error => {
      dispatch(clientsFailure(error.response.data.message));
    }
  );

const deleteClientFromLawsuitSuccess = (dispatch, payload) => {
  dispatch(closeDialog(CONFIRM_DELETE_MODAL_NAME));
  return {
    type: types.DELETE_CLIENT_FROM_LAWSUIT_SUCCESS,
    payload,
    successMessage: 'Klient raderad från ärende.',
  };
};

export const deleteClientFromLawsuit = (id, lawsuitId) => (dispatch) =>
api.deleteClient(id, lawsuitId).then(
  response => {
    dispatch(deleteClientFromLawsuitSuccess(dispatch, response.data));
  },
  error => {
    clientsFailure(error.response.data.message);
  }
);

// ADD/CRATE

// Add client to lawsuit. Uses same api method as createUpdateClient.
export const addClientToLawsuit = (params, lawsuitId) => (dispatch) =>
  api.createUpdateClient(params, lawsuitId).then(
    response => {
      if (response.status === 201) {
        dispatch(closeDialog(constants.CLIENT_FORM_MODAL_NAME));
      } else {
        dispatch(closeDialog(constants.CLIENTS_DROPDOWN_MODAL_NAME));
      }

      dispatch({
        type: types.ADD_CLIENT_TO_LAWSUIT, // Reponse in lawsuit reducer
        response: response.data,
      });
    },
    error => {
      dispatch({
        type: types.CREATE_CLIENT_FAILURE,
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
          type: types.CREATE_CLIENT_SUCCESS,
          response: response.data,
        });
        // Redirect to client page.
        browserHistory.push(`${constants.CLIENTS_PATH}/${response.data.client.id}`);
      } else {
        dispatch({
          type: types.UPDATE_CLIENT_SUCCESS,
          response: response.data,
        });
      }
    },
    error => {
      dispatch({
        type: types.CLIENTS_FAILURE,
        errorMessage: error.response.data.message,
      });
    }
  );
