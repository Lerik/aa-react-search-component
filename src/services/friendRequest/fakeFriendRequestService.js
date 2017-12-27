class FakeFriendRequestService {
  get() {
    return Promise.resolve({
      _id: '000000000000000000000',
      requesterId: '000000000000000000001',
      requestedId: '000000000000000000002',
    });
  }
  find() {
    return Promise.resolve({
      total: 1,
      limit: 5,
      skip: 0,
      data: [{
        _id: '000000000000000000000',
        requesterId: '000000000000000000001',
        requestedId: '000000000000000000002',
      }],
    });
  }
  create(friends) {
    return Promise.resolve({
      _id: '000000000000000000001',
      requesterId: friends.requesterId,
      requestedId: friends.requestedId,
    });
  }
  update(friends) {
    if (friends.requestedId.length > 0) {
          friends.requestedId = 1; // eslint-disable-line
    }

    return Promise.resolve({
      _id: '000000000000000000001',
      requesterId: friends.requesterId,
      requestedId: friends.requestedId,
    });
  }
  remove(id) {
    return Promise.resolve({
      _id: id,
      requesterId: '000000000000000000001',
      requestedId: '000000000000000000002',
    });
  }
  sendInvitations() {
    return Promise.resolve({
      _id: '000000000000000000001',
      requesterId: '000000000000000000001',
      requestedId: '000000000000000000002',
    });
  }
    }

module.exports = FakeFriendRequestService;
