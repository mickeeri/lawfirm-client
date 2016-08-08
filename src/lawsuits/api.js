import axios from 'axios';
import { API_ROOT_URL, AUTH_TOKEN_LS_KEY } from '../shared';
import { API_LAWSUITS_PATH, COI_SEARCH_API_PATH, LAWSUIT_TYPES_API_PATH } from './constants';

export const fetchLawsuits = (props) => {
  let url;

  // Get single lawsuit
  if (props.id) {
    url = `${API_ROOT_URL}${API_LAWSUITS_PATH}/${props.id}`;
  // Get collection of lawsuits.
  } else {
    const { userId = '', query = '', page = 1, status = 'active' } = props.filter;
    const queryString = `?query=${query}&page=${page}&status=${status}&user_id=${userId}`;
    url = `${API_ROOT_URL}${API_LAWSUITS_PATH}${queryString}`;
  }

  return axios.get(url , {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  });
};

export const performCOISearch = (props) => {
  let url = `${API_ROOT_URL}${COI_SEARCH_API_PATH}?query=${props.query}`;

  return axios.get(url , {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  });
}

export const fetchLawsuitTypes = () => {
  return axios.get(`${API_ROOT_URL}${LAWSUIT_TYPES_API_PATH}` , {
    headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  });
}

export const createLawsuit = (params) => {
  return axios.post(`${API_ROOT_URL}${API_LAWSUITS_PATH}`, { lawsuit: params },
    { headers: { Authorization: localStorage.getItem(AUTH_TOKEN_LS_KEY) },
  });
}
