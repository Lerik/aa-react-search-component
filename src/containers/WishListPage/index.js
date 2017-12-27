/* eslint no-underscore-dangle: 0 */

import React from 'react';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    ListView,
    Dimensions,
    Platform,
    Alert,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Menu,
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Actions } from 'react-native-router-flux';
import MenuRenderer from './menuRenderer';
import {
  DUSTY_ORANGE,
  WHITE,
  ICE_BLUE,
  WARM_GREY,
  BACKGROUNDCOLOR,
  DARK_TAUPE,
  BLACK,
 } from '../../styles/color-constants';
import * as wishListActions from './actions';
import * as confirmModalActions from '../ConfirmModal/actions';
import { selectLogin } from '../LoginPage/selectors';
import { selectWishList } from './selectors';
import { sortWishListAlphabetical } from '../../services/helpers/utils';
import { selectNotifications } from '../Notifications/selectors';
import * as NotificationsActions from '../Notifications/actions';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const noWishListsImage = require('../../../img/no_wishlists.png');
const splashScreenImage = require('../../../img/splash-screen.png');
const rightArrowIcon = require('../../../img/right_arrow.png');

export const getFont = () => ((Platform.OS === 'ios') ? 'Helvetica' : 'sans-serif-light');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noWishListsImage: {
    width: 238,
    height: 238,
    borderWidth: 0,
  },
  noWishListsText: {
    marginTop: 42,
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK_TAUPE,
  },
  noWishListsButton: {
    marginTop: 21,
    paddingLeft: 16,
    paddingRight: 16,
    height: 36,
    borderRadius: 18,
    backgroundColor: DUSTY_ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noWishListsButtonText: {
    fontSize: 14,
    color: WHITE,
    fontWeight: 'bold',
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
    paddingBottom: 22,
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
  wishListMenu: {
    position: 'absolute',
    top: 10,
    left: 0,
    bottom: 0,
    right: 10,
  },
  wishListMenuTrigger: {
    position: 'absolute',
    width: 20,
    height: 28,
    top: 0,
    right: 0,
  },
  wishListMenuOptionsContainer: {
    borderRadius: 3,
    padding: 5,
    width: 100,
  },
  wishListMenuOptionWrapper: {
    margin: 3,
  },
  menuDotWrapper: {
    alignSelf: 'flex-end',
    height: 27,
  },
  menuDot: {
    flex: 1,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: WHITE,
    marginTop: 3,
  },
  menuOptionText: {
    color: DUSTY_ORANGE,
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
  modalText: {
    color: DARK_TAUPE,
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 25,
    marginRight: 25,
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
      ...NotificationsActions,
    }, dispatch),
  };
}

const mapStateToProps = createStructuredSelector({
  loginStore: selectLogin(),
  wishListStore: selectWishList(),
  notificationsStore: selectNotifications(),
});

export class WishListPage extends React.Component {
  constructor(props) {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: this.rowHasChanged });
    this.state = {
      dataSource: ds,
      openDeleteDialog: false,
      wishListData: sortWishListAlphabetical(props.wishListStore.wishLists),
    };
    this.getDataSource = this.getDataSource.bind(this);
    this.goToAddWishlist = this.goToAddWishlist.bind(this);
    this.onMenuOptionSelected = this.onMenuOptionSelected.bind(this);
    this.deleteWishlist = this.deleteWishlist.bind(this);
    this.renderMenuContext = this.renderMenuContext.bind(this);
    this.goToAddUpdateWishList = this.goToAddUpdateWishList.bind(this);
  }
  componentDidMount() {
    this.setInterval(() => {
      this.props.actions.getNotifications(this.props.loginStore.user._id);
    }, 10000);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.wishListStore.getSingleWishListError && nextProps.wishListStore.getSingleWishListError
      !== this.props.wishListStore.getSingleWishListError && nextProps.wishListStore.getSingleWishListError !== '') {
      Alert.alert('Wishlist Not Found!', 'Sorry, the wishlist is no longer available!');
    }

    if (nextProps.wishListStore.wishLists
      !== this.props.wishListStore.wishLists &&
      nextProps.wishListStore.wishLists) {
      this.setState({
        wishListData: sortWishListAlphabetical(nextProps.wishListStore.wishLists),
      });
    }
  }
  onMenuOptionSelected(value) {
    if (value.action === 'delete') {
      this.props.actions.showConfirmModal({
        content: (<Text style={styles.modalText}>Are you sure you want to delete this list?</Text>),
        buttons: [{
          text: 'Cancel',
          onPress: this.props.actions.hideConfirmModal,
        }, {
          text: 'Delete',
          onPress: this.deleteWishlist(value.wishListData),
        }],
      });
    } else {
      this.goToAddUpdateWishList(value.wishListData);
    }
  }
  getDataSource() {
    return this.state.dataSource.cloneWithRows(this.state.wishListData);
  }
  goToAddUpdateWishList(wishList) {
    if (wishList && wishList._id) { // eslint-disable-line
      const payload = {
        wishList,
      };

      this.props.actions.selectWishListAction(payload);
    } else {
      this.props.actions.selectWishListAction({});
    }

    this.goToAddWishlist();
  }
  deleteWishlist(wishlistData) {
    return () => {
      const payload = {
          wishListId: wishlistData._id,//eslint-disable-line
      };
      this.props.actions.removeWishListAction(payload);
      this.props.actions.hideConfirmModal();
    };
  }
  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }

  goToAddWishlist() {
    Actions.AddWishList();
  }

  goToWishlistDetail(wishlistData) {
    return () => {
      const payload = {
        wishList: wishlistData,
      };
      this.props.actions.selectWishListAction(payload);
      Actions.WishListDetail();
    };
  }

  renderEmptyList() {
    return (
      <View style={styles.container}>
        <Image
          accessibilityLabel="no-wishLists"
          style={styles.noWishListsImage}
          source={noWishListsImage}
        />
        <Text
          style={styles.noWishListsText}
        >
          Start saving your favorite things
        </Text>
        <TouchableHighlight
          style={styles.noWishListsButton}
          underlayColor={BACKGROUNDCOLOR}
          onPress={this.goToAddUpdateWishList}
        >
          <Text
            style={styles.noWishListsButtonText}
          >
            Make your first list
          </Text>
        </TouchableHighlight>
      </View>);
  }
  renderMenuContext(componentInstance, wishListData) {
    return (
      <MenuContext>
        <Image
          accessibilityLabel="wishList-image"
          resizeMode="cover"
          style={styles.wishListImage}
          source={splashScreenImage}
        />
        <Menu
          renderer={MenuRenderer}
          style={styles.wishListMenu}
          onSelect={componentInstance.onMenuOptionSelected}
        >
          <MenuTrigger
            TriggerTouchableComponent={TouchableHighlight}
            customStyles={{
              triggerOuterWrapper: styles.wishListMenuTrigger,
            }}
          >
            <View
              accessible
              accessibilityLabel="dotMenuWishList"
              style={styles.menuDotWrapper}
            >
              <View
                style={styles.menuDot}
              ></View>
              <View
                style={styles.menuDot}
              ></View>
              <View
                style={styles.menuDot}
              ></View>
            </View>
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: styles.wishListMenuOptionsContainer,
              optionWrapper: styles.wishListMenuOptionWrapper,
            }}
          >
            <MenuOption value={{ action: 'edit', wishListData }}>
              <Text
                accessible
                accessibilityLabel="dotMenuWishListEdit"
                style={styles.menuOptionText}
              >Edit</Text>
            </MenuOption>
            <MenuOption value={{ action: 'delete', wishListData }}>
              <Text
                accessible
                accessibilityLabel="dotMenuWishListDelete"
                style={styles.menuOptionText}
              >Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </MenuContext>);
  }
  renderWishList(componentInstance) {
    return (wishListData) => (<View style={styles.wishListWrapper}>
      <TouchableHighlight
        accessible
        accessibilityLabel={wishListData.name}
        style={styles.goToWishlistDetail}
        onPress={this.goToWishlistDetail(wishListData)}
        underlayColor={'transparent'}
      >
        <View
          style={styles.wishListHeader}
        >
          <View
            accessible
            accessibilityLabel="wishlist-view"
            style={styles.wishListImageWrapper}
          >
            {this.renderMenuContext(componentInstance, wishListData)}
            <View style={styles.fixCoverImagesBorder} />
          </View>
          <View
            style={styles.wishListUpperHeader}
          >
            <Text
              numberOfLines={1}
              style={styles.wishListName}
            >
              {wishListData.name}
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
                Created: {moment(wishListData.createdAt).format('DD MMM YY')}
            </Text>
            <Text
              style={styles.wishListItems}
            >
              {wishListData.items.length} items
              </Text>

          </View>
        </View>
      </TouchableHighlight>
    </View>);
  }
  render() {
    return (
      (this.state.wishListData.length ?
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
          renderRow={this.renderWishList(this)}
        />
      </View>) :
      (this.renderEmptyList()))

    );
  }
}

WishListPage.propTypes = {
  wishListStore: React.PropTypes.any.isRequired,
  actions: React.PropTypes.any.isRequired,
  loginStore: React.PropTypes.any.isRequired,
};

reactMixin(WishListPage.prototype, TimerMixin);
export default connect(mapStateToProps, mapDispatchToProps)(WishListPage);
