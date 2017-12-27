
import 'react-native';
import reducer from '../../../src/containers/Footer/FooterReducer';
import * as constants from '../../../src/containers/Footer/constants';
import FooterInitialState from '../../../src/containers/Footer/FooterInitialState';

describe('Footer Actions', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}).toJSON()).toEqual({
      footerIsShown: false,
    });
  });
  it('should merge when sending a state', () => {
    expect(reducer({
      footerIsShown: true,
    }, {}).toJSON()).toEqual({
      footerIsShown: true,
    });
  });
  it('should handle SHOW_FOOTER', () => {
    expect(reducer(new FooterInitialState(), {
      type: constants.SHOW_FOOTER,
      footerIsShown: true,
    }).toJSON()).toEqual({
      footerIsShown: true,
    });
  });
  it('should handle HIDE_FOOTER', () => {
    expect(reducer(new FooterInitialState(), {
      type: constants.HIDE_FOOTER,
      footerIsShown: false,
    }).toJSON()).toEqual({
      footerIsShown: false,
    });
  });
});

