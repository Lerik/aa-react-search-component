
import FooterInitialState from './FooterInitialState';
import { SHOW_FOOTER, HIDE_FOOTER } from './constants';

const initialState = new FooterInitialState();

export default function FooterReducer(state = initialState, action) { // NOSONAR
  if (!(state instanceof FooterInitialState)) {
    return initialState.merge(state);
  }

  switch (action.type) {
    case SHOW_FOOTER:
    case HIDE_FOOTER:
      return state.set('footerIsShown', action.footerIsShown);
    default:
      return state;
  }
}
