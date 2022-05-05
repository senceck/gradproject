import { Navigation } from 'react-native-navigation';
import { Screens } from './screens';
import { assets } from '../assets';
import _ from "lodash";

const APP_TYPE = "";

export const setMainRoot = (passProps = null) => {
  Navigation.setRoot({
    root: {
      stack: {
        // id: 'MyStack', // This is the id we're going to use when interacting with the stack
        children: [
          {
            component: {
              name: Screens.Home,
              ...!_.isNull(passProps) ? { passProps } : {}
            },
          },
        ],
      },
    },
  });
}

export const showSplashScreen = (onFinish) => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Screens.SplashScreen,
              passProps: {
                onFinish
              }
            },
          },
        ],
      },
    },
  });
}






const setForceUpdateRoot = () => { };

const setMaintenanceRoot = () => { };

export const setNoInternetRoot = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Screens.GenericRoot,
              passProps: {
                
              }
            },
          },
        ],
      },
    },
  });
}
