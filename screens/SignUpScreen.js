import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  StyleSheet,
  AlertIOS,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  COLOR_BEIGE,
  COLOR_BLUE,
  COLOR_BACKGROUND,
} from '../components/styles/common'
import { GlobalState } from '../global.js'

export default class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      userinfo: '',
    };
  }

  _onPressButton() {
     fetch('http://localhost:3000/users', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ user: { username: this.state.username, email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation } })
     })
     .then((response) => response.json())
     .then((responseJson) => {
      console.log("Hi I'm Jeff")
      console.log(responseJson.auth_token)
      console.log(responseJson)
      this.setState({ userinfo: JSON.stringify(responseJson) })
      this.props.navigator.push('camera');
     })
     .catch((e) => {
      alert('Sorry, credentials do not match :(');
     })
     .done()
   }

   render() {
     return (
       <View style={styles.container}>
        <View style={styles.textInput}>
          <TextInput
            style={{height: 40}}
            placeholder="select username"
            onChangeText={(text) => this.setState({ username: text })}
          />
        </View>

        <View style={styles.textInput}>
          <TextInput
            style={{height: 40}}
            placeholder="enter email"
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>

        <View style={styles.textInput}>
          <TextInput
            secureTextEntry={true}
            style={{height: 40}}
            placeholder="create password"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>

        <View style={styles.textInput}>
          <TextInput
            secureTextEntry={true}
            style={{height: 40}}
            placeholder="confirm password"
            onChangeText={(text) => this.setState({ password_confirmation: text })}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton.bind(this)}
            title="Next"
            color='#fff'
            style={styles.buttonText}
          />
        </View>

        <View style={styles.linkContainer}>
          <TouchableOpacity
            onPress={this._handleBackPress}
            style={styles.backLink}>
            <Text style={styles.backLinkText}>
              Back
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
  _handleBackPress = () => {
    this.props.navigator.push('home')
  };
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   backgroundColor: COLOR_BACKGROUND,
  },
  textInput: {
    borderBottomColor: COLOR_BEIGE,
    borderBottomWidth: 2,
    margin: 15,
  },
  buttonContainer: {
    margin: 30,
    flexDirection: 'row',
    backgroundColor: COLOR_BLUE,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkContainer: {
    alignItems: 'center',
  },
})
