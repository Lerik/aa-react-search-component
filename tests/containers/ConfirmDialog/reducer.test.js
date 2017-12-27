
import React from 'react';
import { View } from 'react-native';
import reducer from '../../../src/containers/ConfirmModal/ConfirmModalReducer';
import * as constants from '../../../src/containers/ConfirmModal/constants';
import ConfirmModalInitialState from '../../../src/containers/ConfirmModal/ConfirmModalInitialState';

describe('ConfirmModal Actions', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}).toJSON()).toEqual({
      openConfirmModal: false,
      content: null,
      buttons: null,
    });
  });
  it('should merge when sending a state', () => {
    expect(reducer({
      openConfirmModal: true,
    }, {}).toJSON()).toEqual({
      openConfirmModal: true,
      content: null,
      buttons: null,
    });
  });
  it('should handle SHOW_CONFIRM_MODAL', () => {
    const content = (<View></View>);
    const buttons = [{
      text: 'Ok',
      onPress: () => {},
    }];
    expect(reducer(new ConfirmModalInitialState(), {
      type: constants.SHOW_CONFIRM_MODAL,
      content,
      buttons,
    }).toJSON()).toEqual({
      openConfirmModal: true,
      content,
      buttons,
    });
  });
  it('should handle HIDE_CONFIRM_MODAL', () => {
    expect(reducer(new ConfirmModalInitialState(), {
      type: constants.HIDE_CONFIRM_MODAL,
    }).toJSON()).toEqual({
      openConfirmModal: false,
      content: null,
      buttons: null,
    });
  });
});

