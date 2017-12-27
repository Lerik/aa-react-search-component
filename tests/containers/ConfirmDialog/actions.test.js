
import React from 'react';
import { View } from 'react-native';
import * as actions from '../../../src/containers/ConfirmModal/actions';
import * as constants from '../../../src/containers/ConfirmModal/constants';

describe('ConfirmDialog Actions', () => {
  it('should create an action to show the footer', () => {
    const content = (<View></View>);
    const buttons = [{
      text: 'Ok',
      onPress: () => {},
    }];
    const expectedAction = {
      type: constants.SHOW_CONFIRM_MODAL,
      content,
      buttons,
    };
    const payload = {
      content,
      buttons,
    };

    expect(actions.showConfirmModal(payload)).toEqual(expectedAction);
  });

  it('should create an action to update application\'s current route', () => {
    const expectedAction = {
      type: constants.HIDE_CONFIRM_MODAL,
    };

    expect(actions.hideConfirmModal()).toEqual(expectedAction);
  });
});

