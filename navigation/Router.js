import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen'
import ProfileScreen from '../screens/ProfileScreen'
import PizzaTranslator from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import Notifications from '../screens/Notifications';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => HomeScreen,
  camera: () => CameraScreen,
  profile: () => ProfileScreen,
  signUp: () => PizzaTranslator,
  login: () => LoginScreen,
  notifications: () => Notifications,
  rootNavigation: () => RootNavigation,
}));
