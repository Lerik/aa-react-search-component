import { TouchableHighlight, Linking, Clipboard } from 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { Actions } from 'react-native-router-flux';
import reducers from '../../../src/reducers/index';
jest.unmock('ScrollView');
import { default as WishListDetailRedux, WishListDetail } from '../../../src/containers/WishListDetail';  // eslint-disable-line

const store = createStore(
  reducers,
);

jest.mock('react-native-router-flux', (() => ({
  Actions: {
    WishList: jest.fn(),
    AddNewGiftForm: jest.fn(),
  },
})));

jest.mock('Alert', (() => ({
  alert: jest.fn(),
})));
jest.mock('Clipboard', (() => ({
  setString: jest.fn(),
})));

jest.mock('Linking', (() => ({
  canOpenURL: jest.fn().mockImplementation(() => ({ then: jest.fn() })),
  openURL: jest.fn(),
})));

describe('WishListDetail', () => {
  const wrapperRedux = shallow(<WishListDetailRedux store={store} />);

  const props = {
    wishListStore: {
      selectedWishList: {
        _id: '000',
        name: 'Fake Name',
        items: [],
      },
    },
    actions: {
      removeWishAction: jest.fn(),
      showConfirmModal: jest.fn(),
      hideConfirmModal: jest.fn(),
      selectWishListItemAction: jest.fn(),
    },
  };

  let wrapper = shallow(<WishListDetail {...props} />);
  let instance = wrapper.instance();

  it('should connect to redux', () => {
    expect(wrapperRedux.length).toBe(1);
  });
  it('should return to previous view', () => {
    instance.goBack();

    expect(Actions.WishList.mock.calls.length).toBe(1);
  });
  it('should not render when items are present', () => {
    props.wishListStore.selectedWishList.items.push({
      _id: 1,
    });
    wrapper = shallow(<WishListDetail {...props} />);
    instance = wrapper.instance();

    expect(wrapper.find(TouchableHighlight).length).toBe(3);
  });
  it('should go to the next view for existing item', () => {
    instance.goToAddUpdateWishListItem({ _id: 1 });

    expect(props.actions.selectWishListItemAction.mock.calls.length).toBe(1);
  });
  it('should go to the next view for new item', () => {
    props.actions.selectWishListItemAction.mockClear();
    instance.goToAddUpdateWishListItem({});

    expect(props.actions.selectWishListItemAction.mock.calls.length).toBe(1);
  });
  it('should go to the next view when clicking on edit menu', () => {
    props.actions.selectWishListItemAction.mockClear();

    instance.onMenuOptionSelected({
      action: 'edit',
      item: {
        name: 'Gift',
      },
    });

    expect(props.actions.selectWishListItemAction.mock.calls.length).toBe(1);
  });
  it('should open a dialog when deleting a wish', () => {
    instance.onMenuOptionSelected({
      action: 'delete',
      item: {
        _id: '1',
      },
    });
    expect(props.actions.showConfirmModal.mock.calls.length).toBe(1);
  });
  it('should delete a wish', () => {
    const deleteFunction = instance.deleteWish({
      _id: '1',
    });
    const expectedPayload = {
      wishList: props.wishListStore.selectedWishList,
    };
    expect(deleteFunction instanceof Function);
    deleteFunction();
    expect(props.actions.removeWishAction.mock.calls.length).toBe(1);
    expect(props.actions.removeWishAction.mock.calls[0]).toEqual([expectedPayload]);
    expect(props.actions.hideConfirmModal.mock.calls.length).toBe(1);
    expect(props.actions.hideConfirmModal.mock.calls[0]).toEqual([]);
  });
  it('should set currentSlide state equal to one when receive cero as parameter', () => {
    instance.onSnapToItem(0);

    expect(instance.state.currentSlide).toBe(1);
  });
  it('should render view when link is not null', () => {
    props.wishListStore.selectedWishList.items.push({
      _id: 2,
      name: 'Gift',
      description: '',
      link: 'http://mysite.com/gift1',
    });

    wrapper = shallow(<WishListDetail {...props} />);

    expect(wrapper.length).toBe(1);
  });
  it('should generate function that calls the Linking module', () => {
    const link = 'http://mysite.com/gift1';
    const linkClosure = instance.openWishListItemLink(link);

    linkClosure();

    expect(linkClosure instanceof Function);
    expect(Linking.canOpenURL.mock.calls.length).toBe(1);
    expect(Linking.canOpenURL.mock.calls[0]).toEqual([link]);
  });
  it('should generate callback for Linking module', () => {
    const link = 'http://mysite.com/gift1';
    const linkingCallbackClosure = instance.linkingCallback(link);

    linkingCallbackClosure(true);
    linkingCallbackClosure(false);

    expect(linkingCallbackClosure instanceof Function);
    expect(Linking.openURL.mock.calls.length).toBe(1);
    expect(Linking.openURL.mock.calls[0]).toEqual([link]);
  });
  it('should copy link to clipboard', () => {
    instance.shareWishList();
    expect(instance.state.clipboardCopied).toBe(false);
    expect(instance.state.giftLink).toBe('gifthub://gifthubapp.com/#/wishlist/000');
  });
  it('should copy link to clipboard', () => {
    instance.onCopyClipboard();
    expect(instance.state.clipboardCopied).toBe(true);
    expect(Clipboard.setString.mock.calls.length).toBe(1);
  });
  it('should close the modal', () => {
    instance.closeModal();
    expect(instance.state.clipboardCopied).toBe(false);
    expect(instance.props.actions.hideConfirmModal.mock.calls.length).toBe(2);
  });
});
