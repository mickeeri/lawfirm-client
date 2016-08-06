import axios from 'axios';
import { API_ROOT_URL, AUTH_TOKEN_LS_KEY } from '../shared';
import { API_AUTH_PATH, API_USERS_PATH } from './constants';

export const signInUser = (email, password) => {
  return axios.post(`${API_ROOT_URL}${API_AUTH_PATH}`, {
    auth: { email, password },
  });
};

export const fetchUsers = () => {
  return axios.get(`${API_ROOT_URL}${API_USERS_PATH}`, {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  });
};

export const createUser = (params) => {
  return axios.post(`${API_ROOT_URL}${API_USERS_PATH}`, { user: params });
}
