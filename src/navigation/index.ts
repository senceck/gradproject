import {
  setMainRoot,
  setNoInternetRoot,
  setOnboardingRoot,
  showSplashScreen,
} from './roots';
import {compileColors} from '../shared/HOC/ThemeWrapper';
import loadScreens from './screens';
import {
  Navigation,
  OptionsTopBar,
  CommandName,
  NavigationButtonPressedEvent,
} from 'react-native-navigation';
import NetInfo from '@react-native-community/netinfo';
import {ifArabic} from '../lib/helpers/locale';
import {store} from '../..';
import {Appearance, Platform, useColorScheme} from 'react-native';
import {GLOBAL_DEVICE_CONSTANTS_SERVICE} from '../lib/hooks/useDeviceConstants';
import AsyncStorage from '@react-native-community/async-storage';
import {STORAGE_KEYS} from '../lib/constants';

console.disableYellowBox = true;

export default async () => {
  let theme = (await AsyncStorage.getItem(STORAGE_KEYS.THEME)) as
    | 'dark'
    | 'light';
  setDefaultOptions(theme == 'dark' ? 'dark' : 'light');
  await GLOBAL_DEVICE_CONSTANTS_SERVICE.rehydarate(store.dispatch);
  loadScreens();
  const didShowOnBoarding = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING);

  const {isConnected} = await NetInfo.fetch();
  //hide splashscreen
  if (isConnected) {
    showSplashScreen(async () => {
      //change here
      if (didShowOnBoarding !== 'true' || false) {
        await setOnboardingRoot();
      } else {
        await setMainRoot();
      }
    });
    //INIT APP
  } else {
    console.error('NO NETWORK');
    setNoInternetRoot();
  }
};



export const setDefaultOptions = (mode: 'dark' | 'light') => {
  const colors = compileColors(mode);
  return Navigation.setDefaultOptions({
    layout: {
      direction: ifArabic('rtl', 'ltr'),
      backgroundColor:colors.background.systemFill
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysHide',
    },
    topBar: {
      visible: false,
      drawBehind: true,
    },
    animations: {
      setRoot: {
        enabled: true,
        alpha: {
          from: 0,
          to: 1,
          duration: 500,
          startDelay: Platform.OS == 'android' ? 0 : 100,
          //@ts-ignore
          interpolation: 'accelerate',
        },
      },
    },
  });
};


//21882188
Navigation.addOptionProcessor<OptionsTopBar>(
  'topBar',
  (topBar: OptionsTopBar, commandName: CommandName): OptionsTopBar => {
    if (commandName === CommandName.ShowModal) {
      if (!topBar.leftButtons) {
        topBar.leftButtons = [
          {
            id: 'dismissModalButton',
            // icon: assets.topBar.icons.close,
          },
        ];
      }
    }
    return topBar;
  },
);
// Now that each modal has a dismiss button, let's handle the button press event and dismiss the modal when needed.
Navigation.events().registerNavigationButtonPressedListener(
  (event: NavigationButtonPressedEvent) => {
    if (event.buttonId === 'dismissModalButton') {
      Navigation.dismissModal(event.componentId);
    }
  },
);
