import { FETCH_LAWSUITS_SUCCESS, FETCH_LAWSUITS_FAILURE } from './actionTypes';
import * as api from './api';
import { signOutUser } from '../users';

export const fetchLawsuits = ({ filter }) => (dispatch) => {
  return api.fetchLawsuits(filter).then(
    response => {
      dispatch({
        type: FETCH_LAWSUITS_SUCCESS,
        response: response.data,
        filter,
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
    });
};











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