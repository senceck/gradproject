import { Navigation } from 'react-native-navigation';
import Development from '../screens/Development';
import Home from '../screens/Home';
import Test from '../screens/Test';
import ScreenWrapper from '../shared/HOC/ScreenWrapper';
import GuestPopup from "../screens/UserStory/GuestPopup"
import OTP from "../screens/UserStory/OTP"
import PhoneNumberModal from "../screens/UserStory/PhoneNumberModal"
import CountryPicker from "../screens/UserStory/CountryPicker"
import NewUserInfo from "../screens/UserStory/NewUserInfo"
import Password from "../screens/UserStory/Password"
import SplashScreen from '../screens/SplashScreen';
import Biometrics from '../screens/Biometrics';
import Legal from '../screens/Development/Legal';
import PlacesSearch from '../screens/PlacesSearch';
import MapScreen from '../screens/MapScreen';
import ActionPicker from '../screens/Utility/ActionPicker';
import GenericRoot from '../screens/Utility/GenericRoot';

export enum Screens {
  Home = 'Home',
  Development = "Development",
  Test = "Test",
  GuestPopup = "GuestPopup",
  OTP = "OTP",
  PhoneNumberModal = "PhoneNumberModal",
  CountryPicker = "CountryPicker",
  NewUserInfo = "NewUserInfo",
  Password = "Password",
  SplashScreen = "SplashScreen",
  Biometrics = "Biometrics",
  Legal = "Legal",
  PlacesSearch = "PlacesSearch",
  MapScreen = "MapScreen",
  ActionPicker = "ActionPicker",
  GenericRoot = 'GenericRoot'
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
  registerScreen(Screens.OTP, OTP)
  registerScreen(Screens.GuestPopup, GuestPopup)
  registerScreen(Screens.PhoneNumberModal, PhoneNumberModal)
  registerScreen(Screens.CountryPicker, CountryPicker)
  registerScreen(Screens.NewUserInfo, NewUserInfo)
  registerScreen(Screens.Password, Password)
  registerScreen(Screens.Biometrics, Biometrics)
  registerScreen(Screens.Legal, Legal)
  registerScreen(Screens.PlacesSearch, PlacesSearch)
  registerScreen(Screens.MapScreen, MapScreen)
  registerScreen(Screens.ActionPicker, ActionPicker)
  registerScreen(Screens.GenericRoot, GenericRoot)
}
