import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  Dimensions,
  View,
  TouchableHighlight,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { selectLogin } from '../LoginPage/selectors';
import * as loginActions from '../LoginPage/actions';
import * as confirmModalActions from '../ConfirmModal/actions';

import {
  INPUT_BACKGROUNDCOLOR,
  ICON_NAME_BACKGROUNDCOLOR,
  TEXT_COLOR,
  BUTTON_DISABLE_BACKGROUND,
  BUTTON_DISABLE_TEXT_COLOR,
  INPUT_COLOR,
  DARK_TAUPE,
} from '../../styles/color-constants';

import CommonStyles from '../../styles/CommonStyles';

import {
  getUserNameInitials,
  isThereAnyStringEmpty,
  isThereAnyStringNotRespectingDeterminedLength,
} from '../../services/helpers/utils';

import CustomTextInput from '../../components/CustomTextInput';
import { EMAIL_REGEX } from '../../services/helpers/constants';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const circleImage = require('../../../img/SignupAvatar_3x.png');
const signUpImg = require('../../../img/gh-red-background_2x.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20 + (screenHeight * 0.01),
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  formContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: TEXT_COLOR,
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'Roboto-Black',
  },
  subtitle: {
    color: TEXT_COLOR,
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  circle: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 90 + (screenWidth * 0.05),
    height: 90 + (screenWidth * 0.05),
    borderRadius: (90 + (screenWidth * 0.05)) / 2,
    backgroundColor: ICON_NAME_BACKGROUNDCOLOR,
    alignSelf: 'center',
  },
  iconText: {
    alignSelf: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: INPUT_COLOR,
  },
  signInImage: {
    flex: 1,
    margin: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
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
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...loginActions,
      ...confirmModalActions,
    }, dispatch),
  };
}

export class AddNamePage extends React.Component {
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

    this.onSubmitEditing = this.onSubmitEditing.bind(this);
    this.goToWishLists = this.goToWishLists.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.update = this.update.bind(this);
    this.hideKeyboard = this.hideKeyboard.bind(this);
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
  }

  onSubmitEditing() {
    this.userNameInput.blur();
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
    }
  }

  setIconText() {
    const iconText = getUserNameInitials([this.state.firstName, this.state.lastName]);

    this.setState({
      iconText,
    });
  }

  errorMessageModalAction() {
    return () => {
      this.props.actions.removeAddPageErrorMessage();
      this.props.actions.hideConfirmModal();
    };
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

    const user = this.props.loginStore.user;
    const payload = {
      user: {
        id: user._id, // eslint-disable-line
        data: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email.toLowerCase(),
        },
      },
      goToAction: 'WishList',
    };
    this.props.actions.updateUserNameAction(payload);
  }

  goToWishLists() {
    Actions.WishListList();
  }

  hideKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    const areTextFieldsValid = this.areTextFieldsEmptyOrNotRespectingTheRightLength();
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardContainer}>
          <Image
            style={styles.signInImage} resizeMode="stretch" source={signUpImg}
          >
            <TouchableHighlight
              onPress={this.hideKeyboard} underlayColor={'transparent'} accessible
              accessibilityLabel="DismissKeyboard"
            >
              <View>
                { this.state.keyboardOpened ? null :
                <View>
                  <View style={styles.titleContainer}>
                    <Text accessible accessibilityLabel="Hello, my name is" style={styles.title}>
                      You're almost ready!
                    </Text>
                    <Text accessible accessibilityLabel="Hello, my name is" style={styles.subtitle}>
                      What's your name and email?
                    </Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <View style={styles.circle}>
                      { (this.state.iconText === undefined || this.state.iconText === '') ?
                        <Image
                          source={circleImage} style={{ marginTop: 15, width: 80, height: 80 }}
                        >
                        </Image> :
                        <Text style={styles.iconText}> {this.state.iconText} </Text>
                      }
                    </View>
                  </View>
                </View> }
                <View style={styles.formContainer}>
                  <View style={{ marginBottom: 20 }}>
                    <CustomTextInput
                      accessibilityLabel={'FirstName'} value={this.state.firstName}
                      onValueChange={this.onChangeFirstName} placeHolder={'Your First Name'}
                      errorMessage={this.state.errorMessageForFirstNameCondition}
                      maxLength={50} keyboardType={'ascii-capable'}
                    />
                  </View>
                  <View style={{ marginBottom: 20 }}>
                    <CustomTextInput
                      accessibilityLabel={'LastName'} value={this.state.lastName}
                      onValueChange={this.onChangeLastName} placeHolder={'Your Last Name'}
                      errorMessage={this.state.errorMessageForLastNameCondition}
                      maxLength={50} keyboardType={'ascii-capable'}
                    />
                  </View>
                  <View>
                    <CustomTextInput
                      accessibilityLabel={'Email'} value={this.state.email}
                      onValueChange={this.onChangeEmail} placeHolder={'Email Address'}
                      errorMessage={this.state.errorMessageForEmailCondition}
                      maxLength={50} keyboardType={'email-address'}
                    />
                  </View>
                  <TouchableHighlight
                    accessible accessibilityLabel="Continue to My Lists"
                    onPress={this.update} underlayColor={!areTextFieldsValid ? INPUT_BACKGROUNDCOLOR : BUTTON_DISABLE_BACKGROUND}
                    style={!areTextFieldsValid ? CommonStyles.buttonContainer : CommonStyles.buttonDisabled}
                  >
                    <View>
                      <Text style={!areTextFieldsValid ? CommonStyles.buttonText : [styles.CommonStyles, { color: BUTTON_DISABLE_TEXT_COLOR }]}>Continue</Text>
                    </View>
                  </TouchableHighlight>
                </View>
                <View style={styles.formContainer}></View>
              </View>
            </TouchableHighlight>
          </Image>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

AddNamePage.propTypes = {
  actions: React.PropTypes.any.isRequired,
  loginStore: React.PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNamePage);
