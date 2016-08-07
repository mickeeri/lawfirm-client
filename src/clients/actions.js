import { FETCH_CLIENTS_SUCCESS, FETCH_CLIENTS_FAILURE, RESET_CLIENTS } from './actionTypes';
import * as api from './api';
import { signOutUser } from '../users';

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
)
