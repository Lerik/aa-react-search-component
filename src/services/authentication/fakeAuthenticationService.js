import * as storage from '../../services/helpers/storageHelper';

const originalData = {
  data: {
    _id: '587d35a0cc022a1f5bb184cc',
    __v: 0,
    updatedAt: '2017-01-16T21:05:36.616Z',
    createdAt: '2017-01-16T21:05:36.616Z',
  },
};

class FakeAuthenticationService {
  authenticate(userToAuthenticate) {
    const rejectAuth = () => Promise.reject({ name: 'NotAuthenticated', message: 'Invalid login.', code: 401 });
    if (userToAuthenticate.user) {
      if (!userToAuthenticate.user.token) {
        return rejectAuth();
      }
    } else if (!userToAuthenticate.phoneNumber) {
      return rejectAuth();
    }

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ODdkMzVhMGNjMDIyYTFmNWJiMTg0Y2MiLCJpYXQiOjE0ODQ5NTA5MzEsImV4cCI6MTQ4NTAzNzMzMSwiaXNzIjoiZmVhdGhlcnMifQ.oNVPKPka2nVTMTVg995b1QzU8JfOPMA-iW9WWbOSiEI';

    originalData.token = token;
    originalData.data.phoneNumber = userToAuthenticate.phoneNumber;

    if (process.env.NODE_ENV === 'test') {
      return storage.authenticateFromMemory(originalData);
    }
    return storage.authenticateFromAsyncStorage(originalData);
  }

  createUser(user) {
    return new Promise((resolve) => {
      resolve({
        data: {
          phoneNumber: user.phoneNumber,
        },
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ODdkMzVhMGNjMDIyYTFmNWJiMTg0Y2MiLCJpYXQiOjE0ODQ5NTA5MzEsImV4cCI6MTQ4NTAzNzMzMSwiaXNzIjoiZmVhdGhlcnMifQ.oNVPKPka2nVTMTVg995b1QzU8JfOPMA-iW9WWbOSiEI',
      });
    });
  }

  find() {
    return Promise.resolve({
      total: 1,
      limit: 5,
      skip: 0,
      data: [{
        _id: '587d35a0cc022a1f5bb184cc',
        __v: 0,
        updatedAt: '2017-01-16T21:05:36.616Z',
        createdAt: '2017-01-16T21:05:36.616Z',
      }],
    });
  }

  updateUserName(user) {
    return new Promise((resolve) => {
      resolve({
        __v: 0,
        _id: '58a34eefd0edd44890beee4a',
        createdAt: '2017-02-14T18:39:43.127Z',
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        phoneNumber: user.phoneNumber,
        email: user.data.email,
        updatedAt: '2017-02-14T18:39:43.127Z',
      });
    });
  }

  sendVerificationCode() {
    return new Promise((resolve) => {
      resolve('ok');
    });
  }

  verifySmsCode() {
    return new Promise((resolve) => {
      resolve('ok');
    });
  }
}

module.exports = FakeAuthenticationService;
