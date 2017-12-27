import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/index';
import { rootEpic } from './epics/rootEpic';

const epicMiddleware = createEpicMiddleware(rootEpic);

const middlewares = [
  epicMiddleware,
];

const enhancers = [
  applyMiddleware(...middlewares),
];

export const store = createStore(
  reducers,
  compose(...enhancers),
);
