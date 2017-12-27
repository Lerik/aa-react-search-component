import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {
  BACKGROUNDCOLOR,
  INPUT_BACKGROUNDCOLOR,
  INPUT_COLOR,
  BLACK,
} from '../../styles/color-constants';

const warningIcon = require('../../../img/warning_icon.png');
const redWarningIcon = require('../../../img/red_3x.png');
const clearTextIcon = require('../../../img/clear_text_icon.png');

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    width: screenWidth - 70,
    marginBottom: 20,
  },
  inputsContainer: {
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: INPUT_BACKGROUNDCOLOR,
    flexDirection: 'row',
    paddingRight: 10,
    minHeight: 50,
    elevation: 2,
    shadowColor: BLACK,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  textInput: {
    flex: 1,
    padding: 15,
    marginLeft: 5,
    marginRight: 10,
    borderBottomWidth: 0,
    fontSize: 16,
    color: INPUT_COLOR,
    height: 50,
  },
  clearTextInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: 20,
  },
  linkTextInputContainer: {
    alignSelf: 'center',
    paddingLeft: 10,
    width: 15,
  },
  imgClearText: {
    minHeight: 13,
    minWidth: 13,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: INPUT_COLOR,
    marginBottom: 10,
  },
  errorMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: 'transparent',
  },
  errorMessageText: {
    marginLeft: 10,
  },
  warningIcon: {
    height: 12 + (screenWidth * 0.006),
    width: 14 + (screenWidth * 0.006),
  },
});

class SearchText extends React.Component {
  constructor() {
    super();
    this.state = {
      height: 0,
    };

    this.onSubmitEditing = this.onSubmitEditing.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.setHeight = this.setHeight.bind(this);
    this.clearText = this.clearText.bind(this);
  }

  onSubmitEditing() {
    this.textInput.blur();
  }

  onChangeText(value) {
    this.props.onValueChange(value);
  }

  setHeight(event) {
    if (event && event.nativeEvent && event.nativeEvent.contentSize) {
      this.setState({
        height: event.nativeEvent.contentSize.height,
      });
    }
  }

  clearText() {
    this.onChangeText('');
  }

  render() {
    const {
      value,
      errorMessage,
      inputTitle,
      placeHolder,
      multiline,
      icon,
      accessibilityLabel,
      maxLength,
      style,
      editable,
      hideClearButton,
      keyboardType,
      errorMessageColor,
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        <View>
          {
            inputTitle.length > 0 ? (
              <View>
                <Text
                  style={styles.inputTitle}
                >
                  {inputTitle}
                </Text>
              </View>
            ) : null
          }
          <View style={[styles.inputsContainer, { minWidth: screenWidth - 70 }]}>
            {
              icon ? (
                <View style={styles.linkTextInputContainer}>
                  <Image
                    source={icon}
                  />
                </View>
              ) : null
            }
            <TextInput
              accessible
              accessibilityLabel={accessibilityLabel}
              placeholder={placeHolder}
              maxLength={maxLength}
              placeholderTextColor={INPUT_COLOR}
              ref={(textInput) => { this.textInput = textInput; }}
              style={[styles.textInput, { height: Math.max(50, this.state.height) }]}
              value={value}
              underlineColorAndroid={'transparent'}
              blurOnSubmit
              onSubmitEditing={this.onSubmitEditing}
              onChangeText={this.onChangeText}
              multiline={multiline}
              keyboardType={keyboardType}
              onContentSizeChange={(event) => this.setHeight(event)}
              editable={editable}
            />
            {
              value.length > 0 && !hideClearButton ? (
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
          {errorMessage ? (
            <View style={styles.errorMessageContainer}>
              <Image
                style={styles.warningIcon}
                source={errorMessageColor === '#ffffff' ? warningIcon : redWarningIcon}
              />
              <Text
                style={[styles.errorMessageText, { color: errorMessageColor }]}
              >
                {errorMessage}
              </Text>
            </View>
            ) : (
              <View />
            )
          }
        </View>
      </View>
    );
  }
}

SearchText.propTypes = {
  value: React.PropTypes.string.isRequired,
  onValueChange: React.PropTypes.func.isRequired,
  inputTitle: React.PropTypes.string,
  errorMessage: React.PropTypes.string,
  placeHolder: React.PropTypes.string,
  accessibilityLabel: React.PropTypes.string,
  multiline: React.PropTypes.bool,
  style: React.PropTypes.any,
  icon: React.PropTypes.any,
  maxLength: React.PropTypes.number,
  editable: React.PropTypes.bool,
  hideClearButton: React.PropTypes.bool,
  keyboardType: React.PropTypes.string,
  errorMessageColor: React.PropTypes.string,
};

SearchText.defaultProps = {
  inputTitle: '',
  value: '',
  placeHolder: '',
  errorMessage: '',
  accessibilityLabel: '',
  multiline: false,
  style: {},
  icon: null,
  maxLength: null,
  editable: true,
  hideClearButton: false,
  keyboardType: '',
  errorMessageColor: INPUT_BACKGROUNDCOLOR,
};

export default SearchText;
