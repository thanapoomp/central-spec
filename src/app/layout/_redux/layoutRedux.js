import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  UPDATE_DRAWER_OPEN: "[UPDATE_DRAWER_OPEN] Action",
  UPDATE_DARK_MODE: '[UPDATE_DARK_MODE] Action',
  SHOW_POPUP_LOGINOUT: '[SHOW_POPUP_LOGINOUT] Action',
  HIDE_POPUP_LOGINOUT: '[HIDE_POPUP_LOGINOUT] Action',
  SHOW_POPUP_CHANGEPASSWORD: '[SHOW_POPUP_CHANGEPASSWORD] Action',
  HIDE_POPUP_CHANGEPASSWORD: '[HIDE_POPUP_CHANGEPASSWORD] Action'
};

const initialAuthState = {
  drawerOpen: false,
  darkMode: false,
  popupLogInOut: true,
  popupChangePassword: false
};

export const reducer = persistReducer(
  { storage, key: "layout", whitelist: ["darkMode"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.UPDATE_DRAWER_OPEN: {
        return {
          ...state,
          drawerOpen:action.payload,
        };
      }

      case actionTypes.UPDATE_DARK_MODE: {
        return {
          ...state,
          darkMode:action.payload,
        };
      }

      case actionTypes.SHOW_POPUP_LOGINOUT: {
        return {
          ...state,
          popupLogInOut:true,
        };
      }

      case actionTypes.HIDE_POPUP_LOGINOUT: {
        return {
          ...state,
          popupLogInOut:false,
        };
      }

      case actionTypes.SHOW_POPUP_CHANGEPASSWORD: {
        return {
          ...state,
          popupChangePassword:true,
        };
      }

      case actionTypes.HIDE_POPUP_CHANGEPASSWORD: {
        return {
          ...state,
          popupChangePassword:false,
        };
      }


      default:
        return state;
    }
  }
);

export const actions = {
    updateDrawerOpen: (payload) => ({ type: actionTypes.UPDATE_DRAWER_OPEN,payload }),
    updateDarkMode: (payload) => ({ type: actionTypes.UPDATE_DARK_MODE,payload }),
    showPopupLogInOut: (payload) => ({ type: actionTypes.SHOW_POPUP_LOGINOUT }),
    hidePopupLogInOut: (payload) => ({ type: actionTypes.HIDE_POPUP_LOGINOUT }),
    showPopupChangePassword: (payload) => ({ type: actionTypes.SHOW_POPUP_CHANGEPASSWORD }),
    hidePopupChangePassword: (payload) => ({ type: actionTypes.HIDE_POPUP_CHANGEPASSWORD }),
};

