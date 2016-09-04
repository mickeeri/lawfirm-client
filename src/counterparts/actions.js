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

const counterpartsRequest = () => ({
  type: types.COUNTERPARTS_REQUEST,
});

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

const updateCounterpartSuccess = (payload) => ({
  type: types.UPDATE_COUNTERPART_SUCCESS,
  payload,
  successMessage: 'Motpart uppdaterad',
});

export const updateCounterpart = (params) => (dispatch) => {
  dispatch(counterpartsRequest());
  api.createUpdateCounterpart(params).then(
    response => {
      dispatch(updateCounterpartSuccess(response.data));
    },
    error => {
      dispatch(counterpartsFailure(error.response.data.message));
    }
  );
};

const addCounterpartToLawsuitSuccess = (payload) => ({
  type: types.ADD_COUNTERPART_TO_LAWSUIT_SUCCESS,
  payload,
  successMessage: 'Motpart tillagd till ärende',
});

export const addCounterpartToLawsuit = (params, lawsuitId) => (dispatch) =>
  api.createUpdateCounterpart(params, lawsuitId).then(
    response => {
      if (response.status === 201) {
        dispatch(closeDialog(COUNTERPARTS_FORM_MODAL_NAME));
      } else {
        dispatch(closeDialog(COUNTERPARTS_DROPDOWN_MODAL_NAME));
      }

      dispatch(addCounterpartToLawsuitSuccess(response.data));
    },
    error => {
      counterpartsFailure(error, dispatch);
    }
  );

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

export const toggleEdit = () => ({
  type: types.TOGGLE_EDIT_COUNTERPART,
});
