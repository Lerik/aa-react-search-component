import * as storage from '../../../src/services/helpers/storageHelper';

jest.mock('localstorage-memory', () => (
  {
    setItem: jest.fn(() => 'token'),
    getItem: jest.fn(() => 'token'),
  }));

describe('storageHelper', () => {
  const token = 'token';
  const data = {
    token,
  };

  it('should set checkloginstatusAction', (done) => {
    storage.authenticateFromAsyncStorage(data).then((result) => {
      expect(result.token).toEqual(token);
      done();
    }).catch(done);
  });
  it('should set checkloginstatusAction', (done) => {
    storage.getDataFromAsyncStorage('feathers-jwt').then((result) => {
      expect(result.token).toEqual(token);
      done();
    }).catch(done);
  });
  it('should set data to memory', (done) => {
    storage.setDataFromMemory('feathers-jwt', token).then((result) => {
      expect(result).toEqual(token);
      done();
    }).catch(done);
  });
  it('should get data from memory', (done) => {
    storage.getDataFromMemory('feathers-jwt').then((result) => {
      expect(result).toEqual(token);
      done();
    }).catch(done);
  });
  it('should authenticate from memory', (done) => {
    storage.authenticateFromMemory('feathers-jwt').then((result) => {
      expect(result).toEqual(token);
      done();
    }).catch(done);
  });
  it('should JWTToken from memory', (done) => {
    process.env.NODE_ENV = 'test';
    storage.getJWTToken('feathers-jwt').then((result) => {
      expect(result).toEqual(token);
      done();
    }).catch(done);
  });
  it('should JWTToken from async storage', (done) => {
    process.env.NODE_ENV = 'production';
    storage.getJWTToken('feathers-jwt').then((result) => {
      expect(result).toEqual(token);
      done();
    }).catch(done);
  });
});
