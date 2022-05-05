import Geolocation from 'react-native-geolocation-service';
import {
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Linking,
  Alert,
} from 'react-native';
import appConfig from '../../../../app.json';

function useUserLocation() {
  const hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => { } },
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async (): Promise<Geolocation.GeoCoordinates> => {
    const options: Geolocation.GeoOptions = { timeout: 200 };
    return new Promise(async (resolve, reject) => {
      const permission = await hasLocationPermission();
      if (!permission) {
        // error code 1 which means permission needed, act accordingly
        return reject('1');
      }
      return Geolocation.getCurrentPosition(
        ({ coords }) => {
          return resolve(coords);
        },
        (e) => {
          // something else went wrong
          return reject('2');
        },
        options,
      );
    });
  };

  return {
    getLocation,
  };
}

export default useUserLocation;