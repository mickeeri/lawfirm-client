export const AUTH_TOKEN_LS_KEY = 'auth_token';
export const API_ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://www.mikaeleriksson.xyz/v1' : 'http://localhost:3090/v1';

// Messages
export const FIRST_NAME_REQ_MESSAGE = 'Förnamn måste anges';
export const LAST_NAME_REQ_MESSAGE = 'Efternamn måste anges';
export const EMAIL_REQ_MESSAGE = 'E-post måste anges';
export const EMAIL_INVALID_MESSAGE = 'E-post har fel format';
export const PASSWORD_REQ_MESSAGE = 'Lösenord måste anges';
export const PASSWORD_MISMATCH_MESSAGE = 'Lösenord och lösenordsbekräftelse stämmer inte överens';
export const PASSWORD_CONFIRMATION_REQ_MESSAGE = 'Lösenordsbekräftelse måste anges';
export const PERSONAL_NUMBER_REQ_MESSAGE = 'Personnummer måste anges';

export const CONFIRM_DELETE_MODAL_NAME = 'confirmDeleteDialog';
