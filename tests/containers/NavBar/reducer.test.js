import 'react-native';
import reducer from '../../../src/containers/NavBar/NavBarReducer';
import * as constants from '../../../src/containers/NavBar/constants';
import NavBarInitialState from '../../../src/containers/NavBar/NavBarInitialState';

describe('NavBar Actions', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}).toJSON()).toEqual({
      title: '',
      route: '',
    });
  });
  it('should merge when sending a state', () => {
    expect(reducer({
      title: 'Initial State Title',
    }, {}).toJSON()).toEqual({
      title: 'Initial State Title',
      route: '',
    });
  });
  it('should handle UPDATE_NAVBAR_TITLE', () => {
    expect(reducer(new NavBarInitialState(), {
      type: constants.UPDATE_NAVBAR_TITLE,
      title: 'New Title',
    }).toJSON()).toEqual({
      title: 'New Title',
      route: '',
    });
  });
  it('should handle UPDATE_CURRENT_ROUTE', () => {
    expect(reducer(new NavBarInitialState(), {
      type: constants.UPDATE_CURRENT_ROUTE,
      route: 'Route',
    }).toJSON()).toEqual({
      title: '',
      route: 'Route',
    });
  });
});

