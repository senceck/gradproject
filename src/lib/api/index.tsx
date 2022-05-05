import Axios, { AxiosResponse, AxiosError, AxiosStatic } from 'axios';
import _, { get } from 'lodash';
import { Alert, Platform } from 'react-native';
import VersionNumber from 'react-native-version-number';
import { getEnv } from '../services/AsyncStorage';
import axios from 'axios';
import { ERROR_CODES } from '../constants';
import { GLOBAL_USER_SCRIPTS } from '../hooks/useUser';
import { store } from '../../..';
import { setMainRoot } from '../../navigation/roots';
const TESTING_API = 'http://192.168.1.16:9000/api/v1/user';
export const STAGING_API = 'https://mysterious-sierra-35904.herokuapp.com/api';
const PRODUCTION_API = 'https://api.aqar.space/api/v1/user';
axios.defaults.headers['COMPID'] = 'joolmao'

export async function getBaseUrl() {
  const baseURL = STAGING_API;
  // if (!__DEV__) {
  //   if (env && env === "staging") {
  //     baseURL = STAGING_API;
  //   } else {
  //     baseURL = PRODUCTION_API;
  //   }
  // } else {
  //   baseURL = TESTING_API;
  // }
  return baseURL;
}

const onSuccess = function (response: AxiosResponse) {
  console.warn('Request Successful!', response);
  return response.data;
};

const onError = async function async(error: AxiosError) {
  console.error('FAILED Response!:', get(error, 'response'));
  console.error('FAILED Status:', get(error, "response.status"));
  console.error('FAILED Data:', get(error, "response.data"));
  console.error('FAILED Headers:', get(error, "response.headers"));
  if (Axios.isCancel(error)) {
    return Promise.reject(error);
  }

  const originalRequest = get(error, "config", {}) as any;
  const errorStatus = get(error, "response.status", 0)
  //ALSO CHECK IF USER IS NOT LOGGED IN
  if (errorStatus == ERROR_CODES.TOKEN_EXPIRED) {
    // try {
    //   let { token } = await GLOBAL_USER_SCRIPTS.renewSessionByKeychain(store.dispatch) as any;
    //   return request({ ...originalRequest, headers: { ...originalRequest.headers, "x-auth-token": token } });
    // } catch (e) {
    //   await GLOBAL_USER_SCRIPTS.clearUserSession(store.dispatch)
    //   setMainRoot();
    //   Alert.alert('Session Has Ended', 'Please Login again to continue')
    //   return Promise.reject(error.response)
    // }
  } else {
    return Promise.reject(error.response);
  }
};
Axios.interceptors.request.use((config) => {
  console.log(config);
  return config;
});

Axios.interceptors.response.use(onSuccess, onError);

Axios['setUrl'] = async function () {
  const url = await getBaseUrl();
  this.defaults.baseURL = url;
};

Axios['setLanguage'] = function (language) {
  this.defaults.headers['language'] =
    typeof language === 'string' ? language : 'ar';
};

Axios['setCurrency'] = function (currency) {
  this.defaults.headers['currency'] =
    typeof currency === 'string' ? currency : 'iqd';
};

Axios['setMetadata'] = function () {
  this.defaults.headers['platform'] = 'mobile';
  this.defaults.headers['os'] = Platform.OS;
  this.defaults.headers['os-version'] = Platform.Version;
  this.defaults.headers['app-version'] = VersionNumber.appVersion;
  this.defaults.headers['app-build'] = VersionNumber.buildVersion;
  // logEvent('session', {
  //   platform: 'mobile',
  //   os: Platform.OS,
  //   'os-version': Platform.Version,
  //   'app-version': VersionNumber.appVersion,
  //   'app-build': VersionNumber.buildVersion,
  // });
};

Axios['setSession'] = function (token) {
  this.defaults.headers['x-auth-token'] = token || null;
};
Axios['removeSession'] = function () {
  delete this.defaults.headers['x-auth-token'];
};


Axios['setDeviceId'] = function (device_id) {
  this.defaults.headers['device_id'] = device_id || null;
};




const request = Axios as AxiosStatic & {
  setSession: any;
  removeSession: any;
  setUrl: any;
  setLanguage;
  setMetadata;
  setCurrency;
  setDeviceId;
};

export default request;
