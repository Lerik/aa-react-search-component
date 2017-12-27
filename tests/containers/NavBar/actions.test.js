
import 'react-native';
import * as actions from '../../../src/containers/NavBar/actions';
import * as constants from '../../../src/containers/NavBar/constants';

describe('NavBar Actions', () => {
  it('should create an action to update the navbar title', () => {
    const newTitle = 'My new title';
    const expectedAction = {
      type: constants.UPDATE_NAVBAR_TITLE,
      title: newTitle,
    };

    expect(actions.updateNavBarTitle(newTitle)).toEqual(expectedAction);
  });

  it('should create an action to update application\'s current route', () => {
    const newRoute = 'Route';
    const expectedAction = {
      type: constants.UPDATE_CURRENT_ROUTE,
      route: newRoute,
    };

    expect(actions.updateCurrentRoute(newRoute)).toEqual(expectedAction);
  });
});

