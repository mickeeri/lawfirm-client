import { FETCH_LAWSUITS, FETCH_LAWSUIT } from '../actions/types';

const lawsuitsReducer = (state = { all: [], lawsuit: null, meta: {}, filter: { query: '', page: 1, status: 'only_active'} }, action) => {
  switch (action.type) {
    case FETCH_LAWSUIT:
      return { ...state, lawsuit: action.payload.lawsuit };
    case FETCH_LAWSUITS:
      const { payload, query } = action;
      return { ...state, all: payload.lawsuits, meta: payload.meta, filter };
    default:
      return state;
  }
};

export default lawsuitsReducer;
