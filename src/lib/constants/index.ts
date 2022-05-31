import { widthPercentageToDP } from "react-native-responsive-screen";

export enum ActionTypes {
  SET_SETTINGS = 'SET_SETTINGS',
  SET_USER = "SET_USER",
  SET_SESSION_TOKEN = "SET_SESSION_TOKEN",
  SET_NOTIFICATION_TOKEN = "SET_NOTIFICATION_TOKEN",
  SET_METADATA = "SET_METADATA",
  SET_BANNERS = "SET_BANNERS",
  SET_PRODUCTS_BY_SUBS = "SET_PRODUCTS_BY_SUBS",
  SET_IS_FETCHING_DATA = "SET_IS_FETCHING_DATA",
  SET_LOCATIONS = "SET_LOCATIONS",
  SET_SCHEME = "SET_SCHEME",
  SET_COLORS = "SET_COLORS",
  SET_CART = "SET_CART",
  SET_ORDERS = "SET_ORDERS",
  SET_ACTIVE_ORDERS = "SET_ACTIVE_ORDERS",
  SET_CHECKOUT_FETCHING = "SET_CHECKOUT_FETCHING",
  SET_CONSTANTS = "SET_CONSTANTS",
  SET_FAVORITES = 'SET_FAVORITES'
}

export enum STORAGE_KEYS {
  ONBOARDING= "ONBOARDING",
  SESSION_TOKEN = 'SESSION_TOKEN',
  ENV = 'ENV',
  NOTIFICATION_TOKEN = 'NOTIFICATION_TOKEN',
  CURRENCY = 'CURRENCY',
  LOCALE = 'LOCALE',
  COLOR_MODE = "COLOR_MODE",
  SOCKET = "SOCKET",
  THEME = "THEME"
}

export enum EVENT_KEYS {
  ADD_FAVORITE = 'ADD_FAVORITE',
  REMOVE_FAVORITE = 'REMOVE_FAVORITE',
}

export enum BIOMETRIC_TYPE {
  FACE_ID = 'Face ID',
  FINGERPRINT = "Fingerprint",
  OTHER = "Password"
}

export enum ERROR_CODES {
  TOKEN_EXPIRED = 411,
  ORDER_ITEM_OUT_OF_STOCK = 415,
  UNAUTHENTICATED = 401,
  NO_JWT_TOKEN = 405,
  VALIDATION_ERROR = 422,
  DUPLICATE_KEY_ERROR = 406,
  REDIRECTION = 466
}

export enum MAP_TYPES {
  SATELLITE = 'satellite',
  STANDARD = 'standard'
}

export const LOCATION_CONSTANTS = {
  DELTA_ZOOM: 0.005
}

export enum COLOR_MODE {
  DARK = "dark",
  LIGHT = "light",
  SYSTEM = "system"
}


export enum SKELETON_MODE {
  SHOW = "show",
  HIDE = "hide"
}

export const container = {
  global: widthPercentageToDP("4")
}


export const GLOBAL_THEME = {
  container: widthPercentageToDP("5"),
  radius: {
    small: 11,
    custom: 20,
    medium: 20,
    full: 100,
  }
}