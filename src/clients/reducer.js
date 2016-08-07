import { FETCH_CLIENTS_SUCCESS, FETCH_CLIENTS_FAILURE, RESET_CLIENTS } from './actionTypes';

const INITIAL_STATE = {
  all: [],
  client: null,
  meta: {},
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
        client: action.response.client,
        all: action.response.clients,
        meta: action.response.meta,
        filter: action.filter,
        errorMessage: '',
      };
    case RESET_CLIENTS:
      return INITIAL_STATE;
    case FETCH_CLIENTS_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default clientsReducer;
