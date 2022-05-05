import {Navigation} from 'react-native-navigation';
import startApp from './src/navigation';
import createStore from './src/lib/redux';
import {Platform, UIManager} from 'react-native';

let {store, persistor} = createStore();

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

Navigation.events().registerAppLaunchedListener(async () => {
  startApp({store});
});

export {store, persistor};
