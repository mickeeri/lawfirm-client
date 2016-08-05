import { FETCH_LAWSUITS_SUCCESS, FETCH_LAWSUITS_FAILURE } from './actionTypes';

const INITIAL_STATE = {
  all: [],
  lawsuit: null,
  meta: {},
  filter: {
    query: '',
    page: 1,
    status: 'active',
    userId: '',
  },
};

const lawsuitsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LAWSUITS_SUCCESS:
      return {
        ...state,
        lawsuit: action.response.lawsuit,
        all: action.response.lawsuits,
        meta: action.response.meta,
        filter: action.filter,
        errorMessage: '',
      };
    case FETCH_LAWSUITS_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default lawsuitsReducer;
