import 'react-native';
import * as actions from '../../../src/containers/Notifications/actions';
import * as constants from '../../../src/containers/Notifications/constants';

describe('Notifications Actions', () => {
  it('should create an action to get notifications', () => {
    const expectedAction = {
      type: constants.GET_NOTIFICATIONS,
      userId: '123',
    };

    expect(actions.getNotifications('123')).toEqual(expectedAction);
  });

  it('should create an action to get notifications success', () => {
    const payload = {
      _id: '123',
      personId: '321',
      notificationType: 'friendRequest',
      messageItem: 'David Guetta',
    };
    const expectedAction = {
      type: constants.GET_NOTIFICATIONS_SUCCESS,
      notifications: {
        _id: '123',
        personId: '321',
        notificationType: 'friendRequest',
        messageItem: 'David Guetta',
      },
    };

    expect(actions.getNotificationsSuccess(payload)).toEqual(expectedAction);
  });

  it('should create an action to create a notification', () => {
    const payload = {
      personId: '321',
      notificationType: 'friendRequest',
      messageItem: 'David Guetta',
    };
    const expectedAction = {
      type: constants.CREATE_NOTIFICATION,
      payload: {
        personId: '321',
        notificationType: 'friendRequest',
        messageItem: 'David Guetta',
      },
    };

    expect(actions.createNotification(payload)).toEqual(expectedAction);
  });

  it('should create an action to get notifications success', () => {
    const expectedAction = {
      type: constants.CREATE_NOTIFICATION_SUCCESS,
    };

    expect(actions.createNotificationSuccess()).toEqual(expectedAction);
  });

  it('should show error messsage action', () => {
    const error = 'error message';

    const expectedAction = {
      type: constants.SHOW_ERROR,
      error,
    };
    expect(actions.showErrorMessage(error)).toEqual(expectedAction);
  });

  it('should call set notifications as seen action', () => {
    const userId = '123';

    const expectedAction = {
      type: constants.SET_NOTIFICATIONS_SEEN,
      userId,
    };
    expect(actions.setNotificationsAsSeen(userId)).toEqual(expectedAction);
  });

  it('should call set notifications as seen action', () => {
    const expectedAction = {
      type: constants.SET_NOTIFICATIONS_SEEN_SUCCESS,
    };
    expect(actions.setNotificationsAsSeenSuccess()).toEqual(expectedAction);
  });
});

