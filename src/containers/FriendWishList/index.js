import React from 'react';
import {
    ActivityIndicator,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    ListView,
    Dimensions,
    Platform,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import {
  ICON_NAME_BACKGROUNDCOLOR,
  DUSTY_ORANGE,
  WHITE,
  ICE_BLUE,
  WARM_GREY,
  DARK_TAUPE,
  BLACK,
  TRANSPARENT,
 } from '../../styles/color-constants';
import {
  getUserNameInitials,
  sortWishListAlphabetical,
} from '../../services/helpers/utils';
import * as wishListActions from '../WishListPage/actions';
import * as confirmModalActions from '../ConfirmModal/actions';
import { selectLogin } from '../LoginPage/selectors';
import { selectWishList } from '../WishListPage/selectors';
import { selectFriends } from '../Friends/selectors';

const { width } = Dimensions.get('window');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const orangeContainerHeight = screenHeight - ((screenHeight * 0.75));
const CARD_WIDTH = width - 40;
const noWishListsImage = require('../../../img/friend-no-wishlist.png');
const splashScreenImage = require('../../../img/splash-screen.png');
const rightArrowIcon = require('../../../img/right_arrow.png');
const circleImage = require('../../../img/SignupAvatar_3x.png');
const backIcon = require('../../../img/Chevron-White_3x.png');

export const getFont = () => ((Platform.OS === 'ios') ? 'Helvetica' : 'sans-serif-light');

export const styles = StyleSheet.create({
  container: {
    margin: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    flex: 1,
  },
  heightActivityIndicator: {
    height: screenHeight / 2,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: TRANSPARENT,
  },
  emptyContainer: {
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: DUSTY_ORANGE,
  },
  leftItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 7,
  },
  headerTitle: {
    paddingTop: 7,
    fontSize: 24,
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'sans-serif-light',
    color: WHITE,
    backgroundColor: DUSTY_ORANGE,
  },
  orangeContainer: {
    backgroundColor: DUSTY_ORANGE,
    height: orangeContainerHeight,
    width: screenWidth,
    borderBottomWidth: 1,
    borderBottomColor: DUSTY_ORANGE,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: (screenWidth * 0.5) - ((60 + (screenWidth * 0.05)) / 2),
  },
  friendNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 70 + (screenWidth * 0.05),
    width: (screenWidth / 2),
    left: (screenWidth * 0.5) - (((screenWidth * 0.5)) / 2),
  },
  circle: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 70 + (screenWidth * 0.05),
    height: 70 + (screenWidth * 0.05),
    borderRadius: (70 + (screenWidth * 0.05)) / 2,
    backgroundColor: ICON_NAME_BACKGROUNDCOLOR,
    alignSelf: 'center',
  },
  iconText: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: DARK_TAUPE,
  },
  noWishListsImage: {
    width: 238,
    height: 238,
    borderWidth: 0,
  },
  backIcon: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 7,
    paddingRight: 35,
  },
  backIconImage: {
    width: 10 + (screenWidth * 0.01),
    height: 15 + (screenWidth * 0.01),
  },
  noWishListsText: {
    marginTop: 42,
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK_TAUPE,
  },
  listViewWrapper: {
    flex: 1,
    backgroundColor: ICE_BLUE,
    alignItems: 'center',
  },
  listView: {
    paddingTop: 22,
  },
  listViewContent: {
    paddingBottom: 120,
  },
  wishListWrapper: {
    elevation: 4,
    shadowColor: BLACK,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: CARD_WIDTH,
    height: 215,
    borderRadius: 8,
    backgroundColor: WHITE,
    marginTop: 3,
    marginBottom: 22,
    marginRight: 10,
    marginLeft: 10,
  },
  wishListImageWrapper: {
    flex: 8,
  },
  wishListImage: {
    flex: 1,
    width: CARD_WIDTH,
    borderRadius: 8,
  },
  fixCoverImagesBorder: {
    backgroundColor: WHITE,
    position: 'absolute',
    height: 5,
    bottom: 0,
    left: 0,
    right: 0,
  },
  wishListHeader: {
    flex: 3,
    backgroundColor: WHITE,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  wishListUpperHeader: {
    flex: 1,
    paddingLeft: 19,
    paddingRight: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wishListName: {
    fontFamily: getFont(),
    fontSize: 21,
    color: DUSTY_ORANGE,
  },
  wishListRightArrow: {
    height: 12,
    width: 8,
  },
  wishListBottomHeader: {
    flex: 1,
    paddingLeft: 19,
    paddingRight: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wishListCreationDate: {
    color: WARM_GREY,
    fontSize: 11,
  },
  wishListItems: {
    color: DUSTY_ORANGE,
    fontSize: 11,
  },
  goToWishlistDetail: {
    flex: 3,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...wishListActions,
      ...confirmModalActions,
    }, dispatch),
  };
}

const mapStateToProps = createStructuredSelector({
  loginStore: selectLogin(),
  wishListStore: selectWishList(),
  friendsStore: selectFriends(),
});

export class FriendWishList extends React.Component {
  constructor(props) {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: this.rowHasChanged });
    this.state = {
      dataSource: ds,
      openDeleteDialog: false,
      friendWishListData: [],
      iconText: '',
      friendName: '',
      selectedFriend: props.friendsStore.selectedFriend,
    };
    this.getDataSource = this.getDataSource.bind(this);
    this.setIconText = this.setIconText.bind(this);
    this.setFriendName = this.setFriendName.bind(this);
    this.goToFriendsScreen = this.goToFriendsScreen.bind(this);
  }
  componentDidMount() {
    this.props.actions.getFriendWishListsAction({
      friendWishListQuery: {
        query: {
          createdBy: this.state.selectedFriend._id, // eslint-disable-line
          $sort: { updatedAt: -1 },
        },
      },
    });
    this.setIconText();
    this.setFriendName();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.wishListStore.friendWishLists
      !== this.props.wishListStore.friendWishLists &&
      nextProps.wishListStore.friendWishLists) {
      this.setState({
        friendWishListData: sortWishListAlphabetical(nextProps.wishListStore.friendWishLists),
      });
    }
  }
  getDataSource() {
    return this.state.dataSource.cloneWithRows(this.state.friendWishListData);
  }
  setFriendName() {
    this.setState({
      friendName: `${this.state.selectedFriend.firstName} ${this.state.selectedFriend.lastName}`,
    });
  }
  setIconText() {
    const iconText = getUserNameInitials([this.state.selectedFriend.firstName, this.state.selectedFriend.lastName]);

    this.setState({
      iconText,
    });
  }
  goToFriendsScreen() {
    Actions.pop();
  }
  goToWishlistDetail(wishlistData) {
    return () => {
      const payload = {
        wishList: wishlistData,
      };
      this.props.actions.selectWishListAction(payload);
      Actions.FriendWishListDetail();
    };
  }
  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }
  renderEmptyList() {
    return (!this.props.wishListStore.isLoading ?
      <View style={styles.emptyContainer}>
        <Image
          accessibilityLabel="no-friendWishLists"
          style={styles.noWishListsImage}
          source={noWishListsImage}
        />
        <Text
          style={styles.noWishListsText}
        >
          {this.state.selectedFriend.firstName} has not created a giftlist yet.
        </Text>
      </View> : null);
  }
  renderWishList() {
    return (friendWishListData) => (<View style={styles.wishListWrapper}>
      <TouchableHighlight
        accessible
        accessibilityLabel={friendWishListData.name}
        style={styles.goToWishlistDetail}
        underlayColor={'transparent'}
        onPress={this.goToWishlistDetail(friendWishListData)}
      >
        <View
          style={styles.wishListHeader}
        >
          <View
            accessible
            accessibilityLabel="wishlist-view"
            style={styles.wishListImageWrapper}
          >
            <Image
              accessibilityLabel="wishList-image"
              resizeMode="cover"
              style={styles.wishListImage}
              source={splashScreenImage}
            />
            <View style={styles.fixCoverImagesBorder} />
          </View>
          <View
            style={styles.wishListUpperHeader}
          >
            <Text
              numberOfLines={1}
              style={styles.wishListName}
            >
              {friendWishListData.name}
            </Text>
            <Image
              style={styles.wishListRightArrow}
              source={rightArrowIcon}
            />
          </View>

          <View
            style={styles.wishListBottomHeader}
          >
            <Text
              style={styles.wishListCreationDate}
            >
                Created: {moment(friendWishListData.createdAt).format('DD MMM YY')}
            </Text>
            <Text
              style={styles.wishListItems}
            >
              {friendWishListData.items.length} items
              </Text>

          </View>
        </View>
      </TouchableHighlight>
    </View>);
  }
  render() {
    return (
      (<View style={styles.container}>
        <View style={styles.navBarContainer}>
          <View style={styles.leftItem}>
            <TouchableHighlight
              accessible
              accessibilityLabel="GoBack"
              underlayColor={WHITE}
              onPress={this.goToFriendsScreen}
              style={styles.backIcon}
            >
              <View>
                <Image
                  style={styles.backIconImage}
                  source={backIcon}
                />
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <View>
          <View style={styles.orangeContainer}></View>
          <View style={styles.iconContainer}>
            <View style={styles.circle}>
              {
                (this.state.iconText === undefined || this.state.iconText === '')
                  ?
                    <Image
                      source={circleImage}
                      style={{ marginTop: 10, width: 80, height: 80 }}
                    ></Image>
                  :
                    <Text style={styles.iconText}>
                      {this.state.iconText}
                    </Text>
              }
            </View>
          </View>

          <View style={styles.friendNameContainer}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {this.state.friendName}
            </Text>
          </View>

        </View>
        {this.props.wishListStore.isLoading ?
          <ActivityIndicator
            animating
            style={[styles.centering, styles.heightActivityIndicator]}
            size="large"
          /> : null}
        { (this.state.friendWishListData.length ?
          (<View
            accessible
            accessibilityLabel="wishlists-listview"
            style={styles.listViewWrapper}
          >
            <ListView
              style={styles.listView}
              contentContainerStyle={styles.listViewContent}
              enableEmptySections
              dataSource={this.getDataSource()}
              renderRow={this.renderWishList()}
            />
          </View>) :
        (this.renderEmptyList()))
        }
      </View>)
    );
  }
}

FriendWishList.propTypes = {
  wishListStore: React.PropTypes.any.isRequired,
  friendsStore: React.PropTypes.any.isRequired,
  actions: React.PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendWishList);

