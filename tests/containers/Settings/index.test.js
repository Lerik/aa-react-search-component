import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { default as SettingsRedux, Settings } from '../../../src/containers/Settings'; // eslint-disable-line
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

jest.mock('react-native-router-flux', (() => ({
  Actions: {
    WishListList: jest.fn(),
  },
})));

describe('Settings', () => {
  const firstName = 'Bily';
  const lastName = 'Fernandez';
  const wrapperRedux = shallow(<SettingsRedux store={store} />);

  const props = {
    loginStore: wrapperRedux.node.props.loginStore,
    actions: {
      logoutAction: jest.fn(),
      removeAddPageErrorMessage: jest.fn(),
      hideConfirmModal: jest.fn(),
      showConfirmModal: jest.fn(),
    },
  };

  const wrapper = shallow(<Settings {...props} />);
  const instance = wrapper.instance();

  it('should simulate a confirm dialog when addUserNameMessageError prop changed', () => {
    const nextProps = {
      loginStore: {
        addUserNameMessageError: 'error',
      },
    };
    instance.componentWillReceiveProps(nextProps);
    expect(props.actions.showConfirmModal.mock.calls.length).toBe(1);
  });
  it('Should call errorMessageModal', () => {
    const errorMessageModalAction = instance.errorMessageModalAction();

    expect(errorMessageModalAction instanceof Function);
    errorMessageModalAction();

    expect(props.actions.removeAddPageErrorMessage.mock.calls.length).toBe(1);
    expect(props.actions.removeAddPageErrorMessage.mock.calls[0]).toEqual([]);
    expect(props.actions.hideConfirmModal.mock.calls.length).toBe(1);
    expect(props.actions.hideConfirmModal.mock.calls[0]).toEqual([]);
  });
  it('should set iconText state', () => {
    instance.onChangeFirstName(firstName);
    instance.onChangeLastName(lastName);
    instance.setIconText();

    expect(instance.state.iconText).toBe('BF');
  });
  it('should set iconText state', () => {
    const name = 'O';
    instance.onChangeFirstName(name);
    instance.onChangeLastName('');

    expect(instance.state.iconText).toBe(undefined);
  });
  it('should update user name', () => {
    const continueTouch = wrapper.find('Save').first();

    continueTouch.simulate('press');

    expect(wrapper.find('Save').first().length).toBe(1);
  });
  it('should connect to redux', () => {
    expect(wrapperRedux.length).toBe(1);
  });
  it('should Save icon be disabled because first name is required', () => {
    instance.onChangeFirstName('');
    instance.onChangeLastName('Last name');
    const condition = instance.areTextFieldsEmptyOrNotRespectingTheRightLength();

    expect(condition).toBe(true);
  });
  it('should Save icon be disabled because last name should be at least 2 characters or more', () => {
    instance.onChangeFirstName('Bily');
    instance.onChangeLastName('H');
    const condition = instance.areTextFieldsEmptyOrNotRespectingTheRightLength();

    expect(condition).toBe(true);
  });
  it('should show error message when email does not have the right format', () => {
    instance.onChangeFirstName('Bily');
    instance.onChangeLastName('Hernandez');
    instance.onChangeEmail('33@sss');
    instance.update();
    expect(instance.state.errorMessageForEmailCondition)
    .toEqual('Please enter a valid email address.');
  });

  describe('When logging out', () => {
    it('Should display logout modal', () => {
      instance.showLogoutConfirmation();
      expect(props.actions.showConfirmModal.mock.calls.length).toBe(2);
    });
    describe('And user press logout', () => {
      it('Should call function logout', () => {
        const logOutFunction = instance.logOut();
        const expectedAction = {
          goToAction: 'Login',
        };
        expect(logOutFunction instanceof Function);
        logOutFunction();
        expect(props.actions.logoutAction.mock.calls.length).toBe(1);
        expect(props.actions.logoutAction.mock.calls[0]).toEqual([expectedAction]);
        expect(props.actions.hideConfirmModal.mock.calls.length).toBe(2);
        expect(props.actions.hideConfirmModal.mock.calls[0]).toEqual([]);
      });
    });
  });
});
