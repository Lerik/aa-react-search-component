import React from 'react';
import filter from 'lodash/filter';
import get from 'lodash/get';
import { Text, View, StyleSheet, Image, TouchableHighlight, StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions, DefaultRenderer, ActionConst } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import * as footerActions from './actions';
import * as confirmModalActions from '../ConfirmModal/actions';
import ConfirmModal from '../ConfirmModal';
import { WHITE, DARK_TAUPE, BLACK } from '../../styles/color-constants';
import { selectNotifications } from '../Notifications/selectors';

const friendsIconGray = require('../../../img/friends-navicon_3x.png');
const friendsIconRed = require('../../../img/friends-navicon-red_3x.png');
const notificationsIconGray = require('../../../img/notifications-navicon_3x.png');
const notificationsIconRed = require('../../../img/notifications-navicon-red_3x.png');
const settingsIconGray = require('../../../img/settings-navicon_3x.png');
const settingsIconRed = require('../../../img/settings-navicon-red_3x.png');
const myListIconGray = require('../../../img/my-lists-navicon_3x.png');
const myListIconRed = require('../../../img/my-lists-navicon-red_3x.png');
const notificationsIconNew = require('../../../img/Notification_new_2x.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    zIndex: 0,
  },
  footerWrapper: {
    height: 60,
    backgroundColor: WHITE,
    elevation: 4,
    shadowColor: BLACK,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    flexDirection: 'row',
  },
  footerIconWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerIcon: {
    height: 24,
    width: 24,
  },
  footerIconContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerIconText: {
    marginTop: 2,
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'sans-serif-light',
    fontSize: 12,
    color: DARK_TAUPE,
  },
});

const mapStateToProps = createStructuredSelector({
  footerStore: (state) => state.FooterReducer.toJS(),
  navbarStore: (state) => state.NavBarReducer.toJS(),
  notificationsStore: selectNotifications(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...footerActions,
      ...confirmModalActions,
    }, dispatch),
  };
}

export class FooterPage extends React.Component {
  constructor() {
    super();
    this.goToNotifications = this.goToNotifications.bind(this);
    this.goToWishList = this.goToWishList.bind(this);
    this.goToFriends = this.goToFriends.bind(this);
    this.goToSettings = this.goToSettings.bind(this);
    this.state = {
      amountNewNotifications: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { notificationsStore } = nextProps;
    if (this.props.navbarStore.route !== 'Notifications') {
      this.filterNewNotifications(notificationsStore.notifications);
    }
  }

  filterNewNotifications = (notifications) => {
    const newNotifications = filter(notifications, (notification) => get(notification, 'seen', true) === false);
    if (this.state.amountNewNotifications !== newNotifications) {
      this.setState({ amountNewNotifications: newNotifications.length });
    }
  }

  goToNotifications() {
    Actions.Notifications({ type: ActionConst.REPLACE });
  }
  goToWishList() {
    Actions.WishList({ type: ActionConst.REPLACE });
  }
  goToFriends() {
    Actions.Friends({ type: ActionConst.REPLACE });
  }
  goToSettings() {
    Actions.Settings({ type: ActionConst.REPLACE });
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    const notifsImageSource = this.props.navbarStore.route === 'Notifications' //eslint-disable-line
      ? notificationsIconRed
      : this.state.amountNewNotifications > 0
      ? notificationsIconNew
      : notificationsIconGray;
    return (
      <View
        style={styles.container}
      >
        <StatusBar
          backgroundColor="#ED6655"
          barStyle="light-content"
        />
        <View
          style={styles.container}
        >
          <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
          {this.props.footerStore.footerIsShown
            ? (<View
              style={styles.footerWrapper}
            >
              <TouchableHighlight
                underlayColor={'transparent'}
                style={styles.footerIconWrapper}
                onPress={this.goToNotifications}
              >
                <View
                  style={styles.footerIconContent}
                >
                  <Image
                    source={notifsImageSource}
                    style={styles.footerIcon} resizeMode={'stretch'}
                  />
                  <Text style={styles.footerIconText}>Notifications</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'transparent'}
                style={styles.footerIconWrapper}
                onPress={this.goToWishList}
              >
                <View
                  style={styles.footerIconContent}
                >
                  <Image
                    source={this.props.navbarStore.route === 'WishList' ? myListIconRed : myListIconGray}//eslint-disable-line
                    style={styles.footerIcon} resizeMode={'stretch'}
                  />
                  <Text style={styles.footerIconText}>My Lists</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'transparent'}
                style={styles.footerIconWrapper}
                onPress={this.goToFriends}
              >
                <View
                  style={styles.footerIconContent}
                >
                  <Image
                    source={this.props.navbarStore.route === 'Friends' ? friendsIconRed : this.props.navbarStore.route === 'AddFriends' ? friendsIconRed : this.props.navbarStore.route === 'FriendWishList' ? friendsIconRed : friendsIconGray}//eslint-disable-line
                    style={styles.footerIcon} resizeMode={'stretch'}
                  />
                  <Text style={styles.footerIconText}>Friends</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'transparent'}
                style={styles.footerIconWrapper}
                onPress={this.goToSettings}
              >
                <View
                  style={styles.footerIconContent}
                >
                  <Image
                    source={this.props.navbarStore.route === 'Settings' ? settingsIconRed : settingsIconGray}//eslint-disable-line
                    style={styles.footerIcon} resizeMode={'stretch'}
                  />
                  <Text style={styles.footerIconText}>Settings</Text>
                </View>
              </TouchableHighlight>
            </View>)
            : (null)}
        </View>
        <ConfirmModal />
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FooterPage);

FooterPage.propTypes = {
  onNavigate: React.PropTypes.any.isRequired,
  navigationState: React.PropTypes.any.isRequired,
  footerStore: React.PropTypes.any.isRequired,
  navbarStore: React.PropTypes.any.isRequired,
  notificationsStore: React.PropTypes.any.isRequired,
};
