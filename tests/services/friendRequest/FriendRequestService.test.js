const io = require('socket.io-client');
require('../../../src/feathers/socketio')(io);
const FriendRequestService = require('../../../src/services/friendRequest/friendRequestService');
const FakeFriendRequestService = require('../../../src/services/friendRequest/fakeFriendRequestService');

describe('For both FriendRequestService and FakeFriendRequestService', () => {
  const friendRequestService = new FriendRequestService();
  const fakeFriendRequestService = new FakeFriendRequestService();

  const services = {
    friendRequestService,
    fakeFriendRequestService,
  };

  Object.keys(services).forEach((serviceName) => {
    const service = services[serviceName];

    describe(serviceName, () => {
      const newFriendRequest = {
        requesterId: '58a4cc0699b5d94c00c1e555',
        requestedId: '58a4cc0699b5d94c00c1e777',
      };

      const queryParams = {
        query: {
          requesterId: newFriendRequest.requesterId,
        },
      };
      let resultFriendRequest;
      it(`should create a new friend for ${serviceName}`, (done) => {
        service.create(newFriendRequest).then((result) => {
          resultFriendRequest = result;
          expect(result.requestedId).toBe(newFriendRequest.requestedId);
          done();
        })
        .catch(done);
      });
      it(`should update a friend for ${serviceName}`, (done) => {
        service.update(resultFriendRequest).then((result) => {
          expect(result.requestedId).toBe(resultFriendRequest.requestedId);
          done();
        })
        .catch(done);
      });
      it(`should update a friend with items for ${serviceName}`, (done) => {
        resultFriendRequest.requestedId = '12345';
        service.update(resultFriendRequest).then((result) => {
          expect(result.requestedId).toBe(resultFriendRequest.requestedId);
          done();
        })
        .catch(done);
      });
      it(`should get single friend for ${serviceName}`, async (done) => {
        await service.get(resultFriendRequest._id).then((result) => { //eslint-disable-line
          expect(result.requestedId).not.toBe(resultFriendRequest.requestedId);
          done();
        })
        .catch(done);
      });
      it(`should get friendRequest for ${serviceName}`, async (done) => {
        await service.find(queryParams).then((result) => {
          expect(result.length).not.toBe(0);
          done();
        })
        .catch(done);
      });
      it(`should delete friendRequest for ${serviceName}`, async (done) => {
        await service.remove(resultFriendRequest._id).then((result) => { //eslint-disable-line
          expect(resultFriendRequest._id).toBe(result._id); //eslint-disable-line
          done();
        })
        .catch(done);
      });
      it(`should send invitations for ${serviceName}`, async (done) => {
        await service.sendInvitations({}).then((result) => { //eslint-disable-line
          expect(resultFriendRequest.requesterId).toBe(result.requesterId); //eslint-disable-line
          done();
        })
        .catch(done);
      });
    });
  });
});

