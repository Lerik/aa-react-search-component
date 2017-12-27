import { View, TouchableHighlight } from 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { default as ConfirmModalRedux, ConfirmModal } from '../../../src/containers/ConfirmModal'; // eslint-disable-line
import * as confirmModalActions from '../../../src/containers/ConfirmModal/actions';
import reducers from '../../../src/reducers/index';

const store = createStore(
  reducers,
);

jest.mock('../../../src/containers/ConfirmModal/actions', () => ({
  hideConfirmModal: jest.fn(),
}));

describe('ConfirmModal', () => {
  const wrapperRedux = shallow(<ConfirmModalRedux store={store} />);

  const props = {
    confirmModalStore: {
      openConfirmModal: true,
      content: (<View></View>),
      buttons: null,
    },
    actions: confirmModalActions,
  };

  let wrapper = shallow(<ConfirmModal {...props} />);
  const instance = wrapper.instance();

  it('should connect to redux', () => {
    expect(wrapperRedux.length).toBe(1);
  });

  it('should call hideConfirmModal when closed', () => {
    instance.closeModal();

    expect(confirmModalActions.hideConfirmModal.mock.calls.length).toBe(1);
    expect(confirmModalActions.hideConfirmModal.mock.calls[0]).toEqual([]);
  });

  it('should not render buttons', () => {
    expect(wrapper.find(TouchableHighlight).length).toBe(0);
  });

  it('should render buttons', () => {
    props.confirmModalStore.buttons = [{
      text: 'Ok',
      onPress: () => {},
    }];

    wrapper = shallow(<ConfirmModal {...props} />);
    expect(wrapper.find(TouchableHighlight).length).toBe(1);
  });
});
