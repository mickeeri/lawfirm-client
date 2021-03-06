import { closeDialog } from 'redux-dialog';
import { browserHistory } from 'react-router';
import {
  COI_SEARCH_FAILURE,
  COI_SEARCH_SUCCESS,
  CREATE_LAWSUIT_SUCCESS,
  DELETE_LAWSUIT_SUCCESS,
  FETCH_LAWSUIT_TYPES_SUCCESS,
  FETCH_LAWSUITS_FAILURE,
  FETCH_LAWSUITS_SUCCESS,
  LAWSUIT_FAILURE,
  RESET_LAWSUITS,
  TOGGLE_LAWSUIT_EDIT,
  UPDATE_LAWSUIT_SUCCESS,
  CREATE_LAWSUITS_REQUEST,
  FETCH_LAWSUITS_REQUEST,
} from './actionTypes';
import * as api from './api';
import { signOutUser } from '../users';
import {
  CREATE_LAWSUIT_FAILURE_MESSAGE,
  LAWSUITS_PATH,
  DELETE_LAWSUIT_FAILURE_MESSAGE,
} from './constants';
import { CONFIRM_DELETE_MODAL_NAME } from '../shared';

export const fetchLawsuits = (props) => (dispatch) => {
  dispatch({ type: FETCH_LAWSUITS_REQUEST });
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

export const performCOISearch = (props) => (dispatch) =>
  api.performCOISearch(props).then(
    response => {
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
  );

export const resetLawsuits = () => (
  { type: RESET_LAWSUITS }
);

export const toggleEdit = () => (
  { type: TOGGLE_LAWSUIT_EDIT }
);

export const fetchLawsuitTypes = () => (dispatch) =>
  api.fetchLawsuitTypes().then(
    response => {
      dispatch({
        type: FETCH_LAWSUIT_TYPES_SUCCESS,
        response: response.data,
      });
    },
    error => {
      dispatch({
        type: LAWSUIT_FAILURE,
        errorMessage: error.response.data.message || 'Fel uppstod när ärendetyper skulle hämtas.',
      });
    }
  );

export const deleteLawsuit = (id) => (dispatch) =>
  api.deleteLawsuit(id).then(
    () => {
      dispatch(closeDialog(CONFIRM_DELETE_MODAL_NAME));
      dispatch({ type: DELETE_LAWSUIT_SUCCESS, successMessage: 'Ärende raderat' });
      browserHistory.push(LAWSUITS_PATH);
    },
    error => {
      dispatch({
        type: LAWSUIT_FAILURE,
        errorMessage: error.response.data.message || DELETE_LAWSUIT_FAILURE_MESSAGE,
      });
    }
  );


export const createUpdateLawsuit = (params) => (dispatch) => {
  dispatch({ type: CREATE_LAWSUITS_REQUEST });
  return api.createUpdateLawsuit(params).then(
    response => {
      if (response.status === 201) {
        dispatch(closeDialog('lawsuitFormDialog'));
        dispatch({
          type: CREATE_LAWSUIT_SUCCESS,
          response: response.data,
        });
      } else {
        dispatch({
          type: UPDATE_LAWSUIT_SUCCESS,
          response: response.data,
        });
      }
    },
    error => {
      dispatch({
        type: LAWSUIT_FAILURE,
        errorMessage: error.response.data.message || CREATE_LAWSUIT_FAILURE_MESSAGE,
      });
    }
  );
};
