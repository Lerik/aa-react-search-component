import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { default as VerifySmsCodeRedux, VerifySmsCodePage } from '../../../src/containers/VerifySmsCodePage'; // eslint-disable-line
import reducers from '../../../src/reducers/index';

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

jest.mock('Alert', (() => ({
  alert: jest.fn(),
})));

jest.mock('Keyboard', (() => ({
  dismiss: jest.fn(),
})));

jest.mock('react-native-router-flux', (() => ({
  Actions: {
    Login: jest.fn(),
  },
})));
const mockCode = '1515';
const Keyboard = require('react-native').Keyboard;
const Actions = require('react-native-router-flux').Actions;

describe('VerifySmsCodePage', () => {
  const wrapperRedux = shallow(<VerifySmsCodeRedux store={store} />);

  const props = {
    loginStore: wrapperRedux.node.props.loginStore,
    actions: {
      hideConfirmModal: jest.fn(),
      showConfirmModal: jest.fn(),
      verifyCodeSentBySMS: jest.fn(),
      sendVerificationCodeBySMS: jest.fn(),
    },
  };

  const wrapper = shallow(<VerifySmsCodePage {...props} />);
  const instance = wrapper.instance();

  describe('when user verifies', () => {
    it('Should call function "verify"', () => {
      instance.state.code = mockCode;
      instance.state.tryingCounter = 1;
      const user = {
        type: 'local',
        phoneNumber: undefined,
        code: mockCode,
        name: '',
      };
      const payload = {
        user,
        goToAction: 'AddName',
      };
      instance.verify();

      expect(props.actions.verifyCodeSentBySMS.mock.calls[0]).toEqual([payload]);
    });
  });

  describe('When user sends sms', () => {
    it('Should send the code again', () => {
      const user = {
        type: 'local',
        phoneNumber: undefined,
        name: '',
        code: '',
      };
      const payload = {
        user,
        goToAction: 'VerifySmsCode',
      };
      instance.sendSmsCodeAgain();

      expect(props.actions.sendVerificationCodeBySMS.mock.calls.length).toBe(1);
      expect(props.actions.sendVerificationCodeBySMS.mock.calls[0]).toEqual([payload]);
    });
  });

  describe('When user hides keyboard', () => {
    it('Should call the "dismiss" method', () => {
      instance.hideKeyboard();

      expect(Keyboard.dismiss.mock.calls.length).toBe(1);
    });
  });

  describe('When user goes back', () => {
    it('Should call actions "Login" method', () => {
      instance.goBack();
      expect(Actions.Login).toBeCalled();
    });
  });

  describe('when rendering components', () => {
    it('Should call function "render"', () => {
      const result = instance.render();

      expect(result).not.toBe(undefined);
    });
  });

  describe('When writing a text in the sms code field', () => {
    it('Should set it successfully', () => {
      instance.onChangeText(mockCode);

      expect(instance.state.code).toBe(mockCode);
    });
  });
});
