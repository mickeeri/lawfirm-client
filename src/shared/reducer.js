import * as userTypes from '../users/actionTypes';
import * as lawsuitTypes from '../lawsuits/actionTypes';
import * as clientTypes from '../clients/actionTypes';
import * as counterpartTypes from '../counterparts/actionTypes';

const initialState = {
  infoMessage: '',
  successMessage: '',
  errorMessage: '',
  closeAllAlerts: true,
};

const sharedReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SIGNIN_SUCCESS:
      return {
        infoMessage: 'Välkommen',
        errorMessage: '',
      };
    case userTypes.SIGNOUT_USER:
      return {
        infoMessage: 'Utloggad',
        errorMessage: '',
      };
    case userTypes.CREATE_USER_SUCCESS:
      return {
        infoMessage: 'Välkommen till Ordocliens',
        errorMessage: '',
      };
    case lawsuitTypes.CREATE_LAWSUITS_REQUEST:
    case lawsuitTypes.RESET_LAWSUITS:
      return initialState;
    case lawsuitTypes.CREATE_LAWSUIT_SUCCESS:
      return {
        successMessage: 'Ärende sparat',
        errorMessage: '',
        infoMessage: '',
      };
    case counterpartTypes.DELETE_COUNTERPART_FROM_LAWSUIT_SUCCESS:
    case clientTypes.DELETE_CLIENT_FROM_LAWSUIT_SUCCESS:
    case clientTypes.CREATE_CLIENT_SUCCESS:
      return {
        successMessage: action.successMessage,
        errorMessage: '',
        infoMessage: '',
      };
    case counterpartTypes.ADD_COUNTERPART_TO_LAWSUIT:
      return {
        errorMessage: '',
        successMessage: action.response.message,
      };
    case counterpartTypes.COUNTERPARTS_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default sharedReducer;
