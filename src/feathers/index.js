import 'babel-polyfill';
import { AsyncStorage } from 'react-native';
import feathers from 'feathers-client';
import reduxifyServices, { getServicesStatus as getStatus } from 'feathers-reduxify-services';
import localStorageMemory from 'localstorage-memory';
import { configureSocket } from './socketio';

let storage = AsyncStorage;
if (process.env.NODE_ENV === 'test') {
  storage = localStorageMemory;
}

const app = feathers();
let reduxServices; // eslint-disable-line

configureSocket((socket) => {
  app.configure(feathers.socketio(socket, { timeout: 2000 }))
  .configure(feathers.hooks())
  .configure(feathers.authentication({
    storage,
  }));

  reduxServices = reduxifyServices(app, ['auth', 'users', 'wishLists']);
});

export default app;
export const services = reduxifyServices;
export const getServicesStatus = getStatus;
