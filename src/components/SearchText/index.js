import React from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';

import FindTextInSource from './search';

const searchIcon = require('./images/search_icon.png');
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
    borderRadius: 2,
    borderColor: '#979797',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    minHeight: 50,
  },
  textInput: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    marginLeft: 5,
    marginRight: 10,
    fontSize: 16,
    color: '#676767',
    height: 50,
  },
  searchIconContainer: {
    paddingRight: 15,
    paddingLeft: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 20 + (screenWidth * 0.01),
    height: 22 + (screenWidth * 0.01),
  },
  resultsContainer: {
    borderRadius: 2,
    borderColor: '#979797',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    width: screenWidth * 0.5,
    marginTop: 10,
    position: 'absolute',
    top: 50,
    paddingTop: 10,
    paddingBottom: 3,
  },
  resultsItemText: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 7,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

class SearchText extends React.Component {
  constructor() {
    super();
    this.state = {
      height: 0,
      results: [],
      searchValue: '',
      maxResultsHeightContainer: 150,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.setHeight = this.setHeight.bind(this);
  }

  componentDidMount() {
    this.validateProps();
  }

  validateProps() {
    const { attributeToSearch, source, placeHolder,
      placeHolderColor, accessibilityLabel, textColor,
      resultTextColor, theme, searchBoxColor, onSearchedValue,
      inputBackgroundColor, resultsBoxBackgroundColor } = this.props;

    if (!source || !source.length) {
      throw 'Attribute <source> must be provided';
    }

    if (!onSearchedValue) {
      throw 'Attribute <onSearchedValue> must be provided';
    }

    const firstElementOfSource = source[0];

    if (typeof firstElementOfSource === 'object') {
      if (!attributeToSearch) {
        throw 'Attribute <attributeToSearch> must be provided';
      } else if (typeof attributeToSearch === 'string' && attributeToSearch.trim().length === 0) {
        throw 'Attribute <attributeToSearch> is empty';
      } else if (typeof attributeToSearch !== 'string') {
        throw 'Attribute <attributeToSearch> must be of type string';
      }
    } else if (typeof firstElementOfSource !== 'string' && typeof firstElementOfSource !== 'number') {
      throw 'Attribute <source> must be an array of strings or numbers';
    }

    if (placeHolder && typeof placeHolder !== 'string') {
      throw 'Attribute <placeHolder> must be of type string';
    }

    if (placeHolderColor && typeof placeHolderColor !== 'string') {
      throw 'Attribute <placeHolderColor> must be of type string';
    }

    if (accessibilityLabel && typeof accessibilityLabel !== 'string') {
      throw 'Attribute <accessibilityLabel> must be of type string';
    }

    if (textColor && typeof textColor !== 'string') {
      throw 'Attribute <textColor> must be of type string';
    }

    if (resultTextColor && typeof resultTextColor !== 'string') {
      throw 'Attribute <resultTextColor> must be of type string';
    }

    if (theme && typeof theme !== 'string') {
      throw 'Attribute <theme> must be of type string';
    }

    if (searchBoxColor && typeof searchBoxColor !== 'string') {
      throw 'Attribute <searchBoxColor> must be of type string';
    }

    if (inputBackgroundColor && typeof inputBackgroundColor !== 'string') {
      throw 'Attribute <inputBackgroundColor> must be of type string';
    }

    if (resultsBoxBackgroundColor && typeof resultsBoxBackgroundColor !== 'string') {
      throw 'Attribute <resultsBoxBackgroundColor> must be of type string';
    }
  }

  onChangeText(value) {
    if (value.trim().length === 0) {
      this.setState({
        results: [],
      });
      return;
    }

    const { attributeToSearch, source } = this.props;

    if (source && source.length > 0) {
      const results = FindTextInSource(value.trim(), source, attributeToSearch, this.getMaxNumberOfResults());
      this.setState({
        results,
      });
    }

    this.setState({
      searchValue: value,
    });
  }

  getMaxNumberOfResults() {
    const resultItemHeight = 21;
    return Math.floor(this.state.maxResultsHeightContainer / resultItemHeight);
  }

  setHeight(event) {
    if (event && event.nativeEvent && event.nativeEvent.contentSize) {
      this.setState({
        height: event.nativeEvent.contentSize.height,
      });
    }
  }

  getSearchButtonStyle() {
    const { theme, searchBoxColor } = this.props;

    if (searchBoxColor) {
      return [
        styles.searchIconContainer,
        {
          backgroundColor: searchBoxColor,
        },
      ];
    }

    if (theme === 'acklen') {
      return [
        styles.searchIconContainer,
        {
          backgroundColor: '#92b537',
        },
      ];
    } else if (theme === 'warning') {
      return [
        styles.searchIconContainer,
        {
          backgroundColor: '#efac56',
        },
      ];
    } else if (theme === 'danger') {
      return [
        styles.searchIconContainer,
        {
          backgroundColor: '#d75452',
        },
      ];
    } else {
      return [
        styles.searchIconContainer,
        {
          backgroundColor: '#000000',
        },
      ];
    }
  }

  getTextInputStyle() {
    const { textColor, inputBackgroundColor } = this.props;

    if (textColor) {
      return [
        styles.textInput,
        {
          height: Math.max(50, this.state.height),
          color: textColor,
          backgroundColor: !inputBackgroundColor ? '#FFFFFF' : inputBackgroundColor,
        },
      ];
    }
    return [
      styles.textInput,
      {
        height: Math.max(50, this.state.height),
      },
    ];
  }

  getResultsItemStyle() {
    const { resultTextColor } = this.props;

    if (resultTextColor) {
      return [
        styles.resultsItemText,
        {
          color: resultTextColor,
        },
      ];
    }
    return styles.resultsItemText;
  }

  getResultsBoxStyle() {
    const { resultsBoxBackgroundColor } = this.props;

    if (resultsBoxBackgroundColor) {
      return [
        styles.resultsContainer,
        {
          maxHeight: this.state.maxResultsHeightContainer,
          backgroundColor: resultsBoxBackgroundColor,
        }
      ];
    }
    return [
      styles.resultsContainer,
      {
        maxHeight: this.state.maxResultsHeightContainer,
      }
    ];
  }

  getInputContainerStyle() {
    const { inputBackgroundColor } = this.props;

    if (inputBackgroundColor) {
      return [
        styles.inputsContainer,
        {
          minWidth: screenWidth - 70,
          backgroundColor: inputBackgroundColor,
        }
      ];
    }
    return [
      styles.inputsContainer,
      {
        minWidth: screenWidth - 70,
      }
    ];
  }

  getResults() {
    if (this.state.results && this.state.results.length > 0) {
      return (
        <View style={this.getResultsBoxStyle()}>
          {
            this.state.results.map((item, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => this.resultItemSelected(item)}>
                <Text
                  style={this.getResultsItemStyle()}>{item}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      );
    } else {
      return null;
    }
  }

  resultItemSelected(item) {
    this.setState({
      searchValue: item,
      results: [],
    });
    this.textInput.setNativeProps({text: item.toString()});
  }

  searchSelectedItem() {
    const { onSearchedValue } = this.props;
    this.setState({
      results: [],
    });
    onSearchedValue(this.state.searchValue);
  }

  render() {
    const {
      placeHolder,
      placeHolderColor,
      accessibilityLabel,
    } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <View style={this.getInputContainerStyle()}>
            <TextInput
              accessible
              accessibilityLabel={accessibilityLabel}
              placeholder={placeHolder}
              placeholderTextColor={ placeHolderColor ? placeHolderColor : '#c4c4c4' }
              ref={(textInput) => { this.textInput = textInput; }}
              style={this.getTextInputStyle()}
              underlineColorAndroid={'transparent'}
              blurOnSubmit
              onChangeText={this.onChangeText}
              keyboardType={'default'}
              onContentSizeChange={(event) => this.setHeight(event)}
            />

            <TouchableOpacity
              style={this.getSearchButtonStyle()}
              onPress={() => this.searchSelectedItem()}>
              <Image
                style={styles.searchIcon}
                source={searchIcon}></Image>
            </TouchableOpacity>
          </View>
          {
            this.getResults()
          }
        </View>
      </View>
    );
  }
}

SearchText.propTypes = {
  placeHolder: React.PropTypes.string,
  placeHolderColor: React.PropTypes.string,
  accessibilityLabel: React.PropTypes.string,
  textColor: React.PropTypes.string,
  resultTextColor: React.PropTypes.string,
  attributeToSearch: React.PropTypes.any,
  source: React.PropTypes.array,
  theme: React.PropTypes.string,
  searchBoxColor: React.PropTypes.string,
  onSearchedValue: React.PropTypes.func.isRequired,
  inputBackgroundColor: React.PropTypes.string,
  resultsBoxBackgroundColor: React.PropTypes.string,
};

SearchText.defaultProps = {
  placeHolder: '',
  accessibilityLabel: '',
  attributeToSearch: '',
  source: [],
  theme: 'acklen',
  searchBoxColor: null,
  textColor: null,
  placeHolderColor: null,
  resultTextColor: null,
  inputBackgroundColor: null,
  resultsBoxBackgroundColor: null,
};

export default SearchText;
