import {Navigation} from 'react-native-navigation';
import ScreenWrapper from '../shared/HOC/ScreenWrapper';
import SplashScreen from '../screens/SplashScreen';
import Onboarding from '../screens/Onboarding';
import Media from '../screens/Media';
import Home from '../screens/Home';
import {push} from '../lib/helpers/navigation';
import Results from '../screens/Results';
import GenericRoot from '../screens/Utility/GenericRoot';

export enum Screens {
  Home = 'Home',
  SplashScreen = 'SplashScreen',
  GenericRoot = 'GenericRoot',
  Onboarding = 'Onboarding',
  Results = 'Results',
  Media = 'Media',
}

export const registerScreen = (name: string, component: React.FC<any>) => {
  Navigation.registerComponent(
    name,
    () => props => ScreenWrapper(props, component),
    () => component,
  );
};

export default function loadScreens() {
  registerScreen(Screens.SplashScreen, SplashScreen);
  registerScreen(Screens.Home, Home);
  registerScreen(Screens.GenericRoot, GenericRoot);
  registerScreen(Screens.Onboarding, Onboarding);
  registerScreen(Screens.Results, Results);
  registerScreen(Screens.Media, Media);
}
