import { FETCH_LAWSUITS, FETCH_LAWSUIT } from '../actions/types';

const lawsuitsReducer = (state = { all: [], lawsuit: null, meta: {} }, action) => {
  switch (action.type) {
    case FETCH_LAWSUIT:
      return { ...state, lawsuit: action.payload.lawsuit };
    case FETCH_LAWSUITS:
      return { ...state, all: action.payload.lawsuits, meta: action.payload.meta };
    default:
      return state;
  }
};

export default lawsuitsReducer;
