import { SIGNIN_SUCCESS,
         SIGNIN_FAILURE,
         SIGNOUT_USER,
         FETCH_USERS_SUCCESS,
         FETCH_USERS_FAILURE,
         CREATE_USER_FAILURE,
       } from './actionTypes';

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return { ...state, error: '', authenticated: true };
    case SIGNIN_FAILURE:
      return { ...state, error: action.errorMessage };
    case SIGNOUT_USER:
      return { ...state, authenticated: false };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        all: action.response.users,
        currentUserId: action.response.meta.current_user_id,
      };
    case FETCH_USERS_FAILURE:
    case CREATE_USER_FAILURE:
      return { ...state, errorMessage: action.errorMessage };
    default:
      return state;
  }
};

export default usersReducer;
