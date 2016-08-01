import { FETCH_CLIENTS, FETCH_CLIENT } from '../actions/types';

const clientsReducer = (state = { all: [], client: null, meta: {} }, action) => {
  switch (action.type) {
    case FETCH_CLIENT:
      return { ...state, client: action.payload.client };
    case FETCH_CLIENTS:
      return { ...state, all: action.payload.clients, meta: action.payload.meta };
    default:
      return state;
  }
};

export default clientsReducer;
