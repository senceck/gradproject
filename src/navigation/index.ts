import { setMainRoot, setNoInternetRoot, showSplashScreen } from './roots';
import { compileColors } from '../shared/HOC/ThemeWrapper';
import loadScreens from './screens';
import {
  Navigation,
  OptionsTopBar,
  CommandName,
  NavigationButtonPressedEvent,
  Layout,
} from 'react-native-navigation';
import NetInfo from '@react-native-community/netinfo';
import { getLanguage, getPreferredColorMode, getSessionToken, setSession } from '../lib/services/AsyncStorage';
import { setI18nConfig } from '../lib/locales';
import { ifArabic } from '../lib/helpers/locale';
import { assets } from '../assets';
import { settingsApi } from '../lib/api/settingsApi';
import { store } from '../..';
import { ActionTypes, COLOR_MODE } from '../lib/constants';
import { isUpdateNeeded } from '../lib/helpers/version';
import request from '../lib/api';
import { Appearance, useColorScheme } from 'react-native';
import userRedux from '../lib/actions/user';
import { userApi } from '../lib/api/userApi';
import { createMetaData } from '../lib/services/Metadata';
import { GLOBAL_USER_SCRIPTS } from '../lib/hooks/useUser';
import { GLOBAL_DATA_SERVICE } from '../lib/hooks/useAppData';
import { isNull } from 'lodash';
import { themeRedux } from '../lib/actions/theme';
import { GLOBAL_DEVICE_CONSTANTS_SERVICE } from '../lib/hooks/useDeviceConstants';
import { metadataRedux, settingsRedux } from '../lib/actions/shared';

console.disableYellowBox = true;



export default async () => {
  Appearance.addChangeListener(({ colorScheme }) =>
    setDefaultOptions(colorScheme),
  );

  setDefaultOptions(Appearance.getColorScheme());
  await GLOBAL_DEVICE_CONSTANTS_SERVICE.rehydarate(store.dispatch)

  loadScreens();

  let language = await getLanguage();
  setI18nConfig(language);
  const { isConnected } = await NetInfo.fetch();
  if (isConnected) {
    showSplashScreen(async () => {
      await setMainRoot();
    })
    await initializeApp();
  } else {
    console.error("NO NETWORK")
    setNoInternetRoot();
  }
};


const rehydateSettings = async () => {
  let settings;
  try {
    settings = await settingsApi.get().then(({ settings }: any) => settings) as any;
    settingsRedux.set(settings)(store.dispatch);
    handleForceUpdate();
  } catch (e) {
    console.error("Unable to fetch settings", e)
  }
}


const handleForceUpdate = () => {
  // if (!isUpdateNeeded(settings.minVersion)) {
  //   return setForceUpdateRoot();
  // }
}

const handleUserMetadata = async () => {
  try {
    let meta_data = await createMetaData()
    await userApi.update({ meta_data })
    metadataRedux.set(meta_data)(store.dispatch);
  } catch (e) {
    console.error("Unable to handle user metadata", e)
  }
}

const fetchAppGuestData = async () => {
  //PARRAREL

}

const asyncFetchUserData = async () => {
  'async';

}

export const initializeApp = async () => {
  //INITALIZE API
  await request.setUrl();
  rehydateSettings();
  fetchAppGuestData(); //pararrel call to get app data while fetching user since there is no promise asyncs

  try {
    const token = await getSessionToken();
    if (token) {
      await GLOBAL_USER_SCRIPTS.initializeUserWithData(store.dispatch, token)
      handleUserMetadata();
      asyncFetchUserData();
      // await GLOBAL_DATA_SERVICE.rehydrateLocations(store.dispatch)
    }
  } catch (e) {
    // handleLogout()(store.dispatch);
  } finally {

  }
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
