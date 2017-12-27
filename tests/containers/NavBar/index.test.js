import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { Actions } from 'react-native-router-flux';
import { default as NavBarRedux, NavBarPage } from '../../../src/containers/NavBar'; // eslint-disable-line
import reducers from '../../../src/reducers/index';
import * as wishlistActions from '../../../src/containers/WishListPage/actions';

const store = createStore(
  reducers,
);

jest.mock('react-native-router-flux', (() => ({
  Actions: {
    Notifications: jest.fn(),
    AddWishList: jest.fn(),
  },
})));

describe('AddNamePage', () => {
  const wrapperRedux = shallow(<NavBarRedux store={store} />);

  const props = {
    navbarStore: {
      title: '',
      route: '',
    },
    wishListStore: wrapperRedux.node.props.wishListStore,
    actions: {
      ...wishlistActions,
    },
  };

  let wrapper = shallow(<NavBarPage {...props} />);
  let instance = wrapper.instance();

  it('should connect to redux', () => {
    expect(wrapperRedux.length).toBe(1);
  });
  it('should go to the navigation screen', () => {
    instance.goToNotifications();
    expect(Actions.Notifications.mock.calls.length).toBe(1);
  });

  it('should go to the navigation screen', () => {
    Actions.Notifications.mockClear();
    props.navbarStore.title = 'My Notifications';
    props.navbarStore.route = 'Notifications';
    wrapper = shallow(<NavBarPage {...props} />);
    instance = wrapper.instance();
    instance.goToNotifications();
    expect(Actions.Notifications.mock.calls.length).toBe(0);
  });

  it('should go to Add WishList screen', () => {
    instance.goToAddWishList();

    expect(Actions.AddWishList.mock.calls.length).toBe(1);
  });
});
