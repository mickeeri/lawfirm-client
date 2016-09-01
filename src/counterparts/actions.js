import { closeDialog } from 'redux-dialog';
import * as types from './actionTypes';
import { signOutUser } from '../users';
import * as api from './api';
import {
  COUNTERPARTS_FORM_MODAL_NAME,
  COUNTERPARTS_DROPDOWN_MODAL_NAME,
} from './constants';
import { CONFIRM_DELETE_MODAL_NAME } from '../shared';

const counterpartsFailure = (error, dispatch) => {
  if (error.response.status === 401) {
    dispatch(signOutUser());
  }

  dispatch({
    type: types.COUNTERPARTS_FAILURE,
    errorMessage: error.response.data.message || 'Ett okänt fel uppstod.',
  });
};

export const fetchCounterparts = (props) => (dispatch) =>
  api.fetchCounterparts(props).then(
    response => {
      dispatch({
        type: types.FETCH_COUNTERPARTS_SUCCESS,
        response: response.data,
      });
    },
    error => {
      counterpartsFailure(error, dispatch);
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
        type: types.ADD_COUNTERPART_TO_LAWSUIT,
        response: response.data,
      });
    },
    error => {
      counterpartsFailure(error, dispatch);
    }
  );

const counterpartsRequest = () => ({
  type: types.COUNTERPARTS_REQUEST,
});

const deleteCounterpartFromLawsuitSuccess = (dispatch, payload) => {
  dispatch(closeDialog(CONFIRM_DELETE_MODAL_NAME));
  return {
    type: types.DELETE_COUNTERPART_FROM_LAWSUIT_SUCCESS,
    payload,
    successMessage: 'Motpart raderad från ärende',
  };
};

export const deleteCounterpartFromLawsuit = (id, lawsuitId) => (dispatch) => {
  dispatch(counterpartsRequest());
  return api.deleteCounterpart(id, lawsuitId).then(
    response => {
      dispatch(deleteCounterpartFromLawsuitSuccess(dispatch, response.data));
    },
    error => {
      counterpartsFailure(error, dispatch);
    }
  );
};
