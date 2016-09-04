import axios from 'axios';
import { API_COUNTERPARTS_PATH } from './constants';
import { API_ROOT_URL, AUTH_TOKEN_LS_KEY } from '../shared';

export const fetchCounterparts = (props) => {
  let url;

  if (props && props.id) { // Get single counterpart
    url = `${API_ROOT_URL}${API_COUNTERPARTS_PATH}/${props.id}`;
  } else {
    const { lawsuitId = '' } = props.filter;
    const queryString = `?lawsuit_id=${lawsuitId}`;
    url = `${API_ROOT_URL}${API_COUNTERPARTS_PATH}${queryString}`;
  }

  const authToken = localStorage.getItem(AUTH_TOKEN_LS_KEY);
  return axios.get(url, { headers: { Authorization: authToken } });
};

export const createUpdateCounterpart = (params, lawsuitId = null) => {
  const url = `${API_ROOT_URL}${API_COUNTERPARTS_PATH}`;
  const authToken = localStorage.getItem(AUTH_TOKEN_LS_KEY);

  if (params.id) { // Update existing counterpart
    return axios.put(`${url}/${params.id}`, { counterpart: params, lawsuit_id: lawsuitId },
     { headers: { Authorization: authToken } });
  }

  return axios.post(url, { counterpart: params, lawsuit_id: lawsuitId },
    { headers: { Authorization: authToken },
  });
};

export const deleteCounterpart = (id, lawsuitId) => {
  // eslint-disable-next-line
  const url = `${API_ROOT_URL}${API_COUNTERPARTS_PATH}/${id}${lawsuitId ? `?lawsuit_id=${lawsuitId}` : ''}`;
  const authToken = localStorage.getItem(AUTH_TOKEN_LS_KEY);

  return axios.delete(url, { headers: { Authorization: authToken } });
};
