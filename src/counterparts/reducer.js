import * as types from './actionTypes';

const initialState = {
  all: [],
  counterpart: null,
  successMessage: '',
  edit: false,
  errorMessage: '',
  filter: {
    lawsuitId: '',
  },
};

const counterpartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COUNTERPARTS_SUCCESS:
      return {
        ...state,
        all: action.response.counterparts,
        counterpart: action.response.counterpart,
        filter: action.filter,
        errorMessage: '',
      };
    case types.COUNTERPARTS_FAILURE:
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
