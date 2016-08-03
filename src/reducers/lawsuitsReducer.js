import { FETCH_LAWSUITS, FETCH_LAWSUIT } from '../actions/types';

const INITIAL_STATE = {
  all: [],
  lawsuit: null,
  meta: {},
  filter: {
    query: '',
    page: 1,
    status: 'only_active',
  },
};

const lawsuitsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LAWSUIT:
      return { ...state, lawsuit: action.payload.lawsuit };
    case FETCH_LAWSUITS:
      const { payload, filter } = action;
      return { ...state, all: payload.lawsuits, meta: payload.meta, filter };
    default:
      return state;
  }
};

export default lawsuitsReducer;
