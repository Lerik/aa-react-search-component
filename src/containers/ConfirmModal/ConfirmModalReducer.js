
import ConfirmModalInitialState from './ConfirmModalInitialState';
import {
  SHOW_CONFIRM_MODAL,
  HIDE_CONFIRM_MODAL,
 } from './constants';

const initialState = new ConfirmModalInitialState();

export default function ConfirmModalReducer(state = initialState, action) { // NOSONAR
  if (!(state instanceof ConfirmModalInitialState)) {
    return initialState.merge(state);
  }

  switch (action.type) {
    case SHOW_CONFIRM_MODAL:
      return state
        .set('openConfirmModal', true)
        .set('content', action.content)
        .set('buttons', action.buttons);
    case HIDE_CONFIRM_MODAL:
      return state.set('openConfirmModal', false);
    default:
      return state;
  }
}
