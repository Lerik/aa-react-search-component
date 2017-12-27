import * as feathers from '../../feathers';

class AuthenticationService {
  authenticate(userToAuthenticate) {
    return feathers.default.authenticate(userToAuthenticate);
  }

  createUser(user) {
    return feathers.default.service('/users').create(user);
  }

  find(params) {
    return feathers.default.service('/users').find(params);
  }

  sendVerificationCode(user) {
    return feathers.default.service('/verifications').create(user);
  }

  verifySmsCode(user) {
    return feathers.default.service('/verifications').update('', user);
  }

  updateUserName(user) {
    return feathers.default.service('/users')
    .patch(user.id, user.data);
  }
}

module.exports = AuthenticationService;
