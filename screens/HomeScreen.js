import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AppRegistry,
  Button,
} from 'react-native';
import {
  ImagePicker
} from 'expo';
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation'
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };
  state = {
    image: null
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/tinker.png')}
              style={styles.logoImage}
            />
          </View>

          <View style={styles.linkContainer}>

            <TouchableOpacity
              onPress={this._handleLoginPress}
              style={styles.loginLink}>
              <Text style={styles.signUpLinkText}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linkContainer}>
            <TouchableOpacity
              onPress={this._handleSignUpPress}
              style={styles.signUpLink}>
              <Text style={styles.signUpLinkText}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  }

  _handleSignUpPress = () => {
    this.props.navigator.push('signUp')
  };

  _handleLoginPress = () => {
    this.props.navigator.push('login')
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf6ef',
  },
  contentContainer: {
    paddingTop: 80,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logoImage: {
    width: 400,
    height: 200,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  linkContainer: {
    alignItems: 'center',
  },
  loginLink: {
    padding: 10,
    paddingVertical: 30,
    backgroundColor: '#DEB87C',
    width: '100%',
    alignItems: 'center',
  },
  signUpLink: {
    padding: 10,
    paddingVertical: 30,
    backgroundColor: '#8AC4CF',
    width: '100%',
    alignItems: 'center',
  },
  signUpLinkText: {
    fontSize: 20,
    color: '#fff',
  },
});
