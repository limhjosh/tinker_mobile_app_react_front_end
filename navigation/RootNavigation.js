import React from 'react';
import {
  StyleSheet,
  View } from 'react-native';
import {
  Notifications,
  ImagePicker
} from 'expo';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@expo/ex-navigation';
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync
  from '../api/registerForPushNotificationsAsync';

export default class RootNavigation extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }
  state = {
    image: null,
    auth_token: '',
  };

  render() {
    let { image } = this.state;

    return (
      <TabNavigation tabBarHeight={56} initialTab="home" tabBarStyle={{ backgroundColor: '#fbf6ef' }}>
        <TabNavigationItem
          id="camera"
          renderIcon={isSelected => this._renderIcon('ios-camera-outline', isSelected)}>
          <StackNavigation initialRoute="camera" />
        </TabNavigationItem>

        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderIcon('ios-home-outline', isSelected)}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>

        <TabNavigationItem
          id="explore"
          renderIcon={isSelected => this._renderIcon('ios-contacts-outline', isSelected)}>
          <StackNavigation initialRoute="explore" />
        </TabNavigationItem>

        <TabNavigationItem
          id="notification"
          renderIcon={isSelected => this._renderIcon('ios-notifications-outline', isSelected)}>
          <StackNavigation initialRoute="notifications" />
        </TabNavigationItem>

        <TabNavigationItem
          id="profile"
          renderIcon={isSelected => this._renderIcon('ios-person-outline', isSelected)}>
          <StackNavigation initialRoute="profile" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <Ionicons
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7edde',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});
