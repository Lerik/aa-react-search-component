const io = require('socket.io-client');
require('../../../src/feathers/socketio')(io);
const AuthenticationService = require('../../../src/services/authentication/authenticationService');
const FakeAuthenticationService = require('../../../src/services/authentication/fakeAuthenticationService');
const storage = require('../../../src/services/helpers/storageHelper');

describe('For both AuthenticationService and FakeAuthenticationService', () => {
  const authenticationService = new AuthenticationService();
  const fakeAuthenticationService = new FakeAuthenticationService();

  const services = {
    authenticationService,
    fakeAuthenticationService,
  };

  Object.keys(services).forEach((serviceName) => {
    const service = services[serviceName];

    describe(serviceName, () => {
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ODdkMzVhMGNjMDIyYTFmNWJiMTg0Y2MiLCJpYXQiOjE0ODQ5NTA5MzEsImV4cCI6MTQ4NTAzNzMzMSwiaXNzIjoiZmVhdGhlcnMifQ.oNVPKPka2nVTMTVg995b1QzU8JfOPMA-iW9WWbOSiEI';

      const validUserNoToken = {
        type: 'local',
        phoneNumber: `+${Math.floor((Math.random() * 9999999999) + 1000000000)}`,
      };

      const validUserNoPhoneNumber = {
        type: 'local',
        user: {
          token,
        },
      };

      const invalidUserNoPhoneNumber = {
        type: 'local',
        user: {
          token: '',
        },
      };

      const invalidUserNoToken = {
        type: 'local',
        phoneNumber: '',
      };

      const updateUserName = {
        user: {
          id: '58a34eefd0edd44890beee4a',
          data: {
            name: 'Test Test',
          },
        },
        goToAction: 'WishList',
      };

      const numbers = ['11111111111'];
      const emails = ['test@test.com'];
      const queryArray = [...numbers, ...emails];

      const queryParams = {
        query: {
          $or: queryArray,
        },
      };

      it(`should fail authenticating an user when no phone number is provided for ${serviceName}`, (done) => {
        service.authenticate(invalidUserNoPhoneNumber)
        .then(done)
        .catch((err) => {
          expect(err.name).toEqual('NotAuthenticated');
          expect(err.message).toEqual('Invalid login.');
          done();
        });
      });
      it(`should fail authenticating an user when no token is provided for ${serviceName}`, (done) => {
        service.authenticate(invalidUserNoToken)
        .then(done)
        .catch((err) => {
          expect(err.name).toEqual('NotAuthenticated');
          expect(err.message).toEqual('Invalid login.');
          done();
        });
      });
      it(`should authenticate a valid user for ${serviceName}`, (done) => {
        service.authenticate(validUserNoToken).then((result) => {
          expect(result.token).not.toBeNull();
          expect(result.data.phoneNumber).toEqual(validUserNoToken.phoneNumber);
          done();
        }).catch(done);
      });
      it(`should authenticate a valid user with valid token for ${serviceName}`, (done) => {
        service.authenticate(validUserNoPhoneNumber).then((result) => {
          expect(result.token).not.toBeNull();
          expect(result.data.phoneNumber).toEqual(validUserNoToken.phoneNumber);
          done();
        }).catch(done);
      });
      it(`should get a valid token for ${serviceName}`, (done) => {
        storage.getJWTToken().then((result) => {
          expect(result.token).not.toBeNull();
          done();
        }).catch(done);
      });
      it(`should fail creating an user for ${serviceName}`, (done) => {
        service.createUser(validUserNoToken).then(done)
        .catch((err) => {
          expect(err.toString()).toContain('E11000 duplicate key error index');
          done();
        });
      });
      it(`should update the user name for ${serviceName}`, async (done) => {
        await service.authenticate(validUserNoToken).then((user) => {
          updateUserName.id = user.data._id; // eslint-disable-line
        }).catch(done);

        await service.updateUserName(updateUserName.user).then((result) => {
          expect(result.name).toEqual(updateUserName.name);
          done();
        }).catch(done);
      });

      it(`should get user information for ${serviceName}`, async (done) => {
        await service.find(queryParams).then((result) => {
          expect(result.length).not.toBe(0);
          done();
        })
        .catch(done);
      });

      it(`should send Verification Code for ${serviceName}`, (done) => {
        service.sendVerificationCode(validUserNoToken).then((result) => {
          expect(result).toBe('ok');
          done();
        })
        .catch(done);
      });

      it(`should verify Sms Code for ${serviceName}`, (done) => {
        service.verifySmsCode(validUserNoToken).then((result) => {
          expect(result).toBe('ok');
          done();
        })
        .catch(done);
      });
    });
  });
});

