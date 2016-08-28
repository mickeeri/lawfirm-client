import { FETCH_COUNTERPARTS_SUCCESS, COUNTERPART_ERROR } from './actionTypes';
import { signOutUser } from '../users';
import * as api from './api';

const handleError = (error, dispatch) => {
  if (error.response.status === 401) {
    dispatch(signOutUser());
  }

  dispatch({
    type: COUNTERPART_ERROR,
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
