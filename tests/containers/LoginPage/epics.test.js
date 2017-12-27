import { createEpicMiddleware } from 'redux-observable';
import configureMockStore from 'redux-mock-store';
import {
  CHECK_LOGIN_STATUS_ACTION,
  AUTHENTICATE_ACTION,
  AUTHENTICATED_ACTION,
  LOGIN_ACTION,
  LOGOUT_ACTION,
  UPDATE_USERNAME_ACTION,
  UPDATED_USERNAME_ACTION,
  VERIFY_CODE_SENT_BY_SMS,
  SEND_VERIFICATION_CODE,
  VERIFICATION_CODE_HAS_BEEN_SENT,
  CREATE_USER,
} from '../../../src/containers/LoginPage/constants';
import { GET_WISHLISTS_ACTION } from '../../../src/containers/WishListPage/constants';
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
    WishListService: {
      find: jest.fn((query) =>
        new Promise((resolve, reject) => {
          if (query) {
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

describe('LoginPage epics', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    epicMiddleware.replaceEpic(rootEpic);
  });

  it('should dispatch checkloginstatusAction', async () => {
    await store.dispatch({ type: CHECK_LOGIN_STATUS_ACTION });
    expect(store.getActions()).toEqual([
      { type: CHECK_LOGIN_STATUS_ACTION },
    ]);
  });
  it('should dispatch authenticateAction', async () => {
    await store.dispatch({ type: AUTHENTICATE_ACTION });
    expect(store.getActions()).toEqual([
      { type: AUTHENTICATE_ACTION },
      { type: 'app/LoginPage/LOGINMESSAGEERROR_ACTION', message: 'Invalid login.' },
    ]);
  });
  it('should dispatch authenticatedAction', async () => {
    await store.dispatch({ type: AUTHENTICATED_ACTION });
    expect(store.getActions()).toEqual([
      { type: 'app/LoginPage/AUTHENTICATED_ACTION' },
      { goToAction: 'Login', type: 'app/LoginPage/LOGIN_ACTION' },
    ]);
  });
  it('should dispatch authenticatedAction with goToAction option', async () => {
    await store.dispatch({ type: AUTHENTICATED_ACTION, goToAction: 'AddName' });
    expect(store.getActions()).toEqual([
      { type: AUTHENTICATED_ACTION, goToAction: 'AddName' },
    ]);
  });
  it('should dispatch loginAction', async () => {
    await store.dispatch({ type: LOGIN_ACTION });
    expect(store.getActions()).toEqual([
      { type: LOGIN_ACTION },
    ]);
  });
  it('should dispatch logoutAction', async () => {
    await store.dispatch({ type: LOGOUT_ACTION });
    expect(store.getActions()).toEqual([
      { type: LOGOUT_ACTION },
    ]);
  });
  it('should dispatch updateUserNameAction', async () => {
    await store.dispatch({ type: UPDATE_USERNAME_ACTION, user: {} });
    expect(store.getActions()).toEqual([
      { type: UPDATE_USERNAME_ACTION, user: {} },
    ]);
  });
  it('should fail dispatching updateUserNameAction', async () => {
    await store.dispatch({ type: UPDATE_USERNAME_ACTION });
    expect(store.getActions()).toEqual([
      { type: UPDATE_USERNAME_ACTION },
    ]);
  });
  it('should dispatch updatedUserNameAction', () => {
    store.dispatch({ type: UPDATED_USERNAME_ACTION, user: { _id: '1' }, goToAction: '' });
    expect(store.getActions()).toEqual([
      { type: UPDATED_USERNAME_ACTION, user: { _id: '1' }, goToAction: '' },
      { type: GET_WISHLISTS_ACTION,
        query: {
          query: {
            $sort: {
              updatedAt: -1,
            },
            createdBy: '1',
          },
        },
        goToAction: '',
      },
    ]);
  });
  it('should dispatch updatedUserNameAction with goToAction option', () => {
    store.dispatch({ type: UPDATED_USERNAME_ACTION, user: { _id: '1' } });
    expect(store.getActions()).toEqual([
      { type: UPDATED_USERNAME_ACTION, user: { _id: '1' } },
      { type: GET_WISHLISTS_ACTION,
        query: {
          query: {
            $sort: {
              updatedAt: -1,
            },
            createdBy: '1',
          },
        },
      },
    ]);
  });
  it('should dispatch sendVerificationCodeBySMS', async () => {
    await store.dispatch({
      type: SEND_VERIFICATION_CODE,
      userToVerify: { phoneNumber: '12345' },
      goToAction: '',
    });
    expect(store.getActions()).toEqual([
      {
        type: SEND_VERIFICATION_CODE,
        userToVerify: { phoneNumber: '12345' },
        goToAction: '',
      },
      { type: VERIFICATION_CODE_HAS_BEEN_SENT, goToAction: '' },
    ]);
  });
  it('should fail sendVerificationCodeBySMS', async () => {
    await store.dispatch({
      type: SEND_VERIFICATION_CODE,
    });
    expect(store.getActions()).toEqual([
      { type: SEND_VERIFICATION_CODE },
      { message: 'There was an error during processing, please try again.', type: 'app/LoginPage/LOGINMESSAGEERROR_ACTION' },
    ]);
  });
  it('should dispatch verifyCodeSentBySMS', async () => {
    await store.dispatch({
      type: VERIFY_CODE_SENT_BY_SMS,
      userToWhichCodeWasSent: { phoneNumber: '12345' },
      goToAction: '',
    });
    expect(store.getActions()).toEqual([
      {
        type: VERIFY_CODE_SENT_BY_SMS,
        userToWhichCodeWasSent: { phoneNumber: '12345' },
        goToAction: '',
      },
      { type: AUTHENTICATE_ACTION,
        userToAuthenticate: {
          type: 'local',
          phoneNumber: '12345',
          password: '',
        },
        goToAction: '',
      },
    ]);
  });
  it('should fail verifyCodeSentBySMS', async () => {
    await store.dispatch({
      type: VERIFY_CODE_SENT_BY_SMS,
    });
    expect(store.getActions()).toEqual([
      { type: VERIFY_CODE_SENT_BY_SMS },
      { message: 'There was an error during verification, please try again.', type: 'app/LoginPage/LOGINMESSAGEERROR_ACTION' },
    ]);
  });
  it('should dispatch startCreatingUser', async () => {
    await store.dispatch({
      type: CREATE_USER,
      userToCreate: { phoneNumber: '12345' },
      goToAction: '',
    });
    expect(store.getActions()).toEqual([
      { goToAction: '', type: 'app/LoginPage/CREATE_USER', userToCreate: { phoneNumber: '12345' } },
      { goToAction: '', type: 'app/LoginPage/AUTHENTICATE_ACTION', userToAuthenticate: { password: '', phoneNumber: '12345', type: 'local' } },
    ]);
  });
  it('should fail startCreatingUser', async () => {
    await store.dispatch({
      type: CREATE_USER,
    });
    expect(store.getActions()).toEqual([
      { type: 'app/LoginPage/CREATE_USER' },
      { message: 'There was an error during processing, please try again.', type: 'app/LoginPage/LOGINMESSAGEERROR_ACTION' },
    ]);
  });
});
