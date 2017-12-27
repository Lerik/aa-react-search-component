import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { default as FriendsRedux, Friends } from '../../../src/containers/Friends'; // eslint-disable-line
import reducers from '../../../src/reducers/index';

const store = createStore(
  reducers,
);
jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
}));

describe('Friends', () => {
  const wrapperRedux = shallow(<FriendsRedux store={store} />);

  const props = {
    friendsStore: wrapperRedux.node.props.friendsStore,
  };
  const wrapper = shallow(<Friends {...props} />);

  it('should connect to redux', () => {
    expect(wrapper.length).toBe(1);
  });
});
