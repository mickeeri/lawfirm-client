import { FETCH_USERS } from '../actions/types';

const usersReducer = (state = { all: [], user: null }, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, all: action.payload.users };
    default:
      return state;
  }
};

export default usersReducer;
