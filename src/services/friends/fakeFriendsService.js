class FakeFriendsService {
  get() {
    return Promise.resolve({
      _id: '000000000000000000000',
      personId: '000000000000000000001',
      friends: [
        '000000000000000000002',
        '000000000000000000003',
      ],
    });
  }
  find() {
    return Promise.resolve({
      total: 1,
      limit: 5,
      skip: 0,
      data: [{
        _id: '000000000000000000000',
        personId: '000000000000000000001',
        friends: [
          '000000000000000000002',
          '000000000000000000003',
        ],
      }],
    });
  }
  create(friends) {
    return Promise.resolve({
      _id: '000000000000000000004',
      personId: friends.personId,
      friends: friends.friends,
    });
  }
  update(friends) {
    if (friends.friends.length > 0) {
        friends.friends[0] = 1; // eslint-disable-line
    }

    return Promise.resolve({
      _id: '000000000000000000004',
      personId: friends.personId,
      friends: friends.friends,
    });
  }
  remove(id) {
    return Promise.resolve({
      _id: id,
      personId: '000000000000000000001',
      friends: [
        '000000000000000000002',
        '000000000000000000003',
      ],
    });
  }
  }

module.exports = FakeFriendsService;
