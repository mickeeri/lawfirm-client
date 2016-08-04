import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_ERROR,
  AUTH_USER,
  FETCH_CLIENT,
  FETCH_CLIENTS,
  FETCH_LAWSUIT,
  FETCH_LAWSUITS,
  FETCH_USERS,
  UNAUTH_USER,
  CREATE_USER,
} from './types';
import { PATHS, USER_ID_LS_KEY, AUTH_TOKEN_LS_KEY } from '../constants';
import * as helpers from './actionHelpers';

const ROOT_URL = 'http://localhost:3090/v1';
//-------------------------
// Auth
//-------------------------




//-------------------------
// Clients
//-------------------------
export const fetchClients = ({ filter }) => (dispatch) => {
  const firmId = localStorage.getItem('firm_id');
  const { query, page, userId } = filter;

  axios.get(`${ROOT_URL}/firm/${firmId}/clients?query=${query}&page=${page}&user_id=${helpers.getUserId(userId)}`, {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  }).then(
    response => {
      dispatch({ type: FETCH_CLIENTS, payload: response.data, filter });
    }
  ).catch(
    error => {
      if (error.response.status === 401 ||
        error.response.status === 403) {
        dispatch(signOutUser());
      }
      console.error('Fel uppstod', error.response.data.message);
    }
  );
};

export const fetchClient = (clientId) => (dispatch) => {
  const firmId = localStorage.getItem('firm_id');
  axios.get(`${ROOT_URL}/firm/${firmId}/clients/${clientId}`, {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  }).then(
    response => {
      dispatch({ type: FETCH_CLIENT, payload: response.data });
    }
  ).catch(
    error => {
      if (error.response.status === 401 ||
        error.response.status === 403) {
        dispatch(signOutUser());
      }
      console.error('Fel uppstod', error.response.data.message);
    }
  );
};



//-------------------------
// Users
//-------------------------
export const userError = (error) => (
  { type: AUTH_ERROR, payload: error }
);


export const fetchUsers = () => (dispatch) => {
  axios.get(`${ROOT_URL}/users`, {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  }).then(
    response => {
      dispatch({ type: FETCH_USERS, payload: response.data });
    }
  ).catch(
    error => {
      if (error.response) {
        if (error.response.status === 401 ||
          error.response.status === 403) {
          console.error(error.response.data.message);
          dispatch(signOutUser());
        }
        console.error(error.response.data.message);
      }
      console.error(error.message);
    }
  );
};

export const createUser = (params) => (dispatch) => {
  axios.post(`${ROOT_URL}/users`, { user: params }).then(
    response => {
      helpers.saveToLocalStorage(response.data);
      dispatch({ type: AUTH_USER });
      browserHistory.push(PATHS.clients);
    },
  ).catch(
    (error) => {
      let errorMessage = error.response ? error.response.data.message : error.message;
      if (!errorMessage) {
        errorMessage = `Ett fel uppstod. Statuskod ${error.response.status}. Försök igen senare eller kontakta utvecklare.`;
      }
      console.error('Fel!', errorMessage);
      dispatch(userError(errorMessage));
    }
  );
};

//-------------------------
// Firms
//-------------------------
// export const fetchFirms = () => (dispatch) => {
//   axios.get(`${ROOT_URL}/firms`, {
//     headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
//   }).then(
//     response => {
//       dispatch({ type: FETCH_USERS, payload: response.data });
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