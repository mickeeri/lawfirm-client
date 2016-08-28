import axios from 'axios';
import { API_COUNTERPARTS_PATH } from './constants';
import { API_ROOT_URL, AUTH_TOKEN_LS_KEY } from '../shared';

export const fetchCounterparts = (props) => {
  let url;

  // Get single counterpart
  if (props.id) {
    url = `${API_ROOT_URL}${API_COUNTERPARTS_PATH}/${props.id}`;
  } else {
    const { lawsuitId } = props.filter;
    const queryString = `?lawsuit_id=${lawsuitId}`;
    url = `${API_ROOT_URL}${API_COUNTERPARTS_PATH}/${queryString}`;
  }

  const authToken = localStorage.getItem(AUTH_TOKEN_LS_KEY);
  return axios.get(url, { headers: { Authorization: authToken } });
};
