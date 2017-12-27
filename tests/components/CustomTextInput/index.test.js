import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import CustomTextInput from '../../../src/components/CustomTextInput';  // eslint-disable-line

jest.mock('Linking', (() => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn().mockReturnValue(
    new Promise((resolve) => {
      resolve(true);
    })
  ),
  getInitialURL: jest.fn(),
})));

describe('CustomTextInput', () => {
  const props = {
    value: '',
    onValueChange: jest.fn(),
  };

  let wrapper = shallow(<CustomTextInput {...props} />);
  const instance = wrapper.instance();

  it('should set textInput ref', () => {
    const textInput = wrapper.find('TextInput').first();
    textInput.node.ref((component) => { instance.textInput = component; });

    expect(instance.textInput).not.toBe(undefined);
  });
  it('should set value', () => {
    instance.onChangeText('');

    expect(instance.props.value).toBe('');
  });
  it('should clear the text', () => {
    instance.clearText();

    expect(instance.props.value).toBe('');
  });
  it('should call onSubmitEditing', () => {
    instance.textInput = {
      blur: jest.fn(),
    };
    const textInput = wrapper.find('TextInput').first();
    textInput.props().onSubmitEditing();

    expect(instance.textInput).not.toBe(undefined);
  });
  it('should set height', () => {
    instance.setHeight({
      nativeEvent: {
        contentSize: {
          height: 1,
        },
      },
    });

    expect(instance.state.height).toBe(1);
  });
  it('should call onContentSizeChange', () => {
    const textInput = wrapper.find('TextInput').first();

    textInput.props().onContentSizeChange();

    expect(textInput.length).toBe(1);
  });
  it('should render successfully with inputTitle, value, icon and error props', () => {
    props.inputTitle = 'Title';
    props.value = 'Value';
    props.icon = {};
    props.errorMessage = 'Error';

    wrapper = shallow(<CustomTextInput {...props} />);

    expect(wrapper.length).toBe(1);
  });
});
