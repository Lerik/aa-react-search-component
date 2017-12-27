import { createEpicMiddleware } from 'redux-observable';
import configureMockStore from 'redux-mock-store';
import {
  CREATE_FRIEND_REQUEST,
  CREATE_FRIEND_REQUEST_SUCCESS,
  GET_ALL_FRIENDS,
  GET_FRIENDS_REQUESTED,
  GET_FRIENDS_REQUESTED_SUCCESS,
  GET_USERS_INFORMATION,
  GET_USERS_REQUESTERS,
  REMOVE_FRIEND_REQUEST_ACTION,
  REMOVE_FRIEND_REQUEST_SUCCESS,
  CREATE_FRIENDSHIP,
  UPDATE_FRIENDSHIP,
  UPDATE_REQUESTER_FRIENDSHIP,
  GET_REQUESTER_FRIENDS,
  SEND_INVITATIONS,
} from '../../../src/containers/Friends/constants';
import { rootEpic } from '../../../src/epics/rootEpic';

const epicMiddleware = createEpicMiddleware(rootEpic);
const mockStore = configureMockStore([epicMiddleware]);

require('react-native-router-flux');

jest.mock('../../../src/services/index.js', () => (
  { authenticationService: {
    authenticate: jest.fn((user) =>
      new Promise((resolve, reject) => {
        if (user) {
          resolve({ data: '12345', token: 'token' });
        } else {
          reject({ code: 401, message: 'Invalid login.' });
        }
      })),
    updateUserName: jest.fn((user) =>
      new Promise((resolve, reject) => {
        if (user) {
          resolve({});
        } else {
          reject({ message: '' });
        }
      })),
    createUser: jest.fn((user) => new Promise((resolve, reject) => {
      if (user) {
        resolve({ phoneNumber: '12345' });
      } else {
        reject({ code: 409, message: '' });
      }
    })),
    find: jest.fn((query) =>
    new Promise((resolve, reject) => {
      if (query) {
        resolve([]);
      } else {
        reject('error');
      }
    })),
    sendVerificationCode: jest.fn((user) =>
      new Promise((resolve, reject) => {
        if (user) {
          resolve('Ok');
        } else {
          reject({ code: 401, message: '' });
        }
      })),
    verifySmsCode: jest.fn((user) =>
      new Promise((resolve, reject) => {
        if (user) {
          resolve('Ok');
        } else {
          reject({ code: 401, message: '' });
        }
      })),
  },
    FriendRequestService: {
      create: jest.fn((friend) => new Promise((resolve, reject) => {
        if (friend) {
          resolve([]);
        } else {
          reject({ code: 409, message: '' });
        }
      })),
      find: jest.fn((query) =>
      new Promise((resolve, reject) => {
        if (query) {
          resolve([]);
        } else {
          reject('error');
        }
      })),
      remove: jest.fn((id) =>
      new Promise((resolve, reject) => {
        if (id) {
          resolve([]);
        } else {
          reject('error');
        }
      })),
      sendInvitations: jest.fn((request) => new Promise((resolve, reject) => {
        if (request) {
          resolve([]);
        } else {
          reject({ code: 409, message: '' });
        }
      })),
    },
    FriendsService: {
      create: jest.fn((friend) => new Promise((resolve, reject) => {
        if (friend) {
          resolve([]);
        } else {
          reject({ code: 409, message: '' });
        }
      })),
      update: jest.fn((wishList) =>
      new Promise((resolve, reject) => {
        if (wishList) {
          resolve([]);
        } else {
          reject('error');
        }
      })),
      find: jest.fn((query) =>
      new Promise((resolve, reject) => {
        if (query) {
          resolve([]);
        } else {
          reject('error');
        }
      })),
      remove: jest.fn((id) =>
      new Promise((resolve, reject) => {
        if (id) {
          resolve([]);
        } else {
          reject('error');
        }
      })),
    },
  }));

jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn().mockReturnValue(
    new Promise((resolve) => {
      resolve(true);
    })
    ),
  getInitialURL: jest.fn(),
}));

jest.mock('react-native-router-flux', () => ({
  Actions: {
    AddName: jest.fn(),
    Login: jest.fn(),
  },
}));

jest.mock('react-native', () => ({
  AsyncStorage: {
    setItem: jest.fn(() =>
      new Promise((resolve) => resolve({}))),
    getItem: jest.fn(() =>
      new Promise((resolve) => resolve('{}'))),
    clear: jest.fn(() =>
      new Promise((resolve) => resolve())),
    multiGet: jest.fn(() =>
      new Promise((resolve) => resolve({}))),
  },
  Keyboard: {
    dismiss: jest.fn(),
  },
}));

const feathers = require('../../../src/feathers/index.js');
feathers.default.io = jest.fn(() => true);

describe('Friends epics', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    epicMiddleware.replaceEpic(rootEpic);
  });
  it('should dispatch successfully createFriendRequestAction', async () => {
    await store.dispatch({
      type: CREATE_FRIEND_REQUEST,
      payload: {},
      userId: '123',
    });
    expect(store.getActions()).toEqual([
      { payload: {}, type: 'CREATE_FRIEND_REQUEST', userId: '123' },
      { callback: undefined, type: 'CREATE_FRIEND_REQUEST_SUCCESS', userId: '123' },
      { query: { query: { requesterId: '123' } }, type: 'GET_FRIENDS_REQUESTED' },
      { query: { query: { requestedId: '123' } }, type: 'GET_USERS_REQUESTERS' },
      { callback: undefined, type: 'CREATED_FRIEND_REQUEST_SUCCESS' },
    ]);
  });
  it('should dispatch successfully createFriendRequestSuccessAction', async () => {
    await store.dispatch({
      type: CREATE_FRIEND_REQUEST_SUCCESS,
      userId: '123',
    });
    expect(store.getActions()).toEqual([
      { type: 'CREATE_FRIEND_REQUEST_SUCCESS', userId: '123' },
      { query: { query: { requesterId: '123' } }, type: 'GET_FRIENDS_REQUESTED' },
      { query: { query: { requestedId: '123' } }, type: 'GET_USERS_REQUESTERS' },
      { callback: undefined, type: 'CREATED_FRIEND_REQUEST_SUCCESS' },
      { friendsRequested: [], type: 'GET_FRIENDS_REQUESTED_SUCCESS' },
      { type: 'GET_USERS_REQUESTERS_SUCCESS', usersRequesters: [] },
      { friendsRequested: [], type: 'GET_FRIENDS_REQUESTED_SUCCESS' },
      { type: 'GET_USERS_REQUESTERS_SUCCESS', usersRequesters: [] },
    ]);
  });
  it('should dispatch successfully getAllFriends', async () => {
    await store.dispatch({
      type: GET_ALL_FRIENDS,
      query: {},
    });
    expect(store.getActions()).toEqual([
      { query: {}, type: 'GET_ALL_FRIENDS' },
      { query: { query: { requesterId: undefined } }, type: 'GET_FRIENDS_REQUESTED' },
      { query: { query: { requestedId: undefined } }, type: 'GET_USERS_REQUESTERS' },
      { query: { query: { requesterId: undefined } }, type: 'GET_FRIENDS_REQUESTED' },
      { query: { query: { requestedId: undefined } }, type: 'GET_USERS_REQUESTERS' },
      { friends: undefined, friendshipId: undefined, type: 'GET_ALL_FRIENDS_SUCCESS_ACTION', userId: undefined },
      { query: { query: { requesterId: undefined } }, type: 'GET_FRIENDS_REQUESTED' },
      { query: { query: { requestedId: undefined } }, type: 'GET_USERS_REQUESTERS' },
    ]);
  });
  it('should dispatch successfully getFriendsRequestedAction', async () => {
    await store.dispatch({
      type: GET_FRIENDS_REQUESTED,
      query: {
        query: {
          requesterId: '123',
        },
      },
    });
    expect(store.getActions()).toEqual([
      { query: { query: { requesterId: '123' } }, type: 'GET_FRIENDS_REQUESTED' },
      { friendsRequested: [], type: 'GET_FRIENDS_REQUESTED_SUCCESS' },
    ]);
  });
  it('should dispatch successfully getFriendsRequestedSuccessAction', async () => {
    await store.dispatch({
      type: GET_FRIENDS_REQUESTED_SUCCESS,
      friendsRequested: [],
      query: {
        query: {
          requesterId: '123',
        },
      },
    });
    expect(store.getActions()).toEqual([
      { friendsRequested: [], query: { query: { requesterId: '123' } }, type: 'GET_FRIENDS_REQUESTED_SUCCESS' },
    ]);
  });
  it('should dispatch successfully getUsersRequestersAction', async () => {
    await store.dispatch({
      type: GET_USERS_REQUESTERS,
      query: {},
    });
    expect(store.getActions()).toEqual([
      { type: 'GET_USERS_REQUESTERS', query: {} },
      { type: 'GET_USERS_REQUESTERS_SUCCESS', usersRequesters: [] },
    ]);
  });
  it('should dispatch successfully getUsersInformation', async () => {
    await store.dispatch({
      type: GET_USERS_INFORMATION,
      query: {},
    });
    expect(store.getActions()).toEqual([
      { query: {}, type: 'GET_USERS_INFORMATION' },
      { type: 'GET_USERS_INFORMATION_SUCCESS', users: undefined },
    ]);
  });
  it('should dispatch successfully removeFriendRequest', async () => {
    await store.dispatch({
      type: REMOVE_FRIEND_REQUEST_ACTION,
      query: {},
    });
    expect(store.getActions()).toEqual([
      { query: {}, type: 'REMOVE_FRIEND_REQUEST_ACTION' },
      { error: 'error', type: 'SHOW_ERROR' },
    ]);
  });
  it('should dispatch successfully removeFriendRequestSuccessAction', async () => {
    await store.dispatch({
      type: REMOVE_FRIEND_REQUEST_SUCCESS,
      friendsRequested: [],
      userId: '123',
    });
    expect(store.getActions()).toEqual([
      { friendsRequested: [], type: 'REMOVE_FRIEND_REQUEST_SUCCESS', userId: '123' },
      { query: { query: { requestedId: '123' } }, type: 'GET_USERS_REQUESTERS' },
      { type: 'GET_USERS_REQUESTERS_SUCCESS', usersRequesters: [] },
      { type: 'GET_USERS_REQUESTERS_SUCCESS', usersRequesters: [] },
      { type: 'GET_USERS_REQUESTERS_SUCCESS', usersRequesters: [] },
      { type: 'GET_USERS_REQUESTERS_SUCCESS', usersRequesters: [] },
      { type: 'GET_USERS_REQUESTERS_SUCCESS', usersRequesters: [] },
      { type: 'GET_USERS_REQUESTERS_SUCCESS', usersRequesters: [] },
      { type: 'GET_USERS_REQUESTERS_SUCCESS', usersRequesters: [] },
      { type: 'GET_USERS_REQUESTERS_SUCCESS', usersRequesters: [] },
      { type: 'GET_USERS_REQUESTERS_SUCCESS', usersRequesters: [] },
    ]);
  });
  it('should dispatch successfully createFriendshipAction', async () => {
    await store.dispatch({
      type: CREATE_FRIENDSHIP,
      payload: {},
    });
    expect(store.getActions()).toEqual([
      { payload: {}, type: 'CREATE_FRIENDSHIP' },
      { friends: [], type: 'CREATE_FRIENDSHIP_SUCCESS' },
    ]);
  });
  it('should dispatch successfully updateFriendship', async () => {
    await store.dispatch({
      type: UPDATE_FRIENDSHIP,
      payload: {},
      friendData: {},
    });
    expect(store.getActions()).toEqual([
      { payload: {}, friendData: {}, type: 'UPDATE_FRIENDSHIP' },
    ]);
  });
  it('should dispatch successfully updateRequesterFriendshipAction', async () => {
    await store.dispatch({
      type: UPDATE_REQUESTER_FRIENDSHIP,
      payload: {},
    });
    expect(store.getActions()).toEqual([
      { payload: {}, type: 'UPDATE_REQUESTER_FRIENDSHIP' }, { type: 'UPDATE_REQUESTER_FRIENDSHIP_SUCCESS' },
    ]);
  });
  it('should fail updateRequesterFriendshipAction', async () => {
    await store.dispatch({
      type: UPDATE_REQUESTER_FRIENDSHIP,
    });
    expect(store.getActions()).toEqual([
      { type: 'UPDATE_REQUESTER_FRIENDSHIP' }, { error: 'error', type: 'SHOW_ERROR' },
    ]);
  });
  it('should dispatch successfully getAllFriends', async () => {
    await store.dispatch({
      type: GET_REQUESTER_FRIENDS,
      query: {},
    });
    expect(store.getActions()).toEqual([
      { query: {}, type: 'GET_REQUESTER_FRIENDS' },
      { error: TypeError("Cannot read property 'map' of undefined"), type: 'SHOW_ERROR' },
    ]);
  });
  it('should fail getAllFriends', async () => {
    await store.dispatch({
      type: GET_REQUESTER_FRIENDS,
    });
    expect(store.getActions()).toEqual([
      { type: 'GET_REQUESTER_FRIENDS' },
      { error: TypeError("Cannot read property 'map' of undefined"), type: 'SHOW_ERROR' },
    ]);
  });
  it('should dispatch successfully sendInvitations', async () => {
    await store.dispatch({
      type: SEND_INVITATIONS,
      payload: {},
    });
    expect(store.getActions()).toEqual([
      { payload: {}, type: 'SEND_INVITATIONS' },
      { type: 'SENT_INVITATION_SUCCESS' },
    ]);
  });
  it('should fail sendInvitations', async () => {
    await store.dispatch({
      type: SEND_INVITATIONS,
    });
    expect(store.getActions()).toEqual([
      { type: 'SEND_INVITATIONS' }, { error: { code: 409, message: '' }, type: 'SHOW_ERROR' },
    ]);
  });
});
