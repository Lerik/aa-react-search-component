import React from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { Scene, Router, ActionConst, Reducer } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import StatusBarSizeIOS from 'react-native-status-bar-size';
import App from './App';
import Login from './LoginPage';
import AddName from './AddNamePage';
import NavBar from './NavBar';
import Notifications from './Notifications';
import Friends from './Friends';
import Settings from './Settings';
import Footer from './Footer';
import AddWishList from './AddWishList';
import WishListDetail from './WishListDetail';
import FriendWishListDetail from './FriendWishListDetail';
import AddNewGiftForm from './AddNewGiftFormPage';
import VerifySmsCode from './VerifySmsCodePage';
import AddFriends from './AddFriends';
import FriendWishList from './FriendWishList';
import {
  BLUE_GRAY_BACKGROUND,
  Gray,
  WHITE,
 } from '../styles/color-constants';

import * as navbarActions from './NavBar/actions';
import * as footerActions from './Footer/actions';
import WishList from './WishListPage';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...navbarActions,
      ...footerActions,
    }, dispatch),
  };
}

const mapStateToProps = createStructuredSelector({
  navbarStore: (state) => state.NavBarReducer.toJS(),
});

let states = [];
const RouterWithRedux = connect()(Router);
const HEADER_TITLES = {
  Footer: '',
  root: '',
  App: '',
  Login: '',
  AddName: '',
  WishList: 'My Lists',
  Notifications: 'Notifications',
  Friends: 'My Friends',
  Settings: 'Settings',
  AddWishList: '',
  VerifySmsCode: 'Verify SMS Code',
  AddFriends: 'Add Friends',
  FriendWishList: '',
};
const SHOW_FOOTER = {
  Footer: false,
  root: false,
  App: false,
  Login: false,
  AddName: false,
  WishList: true,
  Notifications: true,
  Friends: true,
  Settings: true,
  AddWishList: false,
  VerifySmsCode: false,
  AddFriends: true,
  FriendWishList: true,
};

class Routes extends React.Component {
  constructor() {
    super();
    this.createReducer = this.createReducer.bind(this);
    states = [];
  }
  shouldComponentUpdate() {
    return false;
  }
  createReducer(params) {
    const defaultReducer = Reducer(params);
    return (state, action) => {
      if (action.type === ActionConst.PUSH) {
        states.push(action.key);
      } else if (action.type === ActionConst.RESET) {
        states = [action.key];
      } else if (action.type === ActionConst.REPLACE) {
        states = [action.key];
      } else if (action.type === ActionConst.BACK_ACTION) {
        states.pop();
      }
      this.updateRoute();
      this.updateFooter();
      return defaultReducer(state, action);
    };
  }
  updateRoute() {
    if (states.length) {
      const lastState = states[states.length - 1];
      this.props.actions.updateNavBarTitle(HEADER_TITLES[lastState]);
      this.props.actions.updateCurrentRoute(lastState);
    } else {
      setTimeout(() => {
        this.props.actions.updateNavBarTitle('');
        this.props.actions.updateCurrentRoute('');
      }, 0);
    }
  }
  updateFooter() {
    if (states.length) {
      const lastState = states[states.length - 1];
      if (SHOW_FOOTER[lastState]) {
        this.props.actions.showFooter();
      } else {
        this.props.actions.hideFooter();
      }
    } else {
      this.props.actions.hideFooter();
    }
  }
  render() {
    const styles = {
      flexDirection: 'column-reverse',
    };

    return (
      <RouterWithRedux
        createReducer={this.createReducer}
        sceneStyle={(Platform.OS === 'ios') ? { paddingTop: StatusBarSizeIOS.currentHeight, backgroundColor: Gray } : null}
      >

        <Scene
          key="Footer"
          panHandlers={null}
          component={Footer}
          style={styles}
        >
          <Scene
            key="root"
            panHandlers={null}
            navBar={NavBar}
            initial
            style={styles}
          >
            <Scene
              key="App"
              component={App}
              type={ActionConst.RESET}
              hideNavBar
            />
            <Scene
              key="Login"
              component={Login}
              type={ActionConst.RESET}
              hideNavBar
            />
            <Scene
              key="AddName"
              component={AddName}
              type={ActionConst.RESET}
              hideNavBar
            />
            <Scene
              key="WishList"
              component={WishList}
              type={ActionConst.RESET}
              hideNavBar={false}
              sceneStyle={{ backgroundColor: WHITE }}
            />
            <Scene
              key="AddWishList"
              panHandlers={null}
              component={AddWishList}
              type={ActionConst.PUSH}
              hideNavBar
            />
            <Scene
              key="WishListDetail"
              panHandlers={null}
              component={WishListDetail}
              type={ActionConst.PUSH}
              hideNavBar
            />
            <Scene
              key="FriendWishListDetail"
              panHandlers={null}
              component={FriendWishListDetail}
              type={ActionConst.PUSH}
              hideNavBar
            />
            <Scene
              key="AddNewGiftForm"
              component={AddNewGiftForm}
              type={ActionConst.PUSH}
              hideNavBar
            />
            <Scene
              key="Notifications"
              component={Notifications}
              type={ActionConst.PUSH}
              hideNavBar={false}
              sceneStyle={{ backgroundColor: BLUE_GRAY_BACKGROUND }}
            />
            <Scene
              key="Friends"
              component={Friends}
              type={ActionConst.PUSH}
              hideNavBar={false}
              sceneStyle={{ backgroundColor: BLUE_GRAY_BACKGROUND }}
            />
            <Scene
              key="Settings"
              component={Settings}
              type={ActionConst.PUSH}
              hideNavBar
              sceneStyle={{ backgroundColor: BLUE_GRAY_BACKGROUND }}
            />
            <Scene
              key="VerifySmsCode"
              panHandlers={null}
              component={VerifySmsCode}
              type={ActionConst.PUSH}
              hideNavBar
            />
            <Scene
              key="AddFriends"
              component={AddFriends}
              type={ActionConst.PUSH}
              hideNavBar={false}
              sceneStyle={{ backgroundColor: WHITE }}
            />
            <Scene
              key="FriendWishList"
              component={FriendWishList}
              type={ActionConst.PUSH}
              hideNavBar
              sceneStyle={{ backgroundColor: WHITE }}
            />
          </Scene>
        </Scene>
      </RouterWithRedux>);
  }
}


Routes.propTypes = {
  actions: React.PropTypes.any.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Routes);
