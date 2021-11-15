import _ from "./action-types";

export const setMsg = (payload: string) => ({
  type: _.SET_MSG,
  payload,
});

export const setIsDarkTheme = (payload: boolean) => ({
  type: _.SET_IS_DARK_THEME,
  payload,
});

export const setSelectedLang = (payload: string) => ({
  type: _.SET_SELECTED_LANG,
  payload,
});

export const setAccessToken = (payload: null | string) => ({
  type: _.SET_ACCESS_TOKEN,
  payload,
});

export const setConnectedUser = (payload: any) => ({
  type: _.SET_CONNECTED_USER,
  payload,
});
