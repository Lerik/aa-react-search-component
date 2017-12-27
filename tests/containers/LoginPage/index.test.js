import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { default as LoginRedux, LoginPage } from '../../../src/containers/LoginPage'; // eslint-disable-line
import * as loginActions from '../../../src/containers/LoginPage/actions';
import reducers from '../../../src/reducers/index';

const store = createStore(
  reducers,
);

jest.mock('Alert', (() => ({
  alert: jest.fn(),
})));

const Alert = require('react-native').Alert;

describe('LoginPage', () => {
  const email = 'test@test.com';
  const password = 'password';
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ODdkMzVhMGNjMDIyYTFmNWJiMTg0Y2MiLCJpYXQiOjE0ODQ5NTA5MzEsImV4cCI6MTQ4NTAzNzMzMSwiaXNzIjoiZmVhdGhlcnMifQ.oNVPKPka2nVTMTVg995b1QzU8JfOPMA-iW9WWbOSiEI';

  const user = {
    type: 'local',
    email,
    password,
  };
  const autenticateUserPayload = {
    user,
    goToAction: '',
  };
  const autenticatedUserPayload = {
    token,
    goToAction: '',
  };
  const checkLoginUserPayload = {
    email,
    password,
    type: 'local',
  };

  const wrapperRedux = shallow(<LoginRedux store={store} />);
  const dispatch = wrapperRedux.node.props.store.dispatch;

  const props = {
    loginStore: wrapperRedux.node.props.loginStore,
    actions: loginActions,
  };

  const wrapper = shallow(<LoginPage {...props} />);
  const instance = wrapper.instance();

  const errMessage = 'An error has occurred. Please try again.';
  const phoneNumber = '+12345';

  it('should fail gettting device PhoneNumber', () => {
    instance.componentWillMount();

    expect(instance.state.hasPhoneNumber).toBe(false);
  });
  it('should simulate an alert when signUpMessageError prop changed', () => {
    const nextProps = {
      loginStore: {
        signUpMessageError: 'error',
        userToCreate: {
          phoneNumber: '12345',
        },
      },
    };

    instance.componentWillReceiveProps(nextProps);

    expect(Alert.alert.mock.calls.length).toBe(1);
  });
  it('should set PhoneNumber state', () => {
    instance.onChangeText(phoneNumber);

    expect(instance.state.phoneNumber).toBe(phoneNumber);
  });
  it('should login with test credentials', () => {
    const continueTouch = wrapper.find('TouchableHighlight').first();

    continueTouch.simulate('press');

    expect(wrapper.find('Continue').first().length).toBe(1);
  });
  it('should open terms and conditions', () => {
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

    const continueTouch = wrapper.find('TouchableHighlight').last();

    continueTouch.simulate('press');

    expect(wrapper.find('Continue').first().length).toBe(1);
  });
  it('should have a terms and conditions text', () => {
    const termsAndConditionsText = 'By signing up, you agree to our terms & conditions';

    expect(wrapper.find(termsAndConditionsText).first().length).toBe(1);
  });
  it('should call onSubmitEditing', () => {
    instance.phoneNumberInput = {
      blur: jest.fn(),
    };
    const textInput = wrapper.find('TextInput').first();
    textInput.props().onSubmitEditing();

    expect(instance.phoneNumberInput).not.toBe(undefined);
  });
  it('should connect to redux', () => {
    expect(wrapperRedux.length).toBe(1);
  });
  it('should return a valid signUpAction object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/SIGNUP_ACTION',
      user,
      goToAction: '',
    };

    const action = instance.props.actions.signUpAction;
    dispatch(action(autenticateUserPayload));
    const userToCreate =
    store.getState().LoginReducer.toJS().userToCreate;

    expect(instance.props.actions.signUpAction(autenticateUserPayload))
    .toEqual(expectedAction);
    expect(userToCreate).toEqual(user);
  });
  it('should return a valid loginMessageErrorAction object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/LOGINMESSAGEERROR_ACTION',
      message: errMessage,
    };

    const action = instance.props.actions.loginMessageErrorAction;
    dispatch(action(errMessage));
    const loginMessageError =
    store.getState().LoginReducer.toJS().loginMessageError;

    expect(instance.props.actions.loginMessageErrorAction(errMessage))
    .toEqual(expectedAction);
    expect(loginMessageError).toEqual(errMessage);
  });
  it('should return a valid signUpMessageErrorAction object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/SIGNUPMESSAGEERROR_ACTION',
      message: errMessage,
    };

    const action = instance.props.actions.signUpMessageErrorAction;
    dispatch(action(errMessage));
    const signUpMessageError =
    store.getState().LoginReducer.toJS().signUpMessageError;

    expect(instance.props.actions.signUpMessageErrorAction(errMessage))
    .toEqual(expectedAction);
    expect(signUpMessageError).toEqual(errMessage);
  });
  it('should return a valid addUserNameMessageErrorAction object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/UPDATE_USERNAME_MESSAGEERROR_ACTION',
      message: errMessage,
    };

    const action = instance.props.actions.updateUserNameMessageErrorAction;
    dispatch(action(errMessage));
    const addUserNameMessageError =
    store.getState().LoginReducer.toJS().addUserNameMessageError;

    expect(instance.props.actions.updateUserNameMessageErrorAction(errMessage))
    .toEqual(expectedAction);
    expect(addUserNameMessageError).toEqual(errMessage);
  });
  it('should return a valid updatedUserNameAction object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/UPDATED_USERNAME_ACTION',
      user,
      goToAction: '',
    };

    const action = instance.props.actions.updatedUserNameAction;
    dispatch(action(autenticateUserPayload));
    const userToUpdate =
    store.getState().LoginReducer.toJS().user;

    expect(instance.props.actions.updatedUserNameAction(autenticateUserPayload))
    .toEqual(expectedAction);
    expect(userToUpdate).toEqual(user);
  });
  it('should return a valid authenticateAction object and state', () => {
    const expectedAction = {
      type: 'app/LoginPage/AUTHENTICATE_ACTION',
      userToAuthenticate: user,
      goToAction: '',
    };

    const action = instance.props.actions.authenticateAction;
    dispatch(action(autenticateUserPayload));
    const userToAuthenticate =
    store.getState().LoginReducer.toJS().userToAuthenticate;

    expect(action(autenticateUserPayload)).toEqual(expectedAction);
    expect(userToAuthenticate).toEqual(user);
  });
  it('should return a valid authenticatedAction object', () => {
    const expectedAction = {
      type: 'app/LoginPage/AUTHENTICATED_ACTION',
      token,
      goToAction: '',
    };
    const action = instance.props.actions.authenticatedAction;
    dispatch(action(autenticatedUserPayload));

    expect(action(autenticatedUserPayload)).toEqual(expectedAction);
  });
  it('should return a valid checkLoginStatusAction object', () => {
    const expectedAction = {
      type: 'app/LoginPage/CHECK_LOGIN_STATUS_ACTION',
      userLoggedIn: user,
      goToAction: undefined,
    };

    expect(instance.props.actions.checkLoginStatusAction(checkLoginUserPayload))
    .toEqual(expectedAction);
  });
  it('should return a valid updateUserNameAction object', () => {
    const expectedAction = {
      type: 'app/LoginPage/UPDATE_USERNAME_ACTION',
      user,
      goToAction: '',
    };

    expect(instance.props.actions.updateUserNameAction(autenticateUserPayload))
    .toEqual(expectedAction);
  });
  it('should return a valid updatedUserNameAction object', () => {
    const expectedAction = {
      type: 'app/LoginPage/UPDATED_USERNAME_ACTION',
      user,
      goToAction: '',
    };

    expect(instance.props.actions.updatedUserNameAction(autenticateUserPayload))
    .toEqual(expectedAction);
  });
  it('should return a valid updateUserNameMessageErrorAction object', () => {
    const expectedAction = {
      type: 'app/LoginPage/UPDATE_USERNAME_MESSAGEERROR_ACTION',
      message: errMessage,
    };

    expect(instance.props.actions.updateUserNameMessageErrorAction(errMessage))
    .toEqual(expectedAction);
  });
  it('should set phone number state', () => {
    Alert.alert.mockClear();
    instance.props.loginStore.loading = false;
    instance.onChangeText('+15432345647');
    instance.sendVerificationCode();

    expect(Alert.alert.mock.calls.length).toBe(0);
  });
  it('should set phone number textInput ref', () => {
    const textInput = wrapper.find('TextInput').first();
    textInput.node.ref((component) => { instance.phoneNumberInput = component; });

    expect(instance.phoneNumberInput).not.toBe(undefined);
  });
});
