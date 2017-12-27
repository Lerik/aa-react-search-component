const io = require('socket.io-client');
require('../../../src/feathers/socketio')(io);
const FriendsService = require('../../../src/services/friends/FriendsService');
const FakeFriendsService = require('../../../src/services/friends/fakeFriendsService');

describe('For both FriendsService and FakeFriendsService', () => {
  const friendsService = new FriendsService();
  const fakeFriendsService = new FakeFriendsService();

  const services = {
    friendsService,
    fakeFriendsService,
  };

  Object.keys(services).forEach((serviceName) => {
    const service = services[serviceName];

    describe(serviceName, () => {
      const newFriendship = {
        personId: '58a4cc0699b5d94c00c1e111',
        friends: [],
      };

      const queryParams = {
        query: {
          personId: newFriendship.personId,
        },
      };
      let resultFriendship;
      it(`should create a new friendship for ${serviceName}`, (done) => {
        service.create(newFriendship).then((result) => {
          resultFriendship = result;
          expect(result.personId).toBe(newFriendship.personId);
          done();
        })
        .catch(done);
      });
      it(`should update a friendship for ${serviceName}`, (done) => {
        service.update(resultFriendship).then((result) => {
          expect(result.personId).toBe(resultFriendship.personId);
          done();
        })
        .catch(done);
      });
      it(`should update a friendship with friends for ${serviceName}`, (done) => {
        resultFriendship.friends.push('59b85702f309e74a67df9111');
        service.update(resultFriendship).then((result) => {
          expect(result.personId).toBe(resultFriendship.personId);
          done();
        })
        .catch(done);
      });
      it(`should get single friendship for ${serviceName}`, async (done) => {
        await service.get(resultFriendship._id).then((result) => { //eslint-disable-line
          expect(result.personId).not.toBe(resultFriendship.personId);
          done();
        })
        .catch(done);
      });
      it(`should get friendship for ${serviceName}`, async (done) => {
        await service.find(queryParams).then((result) => {
          expect(result.length).not.toBe(0);
          done();
        })
        .catch(done);
      });
      it(`should delete friendship for ${serviceName}`, async (done) => {
        await service.remove(resultFriendship._id).then((result) => { //eslint-disable-line
          expect(resultFriendship._id).toBe(result._id); //eslint-disable-line
          done();
        })
        .catch(done);
      });
    });
  });
});

