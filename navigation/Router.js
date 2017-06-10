import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';
import SignUpFormScreen from '../screens/SignUpFormScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  links: () => LinksScreen,
  settings: () => SettingsScreen,
  signUpForm: () => SignUpFormScreen,
  rootNavigation: () => RootNavigation,
}));
