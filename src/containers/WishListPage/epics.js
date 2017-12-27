import Rx from 'rxjs';
import { Actions } from 'react-native-router-flux';
import { Keyboard } from 'react-native';
import {
  getSingleWishListSuccessAction,
  getWishListsSuccessAction,
  getFriendWishListsSuccessAction,
  getWishlistsForUpdateSuccess,
  wishListForUpdateCallback,
  createdWishListAction,
  updatedWishListAction,
  removedWishListAction,
  createdWishAction,
  selectWishListAction,
  uploadedWishImageAction,
  removedWishAction,
} from './actions';
import { authenticationService, WishListService, UploadService } from '../../services/';
import {
  GET_SINGLE_WISHLIST_ACTION,
  GET_SINGLE_WISHLIST_SUCCESS_ACTION,
  GET_SINGLE_WISHLIST_FAILURE_ACTION,
  GET_WISHLISTS_ACTION,
  GET_WISHLISTS_FAILURE_ACTION,
  GET_FRIEND_WISHLISTS_ACTION,
  GET_FRIEND_WISHLISTS_FAILURE_ACTION,
  GET_WISHLISTS_FOR_UPDATE_ACTION,
  GET_WISHLISTS_FOR_UPDATE_SUCCESS_ACTION,
  WISHLISTS_FOR_UPDATE_CALLBACK_ACTION,
  CREATE_WISHLIST_ACTION,
  CREATED_WISHLIST_ACTION,
  CREATE_WISHLIST_MESSAGEERROR_ACTION,
  UPDATE_WISHLIST_ACTION,
  UPDATED_WISHLIST_ACTION,
  UPDATE_WISHLIST_MESSAGEERROR_ACTION,
  REMOVE_WISHLIST_ACTION,
  REMOVED_WISHLIST_ACTION,
  REMOVE_WISHLIST_MESSAGEERROR_ACTION,
  CREATE_WISH_ACTION,
  CREATED_WISH_ACTION,
  CREATE_WISH_MESSAGEERROR_ACTION,
  UPLOAD_WISH_IMAGE_ACTION,
  UPLOADED_WISH_IMAGE_ACTION,
  UPLOAD_WISH_IMAGE_ERROR_ACTION,
  REMOVE_WISH_ACTION,
  REMOVE_WISH_MESSAGEERROR_ACTION,
  SELECT_WISHLIST_ITEM_ACTION,
} from './constants';
import * as storage from '../../services/helpers/storageHelper';

export function getSingleWishList(action$) {
  return action$.ofType(GET_SINGLE_WISHLIST_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(WishListService.get(action.id))
        .map((wishList) => {
          const actionResult = getSingleWishListSuccessAction({
            wishList,
            query: {
              createdBy: action.userId,
              $sort: { updatedAt: -1 },
            },
            goToAction: action.goToAction,
          });
          return actionResult;
        })
        .catch((err) =>
          Rx.Observable.of({
            type: GET_SINGLE_WISHLIST_FAILURE_ACTION,
            error: { title: 'Error', message: err.message },
          }))
    );
}

export function getSingleWishListSuccess(action$) {
  return action$.ofType(GET_SINGLE_WISHLIST_SUCCESS_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(WishListService.find(action.query))
        .map((wishLists) => {
          if (action.goToAction) {
            Actions[action.goToAction]();
          }
          return getWishListsSuccessAction(wishLists.data);
        })
        .catch((err) =>
          Rx.Observable.of({
            type: GET_WISHLISTS_FAILURE_ACTION,
            message: { title: 'Error', message: err },
          }))
    );
}

export function getWishLists(action$) {
  return action$.ofType(GET_WISHLISTS_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(WishListService.find(action.query))
      .map((wishLists) => {
        Actions[action.goToAction]();
        return getWishListsSuccessAction(wishLists.data);
      })
        .catch((err) =>
          Rx.Observable.of({
            type: GET_WISHLISTS_FAILURE_ACTION,
            message: { title: 'Error', message: err },
          }))
    );
}

export function getFriendWishLists(action$) {
  return action$.ofType(GET_FRIEND_WISHLISTS_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(WishListService.find(action.query))
        .map((friendWishLists) => getFriendWishListsSuccessAction(friendWishLists.data))
        .catch((err) =>
          Rx.Observable.of({
            type: GET_FRIEND_WISHLISTS_FAILURE_ACTION,
            message: { title: 'Error', message: err },
          }))
    );
}

export function getWishlistsForUpdateAction(action$) {
  return action$.ofType(GET_WISHLISTS_FOR_UPDATE_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(WishListService.find({
        query: {
          createdBy: action.personId, // eslint-disable-line
          $sort: { updatedAt: -1 },
        },
      }))
        .map((friendWishLists) => getWishlistsForUpdateSuccess(friendWishLists.data, action.selectedWishListId, action.wishListItem, action.userId, action.callback))
        .catch((err) =>
          Rx.Observable.of({
            type: GET_FRIEND_WISHLISTS_FAILURE_ACTION,
            message: { title: 'Error', message: err },
          }))
    );
}

export function getWishlistsForUpdateSuccessAction(action$) {
  return action$.ofType(GET_WISHLISTS_FOR_UPDATE_SUCCESS_ACTION)
  .map((action) => action)
  .mergeMap((action) => {
    const wishListFound = action.friendWishLists.find((wishlist) => wishlist._id === action.selectedWishListId);
    const wishListItemFound = wishListFound.items.find((item) => item._id === action.wishListItem._id);
    if (wishListItemFound.dibsedBy && wishListItemFound.dibsedBy !== action.userId) {
      return [selectWishListAction({ wishList: wishListFound }),
        getFriendWishListsSuccessAction(action.friendWishLists)];
    }
    return [getFriendWishListsSuccessAction(action.friendWishLists), wishListForUpdateCallback(action.callback)];
  });
}

export function wishListForUpdateCallbackAction(action$) {
  return action$.ofType(WISHLISTS_FOR_UPDATE_CALLBACK_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.create(() => {
        if (action.callback) {
          action.callback();
        }
        Keyboard.dismiss();
      }));
}

export function createWishList(action$) {
  return action$.ofType(CREATE_WISHLIST_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(storage.getJWTToken())
      .switchMap((token) =>
        Rx.Observable.fromPromise(authenticationService.authenticate({
          user: {
            type: 'token',
            token,
          },
        }))
        .switchMap(() =>
          Rx.Observable.fromPromise(WishListService.create(action.wishList))
            .map((wishListCreated) =>
              createdWishListAction({
                wishList: wishListCreated,
                callback: action.callback,
              }))
            .catch((err) =>
              Rx.Observable.of({
                type: CREATE_WISHLIST_MESSAGEERROR_ACTION,
                message: { title: 'Error', message: err },
              }))
    )));
}

export function createdWishList(action$) {
  return action$.ofType(CREATED_WISHLIST_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.create(() => {
        if (action.callback) {
          action.callback();
        }
        Keyboard.dismiss();
      }));
}

export function updateWishList(action$) {
  return action$.ofType(UPDATE_WISHLIST_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(storage.getJWTToken())
      .switchMap((token) =>
        Rx.Observable.fromPromise(authenticationService.authenticate({
          user: {
            type: 'token',
            token,
          },
        }))
        .switchMap(() =>
          Rx.Observable.fromPromise(WishListService.update(action.wishList))
            .map((wishListUpdated) =>
              updatedWishListAction({
                wishList: wishListUpdated,
                goToAction: action.goToAction,
              }))
            .catch((err) =>
              Rx.Observable.of({
                type: UPDATE_WISHLIST_MESSAGEERROR_ACTION,
                message: { title: 'Error', message: err },
              }))
    )));
}

export function removeWishList(action$) {
  return action$.ofType(REMOVE_WISHLIST_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(storage.getJWTToken())
      .switchMap((token) =>
        Rx.Observable.fromPromise(authenticationService.authenticate({
          user: {
            type: 'token',
            token,
          },
        }))
        .switchMap(() =>
          Rx.Observable.fromPromise(WishListService.remove(action.wishListId))
            .map((wishlistRemoved) =>
              removedWishListAction({
                wishList: wishlistRemoved,
                goToAction: action.goToAction,
              }))
            .catch((err) =>
              Rx.Observable.of({
                type: REMOVE_WISHLIST_MESSAGEERROR_ACTION,
                message: { title: 'Error', message: err },
              }))
    )));
}

export function updatedWishList(action$) {
  return action$.ofType(UPDATED_WISHLIST_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.create(() => {
        if (action.goToAction) {
          Actions[action.goToAction]();
        }
        Keyboard.dismiss();
      }));
}

export function removedWishList(action$) {
  return action$.ofType(REMOVED_WISHLIST_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.create(() => {
        if (action.goToAction) {
          Actions[action.goToAction]();
        }
        Keyboard.dismiss();
      }));
}

export function uploadWishImage(action$) {
  return action$.ofType(UPLOAD_WISH_IMAGE_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(storage.getJWTToken())
      .switchMap((token) =>
        Rx.Observable.fromPromise(authenticationService.authenticate({
          user: {
            type: 'token',
            token,
          },
        }))
        .switchMap(() =>
          Rx.Observable.fromPromise(UploadService.create(action.image))
            .map((imageUploaded) =>
            uploadedWishImageAction({
              imageId: imageUploaded.id,
              callback: action.callback,
            }))
            .catch((err) => Rx.Observable.of({
              type: UPLOAD_WISH_IMAGE_ERROR_ACTION,
              message: { title: 'Error', message: err },
            }))
    )));
}

export function createWish(action$) {
  return action$.ofType(CREATE_WISH_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(storage.getJWTToken())
      .switchMap((token) =>
        Rx.Observable.fromPromise(authenticationService.authenticate({
          user: {
            type: 'token',
            token,
          },
        }))
        .switchMap(() =>
          Rx.Observable.fromPromise(WishListService.update(action.wishList))
            .map((wishListUpdated) =>
              createdWishAction({
                wishList: wishListUpdated,
                callback: action.callback,
              })
            )
            .catch((err) =>
              Rx.Observable.of({
                type: CREATE_WISH_MESSAGEERROR_ACTION,
                message: { title: 'Error', message: err },
              }))
    )));
}

export function createdWish(action$) {
  return action$.ofType(CREATED_WISH_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.create(() => {
        if (action.callback) {
          action.callback();
        }
        Keyboard.dismiss();
      }));
}

export function uploadedWishImage(action$) {
  return action$.ofType(UPLOADED_WISH_IMAGE_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.create(() => {
        if (action.callback) {
          action.callback(action.imageId);
        }
      }));
}

export function removeWish(action$) {
  return action$.ofType(REMOVE_WISH_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(storage.getJWTToken())
      .switchMap((token) =>
        Rx.Observable.fromPromise(authenticationService.authenticate({
          user: {
            type: 'token',
            token,
          },
        }))
        .switchMap(() =>
          Rx.Observable.fromPromise(WishListService.update(action.wishList))
            .map((wishRemoved) =>
              removedWishAction({
                wishList: wishRemoved,
                goToAction: action.goToAction,
              }))
            .catch((err) =>
              Rx.Observable.of({
                type: REMOVE_WISH_MESSAGEERROR_ACTION,
                message: { title: 'Error', message: err },
              }))
    )));
}

export function selectWishListItem(action$) {
  return action$.ofType(SELECT_WISHLIST_ITEM_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.create(() => {
        if (action.goToAction) {
          Actions[action.goToAction]();
        }
      }));
}

export default [
  getSingleWishList,
  getWishLists,
  getSingleWishListSuccess,
  getFriendWishLists,
  getWishlistsForUpdateAction,
  getWishlistsForUpdateSuccessAction,
  wishListForUpdateCallbackAction,
  createWishList,
  updateWishList,
  updatedWishList,
  createdWishList,
  removeWishList,
  removedWishList,
  createWish,
  createdWish,
  uploadWishImage,
  uploadedWishImage,
  removeWish,
  selectWishListItem,
];
