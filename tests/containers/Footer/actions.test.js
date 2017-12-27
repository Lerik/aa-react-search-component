
import 'react-native';
import * as actions from '../../../src/containers/Footer/actions';
import * as constants from '../../../src/containers/Footer/constants';

describe('Footer Actions', () => {
  it('should create an action to show the footer', () => {
    const expectedAction = {
      type: constants.SHOW_FOOTER,
      footerIsShown: true,
    };

    expect(actions.showFooter()).toEqual(expectedAction);
  });

  it('should create an action to update application\'s current route', () => {
    const expectedAction = {
      type: constants.HIDE_FOOTER,
      footerIsShown: false,
    };

    expect(actions.hideFooter()).toEqual(expectedAction);
  });
});

