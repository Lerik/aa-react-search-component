import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { Actions } from 'react-native-router-flux';
import { default as AddWishListRedux, AddWishlist } from '../../../src/containers/AddWishList';  // eslint-disable-line
import * as loginActions from '../../../src/containers/LoginPage/actions';
import reducers from '../../../src/reducers/index';

const store = createStore(
  reducers,
);

jest.mock('react-native-router-flux', (() => ({
  Actions: {
    WishList: jest.fn(),
  },
})));

describe('AddWishList', () => {
  const wrapperRedux = shallow(<AddWishListRedux store={store} />);

  const props = {
    loginStore: wrapperRedux.node.props.loginStore,
    wishListStore: wrapperRedux.node.props.wishListStore,
    actions: loginActions,
  };

  let wrapper = shallow(<AddWishlist {...props} />);
  let instance = wrapper.instance();

  const wishListName = 'WishList Name';

  it('should connect to redux', () => {
    expect(wrapperRedux.length).toBe(1);
  });
  it('should call onSubmitEditing', () => {
    instance.wishListNameInput = {
      blur: jest.fn(),
    };
    const textInput = wrapper.find('TextInput').first();
    textInput.props().onSubmitEditing();

    expect(instance.wishListNameInput).not.toBe(undefined);
  });
  it('should set wishlist name state', () => {
    instance.onChangeText(wishListName);

    expect(instance.state.wishListName).toBe(wishListName);
  });
  it('should fail creating a gift list when the name is empty', () => {
    instance.onChangeText('');
    instance.createWishlist();

    expect(instance.state.errorMessage).toBe('The gift list name is required');
  });
  it('should fail creating a gift list when the name is less than two characters', () => {
    instance.onChangeText('w');
    instance.createWishlist();

    expect(instance.state.errorMessage).toBe('The gift list name is too short. It should be at least 2 characters or more');
  });
  it('should create a wishlist', () => {
    instance.props.actions.showConfirmModal = jest.fn();
    instance.props.actions.createWishListAction = jest.fn();
    instance.onChangeText(wishListName);
    instance.createWishlist();

    expect(instance.props.actions.createWishListAction.mock.calls.length).toBe(1);
  });
  it('should go to WishList screen', () => {
    instance.returnToWishlist();

    expect(Actions.WishList.mock.calls.length).toBe(1);
  });
  it('should set gift list name textInput ref', () => {
    const textInput = wrapper.find('TextInput').first();
    textInput.node.ref((component) => { instance.wishListNameInput = component; });

    expect(instance.wishListNameInput).not.toBe(undefined);
  });
  it('should set gift list name textInput ref', () => {
    instance.onChangeText(wishListName);
    instance.clearText();

    expect(instance.state.wishListName).toBe('');
  });
  it('should render AddNewWishList component when selectedWishListItem is passed as props', () => {
    props.wishListStore = {
      selectedWishList: {
        _id: 1,
        name: 'Wish List',
        description: '',
        link: '',
        imageUrl: 'uploads/file.jpg',
        items: [{
          _id: 1,
          name: 'gift 1',
        }],
      },
    };
    wrapper = shallow(<AddWishlist {...props} />);

    expect(wrapper).not.toBe(undefined);
  });
  it('should handle updating wishlist', () => {
    instance = wrapper.instance();
    instance.state.wishListId = 1;
    instance.state.wishListName = 'Wish List';
    instance.props.actions.updateWishListAction = jest.genMockFn();
    instance.createWishlist();

    expect(instance.props.actions.updateWishListAction.mock.calls.length).toBe(1);
  });
});
