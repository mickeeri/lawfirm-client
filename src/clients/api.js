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
    const { userId = '', query = '', page = 1, lawsuitId = '' } = props.filter;
    const queryString = `?query=${query}&page=${page}&user_id=${userId}&lawsuit_id=${lawsuitId}`;
    url = `${API_ROOT_URL}${API_CLIENTS_PATH}${queryString}`;
  }

  return axios.get(url, {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  });
};

// Create or update client post request.
export const createUpdateClient = (params, lawsuitId = null) => {
  const url = `${API_ROOT_URL}${API_CLIENTS_PATH}`;

  // Update existing client.
  if (params.id) {
    return axios.put(`${url}/${params.id}`, { client: params, lawsuit_id: lawsuitId },
      { headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
    });
  }


  return axios.post(url, { client: params, lawsuit_id: lawsuitId },
    { headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  });
};

export const deleteClient = (id, lawsuitId) => {
  // eslint-disable-next-line
  const url = `${API_ROOT_URL}${API_CLIENTS_PATH}/${id}${lawsuitId ? `?lawsuit_id=${lawsuitId}` : ''}`;
  const authToken = localStorage.getItem(AUTH_TOKEN_LS_KEY);

  return axios.delete(url, { headers: { Authorization: authToken } });
};
