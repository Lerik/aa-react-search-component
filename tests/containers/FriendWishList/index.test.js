import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { default as FriendWishListRedux, FriendWishList } from '../../../src/containers/FriendWishList'; // eslint-disable-line
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

jest.mock('react-native-router-flux', (() => ({
  Actions: {
    pop: jest.fn(),
  },
})));
const Actions = require('react-native-router-flux').Actions;

const mockSelectedFriend = {
  _id: 'foo',
  firstName: 'John',
  lastName: 'Paul',
  phoneNumber: '+122222222',
  items: [],
};

describe('FriendWishList', () => {
  const wrapperRedux = shallow(<FriendWishListRedux store={store} />);

  const props = {
    loginStore: wrapperRedux.node.props.loginStore,
    wishListStore: {
      friendWishLists: [mockSelectedFriend],
    },
    friendsStore: {
      selectedFriend: mockSelectedFriend,
    },
    actions: {
      getFriendWishListsAction: jest.fn(),
      selectWishListAction: jest.fn(),
    },
  };

  const wrapper = shallow(<FriendWishList {...props} />);
  const instance = wrapper.instance();
  instance.state.selectedFriend = mockSelectedFriend;

  it('should connect to redux', () => {
    expect(wrapper.length).toBe(1);
  });

  describe('When componentWillReceiveProps', () => {
    it('should call an instance of "setState"', () => {
      const nextProps = {
        wishListStore: {
          friendWishLists: [],
        },
      };
      instance.componentWillReceiveProps(nextProps);
      expect(instance.setState).not.toBe(undefined);
    });
  });

  it('Should call function "goToWishlistDetail"', () => {
    const mockWishlistData = {
      name: 'Joe',
    };
    const result = instance.goToWishlistDetail(mockWishlistData);
    expect(result).not.toBe(undefined);
  });

  it('Should call function "setIconText"', () => {
    instance.setIconText();
    expect(instance.setState).not.toBe(undefined);
  });

  it('Should call function "rowHasChanged"', () => {
    const r1 = 'foo';
    const r2 = 'foo';
    const result = instance.rowHasChanged(r1, r2);

    expect(result).toEqual(false);
  });

  it('Should set the friend name', () => {
    const expectedResult = 'John Paul';
    instance.setFriendName();
    expect(instance.state.friendName).toBe(expectedResult);
  });

  it('Should call function "renderEmptyList"', () => {
    const result = instance.renderEmptyList();
    expect(result).not.toBe(undefined);
  });

  it('Should call function "renderWishList"', () => {
    const result = instance.renderWishList();
    expect(result).not.toBe(undefined);
  });

  it('Should call function "render"', () => {
    const result = instance.render();
    expect(result).not.toBe(undefined);
  });

  describe('When user goes back', () => {
    it('Should call actions "pop" method', () => {
      instance.goToFriendsScreen();
      expect(Actions.pop).toBeCalled();
    });
  });
});
