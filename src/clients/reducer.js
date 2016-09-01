import * as types from './actionTypes';

const initialState = {
  all: [],
  client: null,
  edit: false,
  errorMessage: '',
  filter: {
    query: '',
    page: 1,
    userId: '',
    lawsuitId: '',
  },
  meta: {},
  successMessage: '',
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        all: action.payload.clients,
        meta: action.payload.meta,
        filter: action.filter,
        errorMessage: '',
      };
    case types.FETCH_CLIENT_SUCCESS:
      return {
        ...state,
        client: action.payload.client,
        errorMessage: '',
      };
    case types.CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        all: [...state.all, action.response.client],
        errorMessage: '',
        edit: false,
        successMessage: 'Klient sparad!',
      };
    case types.UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        client: action.response.client,
        errorMessage: '',
        edit: false,
        successMessage: 'Klient uppdaterad!',
      };
    case types.DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        client: null,
        successMessage: 'Klient raderad',
      };
    case types.RESET_CLIENTS:
      return initialState;
    case types.CLIENTS_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case types.TOGGLE_EDIT:
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
