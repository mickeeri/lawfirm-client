import { browserHistory } from 'react-router';
import {
  CREATE_CLIENT_FAILURE,
  CREATE_CLIENT_SUCCESS,
  FETCH_CLIENTS_FAILURE,
  FETCH_CLIENTS_SUCCESS,
  RESET_CLIENTS,
  TOGGLE_EDIT,
} from './actionTypes';
import * as api from './api';
import { signOutUser } from '../users';
import { CREATE_CLIENT_FAILURE_MESSAGE, CLIENTS_PATH } from './constants';


export const fetchClients = (props) => (dispatch) => {
  return api.fetchClients(props).then(
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
};

export const resetClients = () => (
  { type: RESET_CLIENTS }
);

export const toggleEdit = () => (
  { type: TOGGLE_EDIT }
);

export const createClient = (params) => (dispatch) =>
  api.createClient(params).then(
    response => {
      dispatch({
        type: CREATE_CLIENT_SUCCESS,
        response: response.data,
      });
      browserHistory.push(`${CLIENTS_PATH}/${response.data.client.id}`);
    },
    error => {
      dispatch({
        type: CREATE_CLIENT_FAILURE,
        errorMessage: error.response.data.message || CREATE_CLIENT_FAILURE_MESSAGE,
      });
    }
  );
