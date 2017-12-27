import * as feathers from '../../feathers';

class FriendRequestService {
  get(id) {
    return feathers.default.service('/friendrequests').get(id);
  }

  find(params) {
    return feathers.default.service('/friendrequests').find(params);
  }

  create(request) {
    return feathers.default.service('/friendrequests').create(request);
  }

  update(request) {
    return feathers.default.service('/friendrequests')
    .patch(request._id, request); // eslint-disable-line
  }

  remove(id, params) {
    return feathers.default.service('/friendrequests').remove(id, params);
  }

  sendInvitations(request) {
    return feathers.default.service('/invitation').create(request);
  }
}

module.exports = FriendRequestService;
