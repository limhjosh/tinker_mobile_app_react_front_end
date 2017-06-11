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
  Button
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
              source={require('../assets/images/button-logo.png')}
              style={styles.logoImage}
            />
          </View>

          <View style={styles.signUpContainer}>
            <TouchableOpacity
              onPress={this._handleSignUpPress}
              style={styles.signUpLink}>
              <Text style={styles.signUpLinkText}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signUpContainer}>
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
    this.props.navigator.push('signUpForm')
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  signUpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  signUpLink: {
    paddingVertical: 15,
  },
  signUpLinkText: {
    fontSize: 20,
    color: '#263238',
  },
});
