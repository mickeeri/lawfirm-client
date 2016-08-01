import { FETCH_CLIENTS } from '../actions/types';

const clientsReducer = (state = { all: [], client: null, meta: {} }, action) => {
  switch (action.type) {
    case FETCH_CLIENTS:
      return { ...state, all: action.payload.clients, meta: action.payload.meta };
    default:
      return state;
  }
};

export default clientsReducer;
