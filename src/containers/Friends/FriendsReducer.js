import { fromJS } from 'immutable';
import {
  CREATE_FRIEND_REQUEST,
  CREATE_FRIEND_REQUEST_SUCCESS,
  CREATE_FRIENDSHIP_SUCCESS,
  GET_ALL_FRIENDS,
  GET_ALL_FRIENDS_SUCCESS_ACTION,
  GET_CONTACTS,
  SELECT_FRIEND_ACTION,
  GET_FRIENDS_REQUESTED_SUCCESS,
  GET_USERS_INFORMATION_SUCCESS,
  GET_USERS_REQUESTERS_SUCCESS,
  INVITATIONS_SENT,
  SHOW_ERROR,
 } from './constants';

const initialState = fromJS({
  contacts: [],
  error: '',
  friendshipId: '',
  friends: [],
  friendsRequested: [],
  invitationsSent: [],
  selectedFriend: null,
  isLoading: false,
  requesters: [],
  users: [],
});

export default function FriendsReducer(state = initialState, action) { // NOSONAR
  switch (action.type) {
    case CREATE_FRIEND_REQUEST:
    case GET_ALL_FRIENDS:
      return state
      .set('isLoading', true);
    case CREATE_FRIEND_REQUEST_SUCCESS:
      return state
      .set('isLoading', false);
    case CREATE_FRIENDSHIP_SUCCESS:
      return state
      .set('friends', action.friends)
      .set('isLoading', false);
    case GET_ALL_FRIENDS_SUCCESS_ACTION:
      return state
      .set('friendshipId', action.friendshipId)
      .set('friends', action.friends)
      .set('isLoading', false);
    case GET_CONTACTS:
      return state
      .set('contacts', action.contacts);
    case GET_FRIENDS_REQUESTED_SUCCESS:
      return state
      .set('friendsRequested', action.friendsRequested);
    case SELECT_FRIEND_ACTION:
      return state
      .set('selectedFriend', action.friendData);
    case GET_USERS_INFORMATION_SUCCESS:
      return state
      .set('users', action.users);
    case GET_USERS_REQUESTERS_SUCCESS:
      return state
      .set('requesters', action.usersRequesters);
    case INVITATIONS_SENT:
      return state
      .set('invitationsSent', action.invitations);
    case SHOW_ERROR:
      return state
      .set('error', action.error);
    default:
      return state;
  }
}
