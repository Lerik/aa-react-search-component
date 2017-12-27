/* eslint no-underscore-dangle: 0 */

import {
  CREATE_FRIEND_REQUEST,
  CREATE_FRIEND_REQUEST_SUCCESS,
  CREATED_FRIEND_REQUEST_SUCCESS,
  GET_ALL_FRIENDS,
  GET_ALL_FRIENDS_SUCCESS_ACTION,
  GET_CONTACTS,
  SELECT_FRIEND_ACTION,
  GET_FRIENDS_REQUESTED,
  GET_FRIENDS_REQUESTED_SUCCESS,
  GET_USERS_INFORMATION,
  GET_USERS_INFORMATION_SUCCESS,
  GET_USERS_REQUESTERS,
  GET_USERS_REQUESTERS_SUCCESS,
  REMOVE_FRIEND_REQUEST_ACTION,
  REMOVE_FRIEND_REQUEST_SUCCESS,
  CREATE_FRIENDSHIP,
  CREATE_FRIENDSHIP_SUCCESS,
  UPDATE_FRIENDSHIP,
  UPDATE_FRIENDSHIP_SUCCESS,
  UPDATED_FRIENDSHIP,
  GET_REQUESTER_FRIENDS,
  UPDATE_REQUESTER_FRIENDSHIP,
  UPDATE_REQUESTER_FRIENDSHIP_SUCCESS,
  SEND_INVITATIONS,
  SENT_INVITATION_SUCCESS,
  INVITATIONS_SENT,
  SHOW_ERROR,
 } from './constants';

export function createFriendRequest(payload, userId, callback) {
  return {
    type: CREATE_FRIEND_REQUEST,
    payload,
    userId,
    callback,
  };
}

export function createFriendRequestSuccess(userId, callback) {
  return {
    type: CREATE_FRIEND_REQUEST_SUCCESS,
    userId,
    callback,
  };
}

export function createdFriendRequestSuccessAction(callback) {
  return {
    type: CREATED_FRIEND_REQUEST_SUCCESS,
    callback,
  };
}

export function getAllFriendsAction(userId) {
  return {
    type: GET_ALL_FRIENDS,
    userId,
  };
}

export function getAllFriendsSuccessAction(payload, userId) {
  return {
    userId,
    type: GET_ALL_FRIENDS_SUCCESS_ACTION,
    friendshipId: payload._id,
    friends: payload.friends,
  };
}

export function getContacts(contacts) {
  return {
    type: GET_CONTACTS,
    contacts,
  };
}

export function getFriendsRequested(query) {
  return {
    type: GET_FRIENDS_REQUESTED,
    query,
  };
}

export function getFriendsRequestedSuccess(friendsRequested) {
  return {
    type: GET_FRIENDS_REQUESTED_SUCCESS,
    friendsRequested,
  };
}

export function getUsersInformation(query) {
  return {
    type: GET_USERS_INFORMATION,
    query,
  };
}

export function getUsersInformationSuccess(users) {
  return {
    type: GET_USERS_INFORMATION_SUCCESS,
    users,
  };
}

export function getUsersRequesters(query) {
  return {
    type: GET_USERS_REQUESTERS,
    query,
  };
}

export function getUsersRequestersSuccess(usersRequesters) {
  return {
    type: GET_USERS_REQUESTERS_SUCCESS,
    usersRequesters,
  };
}

export function removeFriendRequestAction(requestId, userId) {
  return {
    type: REMOVE_FRIEND_REQUEST_ACTION,
    requestId,
    userId,
  };
}

export function removeFriendRequestSuccess(userId) {
  return {
    type: REMOVE_FRIEND_REQUEST_SUCCESS,
    userId,
  };
}

export function createFriendship(payload) {
  return {
    type: CREATE_FRIENDSHIP,
    payload,
  };
}

export function createFriendshipSuccess() {
  return {
    type: CREATE_FRIENDSHIP_SUCCESS,
    friends: [],
  };
}

export function updateFriendship(payload, friendData, callback) {
  return {
    type: UPDATE_FRIENDSHIP,
    payload,
    friendData,
    callback,
  };
}

export function updateFriendshipSuccess(personId, friendData, callback) {
  return {
    type: UPDATE_FRIENDSHIP_SUCCESS,
    personId,
    friendData,
    callback,
  };
}

export function updatedFriendshipAction(callback) {
  return {
    type: UPDATED_FRIENDSHIP,
    callback,
  };
}

export function getRequesterFriends(requesterId, personId) {
  return {
    type: GET_REQUESTER_FRIENDS,
    requesterId,
    personId,
  };
}

export function updateRequesterFriendship(payload) {
  return {
    type: UPDATE_REQUESTER_FRIENDSHIP,
    payload,
  };
}

export function updateRequesterFriendshipSuccess() {
  return {
    type: UPDATE_REQUESTER_FRIENDSHIP_SUCCESS,
  };
}

export function selectFriendAction(friendData) {
  return {
    type: SELECT_FRIEND_ACTION,
    friendData,
  };
}

export function sendInvitations(payload, callback) {
  return {
    type: SEND_INVITATIONS,
    payload,
    callback,
  };
}

export function sentInvitationSuccess(callback) {
  return {
    type: SENT_INVITATION_SUCCESS,
    callback,
  };
}

export function invitationsSent(invitations) {
  return {
    type: INVITATIONS_SENT,
    invitations,
  };
}

export function showErrorMessage(error) {
  return {
    type: SHOW_ERROR,
    error,
  };
}
