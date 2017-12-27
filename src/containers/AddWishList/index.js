import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { selectLogin } from '../LoginPage/selectors';
import { selectWishList } from '../WishListPage/selectors';
import { selectFriends } from '../Friends/selectors';
import * as wishlistActions from '../WishListPage/actions';
import * as confirmModalActions from '../ConfirmModal/actions';
import * as FriendsActions from '../Friends/actions';
import * as NotificationsActions from '../Notifications/actions';
import { getNotificationMessageOption } from '../../services/helpers/utils';
import {
  BACKGROUNDCOLOR,
  INPUT_BACKGROUNDCOLOR,
  INPUT_COLOR,
  TEXT_COLOR,
  DUSTY_ORANGE,
  DARK_TAUPE,
} from '../../styles/color-constants';

const backIcon = require('../../../img/Chevron-White_3x.png');
const warningIcon = require('../../../img/warning_icon.png');
const clearTextIcon = require('../../../img/clear_text_icon.png');
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
  },
  wishListContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  wishlistNavBarContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    paddingTop: 0,
  },
  wishlistTextNavBar: {
    color: TEXT_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputsContainer: {
    width: 290,
    marginTop: 50,
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: INPUT_BACKGROUNDCOLOR,
    flexDirection: 'row',
    paddingRight: 10,
    height: 50,
  },
  textInput: {
    flex: 1,
    padding: 15,
    marginLeft: 5,
    marginRight: 10,
    borderBottomWidth: 0,
    fontSize: 16,
    color: INPUT_COLOR,
  },
  clearTextInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: 20,
  },
  imgClearText: {
    minHeight: 13,
    minWidth: 13,
  },
  addWishListNameTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: TEXT_COLOR,
    alignSelf: 'center',
    marginTop: 50,
  },
  errorMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  errorMessageText: {
    marginLeft: 10,
    color: TEXT_COLOR,
  },
  backButton: {
    padding: 10,
    paddingTop: 0,
  },
  createButton: {
    padding: 5,
  },
  spinnerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  spinnerText: {
    color: DARK_TAUPE,
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 25,
    marginRight: 25,
  },
  modalSpinner: {
    marginTop: 20,
  },
  backButtonImage: {
    width: 10 + (screenWidth * 0.01),
    height: 20 + (screenWidth * 0.01),
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
      ...confirmModalActions,
      ...FriendsActions,
      ...NotificationsActions,
    }, dispatch),
  };
}

export class AddWishlist extends React.Component {
  constructor(props) {
    super();
    let selectedWishList = props.wishListStore.selectedWishList;
    if (!selectedWishList) {
      selectedWishList = { name: '' };
    }

    this.state = {
      wishListId: selectedWishList._id, // eslint-disable-line
      wishListName: selectedWishList.name,
      errorMessage: '',
      isCreatingGiftList: false,
    };

    this.onSubmitEditing = this.onSubmitEditing.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.createWishlist = this.createWishlist.bind(this);
    this.returnToWishlist = this.returnToWishlist.bind(this);
    this.onWishListCreation = this.onWishListCreation.bind(this);
    this.clearText = this.clearText.bind(this);
  }

  componentDidMount() {
    this.props.actions.getAllFriendsAction(this.props.loginStore.user._id); // eslint-disable-line
  }

  onSubmitEditing() {
    this.wishListNameInput.blur();
  }

  onChangeText(wishListName) {
    this.setState({
      wishListName,
    });
  }

  onWishListCreation() {
    const notifications = this.props.friendsStore.friends.map((friend) => {
      const notificationType = 'wishlistCreated';
      const notificationOption = getNotificationMessageOption(notificationType, null);
      const notification = {
        personId: friend._id, // eslint-disable-line
        notificationType,
        notificationOption,
        messageItem: `${this.props.loginStore.user.firstName} ${this.props.loginStore.user.lastName}`,
        seen: false,
      };
      return notification;
    });

    this.props.actions.createNotification(notifications);
    this.props.actions.hideConfirmModal();
    Actions.WishList();
  }

  createWishlist() {
    const wishListName = this.state.wishListName.trim();
    Keyboard.dismiss();

    if (!wishListName) {
      this.setState({
        errorMessage: 'The gift list name is required',
      });

      this.onChangeText(wishListName);
      return;
    }

    if (wishListName.length === 1) {
      this.setState({
        errorMessage: 'The gift list name is too short. It should be at least 2 characters or more',
      });

      return;
    }

    const user = this.props.loginStore.user;

    if (this.state.wishListId) {
      const selectedWishList = this.props.wishListStore.selectedWishList;
      selectedWishList.name = wishListName;

      const payload = {
        wishList: selectedWishList,
        goToAction: 'WishList',
      };

      this.props.actions.updateWishListAction(payload);
    } else {
      if (this.state.isCreatingGiftList) {
        return;
      }
      this.state.isCreatingGiftList = true;
      this.props.actions.showConfirmModal({
        content: (<View style={styles.spinnerWrapper}>
          <Text style={styles.spinnerText}>Creating list...</Text>
          <ActivityIndicator
            size="large"
            style={styles.modalSpinner}
            color={DUSTY_ORANGE}
          />
        </View>),
        buttons: [],
      });

      const payload = {
        wishList: {
          createdBy: user._id, // eslint-disable-line
          name: wishListName,
          items: [],
        },
        callback: this.onWishListCreation,
      };
      this.props.actions.createWishListAction(payload);
    }
  }

  returnToWishlist() {
    Actions.WishList();
  }

  clearText() {
    this.onChangeText('');
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        <View style={styles.wishlistNavBarContainer}>
          <TouchableHighlight
            accessible
            accessibilityLabel="Go Back to My Lists"
            underlayColor={BACKGROUNDCOLOR}
            onPress={this.returnToWishlist}
            style={styles.backButton}
          >
            <View>
              <Image
                style={styles.backButtonImage}
                source={backIcon}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            accessible
            accessibilityLabel="Create"
            underlayColor={BACKGROUNDCOLOR}
            onPress={this.createWishlist}
            style={styles.createButton}
          >
            <View>
              <Text style={styles.wishlistTextNavBar}>
                {
                  this.state.wishListId ? 'Done' : 'Create'
                }
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.wishListContainer}>
          <View>
            <View>
              <Text
                accessible
                accessibilityLabel="New gift list name"
                style={styles.addWishListNameTitle}
              >
              New gift list name
              </Text>
            </View>
            <View style={styles.inputsContainer}>
              <TextInput
                accessible
                accessibilityLabel="WishListName"
                maxLength={50}
                placeholder={'Gift List Name'}
                placeholderTextColor={'#AAA'}
                ref={(textInput) => { this.wishListNameInput = textInput; }}
                style={styles.textInput}
                value={this.state.wishListName}
                underlineColorAndroid={'transparent'}
                blurOnSubmit
                onSubmitEditing={this.onSubmitEditing}
                onChangeText={this.onChangeText}
              />
              {
                this.state.wishListName.length > 0 ? (
                  <TouchableHighlight
                    onPress={this.clearText}
                    underlayColor={BACKGROUNDCOLOR}
                  >
                    <View style={styles.clearTextInputContainer}>
                      <Image
                        style={styles.imgClearText}
                        source={clearTextIcon}
                      />
                    </View>
                  </TouchableHighlight>
                ) : null
              }
            </View>
            {this.state.errorMessage ? (
              <View style={styles.errorMessageContainer}>
                <Image
                  source={warningIcon}
                />
                <Text
                  style={styles.errorMessageText}
                >
                  {this.state.errorMessage}
                </Text>
              </View>
              ) : (
                <View style={styles.errorMessageContainer} />
              )
            }
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

AddWishlist.propTypes = {
  actions: React.PropTypes.any.isRequired,
  loginStore: React.PropTypes.any.isRequired,
  wishListStore: React.PropTypes.any.isRequired,
  friendsStore: React.PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddWishlist);
