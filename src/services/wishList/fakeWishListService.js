class WishListService {
  get() {
    return Promise.resolve({
      _id: '000000000000000000000',
      name: 'Fake WishList #1',
      createdBy: '99999999',
      createdAt: '2017-01-21T17:40:08.083Z',
      updatedAt: '2017-02-21T17:40:08.083Z',
      items: [],
    });
  }
  find() {
    return Promise.resolve({
      total: 1,
      limit: 5,
      skip: 0,
      data: [{
        _id: '000000000000000000000',
        name: 'Fake WishList #1',
        createdBy: '99999999',
        createdAt: '2017-01-21T17:40:08.083Z',
        updatedAt: '2017-02-21T17:40:08.083Z',
        items: [],
      }],
    });
  }
  create(wishList) {
    return Promise.resolve({
      _id: '000000000000000000000',
      name: wishList.name,
      createdBy: '99999999',
      createdAt: '2017-01-21T17:40:08.083Z',
      updatedAt: '2017-02-21T17:40:08.083Z',
      items: [],
    });
  }
  update(wishList) {
    if (wishList.items.length > 0) {
      wishList.items[0]._id = 1; // eslint-disable-line
    }

    return Promise.resolve({
      _id: '000000000000000000000',
      name: wishList.name,
      createdBy: '99999999',
      createdAt: '2017-01-21T17:40:08.083Z',
      updatedAt: '2017-02-21T17:40:08.083Z',
      items: wishList.items,
    });
  }
  remove(id) {
    return Promise.resolve({
      _id: id,
      name: 'Wishlist Name',
      createdBy: '99999999',
      createdAt: '2017-01-21T17:40:08.083Z',
      updatedAt: '2017-02-21T17:40:08.083Z',
      items: [],
    });
  }
}

module.exports = WishListService;
