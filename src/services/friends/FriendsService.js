import * as feathers from '../../feathers';

class FriendsService {
  get(id) {
    return feathers.default.service('/friends').get(id);
  }

  find(params) {
    return feathers.default.service('/friends').find(params);
  }

  create(friend) {
    return feathers.default.service('/friends').create(friend);
  }

  update(friend) {
    return feathers.default.service('/friends')
    .patch(friend._id, friend); // eslint-disable-line
  }

  remove(id, params) {
    return feathers.default.service('/friends').remove(id, params);
  }
}

module.exports = FriendsService;
