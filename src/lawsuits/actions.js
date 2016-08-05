import { FETCH_LAWSUITS_SUCCESS, FETCH_LAWSUITS_FAILURE } from './actionTypes';
import * as api from './api';
import { signOutUser } from '../users';

export const fetchLawsuits = (props) => (dispatch) => {
  return api.fetchLawsuits(props).then(
    response => {
      dispatch({
        type: FETCH_LAWSUITS_SUCCESS,
        response: response.data,
        filter: props.filter,
      });
    },
    error => {
      if (error.response.status === 401) {
        dispatch(signOutUser());
      }

      dispatch({
        type: FETCH_LAWSUITS_FAILURE,
        errorMessage: error.response.data.message || 'Fel uppstod när ärenden skulle hämtas.',
      });
    }
  );
};
