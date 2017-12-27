import 'react-native';
import * as actions from '../../../src/containers/LoginPage/actions';
import * as constants from '../../../src/containers/LoginPage/constants';

describe('LoginPage Actions', () => {
  it('should create an action to checkLoginStatusAction', () => {
    const payload = {
      goToAction: 'action',
    };
    const expectedAction = {
      type: constants.CHECK_LOGIN_STATUS_ACTION,
      goToAction: 'action',
      userLoggedIn: payload,
    };
    expect(actions.checkLoginStatusAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to authenticateAction', () => {
    const payload = {
      user: '123',
      goToAction: 'action',
    };
    const expectedAction = {
      type: constants.AUTHENTICATE_ACTION,
      goToAction: 'action',
      userToAuthenticate: payload.user,
    };
    expect(actions.authenticateAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to authenticatedAction', () => {
    const payload = {
      token: '321',
      user: '123',
      goToAction: 'action',
    };
    const expectedAction = {
      type: constants.AUTHENTICATED_ACTION,
      goToAction: 'action',
      token: '321',
      user: '123',
    };
    expect(actions.authenticatedAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to loginAction', () => {
    const payload = {
      goToAction: 'action',
    };
    const expectedAction = {
      type: constants.LOGIN_ACTION,
      goToAction: 'action',
    };
    expect(actions.loginAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to logoutAction', () => {
    const payload = {
      goToAction: 'action',
    };
    const expectedAction = {
      type: constants.LOGOUT_ACTION,
      goToAction: 'action',
    };
    expect(actions.logoutAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to loginMessageErrorAction', () => {
    const message = 'text';
    const expectedAction = {
      type: constants.LOGINMESSAGEERROR_ACTION,
      message: 'text',
    };
    expect(actions.loginMessageErrorAction(message)).toEqual(expectedAction);
  });
  it('should create an action to sendVerificationCodeBySMS', () => {
    const payload = {
      user: '123',
      goToAction: 'action',
    };
    const expectedAction = {
      type: constants.SEND_VERIFICATION_CODE,
      goToAction: 'action',
      userToVerify: '123',
    };
    expect(actions.sendVerificationCodeBySMS(payload)).toEqual(expectedAction);
  });
  it('should create an action to signUpAction', () => {
    const payload = {
      user: '123',
      goToAction: 'action',
    };
    const expectedAction = {
      type: constants.SIGNUP_ACTION,
      goToAction: 'action',
      user: '123',
    };
    expect(actions.signUpAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to signUpMessageErrorAction', () => {
    const message = 'text';
    const expectedAction = {
      type: constants.SIGNUPMESSAGEERROR_ACTION,
      message: 'text',
    };
    expect(actions.signUpMessageErrorAction(message)).toEqual(expectedAction);
  });
  it('should create an action to createUser', () => {
    const payload = {
      user: '123',
      goToAction: 'action',
    };
    const expectedAction = {
      type: constants.CREATE_USER,
      goToAction: 'action',
      userToCreate: '123',
    };
    expect(actions.createUser(payload)).toEqual(expectedAction);
  });
  it('should create an action to verificationCodeHasBeenSent', () => {
    const goToAction = 'action';
    const expectedAction = {
      type: constants.VERIFICATION_CODE_HAS_BEEN_SENT,
      goToAction: 'action',
    };
    expect(actions.verificationCodeHasBeenSent(goToAction)).toEqual(expectedAction);
  });
  it('should create an action to updateUserNameAction', () => {
    const payload = {
      user: '123',
      goToAction: 'action',
    };
    const expectedAction = {
      type: constants.UPDATE_USERNAME_ACTION,
      goToAction: 'action',
      user: '123',
    };
    expect(actions.updateUserNameAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to updatedUserNameAction', () => {
    const payload = {
      user: '123',
      goToAction: 'action',
    };
    const expectedAction = {
      type: constants.UPDATED_USERNAME_ACTION,
      goToAction: 'action',
      user: '123',
    };
    expect(actions.updatedUserNameAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to updateUserNameMessageErrorAction', () => {
    const message = 'text';
    const expectedAction = {
      type: constants.UPDATE_USERNAME_MESSAGEERROR_ACTION,
      message: 'text',
    };
    expect(actions.updateUserNameMessageErrorAction(message)).toEqual(expectedAction);
  });
  it('should create an action to removeToastForSuccessfulUserUpdate', () => {
    const expectedAction = {
      type: constants.REMOVE_TOAST_FOR_UPDATED_USERNAME_ACTION,
    };
    expect(actions.removeToastForSuccessfulUserUpdate()).toEqual(expectedAction);
  });
  it('should create an action to verifyCodeSentBySMS', () => {
    const payload = {
      user: '123',
      goToAction: 'action',
    };
    const expectedAction = {
      type: constants.VERIFY_CODE_SENT_BY_SMS,
      goToAction: 'action',
      userToWhichCodeWasSent: '123',
    };
    expect(actions.verifyCodeSentBySMS(payload)).toEqual(expectedAction);
  });
  it('should create an action to removeAddPageErrorMessage', () => {
    const expectedAction = {
      type: constants.REMOVE_ERROR_MESSAGE_FROM_ADD_PAGE,
    };
    expect(actions.removeAddPageErrorMessage()).toEqual(expectedAction);
  });
});

