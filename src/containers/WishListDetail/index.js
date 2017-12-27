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
  Clipboard,
  Platform,
} from 'react-native';
import {
  Menu,
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import Carousel from 'react-native-snap-carousel';
import { selectLogin } from '../LoginPage/selectors';
import { selectWishList } from '../WishListPage/selectors';
import * as wishlistActions from '../WishListPage/actions';
import {
  DUSTY_ORANGE,
  WHITE,
  LIGHT_TAN,
  INPUT_COLOR,
  BLACK,
  WARM_GREY,
  DARK_TAUPE,
} from '../../styles/color-constants';
import MenuRenderer from '../WishListPage/menuRenderer';
import config from '../../../config.json';
import * as confirmModalActions from '../ConfirmModal/actions';
import CustomTextInput from '../../components/CustomTextInput';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 80;
const CARD_HEIGHT = height - 250;
const menuIcon = require('../../../img/more_button.png')
const backIcon = require('../../../img/Chevron-White_3x.png');
const giftIcon = require('../../../img/gift.png');
const noGiftIcon = require('../../../img/no_gift_image.png');
const urlIconGray = require('../../../img/url_icon_gray.png');
const clearTextIcon = require('../../../img/clear_text_icon.png');
const noWishListImage = require('../../../img/no_wishlists.png');
const urlIcon = require('../../../img/url_icon.png');

const screenWidth = Dimensions.get('window').width;

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
    padding: 10,
    paddingTop: 0,
  },
  centerItem: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    paddingTop: 7,
    fontSize: 18,
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'sans-serif-light',
    color: WHITE,
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
  wishListItemAdd: {
    flex: 0.5,
    backgroundColor: WHITE,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  wishListItemAddTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishListItemAddText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DUSTY_ORANGE,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  leftButtonContainer: {
    backgroundColor: WHITE,
    justifyContent: 'center',
    height: 35,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    flex: 1,
    marginVertical: 7,
  },
  rightButtonContainer: {
    backgroundColor: WHITE,
    justifyContent: 'center',
    height: 35,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    flex: 1,
    marginVertical: 7,
  },
  touchContainer: {
    marginVertical: 10,
    flex: 1,
    height: 50,
    justifyContent: 'center',
  },
  rightTouchContainer: {
    marginLeft: 2,
    paddingRight: 50,
  },
  leftTouchContainer: {
    paddingLeft: 50,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 14,
    color: INPUT_COLOR,
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
  wishListDetailWrapper: {
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
    backgroundColor: WHITE,
    marginTop: 3,
    marginBottom: 22,
  },
  wishListDetailImageWrapper: {
    flex: 1.2,
  },
  wishListDetailImage: {
    flex: 1,
    borderRadius: 8,
    width: CARD_WIDTH - 20,
  },
  wishListDetailMenu: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  wishListDetailMenuTrigger: {
    width: 20,
    height: 28,
  },
  wishListDetailMenuOptionsContainer: {
    borderRadius: 3,
    padding: 5,
    width: 100,
  },
  wishListDetailMenuOptionWrapper: {
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
    backgroundColor: INPUT_COLOR,
    marginTop: 3,
    alignSelf: 'flex-end',
  },
  menuOptionText: {
    color: DUSTY_ORANGE,
  },
  fixCoverImagesBorder: {
    backgroundColor: WHITE,
    position: 'absolute',
    height: 7,
    bottom: 0,
    left: 0,
    right: 0,
  },
  wishListDetailHeader: {
    flex: 3,
    backgroundColor: WHITE,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
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
    padding: 7,
  },
  moreButtonImage: {
    width: 20 + (screenWidth * 0.01),
    height: 20 + (screenWidth * 0.01),
  },
  backButtonImage: {
    width: 10 + (screenWidth * 0.01),
    height: 20 + (screenWidth * 0.01),
  },
  shareListModal: {
    alignItems: 'center',
  },
  closeShareButtonWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  closeShareButton: {
    width: 15,
    height: 15,
  },
  shareListImage: {
    alignItems: 'center',
    width: 140,
    height: 140,
    marginTop: 30,
    marginBottom: 20,

  },
  clipboardButton: {
    width: 180,
    height: 40,
    borderRadius: 20,
    borderColor: DUSTY_ORANGE,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCopied: {
    backgroundColor: DUSTY_ORANGE,
  },
  clipboardButtonTextStyle: {
    color: DUSTY_ORANGE,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  textCopied: {
    color: WHITE,
  },
  modalText: {
    color: DARK_TAUPE,
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 25,
    marginRight: 25,
  },
});

const mapStateToProps = createStructuredSelector({
  loginStore: selectLogin(),
  wishListStore: selectWishList(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...wishlistActions,
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
      selectedWishList: props.wishListStore.selectedWishList,
    };

    this.renderPagination = this.renderPagination.bind(this);
    this.renderWishListDetail = this.renderWishListDetail.bind(this);
    this.onMenuOptionSelected = this.onMenuOptionSelected.bind(this);
    this.onSnapToItem = this.onSnapToItem.bind(this);
    this.openWishListItemLink = this.openWishListItemLink.bind(this);
    this.deleteWish = this.deleteWish.bind(this);
    this.renderCarousel = this.renderCarousel.bind(this);
    this.goToAddUpdateWishListItem = this.goToAddUpdateWishListItem.bind(this);
    this.shareWishList = this.shareWishList.bind(this);
    this.onCopyClipboard = this.onCopyClipboard.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onMenuOptionSelected(value) {
    if (value.action === 'delete') {
      this.props.actions.showConfirmModal({
        content: (<Text style={styles.modalText}>Are you sure you want to delete the gift {value.item.name} ?</Text>),
        buttons: [{
          text: 'Cancel',
          onPress: this.props.actions.hideConfirmModal,
        }, {
          text: 'Delete',
          onPress: this.deleteWish(value.item),
        }],
      });

      const index = this.state.selectedWishList.items.indexOf(value.item);
      if (index === this.props.wishListStore.selectedWishList.items.length - 1) {
        this._carousel.snapToItem(index - 1); // eslint-disable-line
      }
    } else {
      this.goToAddUpdateWishListItem(value.item);
    }
  }

  onSnapToItem(slideIndex) {
    this.setState({
      currentSlide: slideIndex + 1,
    });
  }

  onCopyClipboard() {
    this.setState({
      clipboardCopied: true,
    });
    Clipboard.setString(this.state.giftLink);
    setTimeout(() => {
      this.renderModal(this.state.giftLink);
    }, 10);
  }

  openWishListItemLink(link) {
    return () => Linking.canOpenURL(link).then(this.linkingCallback(link));
  }

  goToAddUpdateWishListItem(item) {
    let wishListItem = {};

    if (!item._id) { // eslint-disable-line
      wishListItem.name = '';
      wishListItem.description = '';
      wishListItem.link = '';
      wishListItem.imageUrl = '';
    } else {
      wishListItem = item;
    }

    const payload = {
      wishListItem,
      goToAction: 'AddNewGiftForm',
    };

    this.props.actions.selectWishListItemAction(payload);
  }

  linkingCallback(link) {
    return (supported) => {
      if (supported) {
        Linking.openURL(link);
      }
    };
  }

  goBack() {
    Actions.WishList();
  }

  deleteWish(item) {
    return () => {
      const wishList = this.state.selectedWishList;
      const index = wishList.items.indexOf(item);
      wishList.items.splice(index, 1);

      const payload = {
        wishList,
      };

      this.props.actions.removeWishAction(payload);
      this.props.actions.hideConfirmModal();
    };
  }

  shareWishList() {
    const link = `gifthub://gifthubapp.com/#/wishlist/${this.state.selectedWishList._id}`; // eslint-disable-line

    this.setState({
      clipboardCopied: false,
      giftLink: link,
    });
    this.renderModal(link);
  }
  closeModal() {
    this.setState({
      clipboardCopied: false,
    });
    this.props.actions.hideConfirmModal();
  }
  renderModal(link) {
    this.props.actions.showConfirmModal({
      content: (<View style={styles.shareListModal}>

        <TouchableHighlight
          onPress={this.closeModal}
          underlayColor="transparent"
          style={styles.closeShareButtonWrapper}
        >
          <Image
            source={clearTextIcon}
            style={styles.closeShareButton}
          />
        </TouchableHighlight>
        <Image
          source={noWishListImage}
          style={styles.shareListImage}
        />
        <CustomTextInput
          accessibilityLabel={'giftLink'}
          value={link}
          placeHolder={'Link'}
          maxLength={50}
          icon={urlIcon}
          multiline
          editable={false}
          hideClearButton
        />
        <TouchableHighlight
          accessible
          accessibilityLabel="copyToClipboard"
          style={[styles.clipboardButton, (this.state.clipboardCopied ? styles.buttonCopied : null)]}
          onPress={this.onCopyClipboard}
          underlayColor="transparent"
        >
          <Text
            style={[styles.clipboardButtonTextStyle, (this.state.clipboardCopied ? styles.textCopied : null)]}
          >{this.state.clipboardCopied ? 'Copied!' : 'Copy to Clipboard'}</Text>
        </TouchableHighlight>
      </View>),
      buttons: [],
    });
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

  renderWishListDetail(item) {
    return (<View style={styles.wishListDetailWrapper}>
      <View
        accessible accessibilityLabel="wishlist-view" style={styles.wishListDetailImageWrapper}
      >
        <MenuContext>
          <Image
            resizeMode="cover" style={styles.wishListDetailImage}
            source={item.imageUrl ? { uri: `${config.S3Bucket}${item.imageUrl.replace('uploads/', '')}` } : noGiftIcon}
          />
          { this.props.wishListStore.disabledWishlist ? null : (<Menu
            renderer={MenuRenderer} style={styles.wishListDetailMenu} onSelect={this.onMenuOptionSelected}
          >
            <MenuTrigger
              accessible accessibilityLabel="dotMenuWishList"
              TriggerTouchableComponent={TouchableHighlight}
              customStyles={{
                triggerOuterWrapper: styles.wishListDetailMenuTrigger,
              }}
            >
              <View
                style={styles.menuDotWrapper}
              >
                <Image
                  style={styles.moreButtonImage}
                  source={menuIcon}
                />
              </View>
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: styles.wishListDetailMenuOptionsContainer,
                optionWrapper: styles.wishListDetailMenuOptionWrapper,
              }}
            >
              <MenuOption value={{ action: 'edit', item }}>
                <Text
                  accessible accessibilityLabel="dotMenuWishListEdit" style={styles.menuOptionText}
                > Edit</Text>
              </MenuOption>
              <MenuOption value={{ action: 'delete', item }}>
                <Text
                  accessible accessibilityLabel="dotMenuWishListDelete" style={styles.menuOptionText}
                >Delete</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>) }
        </MenuContext>
        <View style={styles.fixCoverImagesBorder} />
      </View>
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
                      style={styles.wishListDetailLink}
                    > {item.link} </Text>
                  </TouchableHighlight>
                </View>
              ) : null
            }
          </View>
        </View>
      </ScrollView>
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
          <View style={styles.centerItem}>
            <Text
              style={styles.headerTitle}
            >{ this.state.selectedWishList.name }</Text>
          </View>
        </View>
        <View style={styles.wishListDetailContainer}>
          { this.state.selectedWishList.items.length === 0 ?
          (<View style={styles.wishListItemCard}>
            <View style={styles.wishListItemImageWrapper}>
              <Image
                style={styles.wishListItemImage}
                resizeMode="contain"
                source={giftIcon}
              />
            </View>
            <View style={styles.wishListItemAdd}>
              <TouchableHighlight
                accessible
                accessibilityLabel="Add New Gift"
                underlayColor="transparent"
                onPress={this.goToAddUpdateWishListItem}
                style={styles.wishListItemAddTouch}
              >
                <Text style={styles.wishListItemAddText}>+ Add New Gift</Text>
              </TouchableHighlight>
            </View>
          </View>) :
          (<View style={[styles.wishListItemAddNewGiftWrapper, this.props.wishListStore.disabledWishlist ? styles.disabledWishlistAddNewGiftWrapper : null]}>
            {this.props.wishListStore.disabledWishlist ? null : (<View style={styles.buttonContainer}><TouchableHighlight
              accessible
              accessibilityLabel="Add New Gift"
              underlayColor={'transparent'}
              onPress={this.goToAddUpdateWishListItem}
              style={[styles.touchContainer, styles.leftTouchContainer]}
            >
              <View
                style={styles.leftButtonContainer}
              >
                <Text style={styles.buttonText}>+ Add new gift</Text>
              </View>
            </TouchableHighlight><TouchableHighlight
              accessible
              accessibilityLabel="shareList"
              underlayColor={'transparent'}
              onPress={this.shareWishList}
              style={[styles.touchContainer, styles.rightTouchContainer]}
            >
              <View
                style={styles.rightButtonContainer}
              >
                <Text style={styles.buttonText}>Share list</Text>
              </View>
            </TouchableHighlight></View>)}
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
  actions: React.PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WishListDetail);
