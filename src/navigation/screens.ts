import { Navigation } from 'react-native-navigation';
import Development from '../screens/Development';
import Test from '../screens/Test';
import ScreenWrapper from '../shared/HOC/ScreenWrapper';
import SplashScreen from '../screens/SplashScreen';
import Legal from '../screens/Development/Legal';
import PlacesSearch from '../screens/PlacesSearch';
import MapScreen from '../screens/MapScreen';
import ActionPicker from '../screens/Utility/ActionPicker';
import GenericRoot from '../screens/Utility/GenericRoot';
import Onboarding from '../screens/Onboarding';

import Home from '../screens/Home';
import { push } from '../lib/helpers/navigation';
import Results from '../screens/Results';

export enum Screens {
  Home = 'Home',
  Development = "Development",
  Test = "Test",
  SplashScreen = "SplashScreen",
  Legal = "Legal",
  PlacesSearch = "PlacesSearch",
  MapScreen = "MapScreen",
  ActionPicker = "ActionPicker",
  GenericRoot = 'GenericRoot',
  Onboarding = 'Onboarding',
  Results = 'Results'
}

export const registerScreen = (name: string, component: React.FC<any>) => {
  Navigation.registerComponent(
    name,
    () => (props) => ScreenWrapper(props, component),
    () => component,
  );
};

export default function loadScreens() {
  registerScreen(Screens.SplashScreen, SplashScreen)
  registerScreen(Screens.Home, Home);
  registerScreen(Screens.Development, Development);
  registerScreen(Screens.Test, Test);
  registerScreen(Screens.Legal, Legal)
  registerScreen(Screens.PlacesSearch, PlacesSearch)
  registerScreen(Screens.MapScreen, MapScreen)
  registerScreen(Screens.ActionPicker, ActionPicker)
  registerScreen(Screens.GenericRoot, GenericRoot)
  registerScreen(Screens.Onboarding, Onboarding)
  registerScreen(Screens.Results, Results)
}