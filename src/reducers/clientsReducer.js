import { FETCH_CLIENTS, FETCH_CLIENT } from '../actions/types';

const INITIAL_STATE = {
  all: [],
  client: null,
  meta: {},
  filter: {
    query: '',
    page: 1,
    userId: 0,
  },
};

const clientsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CLIENT:
      return { ...state, client: action.payload.client };
    case FETCH_CLIENTS:
      return {
        ...state,
        all: action.payload.clients,
        meta: action.payload.meta,
        filter: action.filter,
      };
    default:
      return state;
  }
};

export default clientsReducer;
