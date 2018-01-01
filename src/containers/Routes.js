import React from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { Scene, Router, ActionConst, Reducer } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import StatusBarSizeIOS from 'react-native-status-bar-size';
import App from './App';
import Login from './LoginPage';
import NavBar from './NavBar';
import {
  BLUE_GRAY_BACKGROUND,
  Purple,
  WHITE,
 } from '../styles/color-constants';

import * as navbarActions from './NavBar/actions';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...navbarActions,
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
  render() {
    const styles = {
      flexDirection: 'column-reverse',
    };

    return (
      <RouterWithRedux
        createReducer={this.createReducer}
        sceneStyle={(Platform.OS === 'ios') ? { paddingTop: StatusBarSizeIOS.currentHeight, backgroundColor: '#3c3643' } : null}
      >

        <Scene
          key="Footer"
          panHandlers={null}
          component={null}
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
          </Scene>
        </Scene>
      </RouterWithRedux>);
  }
}


Routes.propTypes = {
  actions: React.PropTypes.any.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Routes);
