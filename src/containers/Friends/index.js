/* eslint no-underscore-dangle: 0 */

import React from 'react';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Dimensions,
  ListView,
} from 'react-native';
import {
  HEADER_ACCORDION_BACKGROUND_COLOR,
  DARK_TAUPE,
  WHITE,
  DUSTY_ORANGE,
  BACKGROUNDCOLOR,
  ICON_NAME_BACKGROUNDCOLOR,
  INPUT_COLOR,
} from '../../styles/color-constants';
import { selectFriends } from './selectors';
import { selectLogin } from '../LoginPage/selectors';
import * as NotificationsActions from '../Notifications/actions';
import { getUserNameInitials, sortUsersAlphabetical } from '../../services/helpers/utils';
import * as FriendsActions from './actions';
import { selectNotifications } from '../Notifications/selectors';

const pairOfFriendlyGhosts = require('../../../img/ghosts-friends-art.png');
const chevronRightIcon = require('../../../img/Chevron_right_3x.png');
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
  },
  pairOfFriendlyGhostsImage: {
    width: 238,
    height: 238,
    borderWidth: 0,
  },
  containerForFriendsList: {
    flex: 1,
    backgroundColor: WHITE,
  },
  noFriendsListCenterScreen: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noFriendsListCenterScreen_Text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK_TAUPE,
  },
  noFriendsListCenterScreen_ButtonContainer: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noFriendsListCenterScreen_ButtonContainer_Button: {
    marginTop: 21,
    paddingLeft: 16,
    paddingRight: 16,
    height: 36,
    width: 150 + (screenWidth * 0.02),
    borderRadius: 18,
    backgroundColor: DUSTY_ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFriendsListCenterScreen_ButtonContainer_Button_Text: {
    fontSize: 14,
    color: WHITE,
    fontWeight: 'bold',
  },
  chevronIconImage: {
    width: 12 + (screenWidth * 0.01),
    height: 15 + (screenWidth * 0.01),
  },
  chevronIcon: {
    padding: 7,
  },
  addFriendsRow: {
    flexDirection: 'row',
    backgroundColor: HEADER_ACCORDION_BACKGROUND_COLOR,
    padding: 15,
    justifyContent: 'space-between',
  },
  addFriendsRowTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFriendsText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: DUSTY_ORANGE,
  },
  listViewContainer: {
    flex: 1,
    flexDirection: 'row',
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
    padding: 20,
    alignItems: 'center',
  },
  listItemName: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: DUSTY_ORANGE,
    paddingLeft: 25,
  },
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...FriendsActions,
    ...NotificationsActions,
  }, dispatch),
});

const mapStateToProps = createStructuredSelector({
  loginStore: selectLogin(),
  friendsStore: selectFriends(),
  notificationsStore: selectNotifications(),
});

export class Friends extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: this.rowHasChanged });
    this.state = {
      dataSource: ds,
      friendsData: null,
    };

    this.getDataSource = this.getDataSource.bind(this);
    this.goToAddFriendsScreen = this.goToAddFriendsScreen.bind(this);
    this.goToFriendWishListScreen = this.goToFriendWishListScreen.bind(this);
  }

  componentDidMount() {
    this.props.actions.getAllFriendsAction(this.props.loginStore.user._id); // eslint-disable-line
    this.setInterval(() => {
      this.props.actions.getNotifications(this.props.loginStore.user._id);
    }, 10000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.friendsStore.friends
      !== this.props.friendsStore.friends &&
      nextProps.friendsStore.friends) {
      this.setState({
        friendsData: sortUsersAlphabetical(nextProps.friendsStore.friends),
      });
    }
  }

  getDataSource() {
    return this.state.dataSource.cloneWithRows(this.props.friendsStore.friends);
  }

  goToFriendWishListScreen(friendData) {
    return () => {
      this.props.actions.selectFriendAction(friendData);
      Actions.FriendWishList();
    };
  }

  goToAddFriendsScreen() {
    Actions.AddFriends();
  }

  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }

  renderEmptyList() {
    return (
      <View style={styles.container}>
        <Image
          accessibilityLabel="FriendsListEmpty"
          style={styles.pairOfFriendlyGhostsImage}
          source={pairOfFriendlyGhosts}
        />

        <View style={styles.noFriendsListCenterScreen}>
          <Text
            style={styles.noFriendsListCenterScreen_Text}
          >
            Start giving and getting
          </Text>

          <Text
            style={styles.noFriendsListCenterScreen_Text}
          >
            the right gifts
          </Text>

          <View style={styles.noFriendsListCenterScreen_ButtonContainer}>
            <TouchableHighlight
              style={styles.noFriendsListCenterScreen_ButtonContainer_Button}
              underlayColor={BACKGROUNDCOLOR}
              onPress={this.goToAddFriendsScreen}
            >
              <Text
                style={styles.noFriendsListCenterScreen_ButtonContainer_Button_Text}
              >
                Find Friends
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

  renderFriendsListItem() {
    return ((friendData) =>
      (
        <TouchableHighlight
          accessible
          accessibilityLabel="Friend"
          underlayColor={WHITE}
          onPress={this.goToFriendWishListScreen(friendData)}
        >
          <View style={styles.listItem}>
            <View style={styles.iconContainer}>
              <View style={styles.circle}>
                <Text style={styles.iconText}>
                  {getUserNameInitials([friendData.firstName, friendData.lastName])}
                </Text>
              </View>
            </View>

            <View style={styles.addFriendsRowTextContainer}>
              <Text style={styles.listItemName}>
                {friendData.firstName} {friendData.lastName}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
    ));
  }

  renderFriendsList() {
    return (
      <View style={styles.containerForFriendsList}>
        <TouchableHighlight
          accessible
          accessibilityLabel="AddFriends"
          underlayColor={WHITE}
          onPress={this.goToAddFriendsScreen}
        >
          <View style={styles.addFriendsRow} >

            <View style={styles.addFriendsRowTextContainer} >
              <Text style={styles.addFriendsText} >
                  Add Friends
                </Text>
            </View>

            <View style={styles.chevronIcon}>
              <Image
                style={styles.chevronIconImage}
                source={chevronRightIcon}
              />
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.listViewContainer}>
          <ListView
            style={styles.listView}
            contentContainerStyle={styles.listViewContent}
            enableEmptySections
            dataSource={this.getDataSource()}
            renderRow={this.renderFriendsListItem()}
          />
        </View>
      </View>);
  }

  render() {
    return (
      this.props.friendsStore.friends ?
        this.renderFriendsList()
      :
        this.renderEmptyList());
  }
}

Friends.propTypes = {
  actions: React.PropTypes.any.isRequired,
  loginStore: React.PropTypes.any.isRequired,
  friendsStore: React.PropTypes.any.isRequired,
};

reactMixin(Friends.prototype, TimerMixin);
export default connect(mapStateToProps, mapDispatchToProps)(Friends);
