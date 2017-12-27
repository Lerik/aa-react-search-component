import { createEpicMiddleware } from 'redux-observable';
import configureMockStore from 'redux-mock-store';
import {
  GET_NOTIFICATIONS,
  CREATE_NOTIFICATION,
} from '../../../src/containers/Notifications/constants';
import { rootEpic } from '../../../src/epics/rootEpic';

const epicMiddleware = createEpicMiddleware(rootEpic);
const mockStore = configureMockStore([epicMiddleware]);

require('react-native-router-flux');

jest.mock('../../../src/services/index.js', () => (
  { NotificationsService: {
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
  it('should dispatch successfully getNotificationsAction', async () => {
    await store.dispatch({
      type: GET_NOTIFICATIONS,
      userId: '123',
    });
    expect(store.getActions()).toEqual([
      { type: 'GET_NOTIFICATIONS', userId: '123' },
      { type: 'GET_NOTIFICATIONS_SUCCESS', notifications: undefined },
    ]);
  });

  it('should dispatch successfully createNotificationAction', async () => {
    await store.dispatch({
      type: CREATE_NOTIFICATION,
      payload: {
        personId: '321',
        notificationType: 'friendRequest',
        messageItem: 'David Guetta',
      },
    });
    expect(store.getActions()).toEqual([
      { type: 'CREATE_NOTIFICATION',
        payload: {
          personId: '321',
          notificationType: 'friendRequest',
          messageItem: 'David Guetta',
        } },
      { type: 'CREATE_NOTIFICATION_SUCCESS' },
    ]);
  });
});
