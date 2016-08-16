import {
  COI_SEARCH_FAILURE,
  COI_SEARCH_SUCCESS,
  CREATE_LAWSUIT_FAILURE,
  CREATE_LAWSUIT_SUCCESS,
  FETCH_LAWSUIT_TYPES_SUCCESS,
  FETCH_LAWSUITS_FAILURE,
  FETCH_LAWSUITS_SUCCESS,
  LAWSUIT_FAILURE,
  RESET_LAWSUITS,
  TOGGLE_LAWSUIT_EDIT,
  UPDATE_LAWSUIT_SUCCESS,
} from './actionTypes';

const INITIAL_STATE = {
  all: [],
  lawsuit: null,
  meta: {},
  lawsuitTypes: [],
  edit: false,
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
      return {
        ...state,
        all: [...state.all, action.response.lawsuit],
        errorMessage: '',
        edit: false,
      };
    case UPDATE_LAWSUIT_SUCCESS:
      return {
        ...state,
        lawsuit: action.response.lawsuit,
        errorMessage: '',
        edit: false,
      };
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
      };
    case RESET_LAWSUITS:
      return INITIAL_STATE;
    case COI_SEARCH_FAILURE:
    case FETCH_LAWSUITS_FAILURE:
    case CREATE_LAWSUIT_FAILURE:
    case LAWSUIT_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case FETCH_LAWSUIT_TYPES_SUCCESS:
      return { ...state, lawsuitTypes: action.response.lawsuit_types };
    case TOGGLE_LAWSUIT_EDIT:
      return {
        ...state,
        edit: !state.edit,
      };
    default:
      return state;
  }
};

export default lawsuitsReducer;
