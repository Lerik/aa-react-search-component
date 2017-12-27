
import { Record } from 'immutable';

const ConfirmModalInitialState = Record({
  openConfirmModal: false,
  content: null,
  buttons: null,
});

export default ConfirmModalInitialState;
