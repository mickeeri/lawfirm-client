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
export const createClient = (params) => {
  const url = `${API_ROOT_URL}${API_CLIENTS_PATH}`;

  if (params.id) {
    return axios.put(`${url}/${params.id}`, { client: params },
      { headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
    });
  }

  return axios.post(url, { client: params },
    { headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  });
};

export const deleteClient = (id) => {
  return axios.delete(`${API_ROOT_URL}${API_CLIENTS_PATH}/${id}`, {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  });
};
