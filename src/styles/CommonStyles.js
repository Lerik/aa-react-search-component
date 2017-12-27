import { StyleSheet, Dimensions } from 'react-native';

import {
  BUTTON_DISABLE_BACKGROUND,
  BUTTON_BACKGROUND,
  INPUT_COLOR,
} from './color-constants';

const screenWidth = Dimensions.get('window').width;

const CommonStyles = StyleSheet.create({
  buttonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    backgroundColor: BUTTON_BACKGROUND,
    width: screenWidth - 70,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 25,
  },
  buttonDisabled: {
    marginTop: 15,
    flexDirection: 'row',
    backgroundColor: BUTTON_DISABLE_BACKGROUND,
    width: screenWidth - 70,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 25,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 16,
    color: INPUT_COLOR,
  },
});

export default CommonStyles;
