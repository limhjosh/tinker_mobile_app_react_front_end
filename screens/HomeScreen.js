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
import { Ionicons } from '@expo/vector-icons';
import { COLOR_BEIGE, COLOR_BLUE } from '../components/styles/common'

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
              style={[styles.link, styles.loginLink]}>
              <Ionicons name="ios-log-in" size={32} color="#fff" />

              <Text style={styles.linkText}>
                Log in
              </Text>

            </TouchableOpacity>
          </View>

          <View style={styles.linkContainer}>

            <TouchableOpacity
              onPress={this._handleSignUpPress}
              style={[styles.signUpLink, styles.link]}>
              <Ionicons name="ios-create-outline" size={32} color="#fff" />

              <Text style={styles.linkText}>
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
  link: {
    padding: 10,
    paddingVertical: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginLink: {
    backgroundColor: COLOR_BEIGE,
  },
  signUpLink: {
    backgroundColor: COLOR_BLUE,
  },
  linkText: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 5,
  },
});
