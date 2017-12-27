import { TouchableHighlight } from 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { Actions } from 'react-native-router-flux';
import { default as FooterRedux, FooterPage } from '../../../src/containers/Footer'; // eslint-disable-line
import reducers from '../../../src/reducers/index';

const store = createStore(
  reducers,
);

jest.mock('react-native-router-flux', (() => ({
  Actions: {
    WishList: jest.fn(),
    Friends: jest.fn(),
    Settings: jest.fn(),
    Notifications: jest.fn(),
  },
  ActionConst: {
    PUSH: 'push',
  },
  DefaultRenderer: '<View></View>',
})));

describe('Footer', () => {
  const props = {
    store,
    navbarStore: {
      title: '',
      route: 'WishList',
    },
    onNavigate: {},
    navigationState: {
      children: [{}],
    },
    footerStore: {
      footerIsShown: true,
    },
  };

  const wrapperRedux = shallow(<FooterRedux {...props} />);
  let wrapper = shallow(<FooterPage {...props} />);
  const instance = wrapper.instance();

  it('should connect to redux', () => {
    expect(wrapperRedux.length).toBe(1);
  });
  it('should go to the WishList screen', () => {
    instance.goToWishList();
    expect(Actions.WishList.mock.calls.length).toBe(1);
  });
  it('should go to the Friends screen', () => {
    instance.goToFriends();
    expect(Actions.Friends.mock.calls.length).toBe(1);
  });
  it('should go to the Setting screen', () => {
    instance.goToSettings();
    expect(Actions.Settings.mock.calls.length).toBe(1);
  });
  it('should go to the Notifications screen', () => {
    instance.goToNotifications();
    expect(Actions.Notifications.mock.calls.length).toBe(1);
  });

  it('should color the friends icon', () => {
    props.navbarStore.route = 'Friends';
    wrapper = shallow(<FooterPage {...props} />);
  });

  it('should not render when footerIsShown is false', () => {
    props.footerStore.footerIsShown = false;
    wrapper = shallow(<FooterPage {...props} />);

    expect(wrapper.find(TouchableHighlight).length).toBe(0);
  });
});
