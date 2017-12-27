import * as rxjs from 'rxjs';
import { combineEpics } from 'redux-observable';
import loginEpics from '../containers/LoginPage/epics';
import wishListEpics from '../containers/WishListPage/epics';
import friendsEpics from '../containers/Friends/epics';
import notificationsEpics from '../containers/Notifications/epics';

export const epic$ =
new rxjs.BehaviorSubject(combineEpics(...loginEpics, ...wishListEpics, ...friendsEpics, ...notificationsEpics));

export const rootEpic = (action$, store) => epic$.mergeMap((epic) => epic(action$, store));
