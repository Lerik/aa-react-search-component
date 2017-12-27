import { UPDATE_NAVBAR_TITLE, UPDATE_CURRENT_ROUTE } from './constants';

export function updateNavBarTitle(payload) {
  return {
    type: UPDATE_NAVBAR_TITLE,
    title: payload,
  };
}

export function updateCurrentRoute(payload) {
  return {
    type: UPDATE_CURRENT_ROUTE,
    route: payload,
  };
}
