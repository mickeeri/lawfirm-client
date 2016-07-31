import { FETCH_CLIENTS } from '../actions/types';

const clientsReducer = (state = { all: [], client: null }, action ) => {
  switch (action.type) {
    case FETCH_CLIENTS:
      return { ...state, all: action.payload };
    default:
      return state;
  }
}

export default clientsReducer;
