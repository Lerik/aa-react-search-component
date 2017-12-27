class FakeNotificationsService {
  find() {
    return Promise.resolve({
      total: 1,
      limit: 15,
      skip: 0,
      data: [{
        _id: '000000000000000000000',
        personId: '000000000000000000001',
        notificationType: 'friendRequest',
        messageItems: [],
      }],
    });
  }
  create(notifications) {
    return Promise.resolve({
      _id: '000000000000000000004',
      personId: notifications.personId,
      notificationType: notifications.notificationType,
      messageItems: notifications.messageItems,
    });
  }
  remove(id) {
    return Promise.resolve({
      _id: id,
      personId: '000000000000000000001',
      messageItems: [],
    });
  }
  update() {
    return Promise.resolve([{
      personId: '000000000000000000001',
      messageItems: [],
    }]);
  }
  }

module.exports = FakeNotificationsService;
