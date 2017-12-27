import AuthenticationService from './authentication/authenticationService';
import FakeAuthenticationService from './authentication/fakeAuthenticationService';
import WishListService from './wishList/WishListService';
import FakeWishListService from './wishList/fakeWishListService';
import UploadService from './upload/UploadService';
import FakeUploadService from './upload/fakeUploadService';
import FriendsService from './friends/FriendsService';
import FakeFriendsService from './friends/fakeFriendsService';
import FriendRequestService from './friendRequest/friendRequestService';
import FakeFriendRequestService from './friendRequest/fakeFriendRequestService';
import NotificationsService from './notification/NotificationsService';
import FakeNotificationsService from './notification/fakeNotificationsService';
import config from '../../config.json';

const path = config.testMode === 'true' ? 'fakePath' : 'path';

const services = {
  authenticationService: {
    path: AuthenticationService,
    fakePath: FakeAuthenticationService,
  },
  WishListService: {
    path: WishListService,
    fakePath: FakeWishListService,
  },
  UploadService: {
    path: UploadService,
    fakePath: FakeUploadService,
  },
  FriendsService: {
    path: FriendsService,
    fakePath: FakeFriendsService,
  },
  FriendRequestService: {
    path: FriendRequestService,
    fakePath: FakeFriendRequestService,
  },
  NotificationsService: {
    path: NotificationsService,
    fakePath: FakeNotificationsService,
  },
};

const exportServices = {};

Object.keys(services).forEach((serviceName) => {
  exportServices[serviceName] = new services[serviceName][path](); // eslint-disable-line
});
module.exports = exportServices;
