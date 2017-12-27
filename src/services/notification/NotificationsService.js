import * as feathers from '../../feathers';

class NotificationsService {

  find(params) {
    return feathers.default.service('/notifications').find(params);
  }
  create(notification) {
    return feathers.default.service('/notifications').create(notification);
  }
  remove(id, params) {
    return feathers.default.service('/notifications').remove(id, params);
  }
  update(params) {
    return feathers.default.service('/notifications').patch(null, { seen: true }, params);
  }
}

module.exports = NotificationsService;
