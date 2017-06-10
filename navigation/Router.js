import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import RootNavigation from './RootNavigation';
import FormViewScreen from '../screens/FormViewScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  links: () => LinksScreen,
  settings: () => SettingsScreen,
  signUp: () => SignUpScreen,
  formView: () => FormViewScreen,
  rootNavigation: () => RootNavigation,
}));
