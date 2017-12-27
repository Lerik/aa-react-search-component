import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image, Linking, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Actions } from 'react-native-router-flux';
import * as storage from '../services/helpers/storageHelper';
import { selectLogin } from './LoginPage/selectors';
import * as loginActions from './LoginPage/actions';
import * as wishListActions from './WishListPage/actions';
import * as friendsActions from './Friends/actions';
import * as notificationsActions from './Notifications/actions';
import { selectWishList } from './WishListPage/selectors';
import { selectFriends } from './Friends/selectors';
import { selectNotifications } from './Notifications/selectors';

const splashScreenImg = require('../../img/splash-screen.png');

const mapStateToProps = createStructuredSelector({
  loginStore: selectLogin(),
  wishListStore: selectWishList(),
  friendsStore: selectFriends(),
  notificationStore: selectNotifications(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...loginActions,
      ...wishListActions,
      ...friendsActions,
      ...notificationsActions,
    }, dispatch),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  splashImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export class App extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.actions.checkLoginStatusAction({});
    Linking.addEventListener('url', this.linkinkUrlListener);
    this.checkDeepLink();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.wishListStore.getSingleWishListError && nextProps.wishListStore.getSingleWishListError
      !== this.props.wishListStore.getSingleWishListError) {
      setTimeout(() => {
        Alert.alert('Wishlist Not Found!', 'Sorry, the wishlist is no longer available!');
        setTimeout(this.checkLoginStatus, 1000);
      }, 0);
    }
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this.checkDeepLink);
  }
  checkDeepLink() {
    Linking.getInitialURL().then((url) => {
      this.navigateToWishListDetail(url);
    });
  }
  linkinkUrlListener(e) {
    this.props.actions.checkLoginStatusAction({});
    setTimeout(() => {
      storage.getDataFromAsyncStorage('user').then((user) => {
        this.navigateToWishListDetail(e.url, JSON.parse(user));
      });
    }, 1000);
  }
  navigateToWishListDetail(url, userFromIos) {
    if (url && url.indexOf('#/wishlist/') !== -1) {
      setTimeout(() => {
        if (!this.props.loginStore.token && !userFromIos) {
          Actions.Login();
        } else if (this.props.loginStore.user &&
                  (this.props.loginStore.user.name || userFromIos)) {
          let userId = '';

          if (this.props.loginStore.user && this.props.loginStore.user._id) { // eslint-disable-line
            userId = this.props.loginStore.user._id; // eslint-disable-line
          }

          if (userId === '' && userFromIos) {
            userId = userFromIos._id; // eslint-disable-line
          }

          const wishlistId = url.split('#/wishlist/')[1];
          this.props.actions.getSingleWishListAction({
            id: wishlistId,
            userId,
            goToAction: 'WishListDetail',
          });
        } else {
          Actions.AddName();
        }
      }, 1000);
    }
  }

  render() {
    return (<View style={styles.container}>
      <Image
        accessible
        accessibilityLabel="splashScreenImage"
        style={styles.splashImage}
        resizeMode="contain"
        source={splashScreenImg}
      />
    </View>);
  }
}

App.propTypes = {
  actions: React.PropTypes.any.isRequired,
  loginStore: React.PropTypes.any.isRequired,
  wishListStore: React.PropTypes.any.isRequired,
  friendsStore: React.PropTypes.any.isRequired,
  notificationStore: React.PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
