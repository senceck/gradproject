// import React, { useState, useEffect } from "react"
// import messaging from "@react-native-firebase/messaging"
// import { Alert } from "react-native";
// import _ from "lodash"
// export default function useCloudMessaging() {

//     const [device_fcm_token, set_device_fcm_token] = useState(null)
//     const [remoteMessage, setRemoteMessage] = useState(null);
//     const deinit = async () => {
//         // await userApi.udpateFCM({ fcm_token: null });
//         messaging().unregisterDeviceForRemoteMessages();
//     };

//     const setfirebaseNotificationsToTrue = async () => {
//         // await AsyncStorage.setItem(StorageKeys.RECEIVE_NOTIFICATION, "true");
//     };
//     const initNotifications = async () => {
//         try {
//             await messaging().requestPermission();
//             await messaging().registerDeviceForRemoteMessages().then((e) => console.log("REG", e));
//             await messaging().subscribeToTopic("global");
//             await messaging().getInitialNotification().then(async remoteMessage => {
//                 console.log("FBFCM REMOTE INIT", remoteMessage)
//             })
//             messaging()
//                 .getToken()
//                 .then(async device_token => {
//                     console.log("FBFCM TOKEN", device_token);
//                     // AsyncStorage.setItem(StorageKeys.RECEIVE_NOTIFICATION, device_token);
//                     device_token && setfirebaseNotificationsToTrue();
//                     set_device_fcm_token(device_token)
//                     // device_token && await userApi.udpateFCM({ fcm_token: device_token });
//                 })
//                 .catch(e => {
//                     //   alert("error");
//                     console.log(e);
//                 });


//             const notificationListener = messaging().onMessage(async (remoteMessage: any) => {
//                 Alert.alert(
//                     _.get(remoteMessage, "notification.title"),
//                     _.get(remoteMessage, "notification.body")
//                 )

//                 setRemoteMessage(remoteMessage)
//                 console.log("FBFCM onMessage", remoteMessage)
//             })

//             const notificationBackgroundHandler = messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
//                 //store even in redux for background on notification press outside app and check if app is active.
//                 console.log("FBFCM setBackgroundMessageHandler", remoteMessage)
//                 setRemoteMessage(remoteMessage)
//                 // Alert.alert(
//                 //     _.get(remoteMessage, "notification.title") + "Handled",
//                 //     _.get(remoteMessage, "notification.body")
//                 // )
//                 setTimeout(() => {
//                     Alert.alert(
//                         _.get(remoteMessage, "notification.title") + "Handled",
//                         _.get(remoteMessage, "notification.body")
//                     )
//                     //     // this.deepLinking({ navigatable: remoteMessage.data.navigatable });
//                 }, 1000)
//             })

//             const tokenUpdatedListener = messaging().onTokenRefresh(async (fcm_token) => {
//                 console.log("FBFCM onTokenRefresh", fcm_token)
//                 set_device_fcm_token(fcm_token)
//             })

//             // console.log("FBFCM notificationDisplayedListener", notificationBackgroundHandler);
//             // console.log("FBFCM notificationListener", notificationListener);
//             // console.log("FBFCM tokenUpdatedListener", tokenUpdatedListener);
//         }
//         catch (e) {
//             console.log("FBFCM ERRORS", e)
//         }
//     }
//     useEffect(() => {
//         initNotifications()
//     }, [])


//     return {
//         FCM_TOKEN: device_fcm_token,
//         remoteMessage
//     }
// }