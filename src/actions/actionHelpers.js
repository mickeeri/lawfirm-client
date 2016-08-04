import { USER_ID_LS_KEY, AUTH_TOKEN_LS_KEY } from '../constants';

export const getUserId = (userId) => (
  userId ? parseInt(userId, 10) : parseInt(localStorage.getItem(USER_ID_LS_KEY), 10)
);

export const saveToLocalStorage = (data) => {
  // Save JWT token and user info.
  localStorage.setItem(AUTH_TOKEN_LS_KEY, data.auth_token);
  localStorage.setItem(USER_ID_LS_KEY, data.signed_in_user_id);
  localStorage.setItem('firm_id', data.firm_id); // TODO: do I need firm id?
};

