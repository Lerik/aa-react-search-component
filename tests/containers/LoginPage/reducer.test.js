import 'react-native';
import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import reducers from '../../../src/reducers/index';
import { default as LoginRedux, LoginPage } from '../../../src/containers/LoginPage'; // eslint-disable-line
import * as loginPageActions from '../../../src/containers/LoginPage/actions';

const store = createStore(
  reducers,
);

jest.mock('Linking', (() => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn().mockReturnValue(
    new Promise((resolve) => {
      resolve(true);
    })
    ),
  getInitialURL: jest.fn(),
})));

describe('LoginPage Reducer', () => {
  const wrapperRedux = shallow(<LoginRedux store={store} />);
  const dispatch = wrapperRedux.node.props.store.dispatch;

  const props = {
    loginStore: wrapperRedux.node.props.loginStore,
    wishListStore: wrapperRedux.node.props.wishListStore,
    actions: loginPageActions,
  };

  const wrapper = shallow(<LoginPage {...props} />);
  const instance = wrapper.instance();

  const userToAuthenticatePayload = {
    user: '123',
    goToAction: 'action',
  };

  const authenticatedPayload = {
    token: '321',
    user: '123',
    goToAction: 'action',
  };

  const logoutPayload = {
    token: {},
    user: {},
    goToAction: 'action',
  };

  const signupPayload = {
    user: '123',
  };

  const updatedUserNamePayload = {
    user: '123',
    goToAction: 'action',
  };

  const userToVerifyPayload = {
    user: '123',
    goToAction: 'action',
  };

  const userSentCodePayload = {
    user: '123',
    goToAction: 'action',
  };

  const createUserPayload = {
    user: '123',
    goToAction: 'action',
  };

  // const errorMessage = 'error';

  it('should return a valid authenticateAction object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/AUTHENTICATE_ACTION',
      userToAuthenticate: '123',
      goToAction: 'action',
    };

    const action = instance.props.actions.authenticateAction;
    dispatch(action(userToAuthenticatePayload));
    const userToAuthenticate =
    store.getState().LoginReducer.toJS().userToAuthenticate;
    expect(userToAuthenticate).toEqual('123');

    const isUndefined =
    store.getState().LoginReducer.toJS().loginMessageError;
    expect(isUndefined).toEqual(undefined);

    expect(instance.props.actions.authenticateAction(userToAuthenticatePayload))
    .toEqual(expectedAction);
  });

  it('should return a valid authenticateAction object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/AUTHENTICATED_ACTION',
      token: '321',
      user: '123',
      goToAction: 'action',
    };

    const action = instance.props.actions.authenticatedAction;
    dispatch(action(authenticatedPayload));

    const user =
    store.getState().LoginReducer.toJS().user;
    expect(user).toEqual('123');

    const token =
    store.getState().LoginReducer.toJS().token;
    expect(token).toEqual('321');

    const isUndefined =
    store.getState().LoginReducer.toJS().loginMessageError;
    expect(isUndefined).toEqual(undefined);

    const loading =
    store.getState().LoginReducer.toJS().loading;
    expect(loading).toEqual(false);

    expect(instance.props.actions.authenticatedAction(authenticatedPayload))
    .toEqual(expectedAction);
  });

  it('should return a valid loginAction object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/LOGIN_ACTION',
      goToAction: 'action',
    };

    const action = instance.props.actions.loginAction;
    dispatch(action({ goToAction: 'action' }));
    expect(instance.props.actions.loginAction({ goToAction: 'action' }))
    .toEqual(expectedAction);
  });
  it('should return a valid logoutAction object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/LOGOUT_ACTION',
      goToAction: 'action',
    };

    const action = instance.props.actions.logoutAction;
    dispatch(action(logoutPayload));
    const user =
    store.getState().LoginReducer.toJS().user;
    expect(user).toEqual({});

    const token =
    store.getState().LoginReducer.toJS().token;
    expect(token).toEqual({});

    expect(instance.props.actions.logoutAction(logoutPayload))
    .toEqual(expectedAction);
  });

  it('should return a valid loginMessageErrorAction object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/LOGINMESSAGEERROR_ACTION',
      message: 'test',
    };

    const action = instance.props.actions.loginMessageErrorAction;
    dispatch(action('test'));
    const loginMessageError =
    store.getState().LoginReducer.toJS().loginMessageError;
    expect(loginMessageError).toEqual('test');

    const loading =
    store.getState().LoginReducer.toJS().loading;
    expect(loading).toEqual(false);

    expect(instance.props.actions.loginMessageErrorAction('test'))
    .toEqual(expectedAction);
  });

  it('should return a valid signUpAction object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/SIGNUP_ACTION',
      user: '123',
    };

    const action = instance.props.actions.signUpAction;
    dispatch(action(signupPayload));
    const userToCreate =
    store.getState().LoginReducer.toJS().userToCreate;
    expect(userToCreate).toEqual('123');

    expect(instance.props.actions.signUpAction(signupPayload))
    .toEqual(expectedAction);
  });
  it('should return a valid signUpMessageErrorAction object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/SIGNUPMESSAGEERROR_ACTION',
      message: 'text',
    };

    const action = instance.props.actions.signUpMessageErrorAction;
    dispatch(action('text'));
    const userCreated =
    store.getState().LoginReducer.toJS().userCreated;
    expect(userCreated).toEqual({});

    const signUpMessageError =
    store.getState().LoginReducer.toJS().signUpMessageError;
    expect(signUpMessageError).toEqual('text');

    expect(instance.props.actions.signUpMessageErrorAction('text'))
    .toEqual(expectedAction);
  });
  it('should return a valid updateUserNameMessageErrorAction object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/UPDATE_USERNAME_MESSAGEERROR_ACTION',
      message: 'text',
    };

    const action = instance.props.actions.updateUserNameMessageErrorAction;
    dispatch(action('text'));

    const addUserNameMessageError =
    store.getState().LoginReducer.toJS().addUserNameMessageError;
    expect(addUserNameMessageError).toEqual('text');

    expect(instance.props.actions.updateUserNameMessageErrorAction('text'))
    .toEqual(expectedAction);
  });
  it('should return a valid updatedUserNameAction object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/UPDATED_USERNAME_ACTION',
      goToAction: 'action',
      user: '123',
    };

    const action = instance.props.actions.updatedUserNameAction;
    dispatch(action(updatedUserNamePayload));
    const user =
    store.getState().LoginReducer.toJS().user;
    expect(user).toEqual('123');

    const displayToastWhenSuccessfulUserUpdate =
    store.getState().LoginReducer.toJS().displayToastWhenSuccessfulUserUpdate;
    expect(displayToastWhenSuccessfulUserUpdate).toEqual(true);

    expect(instance.props.actions.updatedUserNameAction(updatedUserNamePayload))
    .toEqual(expectedAction);
  });
  it('should return a valid verificationCodeHasBeenSent object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/VERIFICATION_CODE_HAS_BEEN_SENT',
      goToAction: 'action',
    };

    const action = instance.props.actions.verificationCodeHasBeenSent;
    dispatch(action('action'));

    const loading =
    store.getState().LoginReducer.toJS().loading;
    expect(loading).toEqual(false);

    expect(instance.props.actions.verificationCodeHasBeenSent('action'))
    .toEqual(expectedAction);
  });
  it('should return a valid sendVerificationCodeBySMS object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/SEND_VERIFICATION_CODE',
      userToVerify: '123',
      goToAction: 'action',
    };

    const action = instance.props.actions.sendVerificationCodeBySMS;
    dispatch(action(userToVerifyPayload));

    const userToCreate =
    store.getState().LoginReducer.toJS().userToCreate;
    expect(userToCreate).toEqual('123');

    const loading =
    store.getState().LoginReducer.toJS().loading;
    expect(loading).toEqual(true);

    const isUndefined =
    store.getState().LoginReducer.toJS().loginMessageError;
    expect(isUndefined).toEqual(undefined);

    expect(instance.props.actions.sendVerificationCodeBySMS(userToVerifyPayload))
    .toEqual(expectedAction);
  });
  it('should return a valid removeToastForSuccessfulUserUpdate object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/REMOVE_TOAST_FOR_UPDATED_USERNAME_ACTION',
    };

    const action = instance.props.actions.removeToastForSuccessfulUserUpdate;
    dispatch(action());

    const displayToastWhenSuccessfulUserUpdate =
    store.getState().LoginReducer.toJS().displayToastWhenSuccessfulUserUpdate;
    expect(displayToastWhenSuccessfulUserUpdate).toEqual(false);

    expect(instance.props.actions.removeToastForSuccessfulUserUpdate())
    .toEqual(expectedAction);
  });
  it('should return a valid verifyCodeSentBySMS object and state', () => {
    const expectedAction = {
      type: 'app/VerifySmsCodePage/VERIFY_CODE_SENT_BY_SMS',
      userToWhichCodeWasSent: '123',
      goToAction: 'action',
    };

    const action = instance.props.actions.verifyCodeSentBySMS;
    dispatch(action(userSentCodePayload));

    const userToCreate =
    store.getState().LoginReducer.toJS().userToCreate;
    expect(userToCreate).toEqual('123');

    const loading =
    store.getState().LoginReducer.toJS().loading;
    expect(loading).toEqual(true);

    const isUndefined =
    store.getState().LoginReducer.toJS().loginMessageError;
    expect(isUndefined).toEqual(undefined);

    expect(instance.props.actions.verifyCodeSentBySMS(userSentCodePayload))
    .toEqual(expectedAction);
  });
  it('should return a valid createUser object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/CREATE_USER',
      goToAction: 'action',
      userToCreate: '123',
    };

    const action = instance.props.actions.createUser;
    dispatch(action(createUserPayload));
    const userToCreate =
    store.getState().LoginReducer.toJS().userToCreate;
    expect(userToCreate).toEqual('123');

    const loading =
    store.getState().LoginReducer.toJS().loading;
    expect(loading).toEqual(false);

    expect(instance.props.actions.createUser(createUserPayload))
    .toEqual(expectedAction);
  });
  it('should return a valid removeAddPageErrorMessage object and state', () => {
    const expectedAction = {
      type: 'app/VerifySmsCodePage/REMOVE_ERROR_MESSAGE_FROM_ADD_PAGE',
    };

    const action = instance.props.actions.removeAddPageErrorMessage;
    dispatch(action());

    const addUserNameMessageError =
    store.getState().LoginReducer.toJS().addUserNameMessageError;
    expect(addUserNameMessageError).toEqual(undefined);

    expect(instance.props.actions.removeAddPageErrorMessage())
    .toEqual(expectedAction);
  });
});

