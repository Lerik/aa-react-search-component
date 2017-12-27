/* eslint no-underscore-dangle: 0 */

import 'react-native';
import * as actions from '../../../src/containers/Friends/actions';
import * as constants from '../../../src/containers/Friends/constants';

describe('Friends Actions', () => {
  it('should create a friend request action', () => {
    const payload = {
      id: '000',
      userId: '',
    };
    const expectedAction = {
      type: constants.CREATE_FRIEND_REQUEST,
      payload,
      userId: '',
    };
    expect(actions.createFriendRequest(payload, payload.userId)).toEqual(expectedAction);
  });
  it('should create a friend request success action', () => {
    const userId = '';

    const expectedAction = {
      type: constants.CREATE_FRIEND_REQUEST_SUCCESS,
      userId: '',
    };
    expect(actions.createFriendRequestSuccess(userId)).toEqual(expectedAction);
  });
  it('should get all friends action', () => {
    const expectedAction = {
      type: constants.GET_ALL_FRIENDS,
      userId: '123',
    };
    expect(actions.getAllFriendsAction('123')).toEqual(expectedAction);
  });
  it('should get all friend success action', () => {
    const payload = {
      friends: {
        id: '000',
        userId: '',
      },
      _id: '123',
    };
    const expectedAction = {
      type: constants.GET_ALL_FRIENDS_SUCCESS_ACTION,
      friends: payload.friends,
      friendshipId: payload._id,
    };
    expect(actions.getAllFriendsSuccessAction(payload)).toEqual(expectedAction);
  });
  it('should get contacts action', () => {
    const contacts = {
      id: '000',
      userId: '',
    };
    const expectedAction = {
      type: constants.GET_CONTACTS,
      contacts,
    };
    expect(actions.getContacts(contacts)).toEqual(expectedAction);
  });
  it('should get friends requested action', () => {
    const query = {
      requesterId: '123',
    };
    const expectedAction = {
      type: constants.GET_FRIENDS_REQUESTED,
      query,
    };
    expect(actions.getFriendsRequested(query)).toEqual(expectedAction);
  });
  it('should get friends requested success action', () => {
    const friendsRequested = [];
    const expectedAction = {
      type: constants.GET_FRIENDS_REQUESTED_SUCCESS,
      friendsRequested,
    };
    expect(actions.getFriendsRequestedSuccess(friendsRequested)).toEqual(expectedAction);
  });


  it('should get users information action', () => {
    const query = {
      $or: [],
    };
    const expectedAction = {
      type: constants.GET_USERS_INFORMATION,
      query,
    };
    expect(actions.getUsersInformation(query)).toEqual(expectedAction);
  });
  it('should get users information success action', () => {
    const users = {
      userId: '123',
    };
    const expectedAction = {
      type: constants.GET_USERS_INFORMATION_SUCCESS,
      users,
    };
    expect(actions.getUsersInformationSuccess(users)).toEqual(expectedAction);
  });
  it('should get users requesters action', () => {
    const query = {
      userId: '123',
    };
    const expectedAction = {
      type: constants.GET_USERS_REQUESTERS,
      query,
    };
    expect(actions.getUsersRequesters(query)).toEqual(expectedAction);
  });
  it('should get friends requesters success action', () => {
    const usersRequesters = {
      requesterId: '123',
    };
    const expectedAction = {
      type: constants.GET_USERS_REQUESTERS_SUCCESS,
      usersRequesters,
    };
    expect(actions.getUsersRequestersSuccess(usersRequesters)).toEqual(expectedAction);
  });
  it('should remove friend request action', () => {
    const expectedAction = {
      type: constants.REMOVE_FRIEND_REQUEST_ACTION,
      requestId: '123',
      userId: '321',
    };
    expect(actions.removeFriendRequestAction('123', '321')).toEqual(expectedAction);
  });
  it('should remove friend request success action', () => {
    const expectedAction = {
      type: constants.REMOVE_FRIEND_REQUEST_SUCCESS,
      userId: '321',
    };
    expect(actions.removeFriendRequestSuccess('321')).toEqual(expectedAction);
  });
  it('should create a friendship action', () => {
    const payload = {
      id: '000',
      friends: [],
    };
    const expectedAction = {
      type: constants.CREATE_FRIENDSHIP,
      payload,
    };
    expect(actions.createFriendship(payload)).toEqual(expectedAction);
  });
  it('should create a friendship success action', () => {
    const expectedAction = {
      type: constants.CREATE_FRIENDSHIP_SUCCESS,
      friends: [],
    };
    expect(actions.createFriendshipSuccess()).toEqual(expectedAction);
  });
  it('should update friendship action', () => {
    const expectedAction = {
      type: constants.UPDATE_FRIENDSHIP,
      payload: {},
      friendData: {},
    };
    expect(actions.updateFriendship({}, {})).toEqual(expectedAction);
  });
  it('should update friendship action', () => {
    const expectedAction = {
      type: constants.UPDATE_FRIENDSHIP_SUCCESS,
      personId: '321',
      friendData: {},
    };
    expect(actions.updateFriendshipSuccess('321', {})).toEqual(expectedAction);
  });

  it('should get getRequesterFriends action', () => {
    const expectedAction = {
      type: constants.GET_REQUESTER_FRIENDS,
      requesterId: '321',
      personId: '123',
    };
    expect(actions.getRequesterFriends('321', '123')).toEqual(expectedAction);
  });
  it('should update updateRequesterFriendship action', () => {
    const expectedAction = {
      type: constants.UPDATE_REQUESTER_FRIENDSHIP,
      payload: {},
    };
    expect(actions.updateRequesterFriendship({})).toEqual(expectedAction);
  });
  it('should perform updateRequesterFriendshipSuccess action', () => {
    const expectedAction = {
      type: constants.UPDATE_REQUESTER_FRIENDSHIP_SUCCESS,
    };
    expect(actions.updateRequesterFriendshipSuccess()).toEqual(expectedAction);
  });
  it('should execute sendInvitations action', () => {
    const payload = {
      numbers: [],
      emails: [],
    };
    const expectedAction = {
      type: constants.SEND_INVITATIONS,
      payload,
    };
    expect(actions.sendInvitations(payload)).toEqual(expectedAction);
  });
  it('should execute sentInvitationSuccess action', () => {
    const expectedAction = {
      type: constants.SENT_INVITATION_SUCCESS,
    };
    expect(actions.sentInvitationSuccess()).toEqual(expectedAction);
  });
  it('should execute invitationsSent action', () => {
    const invitations = [];
    const expectedAction = {
      type: constants.INVITATIONS_SENT,
      invitations,
    };
    expect(actions.invitationsSent(invitations)).toEqual(expectedAction);
  });
  it('should show error messsage action', () => {
    const error = 'error message';

    const expectedAction = {
      type: constants.SHOW_ERROR,
      error,
    };
    expect(actions.showErrorMessage(error)).toEqual(expectedAction);
  });
});

