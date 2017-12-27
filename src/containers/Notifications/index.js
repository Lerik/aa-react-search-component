/* eslint no-underscore-dangle: 0 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Bar from 'react-native-bar-collapsible';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
  ListView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  WHITE,
  DARK_TAUPE,
  HEADER_ACCORDION_BACKGROUND_COLOR,
  DUSTY_ORANGE,
  ICON_NAME_BACKGROUNDCOLOR,
  INPUT_COLOR,
  BACKGROUNDCOLOR,
} from '../../styles/color-constants';

import { selectLogin } from '../LoginPage/selectors';
import { selectFriends } from '../Friends/selectors';
import { selectNotifications } from './selectors';
import * as loginActions from '../LoginPage/actions';
import * as FriendsActions from '../Friends/actions';
import * as NotificationsActions from './actions';
import * as confirmModalActions from '../ConfirmModal/actions';
import { notificationMessages } from '../../services/helpers/notificationMessages';
import { getUserNameInitials, getNotificationMessageOption } from '../../services/helpers/utils';

const friendRequestIcon = require('../../../img/ghost_3x.png');
const dibsGiftIcon = require('../../../img/redGiftIcon.png');
const purchasedGiftIcon = require('../../../img/mintGiftIcon.png');

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  headerCollapsible: {
    backgroundColor: HEADER_ACCORDION_BACKGROUND_COLOR,
    paddingLeft: 5,
    height: 60,
  },
  headerText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: DUSTY_ORANGE,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 20 + (screenWidth * 0.05),
    height: 20 + (screenWidth * 0.05),
    borderRadius: (40 + (screenWidth * 0.05)) / 2,
    backgroundColor: ICON_NAME_BACKGROUNDCOLOR,
    alignSelf: 'center',
  },
  iconText: {
    alignSelf: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: INPUT_COLOR,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    padding: 15,
    alignItems: 'center',
  },
  listItemName: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Roboto',
    color: DUSTY_ORANGE,
    paddingLeft: 25,
  },
  listViewContentFriendRequests: {
    paddingBottom: 350,
  },
  listViewContentNotifications: {
    paddingBottom: 620,
  },
  acceptFriendsButton: {
    marginLeft: 10,
    paddingLeft: 16,
    paddingRight: 16,
    height: 36,
    borderRadius: 18,
    backgroundColor: DUSTY_ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptFriendsButtonText: {
    fontSize: 14,
    color: WHITE,
  },
  rejectFriendsButton: {
    paddingLeft: 16,
    paddingRight: 16,
    height: 36,
    borderRadius: 18,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: DUSTY_ORANGE,
    borderWidth: 1,
  },
  rejectFriendsButtonText: {
    fontSize: 14,
    color: DUSTY_ORANGE,
  },
  listItemNameContainer: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  listItemButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'flex-end',
  },
  spinnerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  modalText: {
    color: DARK_TAUPE,
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 25,
    marginRight: 25,
  },
  modalSpinner: {
    marginTop: 20,
  },
});

const mapStateToProps = createStructuredSelector({
  loginStore: selectLogin(),
  friendsStore: selectFriends(),
  notificationsStore: selectNotifications(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...loginActions,
    ...FriendsActions,
    ...NotificationsActions,
    ...confirmModalActions,
  }, dispatch),
});

export class Notifications extends React.Component {
  constructor() {
    super();

    const dsRequestsListbox = new ListView.DataSource({ rowHasChanged: this.rowHasChangedOnRequestsListbox });
    const dsNotificationsListbox = new ListView.DataSource({ rowHasChanged: this.rowHasChangedOnNotificationsListbox });
    this.onRequestAccepted = this.onRequestAccepted.bind(this);

    this.state = {
      dataSourceRequestsListbox: dsRequestsListbox,
      dataSourceNotificationsListbox: dsNotificationsListbox,
      requests: [],
      notifications: [],
      isCreatingFriendship: false,
    };
  }

  componentDidMount() {
    this.props.actions.getAllFriendsAction(this.props.loginStore.user._id);
    this.props.actions.getNotifications(this.props.loginStore.user._id);
    this.setInterval(() => {
      this.props.actions.getNotifications(this.props.loginStore.user._id);
    }, 10000);
    this.props.actions.setNotificationsAsSeen(this.props.loginStore.user._id);
  }

  componentWillReceiveProps(nextProps) {
    this.createFriendRequests(
      nextProps.friendsStore.requesters,
    );
    this.setState({ notifications: nextProps.notificationsStore.notifications });
  }

  onRequestAccepted() {
    this.props.actions.hideConfirmModal();
    this.setState({
      isCreatingFriendship: false,
    });
  }

  getDataSourceForRequestsListbox() {
    return this.state.dataSourceRequestsListbox.cloneWithRows(this.state.requests);
  }

  getDataSourceForNotificationsListbox() {
    return this.state.dataSourceNotificationsListbox.cloneWithRows(this.state.notifications);
  }
  getNotificationIcon(notificationType) {
    switch (notificationType) {
      case 'friendRequest':
        return friendRequestIcon;
      case 'dibs':
      case 'wishlistCreated':
        return dibsGiftIcon;
      case 'purchased':
      case 'wishlistCompleted':
        return purchasedGiftIcon;
      default:
        return null;
    }
  }
  rowHasChangedOnRequestsListbox(r1, r2) {
    return r1 !== r2;
  }
  rowHasChangedOnNotificationsListbox(r1, r2) {
    return r1 !== r2;
  }
  deleteFriendRequest(requestId) {
    this.props.actions.removeFriendRequestAction(requestId, this.props.loginStore.user._id);
  }
  createFriendRequests(requesters) {
    if (requesters.length === 0) {
      this.setState({
        requests: [],
      });
      return;
    }
    const filteredRequesters = requesters.filter((requester) => requester._id !== this.props.loginStore.user._id);
    this.setState({
      requests: filteredRequesters,
    });
  }
  updateFriendship(friendData) {
    if (!this.state.isCreatingFriendship) {
      this.props.actions.showConfirmModal({
        content: (<View style={styles.spinnerWrapper}>
          <Text style={styles.modalText}>Accepting friend request...</Text>
          <ActivityIndicator
            size="large"
            style={styles.modalSpinner}
            color={DUSTY_ORANGE}
          />
        </View>),
        buttons: [],
      });
      this.state.isCreatingFriendship = true;
      const notificationType = 'friendRequest';
      const notificationOption = getNotificationMessageOption(notificationType, null);
      const notification = {
        personId: friendData._id,
        notificationType,
        notificationOption,
        messageItem: `${this.props.loginStore.user.firstName} ${this.props.loginStore.user.lastName}`,
        seen: false,
      };
      this.props.actions.createNotification(notification);

      if (this.props.friendsStore.friendshipId) {
        const friends = this.props.friendsStore.friends.map((friend) => friend._id);
        friends.push(friendData._id);

        const formattedFriendship = {
          _id: this.props.friendsStore.friendshipId,
          personId: this.props.loginStore.user._id,
          friends,
        };
        this.props.actions.updateFriendship(formattedFriendship, friendData, this.onRequestAccepted);
      }
    }
  }
  renderRequestsListbox() {
    return (
      <ListView
        enableEmptySections
        contentContainerStyle={this.state.requests.length > 5 ? styles.listViewContentFriendRequests : null}
        dataSource={this.getDataSourceForRequestsListbox()}
        renderRow={this.renderRequestsListboxItem()}
      />
    );
  }
  renderNotificationsListbox() {
    return (
      <ListView
        enableEmptySections
        contentContainerStyle={this.state.notifications.length > 1 ? styles.listViewContentNotifications : null}
        dataSource={this.getDataSourceForNotificationsListbox()}
        renderRow={this.renderNotificationsListboxItem()}
      />
    );
  }
  renderRequestsListboxItem() {
    return ((friendRequestData) =>
     (
       <View style={styles.listItem}>
         <View style={styles.iconContainer}>
           <View style={styles.circle}>
             <Text style={styles.iconText}>
               {getUserNameInitials([friendRequestData.firstName, friendRequestData.lastName])}
             </Text>
           </View>
         </View>

         <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
           <View style={styles.listItemNameContainer}>
             <Text style={styles.listItemName} numberOfLines={1}>
               {friendRequestData.firstName} {friendRequestData.lastName}
             </Text>
           </View>

           <View style={styles.listItemButtonContainer}>
             <TouchableHighlight
               style={styles.acceptFriendsButton}
               underlayColor={BACKGROUNDCOLOR}
               onPress={() => this.updateFriendship(friendRequestData)}
             >
               <Text
                 style={styles.acceptFriendsButtonText}
               >
                Yeah
              </Text>
             </TouchableHighlight>

             <TouchableHighlight
               style={styles.rejectFriendsButton}
               underlayColor={BACKGROUNDCOLOR}
               onPress={() => this.deleteFriendRequest(friendRequestData.requestId)}
             >
               <Text
                 style={styles.rejectFriendsButtonText}
               >
                    Nah
                  </Text>
             </TouchableHighlight>

           </View>
         </View>
       </View>
  ));
  }
  renderNotificationMessage(notification) {
    const notificationMessage = notificationMessages(notification.notificationType, notification.messageItem);
    return notificationMessage[notification.notificationOption];
  }
  renderNotificationsListboxItem() {
    return ((notificationData) => <View>
      <View style={styles.listItem}>
        <Image
          source={this.getNotificationIcon(notificationData.notificationType)}
          style={{ marginTop: 10, width: 35, height: 35 }}
        ></Image>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.listItemNameContainer}>
            { this.renderNotificationMessage(notificationData)}
          </View>
        </View>
      </View>
    </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Bar
          title="Friend Requests"
          collapsible
          showOnStart
          iconCollapsed="chevron-up"
          iconOpened="chevron-down"
          style={styles.headerCollapsible}
          titleStyle={styles.headerText}
          tintColor={DUSTY_ORANGE}
          iconSize={22}
        >
          { this.renderRequestsListbox() }
        </Bar>
        <Bar
          title="Activity"
          collapsible
          showOnStart
          iconCollapsed="chevron-up"
          iconOpened="chevron-down"
          style={styles.headerCollapsible}
          titleStyle={styles.headerText}
          tintColor={DUSTY_ORANGE}
          iconSize={22}
        >
          { this.renderNotificationsListbox() }
        </Bar>
      </View>
    );
  }
}

Notifications.propTypes = {
  actions: React.PropTypes.any.isRequired,
  loginStore: React.PropTypes.any.isRequired,
  friendsStore: React.PropTypes.any.isRequired,
  notificationsStore: React.PropTypes.any.isRequired,
};

reactMixin(Notifications.prototype, TimerMixin);
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
