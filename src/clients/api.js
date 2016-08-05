import axios from 'axios';
import { API_ROOT_URL, AUTH_TOKEN_LS_KEY } from '../shared';
import { API_CLIENTS_PATH } from './constants';

export const fetchClients = (filter) => {
  const { userId, query = '', page = 1 } = filter;

  const queryString = `?query=${query}&page=${page}&user_id=${userId}`;

  return axios.get(`${API_ROOT_URL}${API_CLIENTS_PATH}${queryString}`, {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  });
};
