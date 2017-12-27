import 'react-native';
import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import reducers from '../../../src/reducers/index';
import { default as WishListRedux, WishListPage } from '../../../src/containers/WishListPage'; // eslint-disable-line
import * as wishListActions from '../../../src/containers/WishListPage/actions';

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

describe('WishListPage Reducer', () => {
  const cb = () => {};

  const wrapperRedux = shallow(<WishListRedux store={store} />);
  const dispatch = wrapperRedux.node.props.store.dispatch;

  const props = {
    loginStore: wrapperRedux.node.props.loginStore,
    wishListStore: wrapperRedux.node.props.wishListStore,
    actions: wishListActions,
  };

  const wrapper = shallow(<WishListPage {...props} />);
  const instance = wrapper.instance();

  const getSingleWishlistPayload = {
    id: '',
    goToAction: '',
  };

  const getWishListsPayload = {
    wishListQuery: {},
    goToAction: '',
  };

  const getFriendWishListsPayload = {
    friendWishListQuery: {},
  };

  const selectWishListItemPayload = {
    wishListItem: {},
    goToAction: '',
  };

  const newWishListPayload = {
    wishList: {
      _id: 1,
      items: [],
    },
    callback: '',
  };

  const updateWishListPayload = {
    wishList: {
      _id: 1,
      items: [],
    },
    goToAction: '',
  };

  const newWishListItemPayload = {
    wishList: {
      _id: 1,
      items: [],
    },
    callback: '',
  };

  const selectWishListPayload = {
    wishList: {
      _id: 1,
      items: [],
    },
    goToAction: '',
  };

  const removeWishListPayload = {
    wishList: {
      _id: 1,
      items: [],
    },
    goToAction: '',
  };

  const uploadImagePayload = {
    image: {
      uri: '000',
      },//eslint-disable-line
    callback: cb,
  };

  const uploadedImagePayload = {
    imageId: '000',
    callback: cb,
  };

  const errorMessage = 'error';

  it('should return a valid getSingleWishListAction object and state', () => {
    const expectedAction = {
      type: 'GET_SINGLE_WISHLIST_ACTION',
      id: '',
      goToAction: '',
    };

    const action = instance.props.actions.getSingleWishListAction;
    dispatch(action(getSingleWishlistPayload));
    const selectedWishList =
    store.getState().WishListReducer.toJS().selectedWishList;

    expect(instance.props.actions.getSingleWishListAction(getSingleWishlistPayload))
    .toEqual(expectedAction);
    expect(selectedWishList).toEqual({ items: [] });
  });
  it('should return a valid getSingleWishListSuccessAction object and state', () => {
    const expectedAction = {
      type: 'GET_SINGLE_WISHLIST_SUCCESS_ACTION',
      wishList: { id: '00' },
      query: {},
      goToAction: '',
    };

    const action = instance.props.actions.getSingleWishListSuccessAction;
    dispatch(action(expectedAction.wishList));

    expect(instance.props.actions.getSingleWishListSuccessAction(expectedAction))
    .toEqual(expectedAction);
  });

  it('should return a valid getSingleWishListFailureAction object and state', () => {
    const expectedAction = {
      type: 'GET_SINGLE_WISHLIST_FAILURE_ACTION',
      error: errorMessage,
    };

    const action = instance.props.actions.getSingleWishListFailureAction;
    dispatch(action(errorMessage));
    const error =
    store.getState().WishListReducer.toJS().getSingleWishListError;

    expect(instance.props.actions.getSingleWishListFailureAction(errorMessage))
    .toEqual(expectedAction);
    expect(error).toEqual(errorMessage);
  });
  it('should return a valid getWishListsAction object and state', () => {
    const expectedAction = {
      type: 'GET_WISHLISTS_ACTION',
      query: {},
      goToAction: '',
    };

    const action = instance.props.actions.getWishListsAction;
    dispatch(action(getWishListsPayload));
    const wishLists =
    store.getState().WishListReducer.toJS().wishLists;

    expect(instance.props.actions.getWishListsAction(getWishListsPayload))
    .toEqual(expectedAction);
    expect(wishLists).toEqual([]);
  });
  it('should return a valid getWishListsSuccessAction object and state', () => {
    const expectedAction = {
      type: 'GET_WISHLISTS_SUCCESS_ACTION',
      wishLists: [],
    };

    const action = instance.props.actions.getWishListsSuccessAction;
    dispatch(action([]));
    const wishLists =
    store.getState().WishListReducer.toJS().wishLists;

    expect(instance.props.actions.getWishListsSuccessAction([]))
    .toEqual(expectedAction);
    expect(wishLists).toEqual([]);
  });
  it('should return a valid getWishListsFailureAction object and state', () => {
    const expectedAction = {
      type: 'GET_WISHLISTS_FAILURE_ACTION',
      error: errorMessage,
    };

    const action = instance.props.actions.getWishListsFailureAction;
    dispatch(action(errorMessage));
    const error =
    store.getState().WishListReducer.toJS().error;

    expect(instance.props.actions.getWishListsFailureAction(errorMessage))
    .toEqual(expectedAction);
    expect(error).toEqual(errorMessage);
  });

  it('should return a valid getFriendWishListsAction object and state', () => {
    const expectedAction = {
      type: 'GET_FRIEND_WISHLISTS_ACTION',
      query: {},
    };

    const action = instance.props.actions.getFriendWishListsAction;
    dispatch(action(getFriendWishListsPayload));
    const friendWishLists =
    store.getState().WishListReducer.toJS().friendWishLists;

    expect(instance.props.actions.getFriendWishListsAction(getFriendWishListsPayload))
    .toEqual(expectedAction);
    expect(friendWishLists).toEqual([]);
  });

  it('should return a valid getFriendWishListsSuccessAction object and state', () => {
    const expectedAction = {
      type: 'GET_FRIEND_WISHLISTS_SUCCESS_ACTION',
      friendWishLists: [],
    };

    const action = instance.props.actions.getFriendWishListsSuccessAction;
    dispatch(action([]));
    const friendWishLists =
    store.getState().WishListReducer.toJS().friendWishLists;

    expect(instance.props.actions.getFriendWishListsSuccessAction([]))
    .toEqual(expectedAction);
    expect(friendWishLists).toEqual([]);
  });
  it('should return a valid getFriendWishListsFailureAction object and state', () => {
    const expectedAction = {
      type: 'GET_FRIEND_WISHLISTS_FAILURE_ACTION',
      error: errorMessage,
    };

    const action = instance.props.actions.getFriendWishListsFailureAction;
    dispatch(action(errorMessage));
    const error =
    store.getState().WishListReducer.toJS().error;

    expect(instance.props.actions.getFriendWishListsFailureAction(errorMessage))
    .toEqual(expectedAction);
    expect(error).toEqual(errorMessage);
  });

  it('should return a valid createdWishListAction object and state', () => {
    const expectedAction = {
      type: 'CREATED_WISHLIST_ACTION',
      wishList: {
        _id: 1,
        items: [],
      },
      callback: '',
    };

    const action = instance.props.actions.createdWishListAction;
    dispatch(action(newWishListPayload));
    const wishLists =
    store.getState().WishListReducer.toJS().wishLists;

    expect(instance.props.actions.createdWishListAction(newWishListPayload))
    .toEqual(expectedAction);
    expect(wishLists).toEqual([newWishListPayload.wishList]);
  });
  it('should return a valid selectWishListAction object and state', () => {
    const expectedAction = {
      type: 'SELECT_WISHLIST_ACTION',
      wishList: selectWishListPayload.wishList,//eslint-disable-line
    };

    const action = instance.props.actions.selectWishListAction;
    dispatch(action(selectWishListPayload));
    const selectedWishList =
    store.getState().WishListReducer.toJS().selectedWishList;

    expect(instance.props.actions.selectWishListAction(selectWishListPayload))
    .toEqual(expectedAction);
    expect(selectedWishList).toBe(selectWishListPayload.wishList);
  });
  it('should return a valid updatedWishListAction object and state', () => {
    const expectedAction = {
      type: 'UPDATED_WISHLIST_ACTION',
      wishList: {
        _id: 1,
        items: [],
      },
      goToAction: '',
    };

    const action = instance.props.actions.updatedWishListAction;
    dispatch(action(newWishListPayload));
    const wishLists =
    store.getState().WishListReducer.toJS().wishLists;

    expect(instance.props.actions.updatedWishListAction(updateWishListPayload))
    .toEqual(expectedAction);
    expect(wishLists).toEqual([newWishListPayload.wishList]);
  });
  it('should return a valid createdWishAction object and state', () => {
    const expectedAction = {
      type: 'CREATED_WISH_ACTION',
      wishList: {
        _id: 1,
        items: [],
      },
      callback: '',
    };

    const action = instance.props.actions.createdWishAction;
    dispatch(action(newWishListItemPayload));
    const wishLists =
    store.getState().WishListReducer.toJS().wishLists;

    expect(instance.props.actions.createdWishAction(newWishListItemPayload))
    .toEqual(expectedAction);
    expect(wishLists).toEqual([newWishListItemPayload.wishList]);
  });
  it('should return a valid removedWishAction object and state', () => {
    const expectedAction = {
      type: 'REMOVED_WISH_ACTION',
      wishList: selectWishListPayload.wishList,//eslint-disable-line
      goToAction: '',
    };

    const action = instance.props.actions.removedWishAction;
    dispatch(action(removeWishListPayload));

    expect(instance.props.actions.removedWishAction(selectWishListPayload))
    .toEqual(expectedAction);
  });
  it('should return a valid removedWishListAction object and state', () => {
    const expectedAction = {
      type: 'REMOVED_WISHLIST_ACTION',
      wishList: removeWishListPayload.wishList,//eslint-disable-line
      goToAction: '',
    };

    const action = instance.props.actions.removedWishListAction;
    dispatch(action(removeWishListPayload));
    const wishLists =
    store.getState().WishListReducer.toJS().wishLists;

    expect(instance.props.actions.removedWishListAction(removeWishListPayload))
    .toEqual(expectedAction);
    expect(wishLists).toEqual([]);
  });
  it('should return a valid uploadWishImageAction object and state', () => {
    const expectedAction = {
      type: 'UPLOAD_WISH_IMAGE_ACTION',
      image: {
        uri: '000',
      },//eslint-disable-line
      callback: cb,
    };

    const action = instance.props.actions.uploadWishImageAction;
    dispatch(action(uploadImagePayload));
    const imageId =
    store.getState().WishListReducer.toJS().imageId;

    expect(instance.props.actions.uploadWishImageAction(uploadImagePayload))
    .toEqual(expectedAction);
    expect(imageId).toEqual('');
  });
  it('should return a valid uploadedWishImageAction object and state', () => {
    const expectedAction = {
      type: 'UPLOADED_WISH_IMAGE_ACTION',
      imageId: '000',//eslint-disable-line
      callback: cb,
    };

    const action = instance.props.actions.uploadedWishImageAction;
    dispatch(action(uploadedImagePayload));
    const imageId =
    store.getState().WishListReducer.toJS().imageId;

    expect(instance.props.actions.uploadedWishImageAction(uploadedImagePayload))
    .toEqual(expectedAction);
    expect(imageId).toEqual('000');
  });
  it('should return a valid uploadWishImageFailureAction object and state', () => {
    const expectedAction = {
      type: 'UPLOAD_WISH_IMAGE_ERROR_ACTION',
      error: errorMessage,//eslint-disable-line
    };

    const action = instance.props.actions.uploadWishImageFailureAction;
    dispatch(action(errorMessage));
    const imageId =
    store.getState().WishListReducer.toJS().error;

    expect(instance.props.actions.uploadWishImageFailureAction(errorMessage))
    .toEqual(expectedAction);
    expect(imageId).toEqual(errorMessage);
  });
  it('should return a valid selectedWishListAction object and state', () => {
    const expectedAction = {
      type: 'SELECT_WISHLIST_ITEM_ACTION',
      wishListItem: {},
      goToAction: '',
    };

    const action = instance.props.actions.selectWishListItemAction;
    dispatch(action(selectWishListItemPayload));
    const selectedWishListItem =
    store.getState().WishListReducer.toJS().selectedWishListItem;

    expect(instance.props.actions.selectWishListItemAction(selectWishListItemPayload))
    .toEqual(expectedAction);
    expect(selectedWishListItem).toEqual({});
  });
});

