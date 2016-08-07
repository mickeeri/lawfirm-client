import axios from 'axios';
import { API_ROOT_URL, AUTH_TOKEN_LS_KEY } from '../shared';
import { API_CLIENTS_PATH } from './constants';

/**
 * Get request to fetch single or collection of clients.
 * @param  {object} props containing filter and userId.
 * @return {Promise}
 */
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

  return axios.get(url , {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  });
};

export const createClient = (params) => {
  return axios.post(`${API_ROOT_URL}${API_CLIENTS_PATH}`, { client: params },
    { headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  });
}
