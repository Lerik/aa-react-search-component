import {
  AUTHENTICATE_ACTION,
  AUTHENTICATED_ACTION,
  LOGIN_ACTION,
  LOGOUT_ACTION,
  LOGINMESSAGEERROR_ACTION,
  SIGNUP_ACTION,
  SIGNUPMESSAGEERROR_ACTION,
  VERIFICATION_CODE_HAS_BEEN_SENT,
  CHECK_LOGIN_STATUS_ACTION,
  UPDATE_USERNAME_ACTION,
  UPDATED_USERNAME_ACTION,
  UPDATE_USERNAME_MESSAGEERROR_ACTION,
  SEND_VERIFICATION_CODE,
  CREATE_USER,
  VERIFY_CODE_SENT_BY_SMS,
  REMOVE_TOAST_FOR_UPDATED_USERNAME_ACTION,
  REMOVE_ERROR_MESSAGE_FROM_ADD_PAGE,
} from './constants';

export function checkLoginStatusAction(payload) {
  return {
    type: CHECK_LOGIN_STATUS_ACTION,
    userLoggedIn: payload,
    goToAction: payload.goToAction,
  };
}

export function authenticateAction(payload) {
  return {
    type: AUTHENTICATE_ACTION,
    userToAuthenticate: payload.user,
    goToAction: payload.goToAction,
  };
}

export function authenticatedAction(payload) {
  return {
    type: AUTHENTICATED_ACTION,
    token: payload.token,
    user: payload.user,
    goToAction: payload.goToAction,
  };
}

export function loginAction(payload) {
  return {
    type: LOGIN_ACTION,
    goToAction: payload.goToAction,
  };
}

export function logoutAction(payload) {
  return {
    type: LOGOUT_ACTION,
    goToAction: payload.goToAction,
  };
}

export function loginMessageErrorAction(message) {
  return {
    type: LOGINMESSAGEERROR_ACTION,
    message,
  };
}

export function sendVerificationCodeBySMS(payload) {
  return {
    type: SEND_VERIFICATION_CODE,
    userToVerify: payload.user,
    goToAction: payload.goToAction,
  };
}

export function signUpAction(payload) {
  return {
    type: SIGNUP_ACTION,
    user: payload.user,
    goToAction: payload.goToAction,
  };
}

export function signUpMessageErrorAction(message) {
  return {
    type: SIGNUPMESSAGEERROR_ACTION,
    message,
  };
}

export function createUser(payload) {
  return {
    type: CREATE_USER,
    userToCreate: payload.user,
    goToAction: payload.goToAction,
  };
}

export function verificationCodeHasBeenSent(goToAction) {
  return {
    type: VERIFICATION_CODE_HAS_BEEN_SENT,
    goToAction,
  };
}

export function updateUserNameAction(payload) {
  return {
    type: UPDATE_USERNAME_ACTION,
    user: payload.user,
    goToAction: payload.goToAction,
  };
}

export function updatedUserNameAction(payload) {
  return {
    type: UPDATED_USERNAME_ACTION,
    user: payload.user,
    goToAction: payload.goToAction,
  };
}

export function updateUserNameMessageErrorAction(message) {
  return {
    type: UPDATE_USERNAME_MESSAGEERROR_ACTION,
    message,
  };
}

export function removeToastForSuccessfulUserUpdate() {
  return {
    type: REMOVE_TOAST_FOR_UPDATED_USERNAME_ACTION,
  };
}

export function verifyCodeSentBySMS(payload) {
  return {
    type: VERIFY_CODE_SENT_BY_SMS,
    userToWhichCodeWasSent: payload.user,
    goToAction: payload.goToAction,
  };
}

export function removeAddPageErrorMessage() {
  return {
    type: REMOVE_ERROR_MESSAGE_FROM_ADD_PAGE,
  };
}
