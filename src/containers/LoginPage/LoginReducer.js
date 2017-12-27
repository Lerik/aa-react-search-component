import { fromJS } from 'immutable';
import {
  AUTHENTICATE_ACTION,
  AUTHENTICATED_ACTION,
  LOGIN_ACTION,
  LOGOUT_ACTION,
  LOGINMESSAGEERROR_ACTION,
  SIGNUP_ACTION,
  SIGNUPMESSAGEERROR_ACTION,
  UPDATE_USERNAME_MESSAGEERROR_ACTION,
  UPDATED_USERNAME_ACTION,
  SEND_VERIFICATION_CODE,
  VERIFICATION_CODE_HAS_BEEN_SENT,
  CREATE_USER,
  VERIFY_CODE_SENT_BY_SMS,
  REMOVE_TOAST_FOR_UPDATED_USERNAME_ACTION,
  REMOVE_ERROR_MESSAGE_FROM_ADD_PAGE,
} from './constants';

const initialState = fromJS({
  user: {},
  userToCreate: {},
  userCreated: {},
  userToAuthenticate: {},
  loginMessageError: '',
  signUpMessageError: '',
  addUserNameMessageError: '',
  loading: false,
  displayToastWhenSuccessfulUserUpdate: false,
});

function LoginReducer(state = initialState, action) { // NOSONAR
  switch (action.type) {
    case AUTHENTICATE_ACTION:
      return state
        .set('userToAuthenticate', action.userToAuthenticate)
        .set('loginMessageError', undefined);
    case AUTHENTICATED_ACTION:
      return state
        .set('token', action.token)
        .set('user', action.user)
        .set('userToAuthenticate', {})
        .set('loginMessageError', undefined)
        .set('loading', false);
    case LOGIN_ACTION:
      return state;
    case LOGOUT_ACTION:
      return state
        .set('token', {})
        .set('user', {});
    case LOGINMESSAGEERROR_ACTION:
      return state.set('loginMessageError', action.message)
                  .set('loading', false);
    case SIGNUP_ACTION:
      return state.set('userToCreate', action.user);
    case SIGNUPMESSAGEERROR_ACTION:
      return state.set('userCreated', {})
          .set('signUpMessageError', action.message);
    case UPDATE_USERNAME_MESSAGEERROR_ACTION:
      return state.set('addUserNameMessageError', action.message);
    case UPDATED_USERNAME_ACTION:
      return state.set('user', action.user)
                  .set('displayToastWhenSuccessfulUserUpdate', true);
    case VERIFICATION_CODE_HAS_BEEN_SENT:
      return state.set('loading', false);
    case SEND_VERIFICATION_CODE:
      return state.set('userToCreate', action.userToVerify)
                  .set('loading', true)
                  .set('loginMessageError', undefined);
    case REMOVE_TOAST_FOR_UPDATED_USERNAME_ACTION:
      return state.set('displayToastWhenSuccessfulUserUpdate', false);
    case VERIFY_CODE_SENT_BY_SMS:
      return state.set('userToCreate', action.userToWhichCodeWasSent)
                  .set('loading', true)
                  .set('loginMessageError', undefined);
    case CREATE_USER:
      return state.set('userToCreate', action.userToCreate)
                  .set('loading', false);
    case REMOVE_ERROR_MESSAGE_FROM_ADD_PAGE:
      return state.set('addUserNameMessageError', undefined);
    default:
      return state;
  }
}

export default LoginReducer;
