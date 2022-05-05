import { loginForm, registerForm } from "../@types/user"
import { sha1 } from 'react-native-sha1';
import { timeApi } from "./time";
import request from ".";

export const userApi = {
    isRegistered: (phone) => request.post("/auth/check-phone", { phone }),

    // sendOTP: (phone) => { return new Promise((resolve, reject) => resolve(null)) },
    // verifyOTP: (phone, code) => { return new Promise((resolve, reject) => resolve(null)) },
    sendOTP: (phone) => {
        return new Promise(async (resolve, reject) => {
            resolve(null)
            try {
                let { minute } = await timeApi.getSeed() as any;

                let seed = minute + "NOTHINGISFOREVER21" + minute
                console.log("TIMESEED", seed)
                let hash = sha1(seed).then(hash => {
                    console.log('HASH', hash);
                }).catch(e => {
                    throw e;
                })
                await request.post('/otp/otp', {
                    phone,
                    hash
                })
                resolve(null)
            } catch (e) {
                console.error(e)
                reject(e)
            }
        })
    },

    // verifyOTP: (phone, code) => request.post('/otp/verify', { phone, code }),
    verifyOTP: (phone, code) => { return new Promise((resolve) => resolve(null)) },
    register: (data: registerForm) => request.post('/users', data),
    update: (data: any) => request.put('/users', data),
    login: (data: loginForm) => request.post("/auth", data),
    rehydrate: () => request.get('/users/me'),
    changePassword: ({ old_password, new_password }) => request.post("/users/change_password", { old_password, new_password }),
    deleteAccount: ({ password }) => request.post("/users/delete-my-account", { password }),
    renew: ({ password, phone }) => request.post('/auth/renew', { phone, password })
}




