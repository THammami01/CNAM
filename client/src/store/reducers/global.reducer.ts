import {
  getThemeFromLocalStorage,
  saveThemeInLocalStorage,
  getSelectedLangFromLocalStorage,
  saveSelectedLangInLocalStorage
} from "../../utils/funcs";
import _ from "../actions/action-types";

const body = document.body;

const initialState = {
  msg: "Hello, World !",
  isDarkTheme: getThemeFromLocalStorage(),
  selectedLang: getSelectedLangFromLocalStorage(),
  accessToken: null,
  connectedUser: null
};

interface IAction {
  type: string;
  payload: any;
}

const globalReducer = (state = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case _.SET_MSG:
      return { ...state, msg: payload };

    case _.SET_IS_DARK_THEME:
      if (payload) {
        body.setAttribute("theme-mode", "dark");
        saveThemeInLocalStorage(true);
      } else {
        body.removeAttribute("theme-mode");
        saveThemeInLocalStorage(false);
      }

      return { ...state, isDarkTheme: payload };

    case _.SET_SELECTED_LANG:
      saveSelectedLangInLocalStorage(payload);
      return { ...state, selectedLang: payload };

    case _.SET_ACCESS_TOKEN:
      return { ...state, accessToken: payload };

      case _.SET_CONNECTED_USER:
      return { ...state, connectedUser: payload };

    default:
      return state;
  }
};

export default globalReducer;
