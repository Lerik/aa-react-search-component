
import React from 'react';
import { shallow } from 'enzyme';
import { Animated, Easing } from 'react-native';
import * as menuRenderer from '../../../src/containers/WishListPage/menuRenderer';

jest.mock('react-native', () => ({
  Animated: {
    Value: jest.fn(() => 0.1),
    timing: jest.fn(() => ({
      start: jest.fn(),
    })),
    View: jest.fn(),
  },
  Easing: {
    out: jest.fn((a) => a),
    in: jest.fn((a) => a),
    cubic: true,
  },
  StyleSheet: {
    create: jest.fn((a) => a),
  },
}));

describe('WishListPage menuRenderer', () => {
  const wrapper = shallow(<menuRenderer.default />);
  const instance = wrapper.instance();

  // beforeEach(() => {
  //   Animated.timing.mockClear();
  // });

  it('should compute position for menu', () => {
    const expectedPosition = {
      top: 10,
      right: 10,
    };
    expect(menuRenderer.computePosition()).toEqual(expectedPosition);
  });

  it('should animate when the menu opens', () => {
    instance.componentDidMount();
    expect(Easing.out.mock.calls.length).toEqual(1);
    expect(Animated.timing.mock.calls.length).toEqual(1);
    expect(Animated.timing.mock.calls[0]).toEqual([instance.state.scaleAnim, {
      duration: 225,
      toValue: 1,
      easing: true,
    }]);
  });

  it('should animate when the menu closes', () => {
    const closePromise = instance.close();
    expect(closePromise instanceof Promise).toEqual(true);
    expect(Easing.in.mock.calls.length).toEqual(1);
    expect(Animated.timing.mock.calls.length).toEqual(2);
    expect(Animated.timing.mock.calls[1]).toEqual([instance.state.scaleAnim, {
      duration: 195,
      toValue: 0,
      easing: true,
    }]);
  });
});

