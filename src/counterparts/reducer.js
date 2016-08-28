import { FETCH_COUNTERPARTS_SUCCESS, COUNTERPART_ERROR } from './actionTypes';

const initialState = {
  all: [],
  counterpart: null,
  successMessage: '',
  errorMessage: '',
  filter: {
    lawsuitId: null,
  },
};

const counterpartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTERPARTS_SUCCESS:
      return {
        ...state,
        all: action.response.counteparts,
        client: action.response.counterpart,
        filter: action.filter,
        errorMessage: '',
      };
    default:
      return state;
  }
};

export default counterpartsReducer;
