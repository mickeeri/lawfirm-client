import {
  COI_SEARCH_FAILURE,
  COI_SEARCH_SUCCESS,
  CREATE_LAWSUIT_FAILURE,
  CREATE_LAWSUIT_SUCCESS,
  FETCH_LAWSUITS_FAILURE,
  FETCH_LAWSUITS_SUCCESS,
  RESET_LAWSUITS,
  FETCH_LAWSUIT_TYPES_SUCCESS,
} from './actionTypes';
import * as api from './api';
import { signOutUser } from '../users';
import { CREATE_LAWSUIT_FAILURE_MESSAGE, LAWSUITS_PATH } from './constants';
import { browserHistory } from 'react-router';

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


export const fetchLawsuitTypes = () => (dispatch) => {
  return api.fetchLawsuitTypes().then(
    response => {
      dispatch({
        type: FETCH_LAWSUIT_TYPES_SUCCESS,
        response: response.data,
      })
    },
    error => {
      console.error('Fel uppstod när ärendetyper skulle hämtas.');
    }
  );
}


export const createLawsuit = (params) => (dispatch) => {
  return api.createLawsuit(params).then(
    response => {
      dispatch({
        type: CREATE_LAWSUIT_SUCCESS,
        response: response.data,
      });
      browserHistory.push(`${LAWSUITS_PATH}/${response.data.lawsuit.id}`);
    },
    error => {
      dispatch({
        type: CREATE_LAWSUIT_FAILURE,
        errorMessage: error.response.data.message || CREATE_LAWSUIT_FAILURE_MESSAGE,
      });
    }
  );
};
