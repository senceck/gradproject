import { setMainRoot, setNoInternetRoot, setOnboardingRoot, showSplashScreen } from './roots';
import { compileColors } from '../shared/HOC/ThemeWrapper';
import loadScreens from './screens';
import {
  Navigation,
  OptionsTopBar,
  CommandName,
  NavigationButtonPressedEvent,
} from 'react-native-navigation';
import NetInfo from '@react-native-community/netinfo';
import { setI18nConfig } from '../lib/locales';
import { ifArabic } from '../lib/helpers/locale';
import { assets } from '../assets';
import { store } from '../..';
import request from '../lib/api';
import { Appearance, useColorScheme } from 'react-native';
import { GLOBAL_DEVICE_CONSTANTS_SERVICE } from '../lib/hooks/useDeviceConstants';

console.disableYellowBox = true;



export default async () => {
  Appearance.addChangeListener(({ colorScheme }) =>
    setDefaultOptions(colorScheme),
  );
  setDefaultOptions(Appearance.getColorScheme());
  await GLOBAL_DEVICE_CONSTANTS_SERVICE.rehydarate(store.dispatch)
  loadScreens();
  // let language = await getLanguage();
  // setI18nConfig(language);
  const { isConnected } = await NetInfo.fetch();
  //hide splashscreen
  if (isConnected) {
    showSplashScreen(async () => {
      //if showed before go to main
      await setOnboardingRoot();
    })
    await initializeApp();
  } else {
    console.error("NO NETWORK")
    setNoInternetRoot();
  }
};



export const initializeApp = async () => {
  // //INITALIZE API
  // await request.setUrl();

  // try {
  //   const token = await getSessionToken();
  //   if (token) {
  //     await GLOBAL_USER_SCRIPTS.initializeUserWithData(store.dispatch, token)
  //     // await GLOBAL_DATA_SERVICE.rehydrateLocations(store.dispatch)
  //   }
  // } catch (e) {
  //   // handleLogout()(store.dispatch);
  // } finally {

  // }
};


export const setDefaultOptions = (mode: 'dark' | 'light') => {
  // const colors = compileColors(mode);
  return Navigation.setDefaultOptions({
    layout: {
      direction: ifArabic('rtl', 'ltr'),
    },

    bottomTabs: {
      titleDisplayMode: 'alwaysHide',
    },
    // bottomTab: {
    //   iconColor: colors.gray.gray1,
    //   selectedIconColor: colors.primary.blue,
    // },
    topBar: {
      visible: false,
      drawBehind: true
    },
    animations: {
      setRoot: {
        enabled: true,
        alpha: {
          from: 0,
          to: 1,
          duration: 500,
          startDelay: 100,
          //@ts-ignore
          interpolation: 'accelerate',
        },
      },
    },
  });
};


// REACT NATIVE IMPORTANT FOR NAVIGATION

Navigation.addOptionProcessor<OptionsTopBar>(
  'topBar',
  (topBar: OptionsTopBar, commandName: CommandName): OptionsTopBar => {
    if (commandName === CommandName.ShowModal) {
      if (!topBar.leftButtons) {
        topBar.leftButtons = [
          {
            id: 'dismissModalButton',
            icon: assets.topBar.icons.close,
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
