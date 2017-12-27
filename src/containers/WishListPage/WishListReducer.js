import { fromJS } from 'immutable';
import {
  GET_SINGLE_WISHLIST_ACTION,
  GET_SINGLE_WISHLIST_SUCCESS_ACTION,
  GET_SINGLE_WISHLIST_FAILURE_ACTION,
  GET_WISHLISTS_ACTION,
  GET_WISHLISTS_SUCCESS_ACTION,
  GET_WISHLISTS_FAILURE_ACTION,
  GET_FRIEND_WISHLISTS_ACTION,
  GET_FRIEND_WISHLISTS_SUCCESS_ACTION,
  GET_FRIEND_WISHLISTS_FAILURE_ACTION,
  CREATED_WISHLIST_ACTION,
  UPDATED_WISHLIST_ACTION,
  REMOVED_WISHLIST_ACTION,
  SELECT_WISHLIST_ACTION,
  SELECT_WISHLIST_ITEM_ACTION,
  CREATED_WISH_ACTION,
  UPLOAD_WISH_IMAGE_ACTION,
  UPLOADED_WISH_IMAGE_ACTION,
  UPLOAD_WISH_IMAGE_ERROR_ACTION,
  REMOVED_WISH_ACTION,
 } from './constants';

const initialState = fromJS({
  wishLists: [],
  friendWishLists: [],
  selectedWishList: null,
  selectedWishListItem: null,
  isLoading: false,
  imageId: '',
  error: '',
  disabledWishlist: false,
});

export default function WishListReducer(state = initialState, action) { // NOSONAR
  switch (action.type) {
    case GET_SINGLE_WISHLIST_ACTION:
      return state
      .set('selectedWishList', { items: [] })
      .set('isLoading', true)
      .set('error', '');
    case GET_SINGLE_WISHLIST_SUCCESS_ACTION:
      return state
      .set('selectedWishList', action.wishList)
      .set('disabledWishlist', true)
      .set('isLoading', false);
    case GET_WISHLISTS_ACTION:
      return state
      .set('isLoading', true)
      .set('error', '');
    case GET_WISHLISTS_SUCCESS_ACTION:
      {
        let wishLists = [];
        if (action.wishLists) {
          wishLists = action.wishLists;
        }
        return state
        .set('isLoading', false)
        .set('wishLists', wishLists);
      }
    case GET_FRIEND_WISHLISTS_ACTION:
      return state
      .set('friendWishLists', [])
      .set('isLoading', true)
      .set('error', '');
    case GET_FRIEND_WISHLISTS_SUCCESS_ACTION:
      {
        let friendWishLists = [];
        if (action.friendWishLists) {
          friendWishLists = action.friendWishLists;
        }
        return state
        .set('isLoading', false)
        .set('friendWishLists', friendWishLists);
      }
    case GET_SINGLE_WISHLIST_FAILURE_ACTION:
      return state
      .set('isLoading', false)
      .set('getSingleWishListError', action.error);
    case GET_WISHLISTS_FAILURE_ACTION:
    case GET_FRIEND_WISHLISTS_FAILURE_ACTION:
      return state
      .set('isLoading', false)
      .set('error', action.error);
    case CREATED_WISHLIST_ACTION: {
      const wishLists = state.get('wishLists');
      wishLists.unshift(action.wishList);

      return state.set('wishLists', wishLists);
    }
    case UPDATED_WISHLIST_ACTION: {
      const wishLists = state.get('wishLists');
      const wishList = wishLists.filter((wishList) => action.wishList._id === wishList._id //eslint-disable-line
      )[0];

      wishList.name = action.wishList.name;

      return state.set('wishLists', wishLists);
    }
    case REMOVED_WISHLIST_ACTION: {
      const wishLists = state.get('wishLists');
      const removedWishList = wishLists.filter((wishList) => action.wishList._id === wishList._id //eslint-disable-line
      )[0];
      wishLists.splice(wishLists.indexOf(removedWishList), 1);
      return state.set('wishLists', wishLists.slice(0));
    }
    case SELECT_WISHLIST_ACTION: {
      return state.set('selectedWishList', action.wishList)
      .set('disabledWishlist', false);
    }
    case SELECT_WISHLIST_ITEM_ACTION: {
      return state.set('selectedWishListItem', action.wishListItem);
    }
    case CREATED_WISH_ACTION: {
      const selectedWishList = action.wishList;

      const wishLists = state.get('wishLists');
      const updatedWishList = wishLists.filter((wishList) => selectedWishList._id === wishList._id //eslint-disable-line
      )[0];

      if (updatedWishList) {
        updatedWishList.items = selectedWishList.items;
      }

      const friendWishLists = state.get('friendWishLists');
      const updatedFriendWishList = friendWishLists.filter((wishList) => selectedWishList._id === wishList._id //eslint-disable-line
      )[0];

      if (updatedFriendWishList) {
        updatedFriendWishList.items = selectedWishList.items;
      }

      return state
        .set('friendWishLists', friendWishLists)
        .set('wishLists', wishLists)
        .set('imageId', '');
    }
    case UPLOAD_WISH_IMAGE_ACTION: {
      return state
        .set('isLoading', true)
        .set('imageId', '');
    }
    case UPLOADED_WISH_IMAGE_ACTION: {
      return state
        .set('isLoading', false)
        .set('imageId', action.imageId);
    }
    case UPLOAD_WISH_IMAGE_ERROR_ACTION: {
      return state
        .set('isLoading', false)
        .set('error', action.error);
    }
    case REMOVED_WISH_ACTION: {
      const wishLists = state.get('wishLists');
      const wishList = wishLists.filter((wishList) => action.wishList._id === wishList._id //eslint-disable-line
      )[0];

      wishList.items = action.wishList.items;

      return state.set('wishLists', wishLists);
    }
    default:
      return state;
  }
}
