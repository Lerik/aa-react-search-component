import 'react-native';
import 'react';
import { store } from '../src/store';


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

jest.mock('react-native-router-flux', (() => ({
  Actions: {
    Notifications: jest.fn(),
  },
})));


describe('Store', () => {
  it('should export the application\'s store', () => {
    expect(store);
  });
});
