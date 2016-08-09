import axios from 'axios';
import { API_ROOT_URL, AUTH_TOKEN_LS_KEY } from '../shared';
import { API_CLIENTS_PATH } from './constants';

// Get request to fetch single or collection of clients.
export const fetchClients = (props) => {
  let url;

  // Get single client.
  if (props.id) {
    url = `${API_ROOT_URL}${API_CLIENTS_PATH}/${props.id}`;
  } else { // Get collection of lawsuits.
    const { userId = '', query = '', page = 1 } = props.filter;
    const queryString = `?query=${query}&page=${page}&user_id=${userId}`;
    url = `${API_ROOT_URL}${API_CLIENTS_PATH}${queryString}`;
  }

  return axios.get(url, {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  });
};

// Create client post request.
export const createClient = (params) =>
  axios.post(`${API_ROOT_URL}${API_CLIENTS_PATH}`, { client: params },
    { headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  });
