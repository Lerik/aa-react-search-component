import {
  SHOW_CONFIRM_MODAL,
  HIDE_CONFIRM_MODAL,
 } from './constants';

export function showConfirmModal(payload) {
  return {
    type: SHOW_CONFIRM_MODAL,
    content: payload.content,
    buttons: payload.buttons,
  };
}

export function hideConfirmModal() {
  return {
    type: HIDE_CONFIRM_MODAL,
  };
}
