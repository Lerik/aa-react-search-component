import * as feathers from '../../feathers';

class WishListService {
  get(id) {
    return feathers.default.service('/wishlists').get(id);
  }

  find(params) {
    return feathers.default.service('/wishlists').find(params);
  }

  create(wishList) {
    return feathers.default.service('/wishlists').create(wishList);
  }

  update(wishList) {
    return feathers.default.service('/wishlists')
    .patch(wishList._id, wishList); // eslint-disable-line
  }

  remove(id, params) {
    return feathers.default.service('/wishlists').remove(id, params);
  }
}

module.exports = WishListService;
