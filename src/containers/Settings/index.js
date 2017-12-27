/* eslint no-underscore-dangle: 0 */

import React from 'react';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  Linking,
  Image,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {
  BLUE_GRAY_BACKGROUND,
  ICON_NAME_BACKGROUNDCOLOR,
  INPUT_COLOR,
  WHITE,
  DUSTY_ORANGE,
  TOAST_BACKGROUND_COLOR,
  TOAST_TEXT_COLOR,
  DARK_TAUPE,
} from '../../styles/color-constants';
import * as loginActions from '../LoginPage/actions';
import * as confirmModalActions from '../ConfirmModal/actions';
import { selectLogin } from '../LoginPage/selectors';
import config from '../../../config.json';
import { selectNotifications } from '../Notifications/selectors';
import * as NotificationsActions from '../Notifications/actions';

import {
  getUserNameInitials,
  isThereAnyStringEmpty,
  isThereAnyStringNotRespectingDeterminedLength,
} from '../../services/helpers/utils';

import CustomTextInput from '../../components/CustomTextInput';
import { EMAIL_REGEX } from '../../services/helpers/constants';


const termsAndConditionsUrl = config.termsAndConditionsUrl;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const orangeContainerHeight = screenHeight - ((screenHeight * 0.8) + 60);
const circleImage = require('../../../img/SignupAvatar_3x.png');
const cancelIcon = require('../../../img/white_cancel_3x.png');
const saveIcon = require('../../../img/check_icon_white_3x.png');
const styles = StyleSheet.create({
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
  touchableTermsAndConditions: {
    padding: 15,
    width: screenWidth,
    marginTop: 1,
    backgroundColor: WHITE,
  },
  touchableLogOut: {
    padding: 15,
    width: screenWidth,
    marginTop: 1,
    backgroundColor: WHITE,
  },
  touchableLogOutText: {
    color: DUSTY_ORANGE,
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'sans-serif',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: orangeContainerHeight - (40 + (screenWidth * 0.05)),
    position: 'absolute',
    left: (screenWidth * 0.5) - ((90 + (screenWidth * 0.05)) / 2),
  },
  circle: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 90 + (screenWidth * 0.05),
    height: 90 + (screenWidth * 0.05),
    borderRadius: (90 + (screenWidth * 0.05)) / 2,
    backgroundColor: ICON_NAME_BACKGROUNDCOLOR,
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: WHITE,
  },
  iconText: {
    alignSelf: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: INPUT_COLOR,
  },
  formContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  orangeContainer: {
    backgroundColor: DUSTY_ORANGE,
    height: orangeContainerHeight,
    width: screenWidth,
    borderBottomWidth: 1,
    borderBottomColor: WHITE,
  },
  grayContainer: {
    backgroundColor: BLUE_GRAY_BACKGROUND,
    width: screenWidth,
  },
  navBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: DUSTY_ORANGE,
  },
  cancelButtonImage: {
    width: 10 + (screenWidth * 0.02),
    height: 10 + (screenWidth * 0.02),
  },
  saveButtonImage: {
    width: 17 + (screenWidth * 0.02),
    height: 9 + (screenWidth * 0.02),
  },
  cancelButton: {
    padding: 7,
  },
  settingButtonsContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  headerTitle: {
    paddingTop: 7,
    fontSize: 18,
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'sans-serif-light',
    color: WHITE,
  },
  leftItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 7,
  },
  centerItem: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 7,
  },
  keyboardContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 0,
    width: screenWidth,
    height: screenHeight - 60,
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
  notificationsStore: selectNotifications(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...loginActions,
      ...confirmModalActions,
      ...NotificationsActions,
    }, dispatch),
  };
}

export class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      iconText: '',
      errorMessageForEmailCondition: undefined,
      errorMessageForFirstNameCondition: undefined,
      errorMessageForLastNameCondition: undefined,
      keyboardOpened: false,
    };

    this.showLogoutConfirmation = this.showLogoutConfirmation.bind(this);
    this.logOut = this.logOut.bind(this);
    this.openTermsAndConditions = this.openTermsAndConditions.bind(this);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.update = this.update.bind(this);
    this.cancel = this.cancel.bind(this);
    this.hideKeyboard = this.hideKeyboard.bind(this);
    this.setIconText = this.setIconText.bind(this);
    this.setInitialIconText = this.setInitialIconText.bind(this);
    this.errorMessageModalAction = this.errorMessageModalAction.bind(this);

    Keyboard.addListener('keyboardDidShow', () => {
      this.setState({
        keyboardOpened: true,
      });
    });

    Keyboard.addListener('keyboardDidHide', () => {
      this.setState({
        keyboardOpened: false,
      });
    });
  }

  componentDidMount() {
    this.onChangeFirstName(this.props.loginStore.user.firstName);
    this.onChangeLastName(this.props.loginStore.user.lastName);
    this.onChangeEmail(this.props.loginStore.user.email);
    this.setInterval(() => {
      this.props.actions.getNotifications(this.props.loginStore.user._id);
    }, 10000);
    this.setInitialIconText();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginStore.addUserNameMessageError
      !== this.props.loginStore.addUserNameMessageError &&
      nextProps.loginStore.addUserNameMessageError !== undefined) {
      this.props.actions.showConfirmModal({
        content: (<Text style={styles.modalText}>{nextProps.loginStore.addUserNameMessageError}</Text>),
        buttons: [{
          text: 'OK',
          onPress: this.errorMessageModalAction(),
        }],
      });
    }

    if (nextProps.loginStore.displayToastWhenSuccessfulUserUpdate !== undefined &&
        nextProps.loginStore.displayToastWhenSuccessfulUserUpdate !== null &&
        nextProps.loginStore.displayToastWhenSuccessfulUserUpdate !== this.props.loginStore.displayToastWhenSuccessfulUserUpdate &&
        nextProps.loginStore.displayToastWhenSuccessfulUserUpdate) {
      this.showToast();
      this.props.actions.removeToastForSuccessfulUserUpdate();
    }
  }

  onChangeFirstName(firstName) {
    if (firstName !== undefined) {
      this.setState({
        firstName,
      });

      const isFirstNameTextFieldEmpty = isThereAnyStringEmpty([firstName]);

      if (isFirstNameTextFieldEmpty) {
        this.setState({
          iconText: undefined,
          errorMessageForFirstNameCondition: 'Your first name is required.',
        });
        return;
      }

      const isFirstNameTextFieldNotRespecting = isThereAnyStringNotRespectingDeterminedLength([firstName], 2);

      if (isFirstNameTextFieldNotRespecting) {
        this.setState({
          iconText: undefined,
          errorMessageForFirstNameCondition: 'Should have at least 2 characters.',
        });
        return;
      }

      if (this.shouldIconTextBeSet()) {
        this.setIconText();
      }

      this.setState({
        errorMessageForFirstNameCondition: undefined,
      });
    }
  }

  onChangeLastName(lastName) {
    if (lastName !== undefined) {
      this.setState({
        lastName,
      });

      const isLastNameTextFieldEmpty = isThereAnyStringEmpty([lastName]);

      if (isLastNameTextFieldEmpty) {
        this.setState({
          iconText: undefined,
          errorMessageForLastNameCondition: 'Your last name is required.',
        });
        return;
      }

      const isLastNameTextFieldNotRespecting = isThereAnyStringNotRespectingDeterminedLength([lastName], 2);

      if (isLastNameTextFieldNotRespecting) {
        this.setState({
          iconText: undefined,
          errorMessageForLastNameCondition: 'Should have at least 2 characters.',
        });
        return;
      }

      if (this.shouldIconTextBeSet()) {
        this.setIconText();
      }

      this.setState({
        errorMessageForLastNameCondition: undefined,
      });
    }
  }

  onChangeEmail(email) {
    if (email !== undefined) {
      this.setState({
        email,
      });

      const isEmailTextFieldEmpty = isThereAnyStringEmpty([email]);

      if (isEmailTextFieldEmpty) {
        this.setState({
          errorMessageForEmailCondition: 'Please enter a valid email address.',
        });
        return;
      }

      this.setState({
        errorMessageForEmailCondition: undefined,
      });
    }
  }

  setIconText() {
    const iconText = getUserNameInitials([this.state.firstName, this.state.lastName]);

    this.setState({
      iconText,
    });
  }

  setInitialIconText() {
    const iconText = getUserNameInitials([this.props.loginStore.user.firstName, this.props.loginStore.user.lastName]);

    this.setState({
      iconText,
    });
  }

  logOut() {
    return () => {
      this.props.actions.logoutAction({
        goToAction: 'Login',
      });
      this.props.actions.hideConfirmModal();
    };
  }

  showLogoutConfirmation() {
    this.props.actions.showConfirmModal({
      content: (<Text style={styles.modalText}>Are you sure to Log Out of Gifthub?</Text>),
      buttons: [{
        text: 'Cancel',
        onPress: this.props.actions.hideConfirmModal,
      }, {
        text: 'Log Out',
        onPress: this.logOut(),
      }],
    });
  }

  showToast() {
    Toast.show('Yay! It\'s Saved!', {
      duration: Toast.durations.SHORTS,
      position: 80,
      shadow: false,
      animation: true,
      delay: 0,
      textColor: TOAST_TEXT_COLOR,
      backgroundColor: TOAST_BACKGROUND_COLOR,
    });
  }

  errorMessageModalAction() {
    return () => {
      this.props.actions.removeAddPageErrorMessage();
      this.props.actions.hideConfirmModal();
    };
  }

  openTermsAndConditions() {
    Linking.canOpenURL(termsAndConditionsUrl).then((supported) => {
      if (supported) {
        Linking.openURL(termsAndConditionsUrl);
      }
    });
  }

  shouldIconTextBeSet() {
    const areThereSomeTextFieldsEmpty = isThereAnyStringEmpty([
      this.state.firstName, this.state.lastName,
    ]);

    if (areThereSomeTextFieldsEmpty) {
      return false;
    }

    return !isThereAnyStringNotRespectingDeterminedLength([
      this.state.firstName, this.state.lastName], 1);
  }

  areTextFieldsEmptyOrNotRespectingTheRightLength() {
    const areThereSomeTextFieldsEmpty = isThereAnyStringEmpty([
      this.state.firstName, this.state.lastName, this.state.email,
    ]);

    if (areThereSomeTextFieldsEmpty) {
      return true;
    }

    return isThereAnyStringNotRespectingDeterminedLength([
      this.state.firstName, this.state.lastName], 2);
  }

  hasAnyInformationChanged() {
    try {
      return this.props.loginStore.user.firstName.trim() !== this.state.firstName.trim() ||
        this.props.loginStore.user.lastName.trim() !== this.state.lastName.trim() ||
        this.props.loginStore.user.email.toLowerCase().trim() !== this.state.email.toLowerCase().trim();
    } catch (err) {
      return false;
    }
  }

  cancel() {
    this.onChangeFirstName(this.props.loginStore.user.firstName);
    this.onChangeLastName(this.props.loginStore.user.lastName);
    this.onChangeEmail(this.props.loginStore.user.email);
    this.setInitialIconText();
  }

  update() {
    if (this.areTextFieldsEmptyOrNotRespectingTheRightLength()) {
      return;
    }

    this.setState({
      errorMessageForEmailCondition: undefined,
    });

    if (!EMAIL_REGEX.test(this.state.email)) {
      this.setState({
        errorMessageForEmailCondition: 'Please enter a valid email address.',
      });
      return;
    }

    if (!this.hasAnyInformationChanged()) {
      return;
    }

    const user = this.props.loginStore.user;
    const payload = {
      user: {
        id: user._id, // eslint-disable-line
        data: {
          firstName: this.state.firstName.trim(),
          lastName: this.state.lastName.trim(),
          email: this.state.email.toLowerCase().trim(),
        },
      },
      goToAction: 'Settings',
    };
    this.props.actions.updateUserNameAction(payload);
  }

  hideKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    const areTextFieldsValid = this.areTextFieldsEmptyOrNotRespectingTheRightLength()
      || !this.hasAnyInformationChanged();
    return (
      <View style={styles.container}>
        <View style={styles.navBarContainer}>
          <View style={styles.leftItem}>
            <TouchableHighlight
              accessible accessibilityLabel="Cancel" underlayColor={DUSTY_ORANGE} onPress={this.cancel}
              style={!areTextFieldsValid ? styles.cancelButton : [styles.cancelButton, { opacity: 0.5 }]}
            >
              <View>
                <Image style={styles.cancelButtonImage} source={cancelIcon} />
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.centerItem}>
            <Text style={styles.headerTitle}>Settings</Text>
          </View>
          <View style={styles.rightItem}>
            <TouchableHighlight
              accessible accessibilityLabel="Save" underlayColor={DUSTY_ORANGE} onPress={this.update}
              style={!areTextFieldsValid ? styles.cancelButton : [styles.cancelButton, { opacity: 0.5 }]}
            >
              <View>
                <Image
                  style={styles.saveButtonImage} source={saveIcon}
                />
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardContainer}>
          <TouchableWithoutFeedback
            onPress={this.hideKeyboard} underlayColor={'transparent'} accessible accessibilityLabel="DismissKeyboard"
          >
            <View>
              { !this.state.keyboardOpened ? <View style={styles.orangeContainer}></View> : null }
              <View style={styles.grayContainer} >
                <View style={[styles.formContainer, this.state.keyboardOpened ? { marginTop: 5 } : { marginTop: 70 }]}>
                  <View style={{ marginBottom: 1 }}>
                    <CustomTextInput
                      accessibilityLabel={'FirstName'} value={this.state.firstName}
                      onValueChange={this.onChangeFirstName} placeHolder={'Your First Name'}
                      errorMessage={this.state.errorMessageForFirstNameCondition}
                      maxLength={50} keyboardType={'ascii-capable'} errorMessageColor={DUSTY_ORANGE}
                    />
                  </View>
                  <View style={{ marginBottom: 1 }}>
                    <CustomTextInput
                      accessibilityLabel={'LastName'} value={this.state.lastName}
                      onValueChange={this.onChangeLastName} placeHolder={'Your Last Name'}
                      errorMessage={this.state.errorMessageForLastNameCondition}
                      maxLength={50} keyboardType={'ascii-capable'} errorMessageColor={DUSTY_ORANGE}
                    />
                  </View>
                  <View>
                    <CustomTextInput
                      accessibilityLabel={'Email'}
                      value={this.state.email} onValueChange={this.onChangeEmail}
                      placeHolder={'Email Address'} errorMessage={this.state.errorMessageForEmailCondition}
                      maxLength={50} keyboardType={'email-address'} errorMessageColor={DUSTY_ORANGE}
                    />
                  </View>
                </View>
                <View style={styles.settingButtonsContainer}>
                  <TouchableHighlight
                    style={styles.touchableTermsAndConditions}
                    onPress={this.openTermsAndConditions} underlayColor={'transparent'}
                    accessible accessibilityLabel="TermsConditionsLink"
                  >
                    <Text style={styles.touchableLogOutText}>Terms & Conditions </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.touchableLogOut} onPress={this.showLogoutConfirmation}
                    underlayColor={'transparent'} accessible accessibilityLabel="LogOutButton"
                  >
                    <Text style={styles.touchableLogOutText}>Log Out </Text>
                  </TouchableHighlight>
                </View>

              </View>{ !this.state.keyboardOpened ?
                <View style={styles.iconContainer}>
                  <View style={styles.circle}>
                    { (this.state.iconText === undefined || this.state.iconText === '') ?
                      <Image
                        source={circleImage} style={{ marginTop: 10, width: 80, height: 80 }}
                      ></Image> :
                      <Text style={styles.iconText}> {this.state.iconText} </Text>
                    }
                  </View>
                </View> : null
              }
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>);
  }
}

Settings.propTypes = {
  actions: React.PropTypes.any.isRequired,
  loginStore: React.PropTypes.any.isRequired,
};

reactMixin(Settings.prototype, TimerMixin);
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
