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
    case types.UPDATE_COUNTERPART_SUCCESS:
      return {
        ...state,
        edit: false,
        counterpart: action.payload.counterpart,
      };
    case types.COUNTERPARTS_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
        successMessage: '',
      };
    case types.TOGGLE_EDIT_COUNTERPART:
      return {
        ...state,
        edit: !state.edit,
      };
    default:
      return state;
  }
};

export default counterpartsReducer;
