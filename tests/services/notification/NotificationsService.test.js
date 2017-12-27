const io = require('socket.io-client');
require('../../../src/feathers/socketio')(io);
const NotificationsService = require('../../../src/services/notification/NotificationsService');
const FakeNotificationsService = require('../../../src/services/notification/fakeNotificationsService');

describe('For both NotificationsService and FakeNotificationsService', () => {
  const notificationsService = new NotificationsService();
  const fakeNotificationsService = new FakeNotificationsService();

  const services = {
    notificationsService,
    fakeNotificationsService,
  };

  Object.keys(services).forEach((serviceName) => {
    const service = services[serviceName];

    describe(serviceName, () => {
      const newNotification = {
        personId: '58a4cc0699b5d94c00c1e111',
        notificationType: 'friendRequest',
        messageItem: 'David Guetta',
      };

      const queryParams = {
        query: {
          personId: newNotification.personId,
        },
      };
      let resultNotification;
      it(`should create a new Notificationship for ${serviceName}`, (done) => {
        service.create(newNotification).then((result) => {
          resultNotification = result;
          expect(result.personId).toBe(newNotification.personId);
          done();
        })
        .catch(done);
      });
      it(`should get Notification for ${serviceName}`, async (done) => {
        await service.find(queryParams).then((result) => {
          expect(result.length).not.toBe(0);
          done();
        })
        .catch(done);
      });
      it(`should delete Notification for ${serviceName}`, async (done) => {
        await service.remove(resultNotification._id).then((result) => { //eslint-disable-line
          expect(resultNotification._id).toBe(result._id); //eslint-disable-line
          done();
        })
        .catch(done);
      });
      it(`should patch Notification for ${serviceName}`, async (done) => {
        await service.update({}).then((result) => { //eslint-disable-line
          expect(resultNotification.personId).toBe(result.personId); //eslint-disable-line
          done();
        })
        .catch(done);
      });
    });
  });
});

