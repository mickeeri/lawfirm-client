import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export const authError = (error) => (
  { type: AUTH_ERROR, payload: error }
);

export const signinUser = ({ email, password }) => (dispatch) => {
  axios.post(`${ROOT_URL}/authenticate`, { email, password }).then(
    response => {
      // Update state to indicate user is authenticated.
      dispatch({ type: AUTH_USER });
      // Save JWT token.
      localStorage.setItem('auth_token', response.data.token);
      // Redirect to route '/feature'.
      browserHistory.push('/feature');
    },
  ).catch(
    (error) => {
      dispatch(authError('Wrong credentials'));
    }
  );
};
