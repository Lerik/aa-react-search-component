const io = require('socket.io-client');
require('../../../src/feathers/socketio')(io);
const WishListService = require('../../../src/services/wishList/WishListService');
const FakeWishListService = require('../../../src/services/wishList/fakeWishListService');

describe('For both WishListService and FakeWishListService', () => {
  const wishListService = new WishListService();
  const fakeWishListService = new FakeWishListService();

  const services = {
    wishListService,
    fakeWishListService,
  };

  Object.keys(services).forEach((serviceName) => {
    const service = services[serviceName];

    describe(serviceName, () => {
      const newWish = {
        createdBy: '58a4cc0699b5d94c00c1e555',
        name: 'Fake WishList #1',
        items: [],
      };

      const queryParams = {
        query: {
          createdBy: newWish.createdBy,
        },
      };
      let resultWishList;
      it(`should create a new wishlist for ${serviceName}`, (done) => {
        service.create(newWish).then((result) => {
          resultWishList = result;
          expect(result.name).toBe(newWish.name);
          done();
        })
        .catch(done);
      });
      it(`should update a wishlist for ${serviceName}`, (done) => {
        service.update(resultWishList).then((result) => {
          expect(result.name).toBe(resultWishList.name);
          done();
        })
        .catch(done);
      });
      it(`should update a wishlist with items for ${serviceName}`, (done) => {
        resultWishList.items.push({
          name: 'Gift',
        });
        service.update(resultWishList).then((result) => {
          expect(result.name).toBe(resultWishList.name);
          done();
        })
        .catch(done);
      });
      it(`should get single wishlist for ${serviceName}`, async (done) => {
        await service.get(resultWishList._id).then((result) => { //eslint-disable-line
          expect(result.name).not.toBe(resultWishList.name);
          done();
        })
        .catch(done);
      });
      it(`should get wishlists for ${serviceName}`, async (done) => {
        await service.find(queryParams).then((result) => {
          expect(result.length).not.toBe(0);
          done();
        })
        .catch(done);
      });
      it(`should delete wishlists for ${serviceName}`, async (done) => {
        await service.remove(resultWishList._id).then((result) => { //eslint-disable-line
          expect(resultWishList._id).toBe(result._id); //eslint-disable-line
          done();
        })
        .catch(done);
      });
    });
  });
});

