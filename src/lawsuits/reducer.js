import {
  FETCH_LAWSUITS_SUCCESS,
  FETCH_LAWSUITS_FAILURE,
  COI_SEARCH_SUCCESS,
  COI_SEARCH_FAILURE,
  RESET_LAWSUITS,
  FETCH_LAWSUIT_TYPES_SUCCESS,
  CREATE_LAWSUIT_SUCCESS,
  CREATE_LAWSUIT_FAILURE,
} from './actionTypes';

const INITIAL_STATE = {
  all: [],
  lawsuit: null,
  meta: {},
  lawsuitTypes: [],
  filter: {
    query: '',
    page: 1,
    status: 'active',
    userId: '',
  },
};

const lawsuitsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_LAWSUIT_SUCCESS:
    case FETCH_LAWSUITS_SUCCESS:
      return {
        ...state,
        lawsuit: action.response.lawsuit,
        all: action.response.lawsuits,
        meta: action.response.meta,
        filter: action.filter,
        errorMessage: '',
      };
    case COI_SEARCH_SUCCESS:
      return {
        ...state,
        all: action.response.lawsuits,
      }
    case RESET_LAWSUITS:
      return INITIAL_STATE;
    case COI_SEARCH_FAILURE:
    case FETCH_LAWSUITS_FAILURE:
    case CREATE_LAWSUIT_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case FETCH_LAWSUIT_TYPES_SUCCESS:
      return { ...state, lawsuitTypes: action.response.lawsuit_types }
    default:
      return state;
  }
};

export default lawsuitsReducer;
