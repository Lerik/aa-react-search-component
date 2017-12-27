import { Image, ListView } from 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { Actions } from 'react-native-router-flux';
import {default as WishListPageRedux, WishListPage, getFont} from '../../../src/containers/WishListPage'; // eslint-disable-line
import epics from '../../../src/containers/WishListPage/epics'; // eslint-disable-line
import reducer from '../../../src/reducers/index'; // eslint-disable-line

const store = createStore(reducer);

jest.mock('../../../src/containers/WishListPage/epics', () => ({
  getWishLists: jest.fn(),
}));

jest.mock('Alert', () => ({
  alert: jest.fn(),
}));

jest.mock('react-native-router-flux', (() => ({
  Actions: {
    Notifications: jest.fn(),
    AddWishList: jest.fn(),
    WishListDetail: jest.fn(),
  },
})));

const Alert = require('react-native').Alert;

describe('WishListPage', () => {
  const wrapperRedux = shallow(<WishListPageRedux store={store} />);
  const props = {
    loginStore: wrapperRedux.node.props.loginStore,
    wishListStore: wrapperRedux.node.props.wishListStore,
    actions: {
      removeWishListAction: jest.fn(),
      selectWishListAction: jest.fn(),
      showConfirmModal: jest.fn(),
      hideConfirmModal: jest.fn(),
    },
  };

  let wrapper = shallow(<WishListPage {...props} />);
  const instance = wrapper.instance();

  it('should render WishListPage correctly', () => {
    expect(wrapperRedux.length).toBe(1);
  });

  it('should render Image when no wishLists are available', () => {
    const selection = wrapper.findWhere((n) => n.prop('accessibilityLabel') === 'no-wishLists');
    expect(selection.length).toBe(1);
  });

  it('should not render Image when wishLists are available', () => {
    const mockWishListData = {
      name: 'Bday',
      items: [],
    };

    instance.state.wishListData.push(mockWishListData);
    wrapper = shallow(<WishListPage {...props} />);
    const selectionNoWishLists = wrapper.find(ListView).shallow().findWhere((n) => n.prop('accessibilityLabel') === 'wishList-image');
    const selectionWishLists = wrapper.find(ListView);
    expect(selectionNoWishLists.length).toBe(0);
    expect(selectionWishLists.length).toBe(1);
  });

  it('should render an individual wishList', () => {
    const renderer = instance.renderWishList(instance).bind(instance, { name: 'Bday', items: [] });
    class WishList extends React.Component {
      render() {
        return renderer();
      }
      }
    wrapper = shallow(<WishList />);
    const selectionWishLists = wrapper.find(Image);
    expect(selectionWishLists.length).toBe(2);
  });

  it('should go to the next view when clicking on edit menu', () => {
    props.actions.selectWishListAction.mockClear();

    instance.onMenuOptionSelected({
      action: 'edit',
      item: {
        name: 'Wish',
      },
    });

    expect(props.actions.selectWishListAction.mock.calls.length).toBe(1);
  });

  it('should go to the next view for existing wishlist', () => {
    props.actions.selectWishListAction.mockClear();
    instance.goToAddUpdateWishList({ _id: 1 });

    expect(props.actions.selectWishListAction.mock.calls.length).toBe(1);
  });
  it('should go to the next view for new wishlist', () => {
    props.actions.selectWishListAction.mockClear();
    instance.goToAddUpdateWishList({});

    expect(props.actions.selectWishListAction.mock.calls.length).toBe(1);
  });

  it('should open a dialog when deleting a wishlist', () => {
    instance.onMenuOptionSelected({
      action: 'delete',
      wishListData: {
        _id: '123',
        name: 'BDay',
      },
    });
    expect(props.actions.showConfirmModal.mock.calls.length).toBe(1);
  });

  it('should delete a wishlist', () => {
    const deleteFunction = instance.deleteWishlist({
      _id: '123',
      name: 'BDay',
    });
    const expectedPayload = {
      wishListId: '123',
    };
    expect(deleteFunction instanceof Function);
    deleteFunction();
    expect(props.actions.removeWishListAction.mock.calls.length).toBe(1);
    expect(props.actions.removeWishListAction.mock.calls[0]).toEqual([expectedPayload]);
    expect(props.actions.hideConfirmModal.mock.calls.length).toBe(1);
    expect(props.actions.hideConfirmModal.mock.calls[0]).toEqual([]);
  });
  it('should identify when the reference of a row has changed', () => {
    const obj1 = {};
    const obj2 = {};
    expect(instance.rowHasChanged(obj1, obj1)).toBe(false);
    expect(instance.rowHasChanged(obj1, obj2)).toBe(true);
  });
  it('should change font when changing os', () => {
    jest.mock('Platform', () => ({
      OS: 'android',
    }));
    expect(getFont()).toBe('sans-serif-light');
  });
  it('should go to Add WishList screen', () => {
    Actions.AddWishList.mockClear();
    instance.goToAddWishlist();

    expect(Actions.AddWishList.mock.calls.length).toBe(1);
  });
  it('should go to WishListDetail screen', () => {
    props.actions.selectWishListAction.mockClear();
    const expectedPayload = {
      wishList: {
        name: 'Fake Name',
      },
    };
    const callback = instance.goToWishlistDetail(expectedPayload.wishList);
    callback();

    expect(callback instanceof Function);
    expect(props.actions.selectWishListAction.mock.calls.length).toBe(1);
    expect(props.actions.selectWishListAction.mock.calls[0]).toEqual([expectedPayload]);
    expect(Actions.WishListDetail.mock.calls.length).toBe(1);
  });
  it('should simulate an alert when getSingleWishListError prop changed', () => {
    const nextProps = {
      wishListStore: {
        getSingleWishListError: 'error',
      },
    };

    instance.componentWillReceiveProps(nextProps);

    expect(Alert.alert.mock.calls.length).toBe(1);
  });
});
