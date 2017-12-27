/* eslint no-underscore-dangle: 0 */

import {
  CREATE_NOTIFICATION,
  CREATE_NOTIFICATION_SUCCESS,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  SHOW_ERROR,
  SET_NOTIFICATIONS_SEEN,
  SET_NOTIFICATIONS_SEEN_SUCCESS,
 } from './constants';

export function getNotifications(userId) {
  return {
    type: GET_NOTIFICATIONS,
    userId,
  };
}

export function getNotificationsSuccess(notifications) {
  return {
    type: GET_NOTIFICATIONS_SUCCESS,
    notifications,
  };
}

export function createNotification(payload) {
  return {
    type: CREATE_NOTIFICATION,
    payload,
  };
}

export function createNotificationSuccess() {
  return {
    type: CREATE_NOTIFICATION_SUCCESS,
  };
}

export function showErrorMessage(error) {
  return {
    type: SHOW_ERROR,
    error,
  };
}

export function setNotificationsAsSeen(userId) {
  return {
    type: SET_NOTIFICATIONS_SEEN,
    userId,
  };
}

export function setNotificationsAsSeenSuccess() {
  return {
    type: SET_NOTIFICATIONS_SEEN_SUCCESS,
  };
}

