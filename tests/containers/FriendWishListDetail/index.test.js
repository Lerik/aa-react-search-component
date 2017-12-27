import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import {
  BLACK,
} from '../../../src/styles/color-constants';
jest.unmock('ScrollView');
import { default as WishListDetailRedux, WishListDetail } from '../../../src/containers/FriendWishListDetail'; // eslint-disable-line

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

const Linking = require('react-native').Linking;
const Actions = require('react-native-router-flux').Actions;

const mockSelectedFriend = {
  _id: 'foo',
  firstName: 'John',
  lastName: 'Paul',
  phoneNumber: '+122222222',
  items: [],
};

const mockItem = {
  _id: 'id',
  dibsedBy: 'id',
  purchasedBy: 'id-1',
  imageUrl: 'imageUrl',
  name: 'name',
  description: 'description',
  link: 'link',
};

const mockSelectedWishList = {
  _id: 'id',
  dibsedBy: 'id',
  purchasedBy: 'id-1',
  name: 'name',
  items: [mockItem, mockItem],
};

const mockUser = {
  _id: 'id',
  dibsedBy: 'id',
  firstName: 'John',
  LastName: 'Paul',
};

describe('FriendWishList', () => {
  const props = {
    loginStore: {
      user: mockUser,
    },
    wishListStore: {
      friendWishLists: [mockSelectedFriend],
      selectedWishList: mockSelectedWishList,
    },
    friendsStore: {
      selectedFriend: mockSelectedFriend,
    },
    actions: {
      getFriendWishListsAction: jest.fn(),
      selectWishListAction: jest.fn(),
      createWishAction: jest.fn(),
      createNotification: jest.fn(),
      getWishlistsForUpdate: jest.fn(),
    },
  };

  const wrapper = shallow(<WishListDetail {...props} />);
  const instance = wrapper.instance();
  instance.state.selectedFriend = mockSelectedFriend;

  it('should connect to redux', () => {
    expect(wrapper.length).toBe(1);
  });

  it('Should set the friend name', () => {
    const expectedResult = 'John Paul';
    instance.setFriendName();
    expect(instance.state.friendName).toBe(expectedResult);
  });

  it('Should increment the currentSlide "onSnapToItem"', () => {
    instance.state.currentSlide = 1;
    instance.onSnapToItem(1);
    expect(instance.state.currentSlide).toEqual(2);
  });

  it('Should call function "renderPagination"', () => {
    const result = instance.renderPagination();
    expect(result).not.toBe(undefined);
  });

  it('Should call function "renderWishListDetail"', () => {
    const result = instance.renderWishListDetail(mockItem);
    expect(result).not.toBe(undefined);
  });

  it('Should call function "renderCarousel"', () => {
    const result = instance.renderCarousel();
    expect(result).not.toBe(undefined);
  });

  it('Should call function "render"', () => {
    const result = instance.render();
    expect(result).not.toBe(undefined);
  });

  it('Should call function "onWishListUpdated"', () => {
    instance.onWishListUpdated();
    expect(instance.state.isUpdatingGift).toEqual(false);
  });

  it('Should call function "onWishListUpdated"', () => {
    instance.onWishListUpdated();
    expect(instance.state.isUpdatingGift).toEqual(false);
  });

  describe('When user goes back', () => {
    it('Should call actions "pop" method', () => {
      instance.goBack();
      expect(Actions.pop).toBeCalled();
    });
  });

  describe('When linking call back', () => {
    it('Should call Linking method "openURL" if its supporte', () => {
      Linking.openURL = jest.fn();
      const result = instance.linkingCallback('url/');
      result(true);
      expect(Linking.openURL).toBeCalled();
    });
    it('Should not call Linking method "openURL" if not supported', () => {
      Linking.openURL = jest.fn();
      const result = instance.linkingCallback('url/');
      result(false);
      expect(Linking.openURL).not.toBeCalled();
    });
  });

  describe('When wish list detail wrapper', () => {
    it('Should return style "dibsWishListDetailImageWrapper"', () => {
      const styleMock = {
        flex: 1.2,
        borderRadius: 8,
      };
      const result = instance.wishListDetailWrapperStyle(mockUser);

      const jsonStyle = JSON.stringify(styleMock);
      const expectedResult = JSON.stringify(result);
      expect(expectedResult).toEqual(jsonStyle);
    });
    it('Should return style "wishListDetailImageWrapperBlackOpacity"', () => {
      const styleMock = {
        flex: 1.2,
        backgroundColor: BLACK,
        borderRadius: 8,
      };
      mockUser._id = 'foo'; // eslint-disable-line
      const result = instance.wishListDetailWrapperStyle(mockUser);

      const jsonStyle = JSON.stringify(styleMock);
      const expectedResult = JSON.stringify(result);
      expect(expectedResult).toEqual(jsonStyle);
    });
    it('Should return style "wishListDetailImageWrapper"', () => {
      const styleMock = {
        flex: 1.2,
        borderRadius: 8,
      };
      mockUser.dibsedBy = undefined;
      const result = instance.wishListDetailWrapperStyle(mockUser);

      const jsonStyle = JSON.stringify(styleMock);
      const expectedResult = JSON.stringify(result);
      expect(expectedResult).toEqual(jsonStyle);
    });
  });

  describe('When user update dibs', () => {
    it('should delete wishListItem.dibsedBy', () => {
      const result = instance.updateDibs(mockItem);
      result();
      expect(props.actions.createWishAction.mock.calls.length).toBeGreaterThan(0);
    });
    it('should not delete wishListItem.dibsedBy', () => {
      mockItem._id = 'foo'; // eslint-disable-line
      const result = instance.updateDibs(mockItem);
      result();
      expect(props.actions.createWishAction.mock.calls.length).toBeGreaterThan(0);
    });
  });

  describe('When user update purchased', () => {
    it('should delete wishListItem.purchasedBy', () => {
      mockItem._id = 'id-1'; // eslint-disable-line
      const result = instance.updatePurchased(mockItem);
      result();
      expect(props.actions.createWishAction.mock.calls.length).toBeGreaterThan(0);
    });
    it('should not delete wishListItem.purchasedBy', () => {
      mockItem._id = 'foo'; // eslint-disable-line
      const result = instance.updateDibs(mockItem);
      result();
      expect(props.actions.createWishAction.mock.calls.length).toBeGreaterThan(0);
    });
  });
});
