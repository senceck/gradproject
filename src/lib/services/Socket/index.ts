//@ts-ignore
window.navigator.userAgent = 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { io } from 'socket.io-client';
import { STORAGE_KEYS } from '../../constants';
import _ from "lodash";

const link = 'https://mysterious-sierra-35904.herokuapp.com'
let socket = {
    current: null
}
export const GLOBAL_SOCKET_SERVICE = {
    inializeConnection: async (dispatch) => {
        const token = await AsyncStorage.getItem(STORAGE_KEYS.SESSION_TOKEN)
        try {
            let instance = await io(link, {
                // forceNew: true,
                // path:"websocket-order",
                // transports: ['websocket'],
                extraHeaders: {
                    'COMPID': "joolmaos",
                },
                auth: {
                    jwt: token
                }
            }).on('connect', () => {
            }).on('order', ({ order }) => {
                
            })
            socket.current = instance
            await AsyncStorage.setItem(STORAGE_KEYS.SOCKET, JSON.stringify(instance))
        } catch (e) {
            console.log("XXIOCONNECT", e)
        }
    },
    closeInstance: async (dispatch) => {
        let socket = await AsyncStorage.getItem(STORAGE_KEYS.SOCKET) as any;
        socket && socket.disconnect();
        // checkoutRedux.setActiveOrders(null)(dispatch);
    }
}