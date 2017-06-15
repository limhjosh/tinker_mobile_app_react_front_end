import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen'
import ProfileScreen from '../screens/ProfileScreen'
import PizzaTranslator from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import Notifications from '../screens/Notifications';
import Explore from '../screens/ExploreScreen';
import RequestAdvisor from '../screens/RequestAdvisorScreen';
import RootNavigation from './RootNavigation';
import RequestScreen from '../screens/RequestScreen';
import CommentScreen from '../screens/CommentScreen';
 // import TempRequestScreen from '../screens/TempRequestScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  camera: () => CameraScreen,
  profile: () => ProfileScreen,
  signUp: () => PizzaTranslator,
  login: () => LoginScreen,
  notifications: () => Notifications,
  explore: () => Explore,
  advisor: () => RequestAdvisor,
  rootNavigation: () => RootNavigation,
  request: () => RequestScreen,
  comment: () => CommentScreen,
  // request: () => TempRequestScreen,

}));
