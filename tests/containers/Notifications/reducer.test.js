import 'react-native';
import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import reducers from '../../../src/reducers/index';
import { default as NotificationRedux, Notifications } from '../../../src/containers/Notifications'; // eslint-disable-line
import * as notificationsActions from '../../../src/containers/Notifications/actions';

const store = createStore(
  reducers,
);

jest.mock('Linking', (() => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn().mockReturnValue(
    new Promise((resolve) => {
      resolve(true);
    })
    ),
  getInitialURL: jest.fn(),
})));

describe('WishListPage Reducer', () => {
  const wrapperRedux = shallow(<NotificationRedux store={store} />);
  const dispatch = wrapperRedux.node.props.store.dispatch;

  const props = {
    loginStore: wrapperRedux.node.props.loginStore,
    wishListStore: wrapperRedux.node.props.wishListStore,
    notificationsStore: wrapperRedux.node.props.notificationsStore,
    actions: notificationsActions,
  };

  const wrapper = shallow(<Notifications {...props} />);
  const instance = wrapper.instance();

  const notificationsPayload = {
    personId: '321',
    notificationType: 'friendRequest',
    messageItem: 'David Guetta',
  };

  const createNotificationPayload = {
    personId: '321',
    notificationType: 'friendRequest',
    messageItem: 'David Guetta',
  };

  it('should return a valid getNotifications object and state', () => {
    const expectedAction = {
      type: 'GET_NOTIFICATIONS',
      userId: '123',
    };

    const action = instance.props.actions.getNotifications;
    dispatch(action(true));
    const isLoading =
    store.getState().NotificationsReducer.toJS().isLoading;
    expect(isLoading).toEqual(true);

    expect(instance.props.actions.getNotifications('123'))
    .toEqual(expectedAction);
  });

  it('should return a valid getNotificationsSuccess object and state', () => {
    const expectedAction = {
      notifications: {
        messageItem: 'David Guetta',
        notificationType: 'friendRequest',
        personId: '321' },
      type: 'GET_NOTIFICATIONS_SUCCESS' };

    const action = instance.props.actions.getNotificationsSuccess;
    dispatch(action(false));
    const isLoading =
    store.getState().NotificationsReducer.toJS().isLoading;
    expect(isLoading).toEqual(false);

    dispatch(action(notificationsPayload));
    const notificationsState =
    store.getState().NotificationsReducer.toJS().notifications;
    expect(notificationsState).toEqual(notificationsPayload);

    expect(instance.props.actions.getNotificationsSuccess(notificationsPayload))
    .toEqual(expectedAction);
  });

  it('should return a valid createNotification object and state', () => {
    const expectedAction = {
      type: 'CREATE_NOTIFICATION',
      payload: {
        personId: '321',
        notificationType: 'friendRequest',
        messageItem: 'David Guetta',
      },
    };

    const action = instance.props.actions.createNotification;
    dispatch(action(true));
    const isLoading =
    store.getState().NotificationsReducer.toJS().isLoading;
    expect(isLoading).toEqual(true);

    expect(instance.props.actions.createNotification(createNotificationPayload))
    .toEqual(expectedAction);
  });

  it('should return a valid createNotificationSuccess object and state', () => {
    const expectedAction = {
      type: 'CREATE_NOTIFICATION_SUCCESS',
    };

    const action = instance.props.actions.createNotificationSuccess;
    dispatch(action(false));
    const isLoading =
    store.getState().NotificationsReducer.toJS().isLoading;
    expect(isLoading).toEqual(false);

    expect(instance.props.actions.createNotificationSuccess())
    .toEqual(expectedAction);
  });
});

