import { AsyncStorage } from 'react-native';
import localStorageMemory from 'localstorage-memory';

export function getDataFromMemory(key) {
  const storageMemory = new Promise((resolve) => {
    resolve({ token: localStorageMemory.getItem(key) });
  });

  return storageMemory;
}

export function getDataFromAsyncStorage(key) {
  return AsyncStorage.getItem(key).then((result) =>
    Promise.resolve(result)
  );
}

export function getJWTToken() {
  if (process.env.NODE_ENV === 'test') {
    return getDataFromMemory('feathers-jwt');
  }

  return getDataFromAsyncStorage('feathers-jwt');
}

export function setDataFromMemory(key, value) {
  const storageMemory = new Promise((resolve) => {
    resolve({ token: localStorageMemory.setItem(key, value) });
  });

  return storageMemory;
}

export function setDataFromAsyncStorage(key, value) {
  return AsyncStorage.setItem(key, value);
}

export function clearStorage() {
  return AsyncStorage.clear().then(() =>
    Promise.resolve(localStorageMemory.clear())
  );
}

export function authenticateFromMemory(data) {
  return setDataFromMemory('feathers-jwt', data.token);
}

export function authenticateFromAsyncStorage(data) {
  const asyncStorage = new Promise((resolve) => {
    resolve({ data: AsyncStorage.setItem('feathers-jwt', data.token) });
  });

  return asyncStorage;
}
