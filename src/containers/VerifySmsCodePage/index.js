import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { selectLogin } from '../LoginPage/selectors';
import * as loginActions from '../LoginPage/actions';
import * as confirmModalActions from '../ConfirmModal/actions';
import {
  INPUT_BACKGROUNDCOLOR,
  INPUT_COLOR,
  TEXT_COLOR,
  DUSTY_ORANGE,
  DARK_TAUPE,
} from '../../styles/color-constants';
import CustomTextInput from '../../components/CustomTextInput';

import CommonStyles from '../../styles/CommonStyles';

const signUpImg = require('../../../img/gh-red-background_2x.png');
const backIcon = require('../../../img/Chevron-White_3x.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
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
  keyboardContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
  },
  wishlistNavBarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 30,
    marginTop: (Platform.OS === 'ios') ? 0 : 25,
    paddingHorizontal: 5,
    paddingLeft: 20,
  },
  backButton: {
    padding: 7,
  },
  backButtonImage: {
    width: 10 + (screenWidth * 0.01),
    height: 20 + (screenWidth * 0.01),
  },
  controlsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 16,
    color: INPUT_COLOR,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
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
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100 + (screenHeight * 0.1),
  },
  pageSubtitle: {
    color: TEXT_COLOR,
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  resendCodeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  bottomTextContainer: {
    height: 100 + (screenHeight * 0.2),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  bottomQuestion: {
    color: TEXT_COLOR,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  facebookLink: {
    color: TEXT_COLOR,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto-Black',
    textDecorationLine: 'underline',
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

export class VerifySmsCodePage extends React.Component {
  constructor() {
    super();
    this.state = {
      code: '',
      errorMessage: '',
      tryingCounter: 0,
    };

    this.onSubmitEditing = this.onSubmitEditing.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.verify = this.verify.bind(this);
    this.hideKeyboard = this.hideKeyboard.bind(this);
    this.sendSmsCodeAgain = this.sendSmsCodeAgain.bind(this);
  }
  componentDidMount() {
    this.onChangeText('');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loginStore.loginMessageError !== this.props.loginStore.loginMessageError
      && nextProps.loginStore.loginMessageError !== undefined
      && nextProps.loginStore.loginMessageError !== '') {
      this.props.actions.showConfirmModal({
        content: (<Text style={styles.modalText}>{ nextProps.loginStore.loginMessageError }</Text>),
        buttons: [{
          text: 'OK',
          onPress: this.props.actions.hideConfirmModal,
        }],
      });
    }
  }

  onSubmitEditing() {
    this.codeInput.blur();
  }

  onChangeText(code) {
    this.setState({
      code,
    });
  }

  verify() {
    const { loading } = this.props.loginStore;
    if (loading) {
      return;
    }

    if (!this.state.code) {
      this.setState({
        errorMessage: 'Please enter a valid verification code',
      });

      return;
    }

    if (this.state.tryingCounter === 3) {
      this.props.actions.showConfirmModal({
        content: (<Text style={styles.modalText}>Too many verification attempts. Resend SMS and try again.</Text>),
        buttons: [{
          text: 'OK',
          onPress: this.props.actions.hideConfirmModal,
        }],
      });
      return;
    }
    const counter = this.state.tryingCounter;

    this.setState({
      tryingCounter: counter + 1,
    });

    const user = {
      type: 'local',
      phoneNumber: this.props.loginStore.userToCreate.phoneNumber,
      code: this.state.code,
      name: '',
    };

    const payload = {
      user,
      goToAction: 'AddName',
    };

    this.props.actions.verifyCodeSentBySMS(payload);
  }
  sendSmsCodeAgain() {
    const { loading } = this.props.loginStore;
    if (loading) {
      return;
    }

    this.setState({
      tryingCounter: 0,
    });

    const user = {
      type: 'local',
      phoneNumber: this.props.loginStore.userToCreate.phoneNumber,
      name: '',
      code: '',
    };

    const payload = {
      user,
      goToAction: 'VerifySmsCode',
    };
    this.props.actions.sendVerificationCodeBySMS(payload);
  }

  hideKeyboard() {
    Keyboard.dismiss();
  }

  goBack() {
    Actions.Login();
  }

  render() {
    const { loading } = this.props.loginStore;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardContainer}>
          <Image
            style={styles.signInImage}
            resizeMode="stretch"
            source={signUpImg}
          >
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
            <TouchableHighlight
              style={styles.rowContainer}
              onPress={this.hideKeyboard}
              underlayColor={'transparent'}
              accessible
              accessibilityLabel="DismissKeyboard"
            >
              <View>
                <View style={styles.titleContainer}>
                  <Text style={styles.pageSubtitle}>
                    Enter the Verification Code we have
                  </Text>
                  <Text style={styles.pageSubtitle}>
                    sent you via SMS to {this.props.loginStore.userToCreate.phoneNumber}
                  </Text>
                </View>

                <View style={styles.controlsContainer}>
                  <CustomTextInput
                    accessibilityLabel={'VerificationCode'}
                    inputTitle={'Verification Code'}
                    value={this.state.code}
                    onValueChange={this.onChangeText}
                    placeHolder={'Verification Code'}
                    errorMessage={this.state.errorMessage}
                    maxLength={6}
                    keyboardType={'phone-pad'}
                  />
                  <TouchableHighlight
                    accessible
                    accessibilityLabel="Continue"
                    onPress={this.verify}
                    underlayColor={INPUT_BACKGROUNDCOLOR}
                    style={CommonStyles.buttonContainer}
                  >
                    <View>
                      <Text
                        style={styles.buttonText}
                      >
                        Continue
                    </Text>
                    </View>
                  </TouchableHighlight>
                  {loading === true ? <ActivityIndicator
                    animating
                    style={[styles.centering, { height: 60 }]}
                    size="large"
                  /> : <View></View>}
                </View>

                <View style={styles.bottomTextContainer}>
                  <View style={styles.resendCodeContainer}>
                    <Text style={styles.bottomQuestion}>
                      Didnt get the SMS message? </Text>
                    <Text style={styles.facebookLink} onPress={this.sendSmsCodeAgain}>Send it Again.</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </Image>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

VerifySmsCodePage.propTypes = {
  actions: React.PropTypes.any.isRequired,
  loginStore: React.PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifySmsCodePage);
