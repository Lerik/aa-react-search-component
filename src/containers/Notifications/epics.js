import Rx from 'rxjs';
import {
  createNotificationSuccess,
  getNotificationsSuccess,
  showErrorMessage,
  setNotificationsAsSeenSuccess,
} from './actions';
import {
  NotificationsService,
} from '../../services/';
import {
  CREATE_NOTIFICATION,
  GET_NOTIFICATIONS,
  SET_NOTIFICATIONS_SEEN,
} from './constants';

export function getNotificationsAction(action$) {
  return action$.ofType(GET_NOTIFICATIONS)
  .map((action) => action)
  .mergeMap((action) =>
    Rx.Observable.fromPromise(NotificationsService.find({
      query: {
        personId: action.userId, // eslint-disable-line
        $sort: { createdAt: -1 },
      },
    }))
    .map((response) => getNotificationsSuccess(response.data))
      .catch((err) => [showErrorMessage(err)]));
}

export function createNotificationAction(action$) {
  return action$.ofType(CREATE_NOTIFICATION)
  .map((action) => action)
  .mergeMap((action) =>
    Rx.Observable.fromPromise(NotificationsService.create(action.payload))
    .map(() => createNotificationSuccess())
      .catch((err) => [showErrorMessage(err)]));
}

export function setNotificationsAsSeenAction(action$) {
  return action$.ofType(SET_NOTIFICATIONS_SEEN)
  .map((action) => action)
  .mergeMap((action) =>
    Rx.Observable.fromPromise(NotificationsService.update({
      query: {
        personId: action.userId,
      },
    }))
    .map(() => setNotificationsAsSeenSuccess())
      .catch((err) => [showErrorMessage(err)]));
}

export default [
  getNotificationsAction, createNotificationAction, setNotificationsAsSeenAction,
];
