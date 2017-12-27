
import NavBarInitialState from './NavBarInitialState';
import { UPDATE_NAVBAR_TITLE, UPDATE_CURRENT_ROUTE } from './constants';

const initialState = new NavBarInitialState();

export default function NavBarReducer(state = initialState, action) { // NOSONAR
  if (!(state instanceof NavBarInitialState)) {
    return initialState.merge(state);
  }

  switch (action.type) {
    case UPDATE_NAVBAR_TITLE:
      return state.set('title', action.title);
    case UPDATE_CURRENT_ROUTE:
      return state.set('route', action.route);
    default:
      return state;
  }
}
