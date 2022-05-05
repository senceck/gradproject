import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { loginForm, registerForm } from '../../@types/user';
import { userApi } from '../../api/userApi';
import { STORAGE_KEYS } from '../../constants';
import request from "../../api";
import userRedux from '../../actions/user';
import { KeychainService } from '../../services/Keychain';
import { removeSession, setSession } from '../../services/AsyncStorage';
import _ from "lodash";
import { GLOBAL_SOCKET_SERVICE } from '../../services/Socket';


export const GLOBAL_USER_SCRIPTS = {
  clearUserSession: (dispatch) => {
    // return removeSession().then(() => {
    //   request.removeSession();
    //   userRedux.setUser(null)(dispatch)
    //   GLOBAL_CHECKOUT_SERVICE.flushUserData(dispatch)
    //   GLOBAL_SOCKET_SERVICE.closeInstance(dispatch);
    // })
  },
  initializeUserTokenOnly: async (token) => {
  //   return setSession(token).then(() => {
  //     request.setSession(token)
  //   })
  },
  initializeUserWithData: async (dispatch, token, password = null) => {
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     await setSession(token)
    //     request.setSession(token)
    //     let user = await GLOBAL_USER_SCRIPTS.rehydarateUser(dispatch)
    //     if (!_.isNull(password)) {
    //       await KeychainService.storeKeychainCredentials(user, password)
    //     }
    //     await GLOBAL_SOCKET_SERVICE.inializeConnection(dispatch);
    //     resolve(user)
    //   } catch (e) {
    //     reject(e)
    //   }
    // })
  },
  rehydarateUser: (dispatch) => {
    // return new Promise(async (resolve, reject) => {
    //   await userApi.rehydrate().then(async ({ user }: any) => {
    //     userRedux.setUser(user)(dispatch)
    //     resolve(user);
    //   }).catch(e => {
    //     reject(e)
    //   })
    // })
  },
  renewSessionByKeychain: (dispatch) => {
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     let credentials = await KeychainService.getKeychainCredentials();
    //     let { token } = await userApi.renew({ phone: credentials.phone, password: credentials.password }) as any;
    //     let user = await GLOBAL_USER_SCRIPTS.initializeUserWithData(dispatch, token)
    //     resolve({ token });
    //   } catch (e) {
    //     reject(e)
    //     //if fail. logout user. then go to main root. then tell them session expired and to login again.
    //   }
    // })
  }
}





// await KeychainService.storeKeychainCredentials(user, password)


export function useUser() {
  const dispatch = useDispatch()
  //@ts-ignore
  const { user } = useSelector(({ User }) => User);


  const login = (data: loginForm) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { token } = await userApi.login({ ...data }) as any;
        // let user = await GLOBAL_USER_SCRIPTS.initializeUserWithData(dispatch, token, data.password) as any;
        // await GLOBAL_CHECKOUT_SERVICE.rehydrateCart(dispatch);

        setTimeout(() => {
          resolve({ ...user, token })
        }, 400)
      } catch (e) {
        reject(e)
      }
    })
  }

  const rehydrate = () => {
    return GLOBAL_USER_SCRIPTS.rehydarateUser(dispatch)
  }

  const signup = (data: registerForm) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { token } = await userApi.register({ ...data }) as any;
        let user = await GLOBAL_USER_SCRIPTS.initializeUserWithData(dispatch, token, data.password) as any;
        // await GLOBAL_CHECKOUT_SERVICE.rehydrateCart(dispatch)
        setTimeout(() => {
          resolve({ ...user, token })
        }, 400)
      } catch (e) {
        reject(e)
      }
    })
  }

  const sendOtp = (international) => {
    return new Promise(async (resolve, reject) => {
      try {
        let reply = await userApi.sendOTP({ phone: international })
        resolve(reply)
      } catch (e) {
        reject(e)
      }
    })
  }

  const verifyOTP = (international, code) => {
    return new Promise(async (resolve, reject) => {
      try {
        let reply = await userApi.verifyOTP(international, code)
        resolve(reply)
      } catch (e) {
        reject(e)
      }
    })
  }

  const updateUser = (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        let reply = await userApi.update(user)
        await rehydrate();
        resolve(reply)
      } catch (e) {
        reject(e)
      }
    })
  }

  const changePassword = ({ oldPassword, newPassword }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let reply = await userApi.changePassword(({ old_password: oldPassword, new_password: newPassword }))
        let user = await rehydrate();
        await KeychainService.storeKeychainCredentials(user, newPassword)
        resolve(reply)
      } catch (e) {
        reject(e)
      }
    })
  }

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await GLOBAL_USER_SCRIPTS.clearUserSession(dispatch)
        resolve(null)
      } catch (e) {
        reject(e)
      }
    })
  }

  return {
    user,
    signup,
    login,
    logout,
    updateUser,
    verifyOTP,
    sendOtp,
    isLoggedIn: !!user,
    rehydrate,
    changePassword
  };
}


