import { FETCH_COUNTERPARTS_SUCCESS, COUNTERPARTS_FAILURE } from './actionTypes';

const initialState = {
  all: [],
  counterpart: null,
  successMessage: '',
  errorMessage: '',
  filter: {
    lawsuitId: '',
  },
};

const counterpartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTERPARTS_SUCCESS:
      return {
        ...state,
        all: action.response.counterparts,
        counterpart: action.response.counterpart,
        filter: action.filter,
        errorMessage: '',
      };
    case COUNTERPARTS_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
        successMessage: '',
      };
    default:
      return state;
  }
};

export default counterpartsReducer;
