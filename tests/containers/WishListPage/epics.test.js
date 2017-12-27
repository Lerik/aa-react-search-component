import { createEpicMiddleware } from 'redux-observable';
import configureMockStore from 'redux-mock-store';
import {
  GET_SINGLE_WISHLIST_ACTION,
  GET_SINGLE_WISHLIST_SUCCESS_ACTION,
  GET_SINGLE_WISHLIST_FAILURE_ACTION,
  GET_WISHLISTS_ACTION,
  GET_WISHLISTS_SUCCESS_ACTION,
  GET_WISHLISTS_FAILURE_ACTION,
  GET_FRIEND_WISHLISTS_ACTION,
  GET_FRIEND_WISHLISTS_SUCCESS_ACTION,
  GET_FRIEND_WISHLISTS_FAILURE_ACTION,
  CREATE_WISHLIST_ACTION,
  UPDATE_WISHLIST_ACTION,
  REMOVE_WISHLIST_ACTION,
  CREATED_WISHLIST_ACTION,
  CREATE_WISH_ACTION,
  CREATED_WISH_ACTION,
  UPLOAD_WISH_IMAGE_ACTION,
  UPLOADED_WISH_IMAGE_ACTION,
  REMOVE_WISH_ACTION,
  SELECT_WISHLIST_ITEM_ACTION,
} from '../../../src/containers/WishListPage/constants';
import { rootEpic } from '../../../src/epics/rootEpic';

const epicMiddleware = createEpicMiddleware(rootEpic);
const mockStore = configureMockStore([epicMiddleware]);

require('react-native-router-flux');

jest.mock('../../../src/services/index.js', () => (
  { authenticationService: {
    authenticate: jest.fn((user) =>
      new Promise((resolve, reject) => {
        if (user) {
          resolve({});
        } else {
          reject({ code: 401, message: '' });
        }
      })),
  },
    WishListService: {
      get: jest.fn((id) =>
        new Promise((resolve, reject) => {
          if (id) {
            resolve({ _id: id });
          } else {
            reject('error');
          }
        })),
      find: jest.fn((query) =>
        new Promise((resolve, reject) => {
          if (query) {
            resolve([]);
          } else {
            reject('error');
          }
        })),
      create: jest.fn((wishList) =>
        new Promise((resolve, reject) => {
          if (wishList) {
            resolve([]);
          } else {
            reject('error');
          }
        })),
      update: jest.fn((wishList) =>
        new Promise((resolve, reject) => {
          if (wishList) {
            resolve([]);
          } else {
            reject('error');
          }
        })),
      remove: jest.fn((id) =>
        new Promise((resolve, reject) => {
          if (id) {
            resolve([]);
          } else {
            reject('error');
          }
        })),
    },
    UploadService: {
      create: jest.fn((image) =>
        new Promise((resolve, reject) => {
          const res = {
            id: '000',
            ...image,
            sixze: 3,
          };
          if (image) {
            resolve(res);
          } else {
            reject('error');
          }
        })),
    } }));

jest.mock('react-native-router-flux', (() => ({
  Actions: {
    WishList: jest.fn(),
    AddNewGiftForm: jest.fn(),
  },
})));

jest.mock('Linking', (() => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn().mockReturnValue(
    new Promise((resolve) => {
      resolve(true);
    })
    ),
  getInitialURL: jest.fn(),
})));

jest.mock('react-native', () => ({
  AsyncStorage: {
    setItem: jest.fn(() =>
      new Promise((resolve) => resolve({}))),
    getItem: jest.fn(() =>
      new Promise((resolve) => resolve('{}'))),
    multiGet: jest.fn(() =>
      new Promise((resolve) => resolve({}))),
  },
  Keyboard: {
    dismiss: jest.fn(),
  },
}));

describe('LoginPage epics', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    epicMiddleware.replaceEpic(rootEpic);
  });

  it('should dispatch successfully getSingleWishListAction', async () => {
    await store.dispatch({
      type: GET_SINGLE_WISHLIST_ACTION,
      id: '000',
      userId: '',
      goToAction: 'WishList',
    });

    expect(store.getActions()).toEqual([
      { goToAction: 'WishList', id: '000', type: 'GET_SINGLE_WISHLIST_ACTION', userId: '' },
      { goToAction: 'WishList', query: { $sort: { updatedAt: -1 }, createdBy: '' }, type: 'GET_SINGLE_WISHLIST_SUCCESS_ACTION', wishList: { _id: '000' } }]);
  });
  it('should dispatch successfully getSingleWishListSuccess', async () => {
    await store.dispatch({
      type: GET_SINGLE_WISHLIST_SUCCESS_ACTION,
      wishList: {},
      query: {},
      goToAction: 'WishList',
    });

    expect(store.getActions()).toEqual([{
      goToAction: 'WishList', type: 'GET_SINGLE_WISHLIST_SUCCESS_ACTION', query: {}, wishList: {} },
      { type: 'GET_WISHLISTS_SUCCESS_ACTION', wishLists: undefined },
    ]);
  });
  it('should fail dispatching getSingleWishListSuccess', async () => {
    await store.dispatch({
      type: GET_SINGLE_WISHLIST_SUCCESS_ACTION,
    });

    expect(store.getActions()).toEqual([
      { type: 'GET_SINGLE_WISHLIST_SUCCESS_ACTION' },
      { message: { message: 'error', title: 'Error' }, type: 'GET_WISHLISTS_FAILURE_ACTION' },
    ]);
  });

  it('should fail dispatching getWishListsAction', async () => {
    await store.dispatch({
      type: GET_SINGLE_WISHLIST_ACTION,
      goToAction: 'WishList',
    });

    expect(store.getActions()).toEqual([{
      type: GET_SINGLE_WISHLIST_ACTION,
      goToAction: 'WishList',
    }, {
      type: GET_SINGLE_WISHLIST_FAILURE_ACTION,
      error: { title: 'Error' },
    }]);
  });

  it('should dispatch successfully getWishListsAction', async () => {
    await store.dispatch({
      type: GET_WISHLISTS_ACTION,
      query: {},
      goToAction: 'WishList',
    });

    expect(store.getActions()).toEqual([{
      type: GET_WISHLISTS_ACTION,
      goToAction: 'WishList',
      query: {},
    }, {
      type: GET_WISHLISTS_SUCCESS_ACTION,
      wishList: undefined,
    }]);
  });
  it('should fail dispatching getWishListsAction', async () => {
    await store.dispatch({
      type: GET_WISHLISTS_ACTION,
      goToAction: 'WishList',
    });

    expect(store.getActions()).toEqual([{
      type: GET_WISHLISTS_ACTION,
      goToAction: 'WishList',
    }, {
      type: GET_WISHLISTS_FAILURE_ACTION,
      message: { message: 'error', title: 'Error' },
    }]);
  });
  it('should dispatch successfully getFriendWishListsAction', async () => {
    await store.dispatch({
      type: GET_FRIEND_WISHLISTS_ACTION,
      query: {},
    });

    expect(store.getActions()).toEqual([{
      type: GET_FRIEND_WISHLISTS_ACTION,
      query: {},
    }, {
      type: GET_FRIEND_WISHLISTS_SUCCESS_ACTION,
      wishList: undefined,
    }]);
  });
  it('should fail dispatching getFriendWishListsAction', async () => {
    await store.dispatch({
      type: GET_FRIEND_WISHLISTS_ACTION,
    });

    expect(store.getActions()).toEqual([{
      type: GET_FRIEND_WISHLISTS_ACTION,
    }, {
      type: GET_FRIEND_WISHLISTS_FAILURE_ACTION,
      message: { message: 'error', title: 'Error' },
    }]);
  });
  it('should dispatch successfully createWishList', async () => {
    await store.dispatch({
      type: CREATE_WISHLIST_ACTION,
      wishList: {},
      goToAction: 'WishList',
    });

    expect(store.getActions()).toEqual([{
      type: CREATE_WISHLIST_ACTION,
      wishList: {},
      goToAction: 'WishList',
    }]);
  });
  it('should fail dispatching createWishList', async () => {
    await store.dispatch({
      type: CREATE_WISHLIST_ACTION,
      goToAction: 'WishList',
    });

    expect(store.getActions()).toEqual([{
      type: CREATE_WISHLIST_ACTION,
      goToAction: 'WishList',
    }]);
  });
  it('should dispatch successfully createWishList with no gotToAction option', async () => {
    await store.dispatch({
      type: CREATE_WISHLIST_ACTION,
      wishList: {},
    });

    expect(store.getActions()).toEqual([{
      type: CREATE_WISHLIST_ACTION,
      wishList: {},
    }]);
  });
  it('should dispatch successfully updateWishList', async () => {
    await store.dispatch({
      type: UPDATE_WISHLIST_ACTION,
      wishList: {},
      goToAction: 'WishList',
    });

    expect(store.getActions()).toEqual([{
      type: UPDATE_WISHLIST_ACTION,
      wishList: {},
      goToAction: 'WishList',
    }]);
  });
  it('should fail dispatching updateWishList', async () => {
    await store.dispatch({
      type: UPDATE_WISHLIST_ACTION,
      goToAction: 'WishList',
    });

    expect(store.getActions()).toEqual([{
      type: UPDATE_WISHLIST_ACTION,
      goToAction: 'WishList',
    }]);
  });
  it('should dispatch successfully udateWishList with no gotToAction option', async () => {
    await store.dispatch({
      type: UPDATE_WISHLIST_ACTION,
      wishList: {},
    });

    expect(store.getActions()).toEqual([{
      type: UPDATE_WISHLIST_ACTION,
      wishList: {},
    }]);
  });
  it('should dispatch successfully removeWishList', async () => {
    await store.dispatch({
      type: REMOVE_WISHLIST_ACTION,
      wishListId: '00000000000000000',
      goToAction: 'WishList',
    });

    expect(store.getActions()).toEqual([{
      type: REMOVE_WISHLIST_ACTION,
      wishListId: '00000000000000000',
      goToAction: 'WishList',
    }]);
  });
  it('should fail dispatching removeWishList', async () => {
    await store.dispatch({
      type: REMOVE_WISHLIST_ACTION,
      goToAction: 'WishList',
    });

    expect(store.getActions()).toEqual([{
      type: REMOVE_WISHLIST_ACTION,
      goToAction: 'WishList',
    }]);
  });
  it('should dispatch successfully removeWishList with no gotToAction option', async () => {
    await store.dispatch({
      type: REMOVE_WISHLIST_ACTION,
      wishListId: '00000000000000000',
    });

    expect(store.getActions()).toEqual([{
      type: REMOVE_WISHLIST_ACTION,
      wishListId: '00000000000000000',
    }]);
  });
  it('should fail dispatching removeWish', async () => {
    await store.dispatch({
      type: REMOVE_WISH_ACTION,
      goToAction: 'WishList',
    });

    expect(store.getActions()).toEqual([{
      type: REMOVE_WISH_ACTION,
      goToAction: 'WishList',
    }]);
  });
  it('should dispatch successfully removeWish with no gotToAction option', async () => {
    await store.dispatch({
      type: REMOVE_WISH_ACTION,
      wishList: { items: [] },
    });

    expect(store.getActions()).toEqual([{
      type: REMOVE_WISH_ACTION,
      wishList: { items: [] },
    }]);
  });
  it('should dispatch successfully createWish', async () => {
    await store.dispatch({
      type: CREATE_WISH_ACTION,
      wishList: {},
      goToAction: 'WishList',
    });

    expect(store.getActions()).toEqual([{
      type: CREATE_WISH_ACTION,
      wishList: {},
      goToAction: 'WishList',
    }]);
  });
  it('should fail dispatching createWish', async () => {
    const cb = () => {};
    await store.dispatch({
      type: CREATE_WISH_ACTION,
      callback: cb,
    });

    expect(store.getActions()).toEqual([{
      type: CREATE_WISH_ACTION,
      callback: cb,
    }]);
  });
  it('should dispatch successfully createWish with no gotToAction option', async () => {
    await store.dispatch({
      type: CREATE_WISH_ACTION,
      wishList: {},
    });

    expect(store.getActions()).toEqual([{
      type: CREATE_WISH_ACTION,
      wishList: {},
    }]);
  });
  it('should dispatch successfully createdWishList', async () => {
    const cb = () => {};
    await store.dispatch({
      type: CREATED_WISHLIST_ACTION,
      callback: cb,
    });

    expect(store.getActions()).toEqual([{
      type: CREATED_WISHLIST_ACTION,
      callback: cb,
    }]);
  });
  it('should dispatch successfully createdWish ', async () => {
    const cb = () => {};
    await store.dispatch({
      type: CREATED_WISH_ACTION,
      callback: cb,
    });

    expect(store.getActions()).toEqual([{
      type: CREATED_WISH_ACTION,
      callback: cb,
    }]);
  });
  it('should fail dispatching uploadWishImage ', async () => {
    const cb = () => {};
    await store.dispatch({
      type: UPLOAD_WISH_IMAGE_ACTION,
      callback: cb,
    });

    expect(store.getActions()).toEqual([{
      type: UPLOAD_WISH_IMAGE_ACTION,
      callback: cb,
    }]);
  });
  it('should dispatch successfully uploadWishImage ', async () => {
    const cb = () => {};
    await store.dispatch({
      type: UPLOAD_WISH_IMAGE_ACTION,
      image: { uri: 'data:image/jpeg;base64,00000000' },
      callback: cb,
    });

    expect(store.getActions()).toEqual([{
      type: UPLOAD_WISH_IMAGE_ACTION,
      image: { uri: 'data:image/jpeg;base64,00000000' },
      callback: cb,
    }]);
  });
  it('should dispatch successfully uploadedWishImage ', async () => {
    const cb = () => {};
    await store.dispatch({
      type: UPLOADED_WISH_IMAGE_ACTION,
      imageId: '00000000',
      callback: cb,
    });

    expect(store.getActions()).toEqual([{
      type: UPLOADED_WISH_IMAGE_ACTION,
      imageId: '00000000',
      callback: cb,
    }]);
  });
  it('should dispatch selectWishListItem', async () => {
    await store.dispatch({
      type: SELECT_WISHLIST_ITEM_ACTION,
      goToAction: 'AddNewGiftForm',
    });

    expect(store.getActions()).toEqual([{
      type: SELECT_WISHLIST_ITEM_ACTION,
      goToAction: 'AddNewGiftForm',
    }]);
  });
  it('should dispatch selectWishListItem but fail calling goToAction', async () => {
    await store.dispatch({
      type: SELECT_WISHLIST_ITEM_ACTION,
    });

    expect(store.getActions()).toEqual([{
      type: SELECT_WISHLIST_ITEM_ACTION,
    }]);
  });
});
