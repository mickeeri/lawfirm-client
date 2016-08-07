import { FETCH_LAWSUITS_SUCCESS, FETCH_LAWSUITS_FAILURE, COI_SEARCH_SUCCESS, COI_SEARCH_FAILURE, RESET_LAWSUITS } from './actionTypes';
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

export const performCOISearch = (props) => (dispatch) => {
  return api.performCOISearch(props).then(
    response =>  {
      dispatch({
        type: COI_SEARCH_SUCCESS,
        response: response.data,
      });
    },
    error => {
      if (error.response.status === 401) {
        dispatch(signOutUser());
      }

      dispatch({
        type: COI_SEARCH_FAILURE,
        errorMessage: error.response.data.message || 'Fel uppstod när ärenden skulle hämtas.',
      });
    }
  )
}

export const resetLawsuits = () => (
  { type: RESET_LAWSUITS }
)
