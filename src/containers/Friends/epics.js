import Rx from 'rxjs';
import {
  createFriendRequestSuccess,
  createdFriendRequestSuccessAction,
  getAllFriendsAction,
  getAllFriendsSuccessAction,
  getFriendsRequested,
  getFriendsRequestedSuccess,
  getUsersInformationSuccess,
  getUsersRequesters,
  getUsersRequestersSuccess,
  removeFriendRequestAction,
  removeFriendRequestSuccess,
  createFriendship,
  createFriendshipSuccess,
  updateFriendshipSuccess,
  updatedFriendshipAction,
  getRequesterFriends,
  updateRequesterFriendship,
  updateRequesterFriendshipSuccess,
  sentInvitationSuccess,
  showErrorMessage,
} from './actions';
import {
  authenticationService,
  FriendsService,
  FriendRequestService,
} from '../../services/';
import {
  CREATE_FRIEND_REQUEST,
  CREATE_FRIEND_REQUEST_SUCCESS,
  CREATED_FRIEND_REQUEST_SUCCESS,
  GET_ALL_FRIENDS,
  GET_ALL_FRIENDS_SUCCESS_ACTION,
  GET_FRIENDS_REQUESTED,
  GET_USERS_INFORMATION,
  GET_USERS_REQUESTERS,
  REMOVE_FRIEND_REQUEST_ACTION,
  REMOVE_FRIEND_REQUEST_SUCCESS,
  CREATE_FRIENDSHIP,
  UPDATE_FRIENDSHIP,
  UPDATE_FRIENDSHIP_SUCCESS,
  UPDATED_FRIENDSHIP,
  GET_REQUESTER_FRIENDS,
  UPDATE_REQUESTER_FRIENDSHIP,
  SEND_INVITATIONS,
  SENT_INVITATION_SUCCESS,
} from './constants';
import * as storage from '../../services/helpers/storageHelper';

export function createFriendRequestAction(action$) {
  return action$.ofType(CREATE_FRIEND_REQUEST)
  .map((action) => action)
  .mergeMap((action) =>
    Rx.Observable.fromPromise(FriendRequestService.create(action.payload))
    .map(() => createFriendRequestSuccess(action.userId, action.callback))
      .catch((err) => [showErrorMessage(err)]));
}

export function createFriendRequestSuccessAction(action$) {
  return action$.ofType(CREATE_FRIEND_REQUEST_SUCCESS)
  .map((action) => action)
  .mergeMap((action) => [getFriendsRequested({
    query: {
      requesterId: action.userId,
    },
  }),
    getUsersRequesters({
      query: {
        requestedId: action.userId,
      },
    }),
    createdFriendRequestSuccessAction(action.callback)]
  );
}

export function createdFriendRequestAction(action$) {
  return action$.ofType(CREATED_FRIEND_REQUEST_SUCCESS)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.create(() => {
        if (action.callback) {
          action.callback();
        }
      }));
}

export function removeFriendRequest(action$) {
  return action$.ofType(REMOVE_FRIEND_REQUEST_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(FriendRequestService.remove(action.requestId))
    .map(() => removeFriendRequestSuccess(action.userId))
      .catch((error) => [showErrorMessage(error)]));
}

export function removeFriendRequestSuccessAction(action$) {
  return action$.ofType(REMOVE_FRIEND_REQUEST_SUCCESS)
  .map((action) => action)
  .mergeMap((action) => [getUsersRequesters({
    query: {
      requestedId: action.userId,
    },
  })]
  );
}

export function getAllFriends(action$) {
  return action$.ofType(GET_ALL_FRIENDS)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(FriendsService.find({
        query: {
          personId: action.userId,
        },
      }))
      .map((response) => getAllFriendsSuccessAction(response, action.userId))
        .catch((err) => {
          if (err.message === 'Cannot read property \'friends\' of undefined') {
            return [createFriendship({
              personId: action.userId, // eslint-disable-line
              friends: [],
            })];
          }
          return [showErrorMessage(err)];
        }));
}

export function getAllFriendsSuccess(action$) {
  return action$.ofType(GET_ALL_FRIENDS_SUCCESS_ACTION)
  .map((action) => action)
  .mergeMap((action) => [
    getFriendsRequested({
      query: {
        requesterId: action.userId,
      },
    }),
    getUsersRequesters({
      query: {
        requestedId: action.userId,
      },
    }),
  ]);
}

export function getFriendsRequestedAction(action$) {
  return action$.ofType(GET_FRIENDS_REQUESTED)
    .map((action) => action)
    .mergeMap((action) => Rx.Observable.fromPromise(FriendRequestService.find(action.query))
      .map((response) => getFriendsRequestedSuccess(response))
      .catch((error) => [showErrorMessage(error)]));
}

export function getUsersRequestersAction(action$) {
  return action$.ofType(GET_USERS_REQUESTERS)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(FriendRequestService.find(action.query))
      .map((response) => getUsersRequestersSuccess(response))
      .catch((error) => [showErrorMessage(error)]));
}

export function getUsersInformation(action$) {
  return action$.ofType(GET_USERS_INFORMATION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(authenticationService.find(action.query))
      .map((response) => getUsersInformationSuccess(response.data))
      .catch((error) => [showErrorMessage(error)]));
}

export function createFriendshipAction(action$) {
  return action$.ofType(CREATE_FRIENDSHIP)
  .map((action) => action)
  .mergeMap((action) =>
    Rx.Observable.fromPromise(FriendsService.create(action.payload))
    .map(() => createFriendshipSuccess())
      .catch((err) => [showErrorMessage(err)]));
}

export function updateFriendshipAction(action$) {
  return action$.ofType(UPDATE_FRIENDSHIP)
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
        Rx.Observable.fromPromise(FriendsService.update(action.payload))
        .map(() => updateFriendshipSuccess(action.payload.personId, action.friendData, action.callback))
          .catch((err) => [showErrorMessage(err)])
        )));
}

export function updateFriendshipSuccessAction(action$) {
  return action$.ofType(UPDATE_FRIENDSHIP_SUCCESS)
  .map((action) => action)
  .mergeMap((action) => [getRequesterFriends(action.friendData._id, action.personId), // eslint-disable-line
    removeFriendRequestAction(action.friendData.requestId, action.personId),
    getAllFriendsAction({
      friendsQuery: {
        query: {
          personId: action.personId,
        },
      },
    }),
    updatedFriendshipAction(action.callback)]);
}

export function updatedFriendship(action$) {
  return action$.ofType(UPDATED_FRIENDSHIP)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.create(() => {
        if (action.callback) {
          action.callback();
        }
      }));
}

export function getRequesterFriendsAction(action$) {
  return action$.ofType(GET_REQUESTER_FRIENDS)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(FriendsService.find({
        query: {
          personId: action.requesterId,
        },
      }))
      .map((response) => {
        const friends = response.friends.map((friend) => friend._id); // eslint-disable-line
        friends.push(action.personId);

        const formattedFriendship = {
          _id: response._id, // eslint-disable-line
          personId: action.requesterId,
          friends,
        };
        return updateRequesterFriendship(formattedFriendship);
      })
        .catch((err) => [showErrorMessage(err)]));
}

export function updateRequesterFriendshipAction(action$) {
  return action$.ofType(UPDATE_REQUESTER_FRIENDSHIP)
  .map((action) => action)
  .mergeMap((action) =>
    Rx.Observable.fromPromise(FriendsService.update(action.payload))
    .map(() => updateRequesterFriendshipSuccess())
    .catch((err) => [showErrorMessage(err)])
    );
}

export function sendInvitationAction(action$) {
  return action$.ofType(SEND_INVITATIONS)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(FriendRequestService.sendInvitations(action.payload))
        .map(() => sentInvitationSuccess(action.callback))
        .catch((err) => [showErrorMessage(err)])
    );
}

export function sendInvitationActionSuccess(action$) {
  return action$.ofType(SENT_INVITATION_SUCCESS)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.create(() => {
        if (action.callback) {
          action.callback();
        }
      }));
}

export default [
  createFriendRequestAction,
  createFriendRequestSuccessAction,
  createdFriendRequestAction,
  getAllFriends,
  getAllFriendsSuccess,
  getFriendsRequestedAction,
  getUsersRequestersAction,
  getUsersInformation,
  removeFriendRequest,
  removeFriendRequestSuccessAction,
  createFriendshipAction,
  updateFriendshipAction,
  updateFriendshipSuccessAction,
  updatedFriendship,
  getRequesterFriendsAction,
  updateRequesterFriendshipAction,
  sendInvitationAction,
  sendInvitationActionSuccess,
];
