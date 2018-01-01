import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
  Linking,
  NativeModules,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectLogin } from './selectors';
import * as loginActions from './actions';
import {
  INPUT_BACKGROUNDCOLOR,
  INPUT_COLOR,
  TEXT_COLOR,
  TRANSPARENT,
  BUTTON_DISABLE_BACKGROUND,
  BUTTON_DISABLE_TEXT_COLOR,
} from '../../styles/color-constants';
import CommonStyles from '../../styles/CommonStyles';
import config from '../../../config.json';

import SearchText from '../../components/SearchText';
import { states, amounts, europe } from './sources';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heightActivityIndicator: {
    height: 60,
  },
  keyboardContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
  },
  controlsContainer: {
    flex: 1,
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 75,
  },
  textInput: {
    width: screenWidth - 70,
    height: 50,
    borderRadius: 5,
    backgroundColor: INPUT_BACKGROUNDCOLOR,
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 0,
    fontSize: 16,
    color: INPUT_COLOR,
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
  },
  signInImage: {
    flex: 1,
  },
  termsConditionsContainer: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  termsConditionsText: {
    color: TEXT_COLOR,
    fontSize: 11,
  },
  boldAndUnderlineText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: TRANSPARENT,
  },
});

const mapStateToProps = createStructuredSelector({
  loginStore: selectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...loginActions,
    }, dispatch),
  };
}

export class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      sourceString: [
        '',
      ],
      sourceTwo: [
        {
          a: 'Alabama',
          b: 23
        },
        {
          a: 'Alaska',
          b: 24
        },
        {
          a: 'Arizona',
          b: 17
        },
        {
          a: 'Arkansas',
          b: 10
        },
        {
          a: 'California',
          b: 67
        },
        {
          a: 'Colorado',
          b: 103
        },
        {
          a: 'Connecticut',
          b: 156
        },
        {
          a: 'Arizona',
          b: 10
        },
        {
          a: 'Amazonas',
          b: 69
        },
      ],
    };
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  hideKeyboard() {
    Keyboard.dismiss();
  }

  onSearch(value) {
    console.log('Searched value', value);
  }

  render() {
    const { loading } = this.props.loginStore;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardContainer}>
          <View style={styles.rowContainer}>
            <View>
              <View style={styles.controlsContainer}>
                <View style={styles.inputsContainer}>
                  <SearchText
                    accessibilityLabel="Search-State"
                    placeHolder={'Search a US State'}
                    source={states}
                    onSearchedValue={this.onSearch}
                  />
                </View>

                <View style={styles.inputsContainer}>
                  <SearchText
                    accessibilityLabel="Search-Amount"
                    placeHolder={'Search an Amount'}
                    source={amounts}
                    onSearchedValue={this.onSearch}
                    theme={'warning'}
                  />
                </View>

                <View style={styles.inputsContainer}>
                  <SearchText
                    accessibilityLabel="Search-European-Country"
                    placeHolder={'Search an European Country'}
                    source={europe}
                    attributeToSearch={'country'}
                    onSearchedValue={this.onSearch}
                    textColor={'#BD650D'}
                    placeHolderColor={'#C3BCB5'}
                    resultTextColor={'#FFFFFF'}
                    searchBoxColor={'#CA2760'}
                    inputBackgroundColor={'#F8F5D8'}
                    resultsBoxBackgroundColor={'#F3DE0F'}
                  />
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

LoginPage.propTypes = {
  actions: React.PropTypes.any.isRequired,
  loginStore: React.PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
