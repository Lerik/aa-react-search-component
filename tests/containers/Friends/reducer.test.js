import 'react-native';
import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import reducers from '../../../src/reducers/index';
import { default as FriendsRedux, Friends } from '../../../src/containers/Friends'; // eslint-disable-line
import * as FriendsActions from '../../../src/containers/Friends/actions';

const store = createStore(
  reducers,
);

jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
}));

describe('Friends Reducer', () => {
  const wrapperRedux = shallow(<FriendsRedux store={store} />);
  const dispatch = wrapperRedux.node.props.store.dispatch;

  const props = {
    friendsStore: wrapperRedux.node.props.friendsStore,
    actions: FriendsActions,
  };

  const wrapper = shallow(<Friends {...props} />);
  const instance = wrapper.instance();

  const createFriendRequestPayload = {
    payload: {},
    userId: '123',
  };
  const getAllFriendsSuccessActionPayload = {
    friends: '',
    friendshipId: '123',
  };

  const contacts = {};
  const users = [];
  const usersRequesters = [];
  const error = 'Error message';
  const friendsRequested = [];
  const invitations = [];

  const friendData = [];

  it('should return a valid createFriendRequest object and state', () => {
    const expectedAction = {
      type: 'CREATE_FRIEND_REQUEST',
      payload: createFriendRequestPayload,
      userId: createFriendRequestPayload.userId,
    };

    const action = instance.props.actions.createFriendRequest;
    dispatch(action(true));
    const isLoading =
    store.getState().FriendsReducer.toJS().isLoading;
    expect(isLoading).toEqual(true);

    expect(instance.props.actions.createFriendRequest(createFriendRequestPayload, '123'))
    .toEqual(expectedAction);
  });
  it('should return a valid createFriendRequestSuccess object and state', () => {
    const expectedAction = {
      type: 'CREATE_FRIEND_REQUEST_SUCCESS',
      userId: '123',
    };
    const action = instance.props.actions.createFriendRequestSuccess;
    dispatch(action(false));
    const isLoading =
    store.getState().FriendsReducer.toJS().isLoading;
    expect(isLoading).toEqual(false);

    expect(instance.props.actions.createFriendRequestSuccess('123'))
    .toEqual(expectedAction);
  });
  it('should return a valid getAllFriendsAction object and state', () => {
    const expectedAction = {
      type: 'GET_ALL_FRIENDS',
      userId: '123',
    };

    const action = instance.props.actions.getAllFriendsAction;
    dispatch(action(true));
    const isLoading =
    store.getState().FriendsReducer.toJS().isLoading;
    expect(isLoading).toEqual(true);

    expect(instance.props.actions.getAllFriendsAction('123'))
    .toEqual(expectedAction);
  });
  it('should return a valid getContacts object and state', () => {
    const expectedAction = {
      type: 'GET_CONTACTS',
      contacts: contacts, //eslint-disable-line
    };

    const action = instance.props.actions.getContacts;
    dispatch(action(contacts));
    const contactsState =
    store.getState().FriendsReducer.toJS().contacts;

    expect(instance.props.actions.getContacts(contacts))
    .toEqual(expectedAction);
    expect(contactsState).toEqual(contacts);
  });
  it('should return a valid getFriendsRequestedSuccess object and state', () => {
    const expectedAction = {
      type: 'GET_FRIENDS_REQUESTED_SUCCESS',
      friendsRequested,
    };

    const action = instance.props.actions.getFriendsRequestedSuccess;
    dispatch(action(friendsRequested));
    const friendsRequestedState =
    store.getState().FriendsReducer.toJS().friendsRequested;

    expect(instance.props.actions.getFriendsRequestedSuccess(friendsRequested))
    .toEqual(expectedAction);
    expect(friendsRequestedState).toEqual(friendsRequested);
  });
  it('should return a valid selectFriendAction object and state', () => {
    const expectedAction = {
      type: 'SELECT_FRIEND_ACTION',
      friendData: [],
    };

    const action = instance.props.actions.selectFriendAction;
    dispatch(action(friendData));
    const friendDataState =
    store.getState().FriendsReducer.toJS().selectedFriend;

    expect(instance.props.actions.selectFriendAction(friendData))
    .toEqual(expectedAction);
    expect(friendDataState).toEqual(friendData);
  });
  it('should return a valid getUsersInformationSuccess object and state', () => {
    const expectedAction = {
      type: 'GET_USERS_INFORMATION_SUCCESS',
      users, //eslint-disable-line
    };

    const action = instance.props.actions.getUsersInformationSuccess;
    dispatch(action(users));
    const friendsRequestedState =
    store.getState().FriendsReducer.toJS().users;

    expect(instance.props.actions.getUsersInformationSuccess(users))
    .toEqual(expectedAction);
    expect(friendsRequestedState).toEqual(users);
  });
  it('should return a valid getUsersRequestersSuccess object and state', () => {
    const expectedAction = {
      type: 'GET_USERS_REQUESTERS_SUCCESS',
      usersRequesters, //eslint-disable-line
    };

    const action = instance.props.actions.getUsersRequestersSuccess;
    dispatch(action(usersRequesters));
    const usersRequestersState =
    store.getState().FriendsReducer.toJS().requesters;

    expect(instance.props.actions.getUsersRequestersSuccess(usersRequesters))
    .toEqual(expectedAction);
    expect(usersRequestersState).toEqual(usersRequesters);
  });
  it('should return a valid showErrorMessage object and state', () => {
    const expectedAction = {
      type: 'SHOW_ERROR',
      error, //eslint-disable-line
    };

    const action = instance.props.actions.showErrorMessage;
    dispatch(action(error));
    const errorState =
    store.getState().FriendsReducer.toJS().error;

    expect(instance.props.actions.showErrorMessage(error))
    .toEqual(expectedAction);
    expect(errorState).toEqual(error);
  });

  it('should return a valid getAllFriendsSuccessAction object and state', () => {
    const expectedAction = {
      type: 'GET_ALL_FRIENDS_SUCCESS_ACTION',
      friends: getAllFriendsSuccessActionPayload.friends, //eslint-disable-line
      friendshipId: getAllFriendsSuccessActionPayload.friendshipId,
    };

    const action = instance.props.actions.getAllFriendsSuccessAction;
    dispatch(action({
      friends: getAllFriendsSuccessActionPayload.friends,
      _id: getAllFriendsSuccessActionPayload.friendshipId }));
    const friendsState =
    store.getState().FriendsReducer.toJS().friends;
    expect(friendsState).toEqual(getAllFriendsSuccessActionPayload.friends);

    const isLoading =
    store.getState().FriendsReducer.toJS().isLoading;
    expect(isLoading).toEqual(false);

    expect(instance.props.actions.getAllFriendsSuccessAction({
      friends: getAllFriendsSuccessActionPayload.friends,
      _id: getAllFriendsSuccessActionPayload.friendshipId }))
    .toEqual(expectedAction);
  });

  it('should return a valid createFriendshipSuccess object and state', () => {
    const expectedAction = {
      type: 'CREATE_FRIENDSHIP_SUCCESS',
      friends: [], //eslint-disable-line
    };

    const action = instance.props.actions.createFriendshipSuccess;
    dispatch(action({
      friends: [],
      _id: getAllFriendsSuccessActionPayload.friendshipId }));
    const friendsState =
    store.getState().FriendsReducer.toJS().friends;
    expect(friendsState).toEqual([]);

    const isLoading =
    store.getState().FriendsReducer.toJS().isLoading;
    expect(isLoading).toEqual(false);

    expect(instance.props.actions.createFriendshipSuccess({
      friends: [],
      _id: getAllFriendsSuccessActionPayload.friendshipId }))
    .toEqual(expectedAction);
  });

  it('should return a valid invitationsSent object and state', () => {
    const expectedAction = {
      type: 'INVITATIONS_SENT',
      invitations, //eslint-disable-line
    };

    const action = instance.props.actions.invitationsSent;
    dispatch(action(invitations));
    const invitationsState =
    store.getState().FriendsReducer.toJS().requesters;

    expect(instance.props.actions.invitationsSent(invitations))
    .toEqual(expectedAction);
    expect(invitationsState).toEqual(invitations);
  });
});

