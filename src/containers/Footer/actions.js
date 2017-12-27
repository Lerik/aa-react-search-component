import { SHOW_FOOTER, HIDE_FOOTER } from './constants';

export function showFooter() {
  return {
    type: SHOW_FOOTER,
    footerIsShown: true,
  };
}

export function hideFooter() {
  return {
    type: HIDE_FOOTER,
    footerIsShown: false,
  };
}
