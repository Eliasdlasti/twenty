import { JODAER_APP_ICON_PATH } from '~/config/jodaer';

export const DEFAULT_WORKSPACE_LOGO = new URL(
  JODAER_APP_ICON_PATH,
  window.location.origin,
).href;
