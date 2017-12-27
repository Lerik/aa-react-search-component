/* eslint no-case-declarations: 0 */
import { fromJS } from 'immutable';
import {
  CREATE_NOTIFICATION,
  CREATE_NOTIFICATION_SUCCESS,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  SET_NOTIFICATIONS_SEEN_SUCCESS,
 } from './constants';

const initialState = fromJS({
  notifications: [],
  error: '',
  isLoading: false,
});

export default function NotificationsReducer(state = initialState, action) { // NOSONAR
  switch (action.type) {
    case GET_NOTIFICATIONS:
    case CREATE_NOTIFICATION:
      return state
      .set('isLoading', true);
    case GET_NOTIFICATIONS_SUCCESS:
      return state
      .set('notifications', action.notifications)
      .set('isLoading', false);
    case CREATE_NOTIFICATION_SUCCESS:
      return state
      .set('isLoading', false);
    case SET_NOTIFICATIONS_SEEN_SUCCESS:
      const notificationsAsSeen = state.get('notifications').map((notification) => ({
        ...notification,
        seen: true,
      }));
      return state
      .set('notifications', notificationsAsSeen);
    default:
      return state;
  }
}
