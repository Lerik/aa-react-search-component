import 'react-native';
import * as actions from '../../../src/containers/WishListPage/actions';
import * as constants from '../../../src/containers/WishListPage/constants';

describe('WishListPage Actions', () => {
  it('should create an action to get a single wishList', () => {
    const payload = {
      id: '000',
      goToAction: 'action',
      userId: '',
    };
    const expectedAction = {
      type: constants.GET_SINGLE_WISHLIST_ACTION,
      id: '000',
      goToAction: 'action',
      userId: '',
    };

    expect(actions.getSingleWishListAction(payload)).toEqual(expectedAction);
  });
  it('should create a success action to get a single wishList', () => {
    const payload = {
      wishList: {},
      goToAction: '',
      query: {},
    };
    const expectedAction = {
      type: constants.GET_SINGLE_WISHLIST_SUCCESS_ACTION,
      wishList: {},
      goToAction: '',
      query: {},
    };

    expect(actions.getSingleWishListSuccessAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to set an error when the wishList can\'t be read', () => {
    const error = { message: 'error' };
    const expectedAction = {
      type: constants.GET_SINGLE_WISHLIST_FAILURE_ACTION,
      error,
    };

    expect(actions.getSingleWishListFailureAction(error)).toEqual(expectedAction);
  });
  it('should create an action to get all wishLists', () => {
    const payload = {
      wishListQuery: {},
      goToAction: '',
    };
    const expectedAction = {
      type: constants.GET_WISHLISTS_ACTION,
      query: {},
      goToAction: '',
    };

    expect(actions.getWishListsAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to set all read wishLists', () => {
    const wishLists = [{}];
    const expectedAction = {
      type: constants.GET_WISHLISTS_SUCCESS_ACTION,
      wishLists,
    };

    expect(actions.getWishListsSuccessAction(wishLists)).toEqual(expectedAction);
  });
  it('should create an action to set an error when wishLists can\'t be read', () => {
    const error = { message: 'error' };
    const expectedAction = {
      type: constants.GET_WISHLISTS_FAILURE_ACTION,
      error,
    };

    expect(actions.getWishListsFailureAction(error)).toEqual(expectedAction);
  });
  it('should create an action to get all friend wishLists', () => {
    const payload = {
      friendWishListQuery: {},
    };
    const expectedAction = {
      type: constants.GET_FRIEND_WISHLISTS_ACTION,
      query: {},
    };

    expect(actions.getFriendWishListsAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to set all read friend wishLists', () => {
    const friendWishLists = [{}];
    const expectedAction = {
      type: constants.GET_FRIEND_WISHLISTS_SUCCESS_ACTION,
      friendWishLists,
    };

    expect(actions.getFriendWishListsSuccessAction(friendWishLists)).toEqual(expectedAction);
  });
  it('should create an action to set an error when friend wishLists can\'t be read', () => {
    const error = { message: 'error' };
    const expectedAction = {
      type: constants.GET_FRIEND_WISHLISTS_FAILURE_ACTION,
      error,
    };

    expect(actions.getFriendWishListsFailureAction(error)).toEqual(expectedAction);
  });
  it('should create an action to add a new wishLists', () => {
    const payload = {
      wishList: {},
      callback: '',
    };
    const expectedAction = {
      type: constants.CREATE_WISHLIST_ACTION,
      wishList: {},
      callback: '',
    };

    expect(actions.createWishListAction(payload)).toEqual(expectedAction);
  });
  it('should create an action for a created wishLists', () => {
    const payload = {
      wishList: {},
      callback: '',
    };
    const expectedAction = {
      type: constants.CREATED_WISHLIST_ACTION,
      wishList: {},
      callback: '',
    };

    expect(actions.createdWishListAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to add update a wishList', () => {
    const payload = {
      wishList: {},
      goToAction: '',
    };
    const expectedAction = {
      type: constants.UPDATE_WISHLIST_ACTION,
      wishList: {},
      goToAction: '',
    };

    expect(actions.updateWishListAction(payload)).toEqual(expectedAction);
  });
  it('should create an action for a updated wishLists', () => {
    const payload = {
      wishList: {},
      goToAction: '',
    };
    const expectedAction = {
      type: constants.UPDATED_WISHLIST_ACTION,
      wishList: {},
      goToAction: '',
    };

    expect(actions.updatedWishListAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to remove a wishList', () => {
    const payload = {
      wishListId: '1',
      goToAction: '',
    };
    const expectedAction = {
      type: constants.REMOVE_WISHLIST_ACTION,
      wishListId: '1',
      goToAction: '',
    };

    expect(actions.removeWishListAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to remove a wishList', () => {
    const payload = {
      wishList: {},
      goToAction: '',
    };
    const expectedAction = {
      type: constants.REMOVED_WISHLIST_ACTION,
      wishList: {},
      goToAction: '',
    };

    expect(actions.removedWishListAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to add a new wish', () => {
    const payload = {
      wishList: {},
      callback: '',
    };
    const expectedAction = {
      type: constants.CREATE_WISH_ACTION,
      wishList: {},
      callback: '',
    };

    expect(actions.createWishAction(payload)).toEqual(expectedAction);
  });
  it('should create an action for a created new wish', () => {
    const payload = {
      wishList: {},
      callback: '',
    };
    const expectedAction = {
      type: constants.CREATED_WISH_ACTION,
      wishList: {},
      callback: '',
    };

    expect(actions.createdWishAction(payload)).toEqual(expectedAction);
  });
  it('should create an action for uploading a new image', () => {
    const cb = () => {};
    const payload = {
      image: {},
      callback: cb,
    };
    const expectedAction = {
      type: constants.UPLOAD_WISH_IMAGE_ACTION,
      image: {},
      callback: cb,
    };

    expect(actions.uploadWishImageAction(payload)).toEqual(expectedAction);
  });
  it('should create an action for an uploaded image', () => {
    const cb = () => {};
    const payload = {
      imageId: 'Id',
      callback: cb,
    };
    const expectedAction = {
      type: constants.UPLOADED_WISH_IMAGE_ACTION,
      imageId: 'Id',
      callback: cb,
    };

    expect(actions.uploadedWishImageAction(payload)).toEqual(expectedAction);
  });
  it('should create an action for an error arising on an upload', () => {
    const payload = {
    };
    const expectedAction = {
      type: constants.UPLOAD_WISH_IMAGE_ERROR_ACTION,
      error: {},
    };

    expect(actions.uploadWishImageFailureAction(payload)).toEqual(expectedAction);
  });
  it('should create an action for selecting a wishlsit', () => {
    const payload = {
      wishList: {},
    };
    const expectedAction = {
      type: constants.SELECT_WISHLIST_ACTION,
      wishList: {},
    };

    expect(actions.selectWishListAction(payload)).toEqual(expectedAction);
  });

  it('should create an action to remove a wish', () => {
    const payload = {
      wishList: {},
      goToAction: '',
    };
    const expectedAction = {
      type: constants.REMOVE_WISH_ACTION,
      wishList: {},
      goToAction: '',
    };

    expect(actions.removeWishAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to remove a wish', () => {
    const payload = {
      wishList: {},
      goToAction: '',
    };
    const expectedAction = {
      type: constants.REMOVED_WISH_ACTION,
      wishList: {},
      goToAction: '',
    };

    expect(actions.removedWishAction(payload)).toEqual(expectedAction);
  });
  it('should create an action to select a wishlist item', () => {
    const payload = {
      wishListItem: {},
      goToAction: '',
    };
    const expectedAction = {
      type: constants.SELECT_WISHLIST_ITEM_ACTION,
      wishListItem: {},
      goToAction: '',
    };

    expect(actions.selectWishListItemAction(payload)).toEqual(expectedAction);
  });
});

