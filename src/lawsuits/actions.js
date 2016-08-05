import { FETCH_LAWSUITS_SUCCESS, FETCH_LAWSUITS_FAILURE, FETCH_LAWSUIT_SUCCESS, FETCH_LAWSUIT_FAILURE } from './actionTypes';
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

// export const fetchLawsuit = (id) => (dispatch) => {
//   return api.fetchLawsuit(id).then(
//     response => {
//       dispatch({
//         type: FETCH_LAWSUIT_SUCCESS,
//         response: response.data,
//       });
//     },
//     error => {
//       if (error.response.status === 401) {
//         dispatch(signOutUser());
//       }
//
//       dispatch({
//         type: FETCH_LAWSUIT_FAILURE,
//         errorMessage: error.response.data.message || 'Ett fel uppstod när ärende skulle hämtas.',
//       });
//     }
//   );
// };












// export const fetchLawsuit = (lawsuitId) => (dispatch) => {
//   const firmId = localStorage.getItem('firm_id');
//   axios.get(`${ROOT_URL}/firm/${firmId}/lawsuits/${lawsuitId}`, {
//     headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
//   }).then(
//     response => {
//       dispatch({ type: FETCH_LAWSUIT, payload: response.data });
//     }
//   ).catch(
//     error => {
//       if (error.response) {
//         if (error.response.status === 401 ||
//           error.response.status === 403) {
//           console.error(error.response.data.message);
//           dispatch(signOutUser());
//         }
//         console.error(error.response.data.message);
//       }
//       console.error(error.message);
//     }
//   );
// };
