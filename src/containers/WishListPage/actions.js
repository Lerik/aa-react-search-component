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
  GET_WISHLISTS_FOR_UPDATE_ACTION,
  GET_WISHLISTS_FOR_UPDATE_SUCCESS_ACTION,
  WISHLISTS_FOR_UPDATE_CALLBACK_ACTION,
  CREATE_WISHLIST_ACTION,
  CREATED_WISHLIST_ACTION,
  CREATE_WISH_ACTION,
  CREATED_WISH_ACTION,
  UPDATE_WISHLIST_ACTION,
  UPDATED_WISHLIST_ACTION,
  REMOVE_WISHLIST_ACTION,
  REMOVED_WISHLIST_ACTION,
  SELECT_WISHLIST_ACTION,
  SELECT_WISHLIST_ITEM_ACTION,
  UPLOAD_WISH_IMAGE_ACTION,
  UPLOADED_WISH_IMAGE_ACTION,
  UPLOAD_WISH_IMAGE_ERROR_ACTION,
  REMOVE_WISH_ACTION,
  REMOVED_WISH_ACTION,
 } from './constants';

export function getSingleWishListAction(payload) {
  return {
    type: GET_SINGLE_WISHLIST_ACTION,
    id: payload.id,
    userId: payload.userId,
    goToAction: payload.goToAction,
  };
}

export function getSingleWishListSuccessAction(payload) {
  return {
    type: GET_SINGLE_WISHLIST_SUCCESS_ACTION,
    wishList: payload.wishList,
    query: payload.query,
    goToAction: payload.goToAction,
  };
}

export function getSingleWishListFailureAction(payload) {
  return {
    type: GET_SINGLE_WISHLIST_FAILURE_ACTION,
    error: payload,
  };
}

export function getWishListsAction(payload) {
  return {
    type: GET_WISHLISTS_ACTION,
    query: payload.wishListQuery,
    goToAction: payload.goToAction,
  };
}

export function getWishListsSuccessAction(payload) {
  return {
    type: GET_WISHLISTS_SUCCESS_ACTION,
    wishLists: payload,
  };
}

export function getWishListsFailureAction(payload) {
  return {
    type: GET_WISHLISTS_FAILURE_ACTION,
    error: payload,
  };
}

export function getWishlistsForUpdate(payload) {
  return {
    type: GET_WISHLISTS_FOR_UPDATE_ACTION,
    personId: payload.personId,
    userId: payload.userId,
    selectedWishListId: payload.selectedWishListId,
    wishListItem: payload.wishListItem,
    callback: payload.callback,
  };
}

export function getWishlistsForUpdateSuccess(friendWishLists, selectedWishListId, wishListItem, userId, callback) {
  return {
    type: GET_WISHLISTS_FOR_UPDATE_SUCCESS_ACTION,
    friendWishLists,
    selectedWishListId,
    wishListItem,
    userId,
    callback,
  };
}

export function wishListForUpdateCallback(callback) {
  return {
    type: WISHLISTS_FOR_UPDATE_CALLBACK_ACTION,
    callback,
  };
}

export function getFriendWishListsAction(payload) {
  return {
    type: GET_FRIEND_WISHLISTS_ACTION,
    query: payload.friendWishListQuery,
  };
}

export function getFriendWishListsSuccessAction(payload) {
  return {
    type: GET_FRIEND_WISHLISTS_SUCCESS_ACTION,
    friendWishLists: payload,
  };
}

export function getFriendWishListsFailureAction(payload) {
  return {
    type: GET_FRIEND_WISHLISTS_FAILURE_ACTION,
    error: payload,
  };
}

export function createWishListAction(payload) {
  return {
    type: CREATE_WISHLIST_ACTION,
    wishList: payload.wishList,
    callback: payload.callback,
  };
}

export function createdWishListAction(payload) {
  return {
    type: CREATED_WISHLIST_ACTION,
    wishList: payload.wishList,
    callback: payload.callback,
  };
}

export function updateWishListAction(payload) {
  return {
    type: UPDATE_WISHLIST_ACTION,
    wishList: payload.wishList,
    goToAction: payload.goToAction,
  };
}

export function updatedWishListAction(payload) {
  return {
    type: UPDATED_WISHLIST_ACTION,
    wishList: payload.wishList,
    goToAction: payload.goToAction,
  };
}

export function createWishAction(payload) {
  return {
    type: CREATE_WISH_ACTION,
    wishList: payload.wishList,
    callback: payload.callback,
  };
}

export function createdWishAction(payload) {
  return {
    type: CREATED_WISH_ACTION,
    wishList: payload.wishList,
    callback: payload.callback,
  };
}

export function uploadWishImageAction(payload) {
  return {
    type: UPLOAD_WISH_IMAGE_ACTION,
    image: payload.image,
    callback: payload.callback,
  };
}

export function uploadedWishImageAction(payload) {
  return {
    type: UPLOADED_WISH_IMAGE_ACTION,
    imageId: payload.imageId,
    callback: payload.callback,
  };
}

export function uploadWishImageFailureAction(payload) {
  return {
    type: UPLOAD_WISH_IMAGE_ERROR_ACTION,
    error: payload,
  };
}

export function removeWishListAction(payload) {
  return {
    type: REMOVE_WISHLIST_ACTION,
    wishListId: payload.wishListId,
    goToAction: payload.goToAction,
  };
}

export function removedWishListAction(payload) {
  return {
    type: REMOVED_WISHLIST_ACTION,
    wishList: payload.wishList,
    goToAction: payload.goToAction,
  };
}

export function removeWishAction(payload) {
  return {
    type: REMOVE_WISH_ACTION,
    wishList: payload.wishList,
    goToAction: payload.goToAction,
  };
}

export function removedWishAction(payload) {
  return {
    type: REMOVED_WISH_ACTION,
    wishList: payload.wishList,
    goToAction: payload.goToAction,
  };
}

export function selectWishListAction(payload) {
  return {
    type: SELECT_WISHLIST_ACTION,
    wishList: payload.wishList,
  };
}

export function selectWishListItemAction(payload) {
  return {
    type: SELECT_WISHLIST_ITEM_ACTION,
    wishListItem: payload.wishListItem,
    goToAction: payload.goToAction,
  };
}
