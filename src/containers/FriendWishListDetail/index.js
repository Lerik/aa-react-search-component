import React from 'react';
import { connect } from 'react-redux';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Platform,
} from 'react-native';
import {
  MenuContext,
} from 'react-native-popup-menu';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import Carousel from 'react-native-snap-carousel';
import { selectLogin } from '../LoginPage/selectors';
import { selectWishList } from '../WishListPage/selectors';
import { selectFriends } from '../Friends/selectors';
import * as wishlistActions from '../WishListPage/actions';
import * as NotificationsActions from '../Notifications/actions';
import {
  DUSTY_ORANGE,
  WHITE,
  LIGHT_TAN,
  INPUT_COLOR,
  BLACK,
  WARM_GREY,
  DARK_TAUPE,
  ICON_NAME_BACKGROUNDCOLOR,
  BACKGROUNDCOLOR,
  MINT_COLOR,
} from '../../styles/color-constants';
import config from '../../../config.json';
import * as confirmModalActions from '../ConfirmModal/actions';
import { getUserNameInitials, getNotificationMessageOption } from '../../services/helpers/utils';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 80;
const CARD_HEIGHT = height - 250;
const backIcon = require('../../../img/Chevron-White_3x.png');
const giftIcon = require('../../../img/gift.png');
const noGiftIcon = require('../../../img/no_gift_image.png');
const dibsLabelImage = require('../../../img/dibsLabelImage.png');
const dibsOpacityImage = require('../../../img/dibsOpacityImage.png');
const purchasedLabelImage = require('../../../img/purchasedLabelImage.png');
const purchasedOpacityImage = require('../../../img/purchasedOpacityImage.png');
const giftIlustration = require('../../../img/gifthub-ilustration.png');
const urlIconGray = require('../../../img/url_icon_gray.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const orangeContainerHeight = screenHeight - ((screenHeight * 0.84));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: DUSTY_ORANGE,
  },
  wishlistNavBarContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 0,
    backgroundColor: DUSTY_ORANGE,
  },
  headerTitle: {
    paddingTop: 7,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'sans-serif-light',
    color: WHITE,
    backgroundColor: DUSTY_ORANGE,
  },
  wishListDetailContainer: {
    flex: 1,
  },
  wishListItemCard: {
    flex: 1.5,
    padding: 48,
    paddingBottom: 70,
  },
  wishListItemImageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: LIGHT_TAN,
  },
  wishListItemAddNewGiftWrapper: {
    flex: 1,
  },
  disabledWishlistAddNewGiftWrapper: {
    paddingTop: 60,
  },
  wishListItemImage: {
    borderWidth: 0,
  },
  orangeContainer: {
    backgroundColor: DUSTY_ORANGE,
    height: orangeContainerHeight,
    width: screenWidth,
  },
  wishListNameContainer: {
    flexDirection: 'row',
    position: 'absolute',
    width: (screenWidth / 1.5),
    left: (screenWidth * 0.15),
    backgroundColor: DUSTY_ORANGE,
  },
  friendNameContainer: {
    flexDirection: 'row',
    position: 'absolute',
    width: (screenWidth / 1.5),
    left: (screenWidth * 0.15),
    top: 50,
    backgroundColor: DUSTY_ORANGE,
    alignItems: 'center',
  },
  swiperCounterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiperCounterText: {
    color: WHITE,
    fontSize: 28,
    fontWeight: '100',
  },
  wishListDetailView: {
    elevation: 4,
    shadowColor: BLACK,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: CARD_WIDTH - 20,
    height: CARD_HEIGHT,
    borderRadius: 8,
    backgroundColor: BLACK,
    marginTop: 3,
    marginBottom: 22,
  },
  wishListDetailWrapper: {
    width: CARD_WIDTH - 20,
    height: CARD_HEIGHT,
    borderRadius: 8,
    backgroundColor: WHITE,
  },
  wishListDetailWrapperOpacity: {
    width: CARD_WIDTH - 20,
    height: CARD_HEIGHT,
    borderRadius: 8,
    backgroundColor: WHITE,
    opacity: 0.5,
  },
  wishListDetailImageWrapperBlackOpacity: {
    flex: 1.2,
    backgroundColor: BLACK,
    borderRadius: 8,
  },
  wishListDetailImageWrapper: {
    flex: 1.2,
    borderRadius: 8,
  },
  wishListDetailImage: {
    flex: 1,
    borderRadius: 8,
    width: CARD_WIDTH - 20,
  },
  dibsWishListDetailImage: {
    flex: 1,
    borderRadius: 8,
    flexGrow: 1,
    height: null,
    width: null,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  opacityImage: {
    flexGrow: 1,
    borderRadius: 8,
    height: null,
    width: CARD_WIDTH - 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishListDetailHeader: {
    flex: 3,
    backgroundColor: WHITE,
    width: CARD_WIDTH - 20,
  },
  wishListDetailUpperHeader: {
    paddingTop: 6,
    paddingLeft: 19,
    paddingRight: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wishListDetailBottomHeader: {
    paddingTop: 5,
    paddingLeft: 19,
    paddingRight: 19,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  wishListDetailDescription: {
    color: DARK_TAUPE,
    fontSize: 12,
    paddingBottom: 5,
  },
  wishListDetailLink: {
    color: WARM_GREY,
    fontSize: 12,
  },
  itemsContainer: {
    width: CARD_WIDTH,
    alignItems: 'center',
  },
  wishListDetailName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK_TAUPE,
    paddingBottom: 5,
  },
  wishListDetailLinkContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    paddingRight: 20,
  },
  wishListDetailLinkIcon: {
    marginRight: 10,
  },
  backButton: {
    paddingTop: 10,
    paddingLeft: 20,
  },
  backButtonImage: {
    width: 10 + (screenWidth * 0.01),
    height: 15 + (screenWidth * 0.01),
  },
  addFriendsRowTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemName: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: WHITE,
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 25 + (screenWidth * 0.05),
    height: 25 + (screenWidth * 0.05),
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
  unselectedDibsButton: {
    height: 36,
    width: 100,
    borderRadius: 18,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: DUSTY_ORANGE,
    borderWidth: 1,
  },
  unselectedDibsButtonText: {
    fontSize: 14,
    color: DUSTY_ORANGE,
  },
  selectedDibsButton: {
    height: 36,
    width: 100,
    borderRadius: 18,
    backgroundColor: DUSTY_ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: WHITE,
    borderWidth: 1,
  },
  selectedDibsButtonText: {
    fontSize: 14,
    color: WHITE,
  },
  unselectedPurchasedButton: {
    height: 36,
    width: 100,
    borderRadius: 18,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: MINT_COLOR,
    borderWidth: 1,
    color: MINT_COLOR,
  },
  unselectedPurchasedButtonText: {
    fontSize: 14,
    color: MINT_COLOR,
  },
  selectedPurchasedButton: {
    height: 36,
    width: 100,
    borderRadius: 18,
    backgroundColor: MINT_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: WHITE,
    borderWidth: 1,
    color: MINT_COLOR,
  },
  selectedPurchasedButtonText: {
    fontSize: 14,
    color: WHITE,
  },
  listItemButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  dibsListItemButtonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  cardDetailContainer: {
    height: CARD_HEIGHT / 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cardDetailHeader: {
    marginTop: 42,
    fontSize: 18,
    fontWeight: 'bold',
    color: WARM_GREY,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    width: CARD_WIDTH / 1.5,
  },
  giftImage: {
    height: 150,
    width: 150,
    zIndex: 1,
    top: (CARD_HEIGHT / 2) - 75,
    left: (CARD_WIDTH / 2) - 85,
    position: 'absolute',
  },
});

const mapStateToProps = createStructuredSelector({
  loginStore: selectLogin(),
  wishListStore: selectWishList(),
  friendsStore: selectFriends(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...wishlistActions,
      ...NotificationsActions,
      ...confirmModalActions,
    }, dispatch),
  };
}

export class WishListDetail extends React.Component {
  constructor(props) {
    super();

    this.state = {
      currentSlide: 1,
      clipboardCopied: false,
      giftLink: '',
      friendName: '',
      isUpdatingGift: false,
      selectedWishList: props.wishListStore.selectedWishList,
    };

    this.renderPagination = this.renderPagination.bind(this);
    this.renderWishListDetail = this.renderWishListDetail.bind(this);
    this.onSnapToItem = this.onSnapToItem.bind(this);
    this.openWishListItemLink = this.openWishListItemLink.bind(this);
    this.renderCarousel = this.renderCarousel.bind(this);
    this.onWishListObtainedDibs = this.onWishListObtainedDibs.bind(this);
    this.onWishListUpdated = this.onWishListUpdated.bind(this);
  }

  componentDidMount() {
    this.setFriendName();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedWishList: nextProps.wishListStore.selectedWishList,
    });
  }

  onSnapToItem(slideIndex) {
    this.setState({
      currentSlide: slideIndex + 1,
    });
  }

  onWishListObtainedDibs(item) {
    const wishList = Object.assign({}, this.state.selectedWishList);
    const wishListItem = wishList.items
      .filter((wishListItem) => item._id === wishListItem._id)[0]; //eslint-disable-line

    if (wishListItem.dibsedBy) {
      delete wishListItem.dibsedBy;
    } else {
      wishListItem.dibsedBy = this.props.loginStore.user._id; // eslint-disable-line
      const notificationType = 'dibs';
      const notificationOption = getNotificationMessageOption(notificationType, null);
      const notification = {
        personId: this.state.selectedWishList.createdBy,
        notificationType,
        notificationOption,
        seen: false,
      };
      this.props.actions.createNotification(notification);
    }
    const payload = {
      wishList,
      callback: this.onWishListUpdated,
    };
    this.props.actions.createWishAction(payload);
  }

  onWishListUpdated() {
    this.setState({
      isUpdatingGift: false,
    });

    const purchasedItems = this.props.wishListStore.selectedWishList.items.filter((item) => item.purchasedBy);

    if (purchasedItems.length === this.props.wishListStore.selectedWishList.items.length) {
      const notificationType = 'wishlistCompleted';
      const notificationOption = getNotificationMessageOption(notificationType, null);
      const notification = {
        personId: this.props.wishListStore.selectedWishList.createdBy,
        notificationType,
        notificationOption,
        messageItem: this.props.wishListStore.selectedWishList.name,
        seen: false,
      };
      this.props.actions.createNotification(notification);
    }
  }

  setFriendName() {
    const friendName = `${this.props.friendsStore.selectedFriend.firstName} ${this.props.friendsStore.selectedFriend.lastName}`;
    this.setState({
      friendName,
    });
  }

  openWishListItemLink(link) {
    return () => Linking.canOpenURL(link).then(this.linkingCallback(link));
  }

  linkingCallback(link) {
    return (supported) => {
      if (supported) {
        Linking.openURL(link);
      }
    };
  }

  goBack() {
    Actions.pop();
  }

  updateDibs(item) {
    return () => {
      const payload = {
        personId: this.props.wishListStore.selectedWishList.createdBy,
        userId: this.props.loginStore.user._id, //eslint-disable-line
        selectedWishListId: this.state.selectedWishList._id, //eslint-disable-line
        wishListItem: item,
        callback: this.onWishListObtainedDibs(item),
      };

      this.props.actions.getWishlistsForUpdate(payload);
    };
  }

  updatePurchased(item) {
    return () => {
      const wishList = Object.assign({}, this.props.wishListStore.selectedWishList);
      const wishListItem = wishList.items
      .filter((wishListItem) => item._id === wishListItem._id //eslint-disable-line
        )[0];

      if (wishListItem.purchasedBy) {
        delete wishListItem.purchasedBy;
      } else {
        wishListItem.purchasedBy = this.props.loginStore.user._id; // eslint-disable-line
        const notificationType = 'purchased';
        const notificationOption = getNotificationMessageOption(notificationType, null);
        const notification = {
          personId: this.props.wishListStore.selectedWishList.createdBy,
          notificationType,
          notificationOption,
          seen: false,
        };
        this.props.actions.createNotification(notification);
      }

      const payload = {
        wishList,
        callback: this.onWishListUpdated,
      };

      this.props.actions.createWishAction(payload);
    };
  }
  wishListDetailWrapperStyle(item) {
    if (item.purchasedBy) {
      if (item.purchasedBy !== this.props.loginStore.user._id) {
        return styles.wishListDetailImageWrapperBlackOpacity;
      }
    }

    if (item.dibsedBy) {
      if (item.dibsedBy !== this.props.loginStore.user._id) {
        return styles.wishListDetailImageWrapperBlackOpacity;
      }
    }
    return styles.wishListDetailImageWrapper;
  }
  renderCardDetails(item) {
    if (item.purchasedBy && item.purchasedBy !== this.props.loginStore.user._id) {
      return (
        <View style={styles.cardDetailContainer}>
          <Text
            style={styles.cardDetailHeader}
          >
          The item has already been purchased.
        </Text>
        </View>);
    }
    if (item.dibsedBy && item.dibsedBy !== this.props.loginStore.user._id) {
      return (
        <View style={styles.cardDetailContainer}>
          <Text
            style={styles.cardDetailHeader}
          >
          Someone else called dibs on this item.
        </Text>
        </View>);
    }

    return (
      <ScrollView>
        <View
          style={styles.wishListDetailHeader}
        >
          <View
            style={styles.wishListDetailUpperHeader}
          >
            <Text
              style={styles.wishListDetailName}
            >
              {item.name}
            </Text>
          </View>
          <View
            style={styles.wishListDetailBottomHeader}
          >
            <Text
              numberOfLines={2}
              style={styles.wishListDetailDescription}
            >
              {item.description}
            </Text>
            {
              item.link ? (
                <View style={styles.wishListDetailLinkContainer}>
                  <Image style={styles.wishListDetailLinkIcon} source={urlIconGray} />
                  <TouchableHighlight
                    accessible
                    accessibilityLabel="wishlink"
                    underlayColor="transparent"
                    onPress={this.openWishListItemLink(item.link)}
                  >
                    <Text
                      numberOfLines={3}
                      style={styles.wishListDetailLink}
                    >
                      {item.link}
                    </Text>
                  </TouchableHighlight>
                </View>
              ) : null
            }
            {this.renderGiftButtons(item)}
          </View>
        </View>
      </ScrollView>);
  }
  renderImageOpacity(item) {
    if (item.purchasedBy) {
      if (item.purchasedBy !== this.props.loginStore.user._id) {
        return (
          <View >
            <Image
              style={{ borderRadius: 8 }}
              source={purchasedLabelImage}
            />
          </View>);
      }
      return (
        <View >
          <Image
            style={styles.opacityImage}
            source={purchasedOpacityImage}
          >
            <Image
              style={{ borderRadius: 8 }}
              source={purchasedLabelImage}
            />
          </Image>
        </View>);
    }

    if (item.dibsedBy) {
      if (item.dibsedBy !== this.props.loginStore.user._id) {
        return (
          <View >
            <Image
              style={{ borderRadius: 8 }}
              source={dibsLabelImage}
            />
          </View>);
      }
      return (
        <View >
          <Image
            style={styles.opacityImage}
            source={dibsOpacityImage}
          >
            <Image
              style={{ borderRadius: 8 }}
              source={dibsLabelImage}
            />
          </Image>
        </View>);
    }
    return null;
  }

  renderGiftButtons(item) {
    return (item.purchasedBy ?
      (<View style={styles.listItemButtonContainer}>
        <TouchableHighlight
          style={styles.selectedPurchasedButton}
          underlayColor={MINT_COLOR}
          onPress={this.updatePurchased(item)}
        >
          <Text
            style={styles.selectedPurchasedButtonText}
          >
                      Purchased
                    </Text>
        </TouchableHighlight>
      </View>) :
      (<View style={item.dibsedBy ? styles.dibsListItemButtonContainer : styles.listItemButtonContainer}>
        <TouchableHighlight
          style={item.dibsedBy ? styles.selectedDibsButton : styles.unselectedDibsButton}
          underlayColor={BACKGROUNDCOLOR}
          onPress={this.updateDibs(item)}
        >
          <Text
            style={item.dibsedBy ? styles.selectedDibsButtonText : styles.unselectedDibsButtonText}
          >
                      Dibs
                    </Text>
        </TouchableHighlight>
        { item.dibsedBy ?
        (<TouchableHighlight
          style={styles.unselectedPurchasedButton}
          underlayColor={MINT_COLOR}
          onPress={this.updatePurchased(item)}
        >
          <Text
            style={styles.unselectedPurchasedButtonText}
          >
                      Purchase
                    </Text>
        </TouchableHighlight>) : null }
      </View>)
    );
  }

  renderPagination() {
    const index = this.state.currentSlide;
    const total = this.state.selectedWishList.items.length;
    return (
      <Text
        style={styles.swiperCounterText}
      >
        {index}/{total}
      </Text>
    );
  }
  renderGiftImage(item) {
    return (<Image
      resizeMode="cover"
      style={item.dibsedBy ? styles.dibsWishListDetailImage : styles.wishListDetailImage}
      source={item.imageUrl ? { uri: `${config.S3Bucket}${item.imageUrl.replace('uploads/', '')}` } : noGiftIcon}
    >
      { this.renderImageOpacity(item) }
    </Image>);
  }
  renderWishListDetail(item) {
    const wishListDetailImageWrapper = this.wishListDetailWrapperStyle(item);
    return (
      <View style={styles.wishListDetailView}>
        <View
          style={item.purchasedBy && item.purchasedBy !== this.props.loginStore.user._id ?
          styles.wishListDetailWrapperOpacity : styles.wishListDetailWrapper}
        >
          { item.dibsedBy && item.dibsedBy !== this.props.loginStore.user._id ?
            <Image style={styles.giftImage} source={giftIlustration} /> : null
          }
          <View
            accessible
            accessibilityLabel="wishlist-view"
            style={wishListDetailImageWrapper}
          >
            <MenuContext>
              {this.renderGiftImage(item)}
            </MenuContext>
          </View>
          { this.renderCardDetails(item) }
        </View>
      </View>);
  }

  renderCarousel() {
    return (<View>
      <Carousel
        ref={(carousel) => { this._carousel = carousel; }} // eslint-disable-line
        sliderWidth={width}
        itemWidth={CARD_WIDTH}
        firstItem={0}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        showsHorizontalScrollIndicator={false}
        snapOnAndroid
        removeClippedSubviews={false}
        onSnapToItem={this.onSnapToItem}
      >
        {this.state.selectedWishList.items.map((item) =>
            (
              <View
                key={`${item}-${item._id}`} // eslint-disable-line
                style={styles.itemsContainer}
              >
                { this.renderWishListDetail(item) }
              </View>
            ))
        }
      </Carousel>
    </View>);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wishlistNavBarContainer}>
          <TouchableHighlight
            accessible
            accessibilityLabel="Go Back to My Lists"
            underlayColor={DUSTY_ORANGE}
            onPress={this.goBack}
            style={styles.backButton}
          >
            <View>
              <Image
                style={styles.backButtonImage}
                source={backIcon}
              />
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.wishListDetailContainer}>
          <View>
            <View style={styles.orangeContainer}></View>
            <View style={styles.wishListNameContainer}>
              <Text style={styles.headerTitle}>
                {this.state.selectedWishList.name}
              </Text>
            </View>
            <View style={styles.friendNameContainer}>
              <View style={styles.iconContainer}>
                <View style={styles.circle}>
                  <Text style={styles.iconText}>
                    {getUserNameInitials([this.props.friendsStore.selectedFriend.firstName, this.props.friendsStore.selectedFriend.lastName])}
                  </Text>
                </View>
              </View>
              <View style={styles.addFriendsRowTextContainer}>
                <Text style={styles.listItemName}>
                  {this.state.friendName}
                </Text>
              </View>
            </View></View>
          { this.state.selectedWishList.items.length === 0 ?
          (<View style={styles.wishListItemCard}>
            <View style={styles.wishListItemImageWrapper}>
              <Image
                style={styles.wishListItemImage}
                resizeMode="contain"
                source={giftIcon}
              />
            </View>
          </View>) :
          (<View style={[styles.wishListItemAddNewGiftWrapper, this.props.wishListStore.disabledWishlist ? styles.disabledWishlistAddNewGiftWrapper : null]}>
            <View>
              {this.renderCarousel()}
              <View style={styles.swiperCounterContainer}>
                {this.renderPagination()}
              </View>
            </View>
          </View>
          )}
        </View>
      </View>
    );
  }
}

WishListDetail.propTypes = {
  wishListStore: React.PropTypes.any.isRequired,
  friendsStore: React.PropTypes.any.isRequired,
  loginStore: React.PropTypes.any.isRequired,
  actions: React.PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WishListDetail);
