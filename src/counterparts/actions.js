import { closeDialog } from 'redux-dialog';
import {
  FETCH_COUNTERPARTS_SUCCESS,
  COUNTERPARTS_FAILURE,
  ADD_COUNTERPART_TO_LAWSUIT,
} from './actionTypes';
import { signOutUser } from '../users';
import * as api from './api';
import {
  COUNTERPARTS_FORM_MODAL_NAME,
  COUNTERPARTS_DROPDOWN_MODAL_NAME,
} from './constants';

const handleError = (error, dispatch) => {
  if (error.response.status === 401) {
    dispatch(signOutUser());
  }

  dispatch({
    type: COUNTERPARTS_FAILURE,
    errorMessage: error.response.data.message || 'Ett okänt fel uppstod.',
  });
};

export const fetchCounterparts = (props) => (dispatch) =>
  api.fetchCounterparts(props).then(
    response => {
      dispatch({
        type: FETCH_COUNTERPARTS_SUCCESS,
        response: response.data,
      });
    },
    error => {
      handleError(error, dispatch);
    }
  );

export const addCounterpartToLawsuit = (params, lawsuitId) => (dispatch) =>
  api.createUpdateCounterpart(params, lawsuitId).then(
    response => {
      if (response.status === 201) {
        dispatch(closeDialog(COUNTERPARTS_FORM_MODAL_NAME));
      } else {
        dispatch(closeDialog(COUNTERPARTS_DROPDOWN_MODAL_NAME));
      }

      dispatch({
        type: ADD_COUNTERPART_TO_LAWSUIT,
        response: response.data,
      });
    },
    error => {
      handleError(error, dispatch);
    }
  );
