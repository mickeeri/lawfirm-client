import axios from 'axios';
import { API_ROOT_URL, AUTH_TOKEN_LS_KEY } from '../shared';
import { API_LAWSUITS_PATH } from './constants';

export const fetchLawsuits = (filter) => {
  const { userId, query = '', page = 1, status = 'active' } = filter;

  const queryString = `?query=${query}&page=${page}&status=${status}&user_id=${userId}`;

  return axios.get(`${API_ROOT_URL}${API_LAWSUITS_PATH}${queryString}`, {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  });
};
