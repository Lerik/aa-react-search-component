import * as rxjs from 'rxjs';
import { combineEpics } from 'redux-observable';
import loginEpics from '../containers/LoginPage/epics';

export const epic$ =
new rxjs.BehaviorSubject(combineEpics(...loginEpics));

export const rootEpic = (action$, store) => epic$.mergeMap((epic) => epic(action$, store));
