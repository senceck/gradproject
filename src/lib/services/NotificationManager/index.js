// import OneSignal from 'react-native-onesignal';
// import _ from 'lodash';
// import {storeItem} from '../AsyncStorage';
// import {STORAGE_KEYS} from '../../constants';

// class NotificationManager {
//   static instance = null;
//   constructor() {
//     if (!NotificationManager.instance) {
//       NotificationManager.instance = this;
//       this.initNotifications();
//     }
//     return NotificationManager.instance;
//   }
//   isNotificationEnabled = () => {
//     return new Promise((resolve) => {
//       OneSignal.getPermissionSubscriptionState(({permissionStatus}) =>
//         resolve(permissionStatus),
//       );
//     });
//   };
//   requestPermission = () => {
//     OneSignal.requestPermissions();
//   };
//   initNotifications = () => {
//     OneSignal.inFocusDisplaying(2);
//     // OneSignal.init("32d9c365-eb16-4f62-acc1-d9220a21e261", {
//     //   kOSSettingsKeyInFocusDisplayOption: 2
//     // });
//     OneSignal.addEventListener('received', this.onReceived);
//     OneSignal.addEventListener('opened', this.onOpened);
//     OneSignal.addEventListener('ids', this.onIds);
//   };
//   onReceived = async ({payload}) => {};
//   onOpened = ({notification: {payload}}) => {
//     // const propertyId = _.get(payload, 'additionalData.propertyId', false);
//     // if (propertyId) {
//     //   Deeplinking.showProperty(propertyId);
//     // }
//   };
//   onIds = async ({userId}) => {
//     storeItem(STORAGE_KEYS.NOTIFICATION_TOKEN, userId);
//   };
// }

// const instance = new NotificationManager();
// Object.freeze(instance);
// export default instance;
