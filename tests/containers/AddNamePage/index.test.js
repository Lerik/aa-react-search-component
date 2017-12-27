import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { Actions } from 'react-native-router-flux';
import { default as AddNameRedux, AddNamePage } from '../../../src/containers/AddNamePage'; // eslint-disable-line
import * as loginActions from '../../../src/containers/LoginPage/actions';
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

jest.mock('Keyboard', (() => ({
  dismiss: jest.fn(),
  addListener: jest.fn(),
})));
const Keyboard = require('react-native').Keyboard;

describe('AddNamePage', () => {
  const firstName = 'Bily';
  const lastName = 'Fernandez';

  const wrapperRedux = shallow(<AddNameRedux store={store} />);

  const props = {
    loginStore: wrapperRedux.node.props.loginStore,
    actions: {
      loginActions,
      removeAddPageErrorMessage: jest.fn(),
      showConfirmModal: jest.fn(),
      hideConfirmModal: jest.fn(),
    },
  };

  const wrapper = shallow(<AddNamePage {...props} />);
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

  it('should update user name', () => {
    const continueTouch = wrapper.find('TouchableHighlight').first();

    continueTouch.simulate('press');

    expect(wrapper.find('Continue').first().length).toBe(1);
  });

  it('should connect to redux', () => {
    expect(wrapperRedux.length).toBe(1);
  });

  it('should continue button be disabled because first name is required', () => {
    instance.onChangeFirstName('');
    instance.onChangeLastName('Last name');
    const condition = instance.areTextFieldsEmptyOrNotRespectingTheRightLength();

    expect(condition).toBe(true);
  });

  it('should continue button be disabled because last name should be at least 2 characters or more', () => {
    instance.onChangeFirstName('Bily');
    instance.onChangeLastName('H');
    const condition = instance.areTextFieldsEmptyOrNotRespectingTheRightLength();

    expect(condition).toBe(true);
  });

  it('should go to WishList screen', () => {
    instance.goToWishLists();

    expect(Actions.WishListList.mock.calls.length).toBe(1);
  });

  it('should show error message when email does not have the right format', () => {
    instance.onChangeFirstName('Bily');
    instance.onChangeLastName('Hernandez');
    instance.onChangeEmail('33@sss');
    instance.update();
    expect(instance.state.errorMessageForEmailCondition)
    .toEqual('Please enter a valid email address.');
  });

  describe('When user hides keyboard', () => {
    it('Should call the "dismiss" method', () => {
      instance.hideKeyboard();

      expect(Keyboard.dismiss.mock.calls.length).toBeGreaterThan(0);
    });
  });
});
