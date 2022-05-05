import AsyncStorage from "@react-native-community/async-storage";
import _ from "lodash";
import { COLOR_MODE, STORAGE_KEYS } from "../../constants";

export const storeItem = async (key, value) => {
  return AsyncStorage.setItem(key, value);
};

export const getItem = async (key) => {
  return AsyncStorage.getItem(key);
};

export const setPreferredColorMode = async (state: COLOR_MODE) => {
  return AsyncStorage.setItem(STORAGE_KEYS.COLOR_MODE, state);
}
export const getPreferredColorMode = async () => {
  return AsyncStorage.getItem(STORAGE_KEYS.COLOR_MODE);
}
export const resetPreferredColorMode = () => {
  return AsyncStorage.removeItem(STORAGE_KEYS.COLOR_MODE);
}

export const removeSession = async () => {
  return AsyncStorage.removeItem(STORAGE_KEYS.SESSION_TOKEN);
};

export const getSessionToken = async () => {
  return AsyncStorage.getItem(STORAGE_KEYS.SESSION_TOKEN);
};

export const setSession = async (token) => {
  return AsyncStorage.setItem(STORAGE_KEYS.SESSION_TOKEN, token);
};

export const setEnv = async (env) => {
  return AsyncStorage.setItem(STORAGE_KEYS.ENV, env);
};

export const getEnv = async () => {
  return AsyncStorage.getItem(STORAGE_KEYS.ENV);
};

export const getCurrency = async () => {
  return AsyncStorage.getItem(STORAGE_KEYS.CURRENCY);
};

export const setCurrency = async (currency) => {
  return AsyncStorage.setItem(STORAGE_KEYS.CURRENCY, currency);
};

export const setLanguage = async (language) => {
  return AsyncStorage.setItem('language', language);
};

export const getLanguage = () => {
  return AsyncStorage.getItem('language');
};
