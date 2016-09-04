import * as types from './actionTypes';
import * as clientTypes from '../clients/actionTypes';
import * as counterpartTypes from '../counterparts/actionTypes';

const initialState = {
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

const lawsuitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_LAWSUIT_SUCCESS:
      return {
        ...state,
        all: [...state.all, action.response.lawsuit],
        errorMessage: '',
        edit: false,
      };
    case types.UPDATE_LAWSUIT_SUCCESS:
      return {
        ...state,
        lawsuit: action.response.lawsuit,
        errorMessage: '',
        edit: false,
      };
    case types.FETCH_LAWSUITS_SUCCESS:
      return {
        ...state,
        lawsuit: action.response.lawsuit,
        all: action.response.lawsuits,
        meta: action.response.meta,
        filter: action.filter,
        errorMessage: '',
      };
    case clientTypes.ADD_CLIENT_TO_LAWSUIT:
      // Return the lawsuit unchanged, expect for one new client added
      // to the lawsuits array of clients.
      return {
        ...state,
        lawsuit: {
          ...state.lawsuit,
          clients: [...state.lawsuit.clients, action.response.client],
        },
      };
    case clientTypes.DELETE_CLIENT_FROM_LAWSUIT_SUCCESS: {
      // Return the lawsuit unchanged, expect for one new client removed
      // from the lawsuits array of clients.
      const index = state.lawsuit.clients.map((client) => (
        client.id
      )).indexOf(action.payload.client.id);
      return {
        ...state,
        lawsuit: {
          ...state.lawsuit,
          clients: [
            ...state.lawsuit.clients.slice(0, index),
            ...state.lawsuit.clients.slice(index + 1),
          ],
        },
      };
    }
    case counterpartTypes.ADD_COUNTERPART_TO_LAWSUIT_SUCCESS: {
      return {
        ...state,
        lawsuit: {
          ...state.lawsuit,
          counterparts: [ // Add new counterpart to lawsuit.
            ...state.lawsuit.counterparts,
            action.payload.counterpart,
          ],
        },
      };
    }
    case counterpartTypes.DELETE_COUNTERPART_FROM_LAWSUIT_SUCCESS: {
      // Remove deleted counterpart from list of counterparts.
      const index = state.lawsuit.counterparts.map((counterpart) => (
        counterpart.id
      )).indexOf(action.payload.counterpart.id);
      return {
        ...state,
        lawsuit: {
          ...state.lawsuit,
          counterparts: [
            ...state.lawsuit.counterparts.slice(0, index),
            ...state.lawsuit.counterparts.slice(index + 1),
          ],
        },
      };
    }
    case types.COI_SEARCH_SUCCESS:
      return {
        ...state,
        all: action.response.lawsuits,
      };
    case types.RESET_LAWSUITS:
      return initialState;
    case types.COI_SEARCH_FAILURE:
    case types.FETCH_LAWSUITS_FAILURE:
    case types.CREATE_LAWSUIT_FAILURE:
    case types.LAWSUIT_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case types.FETCH_LAWSUIT_TYPES_SUCCESS:
      return {
        ...state,
        lawsuitTypes: action.response.lawsuit_types,
      };
    case types.TOGGLE_LAWSUIT_EDIT:
      return {
        ...state,
        edit: !state.edit,
      };
    default:
      return state;
  }
};

export default lawsuitsReducer;
