import * as types from './actionTypes';

const initialState = {
  all: [],
  authenticated: false,
  currentUserId: null,
  errorMessage: '',
  successMessage: '',
  requesting: false,
};


const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        errorMessage: '',
        successMessage: 'Välkommen!',
        requesting: false,
      };
    case types.SIGNIN_REQUEST:
      return {
        ...state,
        errorMessage: '',
        successMessage: '',
        requesting: true,
      };
    case types.SIGNIN_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case types.SIGNOUT_USER:
      return {
        ...state,
        authenticated: false,
        successMessage: 'Utloggning lyckades',
      };
    case types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        all: action.payload.users,
        currentUserId: action.payload.meta.current_user_id,
      };
    case types.CREATE_USER_SUCCESS:
      return {
        errorMessage: '',
        successMessage: 'Välkommen till Ordocliens!',
        authenticated: true,
      };
    case types.USERS_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default usersReducer;
