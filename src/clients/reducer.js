import {
  CREATE_CLIENT_FAILURE,
  CREATE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAILURE,
  DELETE_CLIENT_SUCCESS,
  FETCH_CLIENTS_FAILURE,
  FETCH_CLIENTS_SUCCESS,
  UPDATE_CLIENT_SUCCESS,
  RESET_CLIENTS,
  TOGGLE_EDIT,
} from './actionTypes';

const INITIAL_STATE = {
  all: [],
  client: null,
  meta: {},
  edit: false,
  successMessage: '',
  errorMessage: '',
  filter: {
    query: '',
    page: 1,
    userId: '',
  },
};

const clientsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        all: action.response.clients,
        client: action.response.client,
        meta: action.response.meta,
        filter: action.filter,
        errorMessage: '',
      };
    case CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        all: [...state.all, action.response.client],
        errorMessage: '',
        edit: false,
        successMessage: 'Klient sparad!',
      };
    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        client: action.response.client,
        errorMessage: '',
        edit: false,
        successMessage: 'Klient uppdaterad!',
      };
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        client: null,
        successMessage: 'Klient raderad',
      }
    case RESET_CLIENTS:
      return INITIAL_STATE;
    case CREATE_CLIENT_FAILURE:
    case FETCH_CLIENTS_FAILURE:
    case DELETE_CLIENT_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case TOGGLE_EDIT:
      return {
        ...state,
        edit: !state.edit,
        errorMessage: '',
        successMessage: '',
      };
    default:
      return state;
  }
};

export default clientsReducer;
